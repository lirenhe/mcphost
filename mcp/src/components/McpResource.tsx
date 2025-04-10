import { EmitContext } from "@typespec/compiler";
import { McpResourceMetadata } from "../decorators.js";
import { McpEmitterOptions } from "../lib.js";
import * as ay from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import { refkey } from "@alloy-js/core";
import { mcp } from "../external.js";
import { ZodType } from "./ZodType.jsx";
import { $ } from "@typespec/compiler/experimental/typekit";
import { Fetch } from "./Fetch.jsx";

export interface McpResourceProps {
  resource: McpResourceMetadata;
  context: EmitContext<McpEmitterOptions>;
}

export function McpResource(props: McpResourceProps) {
  const resourceInput: Record<string, ay.Children> = {};
  const httpOperation = $.httpOperation.get(props.resource.operation);
  httpOperation.parameters.parameters.forEach((param) => {
    resourceInput[param.name] = (
      <ZodType type={param.param.type} context={props.context} />
    );
  });

  return (
    <ts.FunctionCallExpression
      target={<>{refkey("server")}.resource</>}
      args={[
        <ts.ValueExpression jsValue={props.resource.name} />,
        <>{ay.code`new ${(
          <ts.FunctionCallExpression
            target={mcp["./server/mcp.js"].ResourceTemplate}
            args={[
              <ts.ValueExpression
                jsValue={
                  props.resource.schema +
                  httpOperation.uriTemplate.replace(/^\//, "")
                }
              />,
              <ts.ObjectExpression jsValue={{ list: undefined }} />,
            ]}
          />
        )}`}</>,
        <>
          {ay.code`async (uri, {${Object.keys(resourceInput).join(", ")}}) => {
                  const resp = await ${(<Fetch httpOperation={httpOperation} context={props.context} />)};
                  return {
                    contents: [
                        { uri: uri.href, text: await resp.text() },
                    ],
                  };
                }`}
        </>,
      ]}
    />
  );
}
