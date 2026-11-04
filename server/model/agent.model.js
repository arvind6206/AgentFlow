import mongoose from 'mongoose'
const agentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    knowledgeBase: {
        type: String,
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    tools: [
        {
            type: String,
            trim: true
        }
    ],
    isActive: {
        type: Boolean,
    }
}, {timestamps: true})

export const Agent = mongoose.model('Agent', agentSchema)