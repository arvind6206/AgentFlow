import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import { me } from './features/auth'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from './redux/userSlice'
import Home from './pages/Home'
import Agents from './pages/Agents'
import Integration from './pages/Integration'
import CreateAgent from './pages/CreateAgent'

const App = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const {userData} = useSelector(state => state.user)

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await me()
        dispatch(setUserData(data))
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
  fetch()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={userData? <Navigate to={"/"}/> : <Login/>}/>
          <Route path='/' element={userData? <Home/> : <Navigate to={"/login"}/>}/>
          <Route path='/agents' element={userData? <Agents/> : <Navigate to={"/login"}/>}/>
          <Route path='/integration' element={userData? <Integration/> : <Navigate to={"/login"}/>}/>
          <Route path='/agents/new' element={userData? <CreateAgent/> : <Navigate to={"/login"}/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
