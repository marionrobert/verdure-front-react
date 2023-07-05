import { useState, useEffect } from "react"
import { loginUser } from "../../api/user"
import { Navigate } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [redirect, setRedirect] = useState(false)

  useEffect(()=>{
    const token = window.localStorage.getItem('verdure-token')
    if (token){
      setRedirect(true)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // j'appelle la fonction login
    let data = {
      "email": email,
      "password": password
    }
    loginUser(data)
    .then((res)=>{
      // console.log(res.token)
      window.localStorage.setItem("verdure-token", res.token)
      setRedirect(true)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const handleChange = (e) => {
    switch (e.currentTarget.name) {
      case "email":
        setEmail(e.currentTarget.value)
        break;
      case "password":
        setPassword(e.currentTarget.value)
        break;
    }
  }

  return (
    <>
    { redirect && <Navigate to="/" />}
    <h1>Se connecter</h1>
    <form onSubmit={(e)=>{
        handleSubmit(e)
        }}>
      <label htmlFor="email">Votre adresse email</label>
      <input type="text" name="email" onChange={handleChange} required/>
      <label htmlFor="password">Mot de passe</label>
      <input type="password" name="password" onChange={handleChange} required/>
      <button type="submit">Se connecter</button>
    </form>
    </>
  )
}

export default Login;
