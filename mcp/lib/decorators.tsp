import "../dist/src/decorators.js";

using TypeSpec.Reflection;

namespace Mcp;

/**
 * __Example Decorator__
 * Provide an alternate name for an operation.
 * @param name The alternate name.
 */
extern dec alternateName(target: Operation, name: valueof string);


/**

 * Provide a description for the mcpServer.
 * @param description The description.
 */
extern dec mcpServer(target: unknown, name: valueof string, description?: valueof string);


/**
 * all the operations under this namespace will use the same service
 * @param description The description.
 */
extern dec useService(target: Namespace, serviceName: valueof string, description?: valueof string);

/**
 * Provide a description for an operation.
 * @param description The description.
 */
extern dec linkOperation(target: Operation, operationName: valueof string, description: valueof string);
