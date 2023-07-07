import { useSelector, useDispatch } from "react-redux";
import { selectBasket } from "../slices/basketSlice";
import { selectUser } from "../slices/userSlice";

import { checkPayment, updatePayedStatusOrder } from "../api/order";
import { useState, useEffect } from "react";
import {useParams} from "react-router-dom"
import { getOneOrder } from "../api/order";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard } from '@fortawesome/free-solid-svg-icons'
import { faCcVisa, faCcMastercard } from '@fortawesome/free-brands-svg-icons';

const Payment = () => {
  const params = useParams()
  const [order, setOrder] = useState(null)
  const [error, setError] = useState(null)
  const user = useSelector(selectUser)

  useEffect(()=>{
    getOneOrder(params.id)
    .then((res)=>{
      if(res.status === 200){
        // console.log(res)
        setOrder(res.order)
      } else {
        setError(res.msg)
      }
    })
    .catch((err)=>{ console.log(err)})
  }, [params.id])

  const validatePayment = (e) => {
    e.preventDefault()
    console.log("validation du paiement")
  }

  return (
    <section className="payment-page">
     <h1>Page de paiement</h1>
     { error !== null && <p style={{color: "red"}}>{error}</p>}
     { order !== null && <div>
      <p>Commande n°{order.id}</p>
      <p>Montant total de la commande: {order.totalAmount} €</p>
      <div className="payment-interface">
      <p>Votre carte <FontAwesomeIcon icon={faCreditCard}/><FontAwesomeIcon icon={faCcMastercard}/><FontAwesomeIcon icon={faCcVisa}/></p>
      <form onSubmit={(e)=>{validatePayment(e)}}>
        <label htmlFor="cardNumber">Numéro de votre carte bancaire</label>
        <input name="cardNumber" required/>
        <label>Date d'expiration de votre carte</label>
        <input name="expiration-date-month" placeholder="MM" required/>/<input name="expiration-date-year" placeholder="AA" required/>
        <label>Code de sécurité</label>
        <input name="cvc" placeholder="CVC" required/>
        <button>Valider la paiement</button>
      </form>
      </div>
     </div>}
    </section>
  )
}

export default Payment;
