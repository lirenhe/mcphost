import { createPackage } from "@alloy-js/typescript";

export const mcp = createPackage({
  name: "@modelcontextprotocol/sdk",
  version: "^1.9.0",
  descriptor: {
    "./server/stdio.js": {
      named: ["StdioServerTransport"],
    },
    "./server/mcp.js": {
      named: ["McpServer", "ResourceTemplate"],
    },
  },
});

export const z = createPackage({
  name: "zod",
  version: "^3.23.8",
  descriptor: {
    ".": {
      named: ["z"],
    },
  },
});
