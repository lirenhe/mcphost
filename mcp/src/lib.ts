import { createTypeSpecLibrary, JSONSchemaType, paramMessage } from "@typespec/compiler";

export interface McpEmitterOptions {
  "package-name"?: string;
}

const EmitterOptionsSchema: JSONSchemaType<McpEmitterOptions> = {
  type: "object",
  additionalProperties: true,
  properties: {
    "package-name": {
      type: "string",
      nullable: true,
      default: "test-package",
      description: "Name of the package as it will be in package.json",
    },
  },
  required: [],
};

export const $lib = createTypeSpecLibrary({
  name: "mcp",
  emitter: {
    options: EmitterOptionsSchema,
  },
  // Define diagnostics for the library. This will provide a typed API to report diagnostic as well as a auto doc generation.
  diagnostics: {
    "banned-alternate-name": {
      severity: "error",
      messages: {
        default: paramMessage`Banned alternate name "${"name"}".`,
      },
    },
  },
  // Defined state keys for storing metadata in decorator.
  state: {
    alternateName: { description: "alternateName" },
  },
});

export const { reportDiagnostic, createDiagnostic, stateKeys: StateKeys } = $lib;
