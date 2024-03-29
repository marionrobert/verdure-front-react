import { useState, useEffect } from "react"
import { loginUser } from "../../api/user"
import { Navigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { connectUser } from "../../slices/userSlice"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(false)
  const dispatch = useDispatch()

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
    // console.log("data for login -->", data)
    loginUser(data)
    .then((res)=>{
      // console.log("res de loginUser -->", res)
      if (res.status === 200) {
        // console.log("connexion réussie")
        window.localStorage.setItem("verdure-token", res.token)
        let myUser = res.user
        myUser.token = res.token
        dispatch(connectUser(myUser))
        setRedirect(true)
      } else {
        setError(`${res.msg}`)
      }

    })
    .catch((err)=>{
      console.log(err)
      setError("Une erreur est survenue")
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

  if(redirect){
    return <Navigate to="/"/>
  }

  return (
    <section className="forms">
    <h1>Se connecter</h1>
    { error !== null && <p style={{color:"red"}}>{error}</p>}
    <form onSubmit={(e)=>{
        handleSubmit(e)
        }}>
      <label htmlFor="email">Votre adresse email</label>
      <input type="text" name="email" onChange={handleChange} required/>
      <label htmlFor="password">Mot de passe</label>
      <input type="password" name="password" onChange={handleChange} required/>
      <button type="submit">Se connecter</button>
    </form>
    </section>
  )
}

export default Login;
