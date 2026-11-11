import { McpServer } from "@modelcontextprotocol/server";
import {
  serveStdio,
  StdioServerTransport,
} from "@modelcontextprotocol/server/stdio";
import { z } from "zod";
import dotenv from 'dotenv'
dotenv.config()
import { TavilySearch } from "@langchain/tavily";

const server = new McpServer({
  name: "automate-ai-mcp-server",
  version: "1.0.0",
});

const tavilySearch = new TavilySearch({
  maxResults: 5,
  topic: "general",
});

server.registerTool(
  "web_search",
  {
    description: "Search the web for current information, tutorials, and news.",
    inputSchema: z.object({
      query: z.string(),
    }),
  },
  async ({ query }) => {
    try {
      const result = await tavilySearch.invoke({ query });
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    } catch (error) {
      console.log(error)
      return {
        content: [
          {
            type: "text",
            text: "Web search failed",
          },
        ],
      };
    }
  },
);

const main = async () => {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("mcp server started successfully");
};

main().catch((error) => {
  console.error("mcp server error", error);
  process.exit(1);
});
