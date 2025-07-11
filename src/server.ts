// MUDANÇA PRINCIPAL AQUI:
// Unimos as importações em uma só, do diretório principal do servidor da SDK.
import { McpServer, HttpServerTransport } from "@modelcontextprotocol/sdk/server";

import * as tools from "./tools/index.js";
import { APS_CLIENT_ID, APS_CLIENT_SECRET, APS_SA_ID, APS_SA_EMAIL, APS_SA_KEY_ID, APS_SA_PRIVATE_KEY } from "./config.js";

// A verificação de variáveis continua a mesma
if (!APS_CLIENT_ID || !APS_CLIENT_SECRET || !APS_SA_ID || !APS_SA_EMAIL || !APS_SA_KEY_ID || !APS_SA_PRIVATE_KEY) {
    console.error("Missing one or more required environment variables...");
    process.exit(1);
}

const server = new McpServer({ name: "autodesk-platform-services", version: "0.0.1" });
for (const tool of Object.values(tools)) {
    server.tool(tool.title, tool.description, tool.schema, tool.callback);
}

try {
    const port = process.env.PORT || 3000;
    // O uso do HttpServerTransport continua o mesmo
    await server.connect(new HttpServerTransport({ port }));
    console.log(`MCP server running and listening on http://localhost:${port}`);

} catch (err) {
    console.error("Server error:", err);
    process.exit(1);
}