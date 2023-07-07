import { useState, useEffect } from "react"
import { saveOneOrder } from "../api/order";
import { Navigate } from "react-router-dom";

//on importe la state de basket de redux + son/ses actions
import { selectBasket, updateBasket, cleanBasket } from "../slices/basketSlice"
import { useSelector, useDispatch } from "react-redux"
import { selectUser } from "../slices/userSlice";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

const Basket = () => {
  //on récup la state basket
  const currentBasket = useSelector(selectBasket)
  const user = useSelector(selectUser)
  const [error, setError] = useState(null)
  const [redirect, setRedirect] = useState(null)
  const [orderId, setOrderId] = useState(null)

  //on récup la fonction useDispatch
  const dispatch = useDispatch()

  const removeProductFromBasket = (oldBasket, product) => {
    //la state lorsqu'on la récup de redux est en mode read only (lecture seule)
    //je transforme l'objet en format json puis le retransforme en objet pour le stocker dans myBasket. Il est maintenant modifiable
    let newBasket = JSON.parse(JSON.stringify(oldBasket));

    //on copie le tableau du panier sans le produit qu'on veut supprimer (array.filter())
    //on dispatch le nouveau panier dans le store
    dispatch(updateBasket(newBasket.filter(item => item.id !== product.id)))
  }

  const addOneQuantity = (oldBasket, product) => {
    let newBasket = JSON.parse(JSON.stringify(oldBasket));
    let index = newBasket.findIndex(item => item.id === product.id)
    newBasket[index].quantityInCart += 1
    dispatch(updateBasket(newBasket))
  }

  const removeOneQuantity = (oldBasket, product) => {
    if (product.quantityInCart === 1){
      // console.log("alors je supprime le produit")
      removeProductFromBasket(oldBasket, product)
    } else {
      // console.log("alors je peux faire - 1")
      let newBasket = JSON.parse(JSON.stringify(oldBasket));
      let index = newBasket.findIndex(item => item.id === product.id)
      newBasket[index].quantityInCart -= 1
      dispatch(updateBasket(newBasket))
    }
  }

  const deleteBasket = () => {
    dispatch(cleanBasket())
  }

  const handleValidation = () => {
    console.log("in handle validation")
    // je crée l'objet data à envoyer à saveOneOrder
    let data = {
      user_id: user.infos.id,
      basket: currentBasket.basket
    }

    saveOneOrder(data)
    .then((res)=>{
      console.log(res)
      if (res.status === 200 ){
        // je redirige vers une page de payement/:order_id
        console.log("je vais rediriger vers page de payement")
        setOrderId(res.order_id)
        setRedirect(true)
      } else {
        //problème dans la création de commande
        setError(res.msg)
      }
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  if (redirect && orderId !== null) {
    return <Navigate to={`/payement/${orderId}`}/>
  }

  return (
    <section className="details-basket">
      <h1>Panier</h1>
    { currentBasket.basket.length === 0 ?
      <div>
        <p>Vous n'avez pas encore ajouté d'articles à votre panier</p>
      </div> :
      <div>
        { error !== null && <p style={{color:"red"}}>{error}</p>}
        {currentBasket.basket.map((item=>{
          return (
            <li  key={item.id} className='basket-item' >
              {/* <img src={item.photo} /> */}
              <div className='info'>
                <h3>{item.name}</h3>
                <FontAwesomeIcon icon={faPlus} onClick={ ()=>{addOneQuantity(currentBasket.basket, item)}}/>
                <span>Quantité: {item.quantityInCart}</span>
                <FontAwesomeIcon icon={faMinus} onClick={ () => { removeOneQuantity(currentBasket.basket, item)}} />
                <p><FontAwesomeIcon icon={faTrashCan} className='deletItem' onClick={()=>{removeProductFromBasket(currentBasket.basket, item)}}/></p>
              </div>
            </li>

          )
        }))
        }
        <p>Montant total du panier: {currentBasket.totalAmount} €</p>
        <button onClick={deleteBasket}>Supprimer mon panier</button>
        <button onClick={()=>{handleValidation()}}>Passer la commande</button>
      </div>
      }
    </section>

  )
}

export default Basket;
