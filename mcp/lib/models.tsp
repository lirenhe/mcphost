import "./decorators.tsp";
import "../dist/src/index.js";

namespace Mcp;

enum JsonRpcErrorCode {
    ParseError : -32700,
    InvalidRequest : -32600,
    MethodNotFound : -32601,
    InvalidParams : -32602,
    InternalError : -32603,
    ServerError : -32000
}

/**Define the request model of Json RPC */
model JsonRpcRequest<RequestModel extends {} | void> {
    jsonrpc: string = "2.0";
    method: string;
    params?: RequestModel;
    id: string | int32 ;
}

/**Define the response model of Json RPC */
model JsonRpcResponse<ResponseModel extends {}| void> {
    jsonrpc: string = "2.0";
    result?: ResponseModel;
    error?: JsonRpcError;
    id: string | int32;
}

/**Define the error model of Json RPC */
model JsonRpcError {
    code: JsonRpcErrorCode;
    message: string;
    data?: {};
}

/**Define the notification model of Json RPC */
model JsonRpcNotification<NotificationModel extends {} | void> {
    jsonrpc: string = "2.0";
    method: string;
    params?: NotificationModel;
}