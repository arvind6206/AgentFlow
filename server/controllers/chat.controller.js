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

    const lastMessage = data.messages[data.messages.length - 1].content;
    return res.status(200).json({ aiResponse: lastMessage });
  } catch (error) {
    return res.status(500).json({
      msg: `Chat controller error ${error}`,
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

    const threadId = req.user._id.toString();
    const existingAgent = await Agent.findOne({ name: agent });

    if(!existingAgent){
        return res.status(400).json({
            msg: "agent not found"
        })
    }

    const graph = await createAgentGraph(existingAgent, req.user._id);
    const result = graph.invoke(
      {
        messages: [new HumanMessage(message)],
      },
      {
        configurable: { thread_id: threadId },
      },
    );

    const lastMessage = data.messages[data.messages.length - 1].content;
    return res.status(200).json({ aiResponse: lastMessage });
  } catch (error) {
    return res.status(500).json({
      msg: `Chat controller error ${error}`,
    });
  }
};
