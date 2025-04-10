import * as ts from "@alloy-js/typescript";
import { EmitContext, listServices, Service } from "@typespec/compiler";
import { writeOutput } from "@typespec/emitter-framework";
import { McpEmitterOptions } from "./lib.js";
import { McpServer } from "./components/McpServer.jsx";
import * as ay from "@alloy-js/core";
import { mcp, z } from "./external.js";

export async function $onEmit(context: EmitContext<McpEmitterOptions>) {
  const packageName = context.options["package-name"] ?? "test-package";
  const services = listServices(context.program);
  const output = (
    <ay.Output externals={[mcp, z]}>
      <ts.PackageDirectory
        name={packageName}
        version="0.1.0"
        scripts={{ build: "tsc" }}
        devDependencies={{ "@types/node": "^22.14.0" }}
      >
        <ay.For each={services}>
          {(service: Service) => (
            <ts.SourceFile path={`${service.type.name.toLowerCase()}.mcp.ts`}>
              <McpServer service={service} context={context} />
            </ts.SourceFile>
          )}
        </ay.For>
      </ts.PackageDirectory>
    </ay.Output>
  );
  await writeOutput(output, context.emitterOutputDir);
}
