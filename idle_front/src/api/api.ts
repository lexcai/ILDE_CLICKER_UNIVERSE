import { GameState } from "../components/interface/GameState"

const API_BASE_URL = "http://localhost:3000" // Remplacez par l'URL de base de votre API backend


export const getPlayerProgress = async (playerId: string, token: string) => {
  const response = await fetch(`${API_BASE_URL}/game-progress/${playerId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  const data = await response.json()
  return data
}

export const updatePlayerProgress = async (
  playerId: string,
  updatedProgress: Partial<GameState>,
  token: string
) => {
  const response = await fetch(`${API_BASE_URL}/game-progress/${playerId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedProgress),
  })

  const data = await response.json()
  return data
}
