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
 * Service options.
 */
model McpServiceOptions {
    /**
     * Title of the service.
     */
    title?: string;
  
    /**
     * Version of the service.
     */
    version?: string;

    /**
     * Description of the service.
     */
    description?: string;
  }


/**

 * Provide a description for the mcpServer.
 * @param description The description.
 */
extern dec mcpServer(target: Namespace, mcpServerOptions: valueof McpServiceOptions);


/**
 * Provide a description for an operation.
 * @param description The description.
 */
extern dec linkOperation(target: Operation, operationName: valueof string, description: valueof string);
