import { createSlice } from "@reduxjs/toolkit"

//on crée une state initiale
const initialState = {
  plants: []
}

//je crée ma state qui aura les fonctions de modification incluses
// createSlice crée automatiquement les reducers et actions : on n'a plus qu'à paramétrer
export const plantSlice = createSlice({
  name: "plants",
  initialState,
  reducers: {
    getAllPlants: (state, action) => {
      state.plants = action.payload
    } //on crée une action qui réceptionne (dans l'argument action) la valeur retournée par la requète axios dans nos composants
  }
})


// je déclare officiellement que ma fonction getAllPlants écoutée par le reducer sera une action (pour que reac-redux puisse modifier mes states depuis n'importe quel composant)
export const {getAllPlants} = plantSlice.actions // on pourra modifier la state

//on indique le nom de la state que l'on pourra manipuler dans les composants
export const selectPlants = state => state.plants

// on exporte le slice en tant que reducer afin de l'ilnjecter dans le store et rendre la state manipulable
export default plantSlice.reducer
