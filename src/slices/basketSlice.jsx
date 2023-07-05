import {createSlice} from "@reduxjs/toolkit";

//récupération du panier dans le localstorage
let currentBasket = JSON.parse(localStorage.getItem("verdure-basket"))
if (currentBasket === null){
  currentBasket = []
}

function calculateTotalAmount(basket){
  let price = 0
  basket.forEach(plant => {
    price += parseInt(plant.quantityInCart) * parseFloat(plant.price)
  });
  return price
}

let totalPrice = calculateTotalAmount(currentBasket)

//on crée notre state initiale
const initialState = {
  basket: currentBasket,
  totalAmount: totalPrice
}

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    updateBasket: (state, action) => {
      let totalPrice = calculateTotalAmount(action.payload)
      state.basket = action.payload
      state.totalAmount = totalPrice
    },
    cleanBasket: (state) => {
      state.basket = []
      state.totalAmount = 0
    }
  }
})

export const {updateBasket, cleanBasket} = basketSlice.actions

export const selectBasket = state => state.basket

export default basketSlice.reducer
