import * as ts from "@alloy-js/typescript";
import { EmitContext } from "@typespec/compiler";
import { writeOutput } from "@typespec/emitter-framework";
import { McpEmitterOptions } from "./lib.js";
import { Output } from "./components/Output.jsx";
import { Client } from "./components/Client.jsx";

/**
 * Main function to handle the emission process.
 * @param context - The context for the emission process.
 */
// TODO: define a concrete emitter
export async function $onEmit(context: EmitContext<McpEmitterOptions>) {
  const packageName = context.options["package-name"] ?? "test-package";
  const output = (
    <Output>
      <ts.PackageDirectory name={packageName} version="1.0.0">
        <Client></Client>
      </ts.PackageDirectory>
    </Output>
  );
  await writeOutput(output, "./output");
}
