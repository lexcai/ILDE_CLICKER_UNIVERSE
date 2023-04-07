import React, { useState } from "react";
import { useNavigate } from "react-router-dom"

const Register = () => {
  const [username, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password_hash, setPassword] = useState<string>("")
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")
  let navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Vérifier si les mots de passe correspondent
    if (password_hash !== passwordConfirmation) {
      alert("Les mots de passe ne correspondent pas.")
      return
    }

    // URL de l'API d'inscription (modifiez-la en fonction de votre API)
    const apiUrl = "http://localhost:3000/auth/CreateUser/"

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password_hash,
        }),
      })

      // Gérer les erreurs de l'API
      if (!response.ok) {
        const errorData = await response.json()
        alert(`Erreur d'inscription : ${errorData.message}`)
        return
      }

      // Inscription réussie
      const responseData = await response.json()
      console.log(responseData)

      // Rediriger l'utilisateur vers la page de connexion (ou autre page)
      navigate("/game-progress/gameboard")
    } catch (error) {
      // Gérer les erreurs réseau
      console.error("Erreur réseau lors de l'inscription :", error)
      alert("Erreur réseau lors de l'inscription.")
    }
  }


  return (
    <div className="background">
      <div className="Register">
        <div className="Register__Description">
          <h2>Register</h2>
        </div>
        <form className="Register__Form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              value={password_hash}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="password-confirm"
              placeholder="Confirm password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </div>
          <button className="btn btn-primary mb-3" type="submit">
            <span>Sign up</span>
            <i className="bi bi-arrow-right bi-2x"></i>
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
