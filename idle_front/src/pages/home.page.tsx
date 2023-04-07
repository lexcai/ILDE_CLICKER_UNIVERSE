import { Link } from "react-router-dom"
import "../assets/scss/home/home.scss"

const HomePage = () => {

  document.title = "Idle Clicker Universe"

  return (
    <div className="homebackground">
      <div className="Home">
        <div className="fixed">
          <h1 className="intro">Bienvenue sur Idle Clicker Universe</h1>

          <h2 className="intro">
            Retrouver votre IDLE favoris sur votre site web !
          </h2>
          <p className="intro">
            Vous avez un déja un compte ?{" "}
            <Link to="/auth/login">Connexion</Link>
          </p>
          <p className="intro">
            Ce n'est pas le cas ? Créer votre compte en quelques cliques,{" "}
            <Link to="/auth/sign"> Clique ici </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default HomePage
