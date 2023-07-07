import { useSelector, useDispatch } from "react-redux";
import { selectBasket } from "../slices/basketSlice";
import { selectUser } from "../slices/userSlice";

import { checkPayment, updatePayedStatusOrder } from "../api/order";
import { useState, useEffect } from "react";
import {useParams} from "react-router-dom"
import { getOneOrder } from "../api/order";

const Payment = () => {
  const params = useParams()
  const [order, setOrder] = useState(null)
  const [error, setError] = useState(null)

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

  return (
    <section className="payment-page">
     <h1>Page de paiement</h1>
     { error !== null && <p style={{color: "red"}}>{error}</p>}
     { order !== null && <div>
      <p>Commande n°{order.id}</p>
      <p>Montant total de la commande: {order.totalAmount} €</p>
     </div>}
    </section>
  )
}

export default Payment;
