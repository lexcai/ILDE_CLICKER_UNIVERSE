import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [validation, setValidation] = useState("")

  let navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault()

   // Validation des données du formulaire (par exemple, vérifier si les champs ne sont pas vides)
  if (!username || !password) {
      alert("Veuillez remplir tous les champs.")
      return
  }

  try {
     // Appel de l'API pour se connecter avec les informations d'identification fournies
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })

     // Vérification de la réponse de l'API
    if (response.ok) {
      const data = await response.json()
      localStorage.setItem("authToken", data.token)
      localStorage.setItem("playerId", data.playerId)
      // console.log("API REPONSE" , data )
      alert("Connexion réussie !")
      navigate("/game-progress/gameboard")
       // Sauvegarder le token d'authentification et effectuer d'autres actions en cas de succès
    } else {
    alert(`Erreur lors de la connexion : ${response.statusText}`)
    }
  } catch (error: any) {
     // Gérer les erreurs lors de l'appel à l'API, par exemple, en cas de problèmes de réseau ou de serveur
    alert(`Erreur lors de la connexion : ${error.message}`)
    setValidation("Wopsy, username et/ou mot de passe incorrect")

  }
}
document.title = "Idle Clicker Universe - Connexion"

  return (
    <>
        <div className="background">
      <div className="Login">
        <div className="Login__Description">
          <h1>Connexion</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti
            perferendis dolorum, dolores placeat corporis minus aliquid
            reiciendis quaerat quae sint perspiciatis aperiam quidem atque optio
            nam alias, maiores unde quis?
          </p>
        </div>
        <form className="Login__Form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              placeholder="Mot de passe"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="text-danger mt-1">{validation}</p>
          <button type="submit" className="btn btn-primary mb-3">
            <span>Sign in</span>
            <i className="bi bi-arrow-right bi-2x"></i>
          </button>
        </form>
      </div>
      </div>
    </>
  )
}

export default Login
