import "./models.tsp";
import "./operations.tsp";



namespace Mcp;

enum McpTypes {
    Tools : "Tools",
    Resources : "Resources",
    Prompt : "Prompts"
}

op McpApiOperation<InputModel extends {} | void = void, OutputModel extends {} | void = void> is JsonRpcAction<InputModel, OutputModel>; 

op McpApiNotification<InputModel extends {} | void = void> is JSonRpcNotification<InputModel>;