import "./models.tsp";

namespace mcp;

/**
json rpc operation
 */
op JsonRpcAction<InputModel extends {} | void = void, OutputModel extends {} | void = void>(
    /** The request body */
    body: JsonRpcRequest<InputModel>,
): JsonRpcResponse<OutputModel> | JsonRpcError;


/**
json rpc notification, in Mcp, we don't need to return anything for notification
 */
op JSonRpcNotification<InputModel extends {} | void = void>(
    /** The request body */
    body: JsonRpcNotification<InputModel>,
): void | JsonRpcError;
