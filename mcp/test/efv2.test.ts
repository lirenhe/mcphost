import { createMcpTestRunner } from "./test-host.js";
import {
  BasicTestRunner,
  resolveVirtualPath,
} from "@typespec/compiler/testing";
import { strictEqual } from "node:assert";
import { beforeEach, describe, it } from "node:test";

describe("emitter framework", () => {
  let runner: BasicTestRunner;

  beforeEach(async () => {
    runner = await createMcpTestRunner();
  });

  // TODO: replace by a real world test when emitter is ready for some component
  it("hello world", async () => {
    const [_, diags] = await runner.compileAndDiagnose(`
      @service(#{title: "My First MCP"})
      namespace MyFirstMcp;
      op func(a: string): void;
    `);
    strictEqual(diags.length, 0);
    const generatedFiles = Array.from(runner.fs.keys()).filter(
      (f) => !f.includes("node_modules") && !f.includes(".tsp")
    );
    const indexTsPath = resolveVirtualPath("output/index.ts");
    const packageJsonPath = resolveVirtualPath("output/package.json");

    // Check index.ts
    strictEqual(generatedFiles.includes(indexTsPath), true);
    strictEqual(
      runner.fs.get(indexTsPath),
      `console.log("hello MyFirstMcpClient!");`
    );

    // Check package.json
    strictEqual(generatedFiles.includes(packageJsonPath), true);
    strictEqual(runner.fs.get(packageJsonPath) !== undefined, true);
    const packageJson = JSON.parse(runner.fs.get(packageJsonPath)!);
    strictEqual(packageJson.name, "test-package");
    strictEqual(packageJson.version, "1.0.0");
  });
});
