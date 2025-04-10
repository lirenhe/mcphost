import { $tool, $resource } from "./decorators.js";

export { $lib } from "./lib.js";

/** @internal */
export const $decorators = {
  Mcp: {
    tool: $tool,
    resource: $resource,
  },
};
