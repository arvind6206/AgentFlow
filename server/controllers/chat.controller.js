import { Agent } from "../model/agent.model.js";
import { createAgentGraph } from "../utils/agentGraph.js";
import chatGraph from "../utils/ChatGraph.js";
import { HumanMessage } from "@langchain/core/messages";

export const chat = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({
        msg: "message is required",
      });
    }

    const threadId = req.user._id.toString();

    const data = await chatGraph.invoke(
      {
        messages: [new HumanMessage(message)],
      },
      {
        configurable: { thread_id: threadId },
      },
    );

    if (!data || !data.messages || data.messages.length === 0) {
      return res.status(500).json({
        msg: "No response from chat",
      });
    }

    const lastMessage = data.messages[data.messages.length - 1].content;
    return res.status(200).json({ aiResponse: lastMessage });
  } catch (error) {
    console.error("Chat error:", error);
    return res.status(500).json({
      msg: `Chat controller error: ${error.message}`,
    });
  }
};

export const agentChat = async (req, res) => {
  try {
    const { message, agent } = req.body;
    if (!message) {
      return res.status(400).json({
        msg: "message is required",
      });
    }

    if (!agent) {
      return res.status(400).json({
        msg: "agent name is required",
      });
    }

    const threadId = req.user._id.toString();
    const existingAgent = await Agent.findOne({ name: agent, userId: req.user._id });

    if(!existingAgent){
        return res.status(404).json({
            msg: "agent not found"
        })
    }

    console.log("Creating agent graph for:", existingAgent.name);
    const graph = await createAgentGraph(existingAgent, req.user._id);
    console.log("Agent graph created, invoking...");
    
    const initialState = {
      messages: [new HumanMessage(message)],
    };
    
    console.log("Initial state:", initialState);
    
    const config = {
      configurable: { thread_id: threadId, recursionLimit: 5 },
    };
    
    console.log("Config:", config);
    
    const result = await graph.invoke(initialState, config);

    console.log("Graph result:", result);
    console.log("Result messages:", result?.messages);
    console.log("Result messages length:", result?.messages?.length);

    if (!result || !result.messages || result.messages.length === 0) {
      console.error("Invalid result from graph");
      return res.status(500).json({
        msg: "No response from agent",
      });
    }

    const lastMessage = result.messages[result.messages.length - 1].content;
    console.log("Last message:", lastMessage);
    return res.status(200).json({ aiResponse: lastMessage });
  } catch (error) {
    console.error("Agent chat error:", error);
    return res.status(500).json({
      msg: `agent chat controller error: ${error.message}`,
    });
  }
};
