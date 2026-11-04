import express from 'express'
import { createAgent, deleteAgent, getAgentById, getAllAgents } from '../controllers/agent.controller.js'
import { protect } from '../middleware/protect.js'

const agentRouter = express.Router()

agentRouter.post('/create', protect, createAgent)
agentRouter.get('/agents', protect, getAllAgents)
agentRouter.get('/agent/:id', protect, getAgentById)
agentRouter.delete('/:id', protect, deleteAgent)

export default agentRouter