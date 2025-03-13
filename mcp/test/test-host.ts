import { createTestHost, createTestWrapper } from "@typespec/compiler/testing";
import { McpTestLibrary } from "../src/testing/index.js";

export async function createMcpTestHost() {
  return createTestHost({
    libraries: [McpTestLibrary],
  });
}

export async function createMcpTestRunner() {
  const host = await createMcpTestHost();

  return createTestWrapper(host, {
    autoUsings: ["Mcp"]
  });
}

