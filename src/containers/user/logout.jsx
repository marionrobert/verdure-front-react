import { Navigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logoutUser } from "../../slices/userSlice"
import { useEffect } from "react"


const Logout = () => {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(logoutUser())
  }, [])

  return (
    <Navigate to="/" />
  )
}


export default Logout
