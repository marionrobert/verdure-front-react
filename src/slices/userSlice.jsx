import {createSlice} from "@reduxjs/toolkit";

//on crée notre state initiale
// --> quel contenu initial ?
const initialState = {
  infos: {},
  isLogged: false
}

//je crée ma state qui aura les fonctions de modifications incluses (createSlice crée automatiquement les reducers et les actions) vous n'avez plus qu'a parrametrer
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    connectUser: (state, action) => {
      state.infos = action.payload,
      state.isLogged = true
    },
    logoutUser: (state) => {
      state.infos = {},
      state.isLogged = false
    }
  }
})

//je déclare officiellement que ma fonction connectUser écoutée par le reducer sera une action
// (pour que react-redux puisse modifier mes states depuis n'importe quel composant)
export const {connectUser, logoutUser} = userSlice.actions // on poura modifier la state

//on indique le nom de la state que l'on pourra manipuler dans les composants
export const selectUser = state => state.user

//on exporte le slice en tant que reducer afin de l'injecter dans le store et rendre la state manipulable.
export default userSlice.reducer
