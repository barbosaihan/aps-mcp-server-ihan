import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import * as tools from "./tools/index.js";
import { APS_CLIENT_ID, APS_CLIENT_SECRET, APS_SA_ID, APS_SA_EMAIL, APS_SA_KEY_ID, APS_SA_PRIVATE_KEY } from "./config.js";

if (!APS_CLIENT_ID || !APS_CLIENT_SECRET || !APS_SA_ID || !APS_SA_EMAIL || !APS_SA_KEY_ID || !APS_SA_PRIVATE_KEY) {
    console.error("Missing one or more required environment variables: APS_CLIENT_ID, APS_CLIENT_SECRET, APS_SA_ID, APS_SA_EMAIL, APS_SA_KEY_ID, APS_SA_PRIVATE_KEY");
    process.exit(1);
}

const server = new McpServer({ name: "autodesk-platform-services", version: "0.0.1" });
for (const tool of Object.values(tools)) {
    server.tool(tool.title, tool.description, tool.schema, tool.callback);
}

try {
    await server.connect(new StdioServerTransport());
} catch (err) {
    console.error("Server error:", err);
}
// ... seu código existente ...

try {
    await server.connect(new StdioServerTransport());
    console.log("Server connected via stdio, entering keep-alive mode."); // Adicione este log

    // Adicione este bloco para manter o processo rodando indefinidamente
    setInterval(() => {
        // Esta função vazia impede que o processo Node.js termine sozinho.
    }, 1000 * 60 * 60); // Um intervalo longo, como uma vez por hora, é suficiente.

} catch (err) {
    console.error("Server error:", err);
}