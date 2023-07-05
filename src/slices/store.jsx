import {configureStore} from "@reduxjs/toolkit";

//on importe nos slices pour le sinjecter dans le store
import basketReducer from './basketSlice'
import plantReducer from "./plantSlice"
import userReducer from "./userSlice"

const store = configureStore({
  reducer: {
    basket: basketReducer,
    plants: plantReducer,
    user: userReducer
  }
})

export default store
