import { Agent } from "../model/agent.model.js"

export const createAgent = async(req, res) => {
    try {
        const {name, knowledgeBase, instructions, tools} = req.body
        if(!name || !knowledgeBase || !instructions || !tools){
            return res.status(400).json({
                msg: "These fields are required "
            })
        }

        const existingAgent = await Agent.findOne({name})
        if(existingAgent){
            return res.status(400).json({
                msg: "agent's name should be unique"
            })
        }

        const userId = req.user?._id;

        const agent = await Agent.create({
            name, knowledgeBase, instructions, tools, userId
        })

        return res.status(201).json({
            msg: "Agent Created Successfully",
            agent
        })
    } catch (error) {
        return res.status(500).json({
            msg: `Error while creating agent ${error}`
        })
    }
}

export const getAllAgents = async (req, res) => {
    try {
        const userId = req.user?._id
        const agents = await Agent.find({
            userId
        })

        return res.status(200).json(agents)
    } catch (error) {
        return res.status(500).json({
            msg: `get all agents error ${error}`
        })
    }
}

export const getAgentById = async (req, res) => {
    try {
        const userId = req.user?._id
        const agentId = req.params.id

        const findAgent = await Agent.findById(agentId)

        return res.status(200).json(findAgent)
    } catch (error) {
        return res.status(500).json({
            msg: `get agent by id error ${error}`
        })
    }
}

export const deleteAgent = async (req, res) => {
    try {
        const agentId = req.params.id

        const agent = await Agent.findByIdAndDelete(agentId)

        return res.status(200).json({
            msg: "agent deleted successfully",
            agent
        })
    } catch (error) {
        return res.status(500).json({
            msg: `delete agent error ${error}`
        })
    }
}