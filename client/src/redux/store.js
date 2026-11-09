import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice.js'
import agentReducer from './agentSlice.js'
export const store = configureStore({
  reducer: {
    user: userReducer,
    agent: agentReducer
  }
})