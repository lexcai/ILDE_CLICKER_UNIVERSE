import { Link } from "react-router-dom"
import "../../../assets/scss/game/game.scss"

const Navbar = () => {
//   const navigate = useNavigate()

//   const logOut = async () => {
//     try {
//       await signOut()
//       navigate("/")
//     } catch {
//       alert(
//         "For some reasons we can't deconnect, please check your internet connexion and retry."
//       )
//     }
//   }

  return (
    <div className="Navbar">
      <div className="Navbar__Menu">
        <div className="Navbar__Logo">
        </div>
        <nav>
          <ul>
            <Link to={"/game/game-progress"}>
              <li>
                Jeu
              </li>
            </Link>
            <Link to={"/game/progression"}>
              <li>
                Progression
              </li>
            </Link>
            <Link to={"/game/profile"}>
              <li>
              Compte
              </li>
            </Link>
          </ul>
        </nav>
      </div>
      <div className="Navbar__Logout">
        <nav>
          <ul>
            <li onClick={ () => {alert('ok')}}>
              <i className="bi bi-box-arrow-left"></i>Deconnexion
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
