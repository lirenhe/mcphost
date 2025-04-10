import { strictEqual } from "node:assert";
import { describe, it, beforeEach } from "node:test";
import { Operation } from "@typespec/compiler";
import {
  BasicTestRunner,
  expectDiagnostics,
  extractCursor,
} from "@typespec/compiler/testing";
import { createMcpTestRunner } from "./test-host.js";

describe("decorators", () => {
  let runner: BasicTestRunner;

  beforeEach(async () => {
    runner = await createMcpTestRunner();
  });
});
