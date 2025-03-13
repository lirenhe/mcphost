import { defineLinter } from "@typespec/compiler";
import { noInterfaceRule } from "./rules/no-interfaces.rule.js";

export const $linter = defineLinter({
  rules: [noInterfaceRule],
  ruleSets: {
    recommended: {
      enable: { [`mcp/${noInterfaceRule.name}`]: true },
    },
    all: {
      enable: { [`mcp/${noInterfaceRule.name}`]: true },
    },
  },
});
