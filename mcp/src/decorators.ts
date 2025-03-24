import { DecoratorContext, Namespace, Operation, Program } from "@typespec/compiler";
import { StateKeys, reportDiagnostic } from "./lib.js";

export const namespace = "Mcp";

/**
 * __Example implementation of the `@alternateName` decorator.__
 *
 * @param context Decorator context.
 * @param target Decorator target. Must be an operation.
 * @param name Alternate name.
 */
export function $alternateName(context: DecoratorContext, target: Operation, name: string) {
  if (name === "banned") {
    reportDiagnostic(context.program, {
      code: "banned-alternate-name",
      target: context.getArgumentTarget(0)!,
      format: { name },
    });
  }
  context.program.stateMap(StateKeys.alternateName).set(target, name);
}

/**
 * __Example accessor for  the `@alternateName` decorator.__
 *
 * @param program TypeSpec program.
 * @param target Decorator target. Must be an operation.
 * @returns Altenate name if provided on the given operation or undefined
 */
export function getAlternateName(program: Program, target: Operation): string | undefined {
  return program.stateMap(StateKeys.alternateName).get(target);
}


export interface McpServiceOptions {
  readonly title?: string;
  readonly version?: string;
  readonly description?: string;
}


/**
 * __Example implementation of the `@alternateName` decorator.__
 *
 * @param context Decorator context.
 * @param target Decorator target. Must be an operation.
 * @param name Alternate name.
 */
export function $mcpServer(context: DecoratorContext, target: Namespace, options: McpServiceOptions) {
  if (options.title === "banned") {
    reportDiagnostic(context.program, {
      code: "banned-alternate-name",
      target: context.getArgumentTarget(0)!,
      format: { "name": options.title },
    });
  }
  context.program.stateMap(StateKeys.alternateName).set(target as any, options.title);
}

/**
 * __Example accessor for  the `@alternateName` decorator.__
 *
 * @param program TypeSpec program.
 * @param target Decorator target. Must be an operation.
 * @returns Altenate name if provided on the given operation or undefined
 */
export function mcpServer(program: Program, target: Namespace): string | undefined {
  return program.stateMap(StateKeys.alternateName).get(target as any);
}

// TODO
export function $linkOperation(context: DecoratorContext, target: Operation, operationName: string, description: string) {

}
