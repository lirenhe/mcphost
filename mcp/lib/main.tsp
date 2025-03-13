import "./decorators.tsp";
import "../dist/src/index.js";

namespace mcp;

/**Define the request model of Json RPC */
model JsonRpcRequest<RequestModel extends {}> {
    jsonrpc: string;
    method: string;
    params?: RequestModel;
    id?: string | int32 | null;
}

/**Define the response model of Json RPC */
model JsonRpcResponse<ResponseModel extends {}> {
    jsonrpc: string;
    result?: ResponseModel;
    error?: JsonRpcError;
    id?: string | int32 | null;
}

/**Define the error model of Json RPC */
model JsonRpcError {
    code: int32;
    message: string;
    data?: {};
}

/**Define the notification model of Json RPC */
model JsonRpcNotification<NotificationModel extends {}> {
    jsonrpc: string;
    method: string;
    params?: NotificationModel;
}