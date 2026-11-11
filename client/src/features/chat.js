import api from "@/api"

export const chat = async (message) => {
    try {
        const {data} = await api.post("/api/chat", {
            message
        })
        return data
    } catch (error) {
        console.log("Chat API error:", error)
        return { msg: error.response?.data?.msg || "Something went wrong" }
    }
}

export const agentChat = async (message, agent) => {
    try {
        const {data} = await api.post("/api/chat/agent", {
            message,
            agent
        })
        return data
    } catch (error) {
        console.log("Agent chat API error:", error)
        return { msg: error.response?.data?.msg || "Something went wrong" }
    }
}
