import * as ts from "@alloy-js/typescript";
import { EmitContext } from "@typespec/compiler";
import { McpEmitterOptions } from "../lib.js";
import { HttpOperation } from "@typespec/http";

export interface FetchProps {
  httpOperation: HttpOperation;
  context: EmitContext<McpEmitterOptions>;
}

export function Fetch(props: FetchProps) {
  let url =
    "http://localhost:3003" + props.httpOperation.path.replaceAll("{", "${");
  const query = props.httpOperation.parameters.parameters.filter(
    (param) => param.type === "query"
  );
  if (query.length > 0) {
    url +=
      "?" + query.map((param) => `${param.name}=\$\{${param.name}\}`).join("&");
  }

  const options = {
    method: props.httpOperation.verb.toUpperCase(),
  };

  return (
    <ts.FunctionCallExpression
      target="fetch"
      args={[<>`{url}`</>, <ts.ObjectExpression jsValue={options} />]}
    />
  );
}
