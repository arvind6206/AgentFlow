import { createSlice } from "@reduxjs/toolkit"

export const agentSlice = createSlice({
  name: 'agent',
  initialState: {
    agents: null,
    selectedAgent: ""
  },
  reducers: {
    
    setAgents: (state, action) => {
        state.agents = action.payload
    },

    setSelectedAgent: (state, action) => {
        state.selectedAgent = action.payload
    }
  }
})

export const {setAgents, setSelectedAgent} = agentSlice.actions
export default agentSlice.reducer