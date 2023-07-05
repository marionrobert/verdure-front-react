import {selectUser, connectUser} from '../../slices/userSlice'
import {useSelector, useDispatch} from 'react-redux'

const Profil = () => {
  // const user = useSelector(selectUser)

  return (
    <>
      <h1>Mon compte</h1>
      <h2>Mes informations</h2>
      {/* <p>{user.infos.firstName}</p> */}
    </>
  )
}

export default Profil
