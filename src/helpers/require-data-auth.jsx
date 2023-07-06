import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
//import des action qui chargera les plantes venant d'un back
import {selectUser, connectUser} from '../slices/userSlice'
import {selectPlants, getAllPlants} from '../slices/plantSlice'
import {selectBasket, updateBasket, cleanBasket } from '../slices/basketSlice'

import {Navigate, useParams, useLocation} from 'react-router-dom'
import {checkMyToken} from '../api/user'
import {loadPlants} from '../api/plant'

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
    const [redirect, setRedirect] = useState(false)
    const [redirectAdmin, setRedirectAdmin] = useState(false)

    //au chargement de chaque composant --> parce que [props]
    useEffect(()=>{
      //si les plantes ne sont pas chargées dans redux, on les charge (action du store)
      if (plants.plants.length === 0){
        loadPlants()
        .then((res)=>{
          // console.log("res inside require-auth-data", res)
          dispatch(getAllPlants(res.results))
        })
        .catch((err)=>{
          console.log(err)
        })
      }

      //on va tester si on est connecté via les infos de redux
      // console.log("user", user.isLogged)

      //si l'utilisateur n'est pas logged (store)
      if (user.isLogged === false){
        // console.log("aucun user n'est connecté")
        //on récup le token dans le localStore ??????
        let token = window.localStorage.getItem('verdure-token')

        //si le storagee répond null (pas trouvé) et que la props auth est true (route protégée)
        if (token === null && props.auth) {
          // console.log("le token est null et la route a besoin d'une connexion user")
          //on demande une redirection
          setRedirect(true)
        } else { //sinon
            // console.log("le token n'est pas null")
            // si le token n'est pas null
            if (token !== null) {
              //on appel notre requète axios qui va vérifier le token dans le back checkToken
              checkMyToken(token)
              .then((res)=>{
                //si le status de la réponse n'est pas 200
                if (res.status !== 200){
                  // le token n'est pas bon, aucun utilisateur n'a été retourné
                  //si la route est protégée
                  if (props.auth){
                    //on demande la redirection
                    setRedirect(true)
                  }
                } else {//sinon, le token est bon
                    //on stock la réponse de la requète axios dans une variable user (retourne un objet)
                    let newUser = res.user

                    //on peut rajouter une propriété token à user avec le token dedans
                    newUser.token = token

                    //appel l'action de connexion de l'utilisateur (store)
                    dispatch(connectUser(newUser))
                }
              })
              .catch((err)=>{
                console.log(err)
              })
            }
        }
      } else { //le user est connecté
        //si le role de l'user n'est pas admin & que props admin est true (route protégée d'admin)
        if (user.infos.role !== "admin" && props.admin === true) {
          // console.log("lutilisateur est connecté mais il n'est pas admin, donc redirection")
          //on demande la redirection
          setRedirectAdmin(true)
        }
      }

    }, [user])

    if(redirect){
      return <Navigate to="/login"/>
    }

    if(redirectAdmin){
      return <Navigate to="http://localhost:5173/"/>
    }

    return (<Child {...props} params={params}/>)
}

export default RequireDataAuth
