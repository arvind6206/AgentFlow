import { Agent } from "../model/agent.model.js"

export const createAgent = async(req, res) => {
    try {
        const {name, knowledgeBase, instructions, tools} = req.body
        if(!name || !knowledgeBase || !instructions || !tools){
            return res.status(400).json({
                msg: "These fields are required "
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