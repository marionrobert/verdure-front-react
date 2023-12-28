import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
//import des action qui chargera les plantes venant d'un back
import {selectUser, connectUser} from '../slices/userSlice'
import {selectPlants, getAllPlants} from '../slices/plantSlice'
import {selectBasket, updateBasket, cleanBasket } from '../slices/basketSlice'

import {Navigate, useParams, useLocation} from 'react-router-dom'
// import {checkMyToken} from '../api/user'
import {loadPlants} from '../api/plant'

import { config } from "../config";
import axios from "axios";
import { checkMyToken } from '../api/user'


//HOC de controle des datas et de la sécurité
const RequireDataAuth = (props) =>{
    //on récup les params de la route
    const params = useParams()

    //on récupère la state user dans le store en mode lecture
    const plants = useSelector(selectPlants)
    const user = useSelector(selectUser)

    //on prépare la fonctionnalité pour dispatcher notre action dans le store
    const dispatch = useDispatch()
    //on récupère le composant à afficher qui a été passé en tant que props via App.js
    const Child = props.child

    //gestion de la redirection
    const [redirectToLogin, setRedirectToLogin] = useState(false)
    const [redirectToHome, setRedirectToHome] = useState(false)

    //au chargement de chaque composant --> parce que [props]
    useEffect(()=>{
      setRedirectToHome(false)
      setRedirectToLogin(false)
      // console.log("redirect to home -->", redirectToHome)
      // console.log("redirect to login -->", redirectToLogin)

      //si les plantes ne sont pas chargées dans redux, on les charge (action du store)
      if (plants.plants.length === 0){
        loadPlants()
        .then((res)=>{
          dispatch(getAllPlants(res.results))
        })
        .catch((err)=>{
          console.log(err)
        })
      }

      if (props.auth === true) { // si la route est protégée
        // console.log("route protégée")
        // récupération du token dans le localStorage
        let token = window.localStorage.getItem("verdure-token")
        // console.log("recup token from require auth-->", token)

        if (token === null) { // l'utilisateur n'est pas connecté
          // console.log("l'utilisateur n'est pas connecté, on redirige vers le login")
          setRedirectToLogin(true)
        } else { // l'utilisateur est connecté
          // vérification du format du token
          // axios.get(`${config.api_url}/api/v1/user/checkToken`, {headers: {"x-access-token": token}})
          checkMyToken()
          .then((res) => {
            if (res.status !== 200){ // format invalide
              // redirection + suppression token
              console.log("format invalide --> redirection + suppression token")
              setRedirectToLogin(true)
              window.localStorage.removeItem("verdure-token")
            } else { // l'utilisateur est connecté
              // console.log("le token est au bon format --> j'enregistre le user dans la state user")
              // récupération des infos de l'utilisateur
              let currentUser = res.user
              // console.log("currentUser -->", currentUser)

              // ajout du token à l'objet currentUser
              currentUser.token = token

              // mise à jour de la state user dans le store
              dispatch(connectUser(currentUser))

              if (props.admin === true && res.user.role !== "admin"){ // l'utilisateur connecté n'est pas admin
                // console.log("utilisateur connecté, mais pas admin alors que route admin --> redirection vers la home")
                setRedirectToHome(true)
              }
            }
          })
          .catch((err) => {
            console.log("err checkmytoken -->", err)
            setRedirectToLogin(true)
            window.localStorage.removeItem("verdure-token")
          })
        }
      }

    }, [props])

    if(redirectToLogin){
      // console.log("je vais rediriger vers login")
      return <Navigate to="/login"/>
    } else if (redirectToHome) {
      // console.log("je vais rediriger vers home car route admin")
      return <Navigate to="/home"/>
    } else {
      return (<Child {...props} params={params}/>)
    }
}

export default RequireDataAuth
