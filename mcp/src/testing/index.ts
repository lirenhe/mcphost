import { resolvePath } from "@typespec/compiler";
import { createTestLibrary, TypeSpecTestLibrary } from "@typespec/compiler/testing";
import { fileURLToPath } from "url";

export const McpTestLibrary: TypeSpecTestLibrary = createTestLibrary({
  name: "mcp",
  packageRoot: resolvePath(fileURLToPath(import.meta.url), "../../../../"),
});
