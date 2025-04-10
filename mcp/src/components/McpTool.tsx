import * as ay from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import { EmitContext } from "@typespec/compiler";
import { McpToolMetadata } from "../decorators.js";
import { McpEmitterOptions } from "../lib.js";
import { refkey } from "@alloy-js/core";
import { $ } from "@typespec/compiler/experimental/typekit";
import { ZodType } from "./ZodType.jsx";
import { Fetch } from "./Fetch.jsx";

export interface McpToolProps {
  tool: McpToolMetadata;
  context: EmitContext<McpEmitterOptions>;
}

export function McpTool(props: McpToolProps) {
  const toolInput: Record<string, ay.Children> = {};
  const httpOperation = $.httpOperation.get(props.tool.operation);
  httpOperation.parameters.parameters.forEach((param) => {
    toolInput[param.name] = (
      <ZodType type={param.param.type} context={props.context} />
    );
  });
  if (httpOperation.parameters.body) {
    toolInput["body"] = (
      <ZodType
        type={httpOperation.parameters.body.type}
        context={props.context}
      />
    );
  }

  return (
    <ts.FunctionCallExpression
      target={<>{refkey("server")}.tool</>}
      args={[
        <ts.ValueExpression jsValue={props.tool.name} />,
        <ts.ValueExpression jsValue={props.tool.description} />,
        <ts.ObjectExpression jsValue={toolInput} />,
        <>
          {ay.code`async ({${Object.keys(toolInput).join(", ")}}) => {
              const resp = await ${(<Fetch httpOperation={httpOperation} context={props.context} />)};
              return {
                content: [
                  {
                    type: "text",
                    text: await resp.text(),
                  },
                ],
              };
            }`}
        </>,
      ]}
    />
  );
}
