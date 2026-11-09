import chatGraph from "../utils/ChatGraph.js"
import { HumanMessage } from '@langchain/core/messages'

export const chat = async (req, res) => {
    try {
        const {message} = req.body
        if(!message){
            return res.status(400).json({
                msg: "message is required"
            })
        }

        const threadId = req.user._id.toString()

        const data = await chatGraph.invoke({
            messages: [
               new HumanMessage(message)
            ]},
            {
                configurable: {thread_id:threadId}
            }
        )

        const lastMessage = data.messages[data.messages.length - 1].content
        return res.status(200).json({aiResponse: lastMessage})
    } catch (error) {
        return res.status(500).json({
            msg: `Chat controller error ${error}`
        })
    }
}