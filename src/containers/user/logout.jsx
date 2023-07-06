import { Navigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logoutUser } from "../../slices/userSlice"
import { useEffect } from "react"


const Logout = () => {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(logoutUser())
    window.localStorage.removeItem('verdure-token')
  }, [])

  return <Navigate to="http://localhost:5173/"/>
}


export default Logout
