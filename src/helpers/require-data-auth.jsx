import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
//import des action qui chargera les plantes venant d'un back
import {selectUser, connectUser} from '../slices/userSlice'
import {selectPlants, getAllPlants} from '../slices/plantSlice'

import {Navigate, useParams} from 'react-router-dom'
// import {checkMyToken} from '../api/user'
import {loadPlants} from '../api/plant'

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
        // récupération du token dans le localStorage
        let token = window.localStorage.getItem("verdure-token")

        if (token === null) { // l'utilisateur n'est pas connecté
          setRedirectToLogin(true)
        } else { // l'utilisateur est connecté
          // vérification du format du token
          checkMyToken()
          .then((res) => {
            if (res.status !== 200){ // format invalide
              // redirection + suppression token
              setRedirectToLogin(true)
              window.localStorage.removeItem("verdure-token")
            } else { // l'utilisateur est connecté
              // récupération des infos de l'utilisateur
              let currentUser = res.user

              // ajout du token à l'objet currentUser
              currentUser.token = token

              // mise à jour de la state user dans le store
              dispatch(connectUser(currentUser))

              if (props.admin === true && res.user.role !== "admin"){ // l'utilisateur connecté n'est pas admin
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
      return <Navigate to="/login"/>
    } else if (redirectToHome) {
      return <Navigate to="/home"/>
    } else {
      return (<Child {...props} params={params}/>)
    }
}

export default RequireDataAuth
