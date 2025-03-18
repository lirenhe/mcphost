# TypeSpec MCP Protocol Demonstration

This repository demonstrates how to use TypeSpec to define and implement the MCP [(Model Context Protocol)](https://github.com/modelcontextprotocol/servers)  protocol. The goal of this project is to showcase how TypeSpec can be leveraged to define a protocol, create servers based on that definition, and explore the potential of TypeSpec's extensibility for common AI scenarios.

## Repository Overview
This repository contains the following three projects:

1. mcp: Define @TypeSpec.mcp Library
This project contains the core TypeSpec library that defines the MCP protocol. It serves as the foundation for describing and managing MCP interactions using TypeSpec.

2. weatherhost: Sample MCP Server
This is a sample project that demonstrates how to define a simple MCP server using TypeSpec and the @TypeSpec.mcp library. It acts as a reference implementation to help users understand how to define and interact with an MCP server in a real-world use case.

3. **TODO**: Emitter for MCP Server Generation
This is a work-in-progress component that will allow you to generate an MCP server from the TypeSpec definitions found in weatherhost. The emitter framework will enable automatic generation of server code, helping to streamline the development process for projects based on TypeSpec definitions.

## Project Objectives
The key goal of this repository is to:

Showcase the capabilities and extensibility of TypeSpec in defining the MCP protocol.
Leverage the Emitter framework to automatically generate MCP servers from TypeSpec definitions, thus supporting common AI scenarios.

## Contribution
We welcome contributions to this project! If you'd like to help out, feel free to:

Fork the repository and create a new branch.
Make your changes or improvements.
Open a pull request with a clear description of what you've done.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
