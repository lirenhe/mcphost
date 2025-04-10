import { EmitContext, Type } from "@typespec/compiler";
import { McpEmitterOptions } from "../lib.js";
import * as ay from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import { get } from "http";
import { z } from "../external.js";

export interface ZodTypeProps {
  type: Type;
  context: EmitContext<McpEmitterOptions>;
}

export function ZodType(props: ZodTypeProps) {
  return getZodType(props.context, props.type);
}

function getZodType(
  context: EmitContext<McpEmitterOptions>,
  type: Type
): ay.Children {
  switch (type.kind) {
    case "Scalar":
      if (context.program.checker.isStdType(type)) {
        if (type.name === "boolean") {
          return <>{z.z}.boolean()</>;
        } else if (type.name === "string") {
          return <>{z.z}.string()</>;
        } else if (
          type.name === "int64" ||
          type.name === "int32" ||
          type.name === "int16" ||
          type.name === "int8" ||
          type.name === "integer"
        ) {
          return <>{z.z}.number().int()</>;
        } else if (type.name === "safeint") {
          return <>{z.z}.number().int().safe()</>;
        } else if (
          type.name === "uint64" ||
          type.name === "uint32" ||
          type.name === "uint16" ||
          type.name === "uint8"
        ) {
          return <>{z.z}.number().int().nonnegative()</>;
        } else if (
          type.name === "float" ||
          type.name === "float32" ||
          type.name === "float64" ||
          type.name === "numeric"
        ) {
          return <>z.number()</>;
        } else {
          throw new Error(`Unsupported type: ${type.name}`);
        }
      } else if (type.baseScalar === undefined) {
        throw new Error(`Unsupported type: ${type.name}`);
      } else {
        return getZodType(context, type.baseScalar);
      }
    case "Boolean":
      return (
        <>
          {z.z}.literal({type.value})
        </>
      );
    case "String":
      return (
        <>
          {z.z}.literal("{type.value}")
        </>
      );
    case "Number":
      return (
        <>
          {z.z}.literal({type.value})
        </>
      );
    case "Union":
      return (
        <>
          {z.z}.union([
          {ay.join(
            [...type.variants.values()].map((v) => getZodType(context, v.type)),
            { joiner: "," }
          )}
          ])
        </>
      );
    default:
      throw new Error(`Unsupported type: ${type.kind}`);
  }
}
