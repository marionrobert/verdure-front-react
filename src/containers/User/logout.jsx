import { Navigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logoutUser } from "../../slices/userSlice"
import { useEffect } from "react"
import { cleanBasket } from "../../slices/basketSlice"


const Logout = () => {
  const dispatch = useDispatch()

  useEffect(()=>{
    window.localStorage.removeItem('verdure-token')
    dispatch(logoutUser())
    dispatch(cleanBasket())
  }, [])

  return <Navigate to="/home"/>
}


export default Logout
