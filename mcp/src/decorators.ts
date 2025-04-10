import {
  DecoratorContext,
  getDoc,
  Operation,
  Program,
} from "@typespec/compiler";
import { StateKeys } from "./lib.js";

export interface McpToolMetadata {
  name: string;
  description: string;
  operation: Operation;
}

export const $tool = (
  context: DecoratorContext,
  target: Operation,
  name?: string,
  description?: string
) => {
  context.program.stateMap(StateKeys.tools).set(target, {
    name: name ?? target.name,
    description: description ?? getDoc(context.program, target) ?? "",
    operation: target,
  } as McpToolMetadata);
};

export function getTool(
  program: Program,
  operation: Operation
): McpToolMetadata | undefined {
  return program.stateMap(StateKeys.tools).get(operation) as
    | McpToolMetadata
    | undefined;
}

export interface McpResourceMetadata {
  schema: string;
  name: string;
  description: string;
  operation: Operation;
}

export const $resource = (
  context: DecoratorContext,
  target: Operation,
  schema: string,
  name?: string,
  description?: string
) => {
  context.program.stateMap(StateKeys.resources).set(target, {
    schema: schema,
    name: name ?? target.name,
    description: description ?? getDoc(context.program, target) ?? "",
    operation: target,
  } as McpResourceMetadata);
};

export function getResource(
  program: Program,
  operation: Operation
): McpResourceMetadata | undefined {
  return program.stateMap(StateKeys.resources).get(operation) as
    | McpResourceMetadata
    | undefined;
}
