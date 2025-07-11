import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
// IMPORTANTE: Trocamos o StdioServerTransport pelo HttpServerTransport
import { HttpServerTransport } from "@modelcontextprotocol/sdk/server/http.js"; 
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
    const port = process.env.PORT || 3000; // Usa a porta definida pelo ambiente ou 3000
    // IMPORTANTE: Trocamos a forma de conectar para usar HTTP e uma porta
    await server.connect(new HttpServerTransport({ port })); 
    console.log(`MCP server running and listening on http://localhost:${port}`);

} catch (err) {
    console.error("Server error:", err);
    process.exit(1); // Encerra se não conseguir iniciar o servidor
}