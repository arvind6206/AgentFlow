import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio, StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import { z } from "zod";

const server = new McpServer({
    name: "automate-ai-mcp-server",
    version: "1.0.0",
  });

  server.registerTool(
    "web_search", {
        description: "Search the web for current information, tutorials, and news.",
        inputSchema: z.object({
            query: z.string()
        })
    },
    async ({query}) => {
        
    }
  )

  const main = async () => {
    const transport = new StdioServerTransport()
    await server.connect(transport)
    console.log("mcp server started successfully")
  }

  main().catch((error) => {
    console.error("mcp server error",error)
    process.exit(1)
  })