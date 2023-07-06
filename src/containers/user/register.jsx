import {useState, useEffect} from "react"
import { addOneUser } from "../../api/user"
import { Navigate } from "react-router-dom"
import { Link } from "react-router-dom"


const Register = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] =  useState("")
  const [address, setAddress] =useState("")
  const [zip, setZip] =useState("")
  const [city, setCity] =useState("")
  const [phone, setPhone] =useState("")

  const [errorForm, setErrorForm] = useState(null)
  const [success, setSuccess] = useState(null)



  const handleSubmit = (e) => {
    e.preventDefault()
    setSuccess(null)
    setErrorForm(null)

    let data = {
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "password": password,
      "address": address,
      "zip": zip,
      "city": city,
      "phone": phone
    }

    addOneUser(data)
    .then((res)=>{
      if (res.status === 200) {
        setSuccess("Félicitations, votre compte a bien été créé.")
        // e.currentTarget.reset()
      } else {
        console.log("je suis dans le else")
        setErrorForm(res.msg)
      }
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const handleChange = (e) => {
    switch (e.currentTarget.name) {
      case "firstName":
        setFirstName(e.currentTarget.value)
        break;
      case "lastName":
        setLastName(e.currentTarget.value)
        break;
      case "email":
        setEmail(e.currentTarget.value)
        break;
      case "password":
        setPassword(e.currentTarget.value)
        break;
      case "address":
        setAddress(e.currentTarget.value)
        break;
      case "zip":
        setZip(e.currentTarget.value)
        break;
      case "city":
        setCity(e.currentTarget.value)
        break;
      case "phone":
        setPhone(e.currentTarget.value)
        break;
    }
  }

  return (
    <>
      <h1>Créer un compte</h1>
      { errorForm !== null && <p style={{color: "red"}}>{errorForm}</p>}
      { success !== null && <div>
        <p style={{color: "green"}}>{success}</p>
        <p>Vous pouez désormais vous connecter </p><button><Link to="/login">Me connecter</Link></button>
      </div>
      }

      <form onSubmit={(e)=>{handleSubmit(e)}}>
        <label htmlFor="firstName">Votre prénom</label>
        <input type="text" name="firstName" onChange={handleChange} required/>
        <label htmlFor="lastName">Votre nom</label>
        <input type="text" name="lastName" onChange={handleChange} required/>
        <label htmlFor="email">Votre adresse email</label>
        <input type="text" name="email" onChange={handleChange} required/>
        <label htmlFor="password">Mot de passe</label>
        <input type="password" name="password" onChange={handleChange} required/>
        <label htmlFor="address">Votre adresse complète</label>
        <input type="text" name="address" onChange={handleChange} required/>
        <label htmlFor="zip">Votre code postal</label>
        <input type="text" name="zip" onChange={handleChange} required/>
        <label htmlFor="city">Votre ville</label>
        <input type="text" name="city" onChange={handleChange} required/>
        <label htmlFor="phone">Votre numéro de téléphone</label>
        <input type="text" name="phone" onChange={handleChange} required/>
        <button type="submit">Valider</button>
      </form>
    </>
  )
}

export default Register
