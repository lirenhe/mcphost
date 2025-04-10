using TypeSpec.Reflection;

namespace Mcp;

extern dec tool(
    target: Operation,
    name?: valueof string,
    description?: valueof string
);

extern dec resource(
    target: Operation,
    schema: valueof string,
    name?: valueof string,
    description?: valueof string
);
