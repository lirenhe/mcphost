import * as ay from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import { EmitContext, Interface, Namespace, Service } from "@typespec/compiler";
import {
  getResource,
  getTool,
  McpResourceMetadata,
  McpToolMetadata,
} from "../decorators.js";
import { McpEmitterOptions } from "../lib.js";
import { mcp } from "../external.js";
import { McpTool } from "./McpTool.jsx";
import { McpResource } from "./McpResource.jsx";

export interface McpServerProps {
  service: Service;
  context: EmitContext<McpEmitterOptions>;
}

export function McpServer(props: McpServerProps) {
  const queue: (Namespace | Interface)[] = [props.service.type];
  const tools: McpToolMetadata[] = [];
  const resources: McpResourceMetadata[] = [];
  while (queue.length > 0) {
    const current = queue.shift()!;
    for (const op of current.operations.values()) {
      const tool = getTool(props.context.program, op);
      if (tool) {
        tools.push(tool);
      }
      const resource = getResource(props.context.program, op);
      if (resource) {
        resources.push(resource);
      }
    }
    if (current.kind === "Namespace") {
      queue.push(...current.namespaces.values());
      queue.push(...current.interfaces.values());
    }
  }

  const serverInfo = {
    name: props.service.title ?? props.service.type.name,
    version: "0.1.0",
  };

  return (
    <ay.StatementList>
      <ts.VarDeclaration export name="server" refkey={ay.refkey("server")}>
        new{" "}
        <ts.FunctionCallExpression
          target={mcp["./server/mcp.js"].McpServer}
          args={[<ts.ObjectExpression jsValue={serverInfo} />]}
        />
      </ts.VarDeclaration>
      <ay.For each={tools}>
        {(tool) => <McpTool tool={tool} context={props.context} />}
      </ay.For>
      <ay.For each={resources}>
        {(resource) => (
          <McpResource resource={resource} context={props.context} />
        )}
      </ay.For>
      <ts.VarDeclaration name="transport" refkey={ay.refkey("transport")}>
        new{" "}
        <ts.FunctionCallExpression
          target={mcp["./server/stdio.js"].StdioServerTransport}
        />
      </ts.VarDeclaration>
      <>await server.connect(transport);</>
    </ay.StatementList>
  );
}
