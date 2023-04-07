import React, { useState, useEffect } from "react";
import "../../assets/scss/game/game.scss";
import coinImage from "../../assets/img/Coin.png";
import xpImage from "../../assets/img/XPCoin.png";
import scImage from "../../assets/img/ScCoin.png";
import { useNavigate } from "react-router-dom";
import { GameState } from "../interface/GameState";

const API_URL = "http://localhost:3000";
const playerId = localStorage.getItem("playerId");

console.log(playerId);

const initialGameState: GameState = {
  points: 0.0,
  pointsPerClick: 1.0,
  pointsPerSecond: 0.0,
  gold: 0.0,
  experience: 0.0,
  level: 1,
  autoClickerLevel: 0.0,
  offlineClickerLevel: 0.0,
  goldMultiplier: 1.0,
  experienceMultiplier: 1.0,
  pointsMultiplier: 1.0,
  last_update: Date.now(),
};

const GameBoard: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const navigate = useNavigate();

  const fetchGameState = async () => {
    try {
      const response = await fetch(
        `${API_URL}/game-progress/gameboard/get${playerId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      const data = await response.json();
      setGameState(data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données du jeu :",
        error
      );
    }
  };

  const updateGameState = async (updatedGameState: GameState) => {
    try {
      await fetch(`${API_URL}/game-progress/gameboard/update${playerId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(updatedGameState),
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données du jeu :", error);
    }
  };

  useEffect(() => {
    fetchGameState();
  }, []);

  const handleClick = (): void => {
    setGameState((prev: GameState) => {
      const newPoints: number = prev.pointsPerClick * prev.pointsMultiplier;
      const newGold: number = prev.pointsPerClick * prev.goldMultiplier * 0.1;
      const newExperience: number =
        prev.pointsPerClick * prev.experienceMultiplier * 0.5;
      const updatedGameState: GameState = {
        ...prev,
        points: prev.points + newPoints,
        gold: prev.gold + newGold,
        experience: prev.experience + newExperience,
        level: calculateLevel(prev.experience + newExperience),
      };
      updateGameState(updatedGameState);
      return updatedGameState;
    });
  };

  const handleLogout = (): void => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("playerId");

    console.log("Déconnexion...");
    navigate("/auth/login");
  };
const buyMultiplier = (
  multiplierType: "gold" | "experience" | "points"
): void => {
  setGameState((prev: GameState) => {
    const costMultiplier: number = 50 // Vous pouvez ajuster le coût des multiplicateurs ici
    const newMultiplier: number = 1.5 // Vous pouvez ajuster l'augmentation des multiplicateurs ici

    let cost: number
    switch (multiplierType) {
      case "gold":
        cost = costMultiplier * prev.goldMultiplier
        break
      case "experience":
        cost = costMultiplier * prev.experienceMultiplier
        break
      case "points":
        cost = costMultiplier * prev.pointsMultiplier
        break
      default:
        return prev
    }

    if (prev.gold >= cost) {
      const newGold: number = prev.gold - cost

      switch (multiplierType) {
        case "gold":
          return {
            ...prev,
            gold: newGold,
            goldMultiplier: prev.goldMultiplier * newMultiplier,
          }
        case "experience":
          return {
            ...prev,
            gold: newGold,
            experienceMultiplier: prev.experienceMultiplier * newMultiplier,
          }
        case "points":
          return {
            ...prev,
            gold: newGold,
            pointsMultiplier: prev.pointsMultiplier * newMultiplier,
          }
        default:
          return prev
      }
    }
    return prev
  })
}
const calculateLevel = (experience: number): number => {
  // Vous pouvez ajuster la formule pour calculer le niveau en fonction de l'expérience
  return Math.floor(Math.sqrt(experience) + 1);
};

const buyAutoClicker = (): void => {
  setGameState((prev: GameState) => {
    const cost: number = 10 * (prev.autoClickerLevel + 1);
    if (prev.gold >= cost) {
      const newGold: number = prev.gold - cost;
      const newAutoClickerLevel: number = prev.autoClickerLevel + 1;
      const newPointsPerSecond: number =
        prev.pointsPerSecond + 1 * prev.pointsMultiplier;

      return {
        ...prev,
        gold: newGold,
        autoClickerLevel: newAutoClickerLevel,
        pointsPerSecond: newPointsPerSecond,
      };
    }
    return prev;
  });
};

React.useEffect(() => {
  const interval = setInterval(() => {
    setGameState((prev: GameState) => {
      const updatedGameState: GameState = {
        ...prev,
        points: prev.points + prev.pointsPerSecond,
        gold: prev.gold + prev.pointsPerSecond * 0.1,
        experience: prev.experience + prev.pointsPerSecond * 0.5,
        level: calculateLevel(prev.experience + prev.pointsPerSecond * 0.5),
      };
      updateGameState(updatedGameState);
      return updatedGameState;
    });
  }, 1000);

  return () => clearInterval(interval);
}, []);

const buyOfflineClicker = (): void => {
  setGameState((prev: GameState) => {
    if (prev.level >= 7) {
      // Coût de l'amélioration de clic hors ligne (vous pouvez ajuster la formule)
      const cost: number = 100 * (prev.offlineClickerLevel + 1);

      if (prev.gold >= cost) {
        const newGold: number = prev.gold - cost;
        const newOfflineClickerLevel: number = prev.offlineClickerLevel + 1;

        return {
          ...prev,
          gold: newGold,
          offlineClickerLevel: newOfflineClickerLevel,
        };
      }
    }

    return prev;
  });
};
React.useEffect(() => {
  const timeSincelast_update: number = Date.now() - gameState.last_update
  const offlinePoints: number =
    gameState.offlineClickerLevel * timeSincelast_update * 0.001

  if (offlinePoints > 0) {
    setGameState((prev: GameState) => {
      const updatedGameState: GameState = {
        ...prev,
        points: prev.points + offlinePoints,
        gold: prev.gold + offlinePoints * 0.5,
        experience: prev.experience + offlinePoints * 0.5,
        level: calculateLevel(prev.experience + offlinePoints * 0.5),
      }
      updateGameState(updatedGameState)
      return updatedGameState
    })
  }
}, [])



  return (
    <div className="boardbackground">
      <div className="game-board">
        <h1 className="title-board">Idle Clicker UNIVERSE</h1>
        <div className="level-display">
          Level: {gameState.level ? gameState.level.toFixed(1) : 1}
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Log out
        </button>
        <div className="top-bar">
          <div className="points-display">
            <img src={scImage} alt="Score" width="50" height="50" />
            <p>{gameState.points ? gameState.points.toFixed(1) : 0}</p>
          </div>
          <div className="gold-display">
            <img src={coinImage} alt="Gold" width="50" height="50" />
            <p>{gameState.gold ? gameState.gold.toFixed(1) : 0}</p>
          </div>
          <div className="experience-display">
            <img src={xpImage} alt="XP" width="50" height="50" />
            <p>{gameState.experience ? gameState.experience.toFixed(1) : 0}</p>
          </div>
        </div>
        <div className="ClickButton">
          <button className="click-button" onClick={handleClick}>
            Click me!
          </button>
        </div>
        <aside className={"sidebar"}>
          <button className="toggle-sidebar">{"Upgrade Menu"}</button>
          <ul className="upgrades">
            {gameState.level >= 2 && (
              <li>
                <button className="upgrade-button" onClick={buyAutoClicker}>
                  Upgrade: Autoclick <br />
                  <p className="costP">
                    {" "}
                    Cost: {10 * (gameState.autoClickerLevel + 1)} <br />{" "}
                  </p>
                  <img src={coinImage} alt="Gold" width="20" height="20" />
                </button>
              </li>
            )}
            {gameState.level >= 5 && (
              <li>
                <button
                  className="upgrade-button"
                  onClick={() => buyMultiplier("gold")}
                >
                  Upgrade: Gold Multiplier <br />
                  <p className="costP">
                    {" "}
                    Cost: {50 * gameState.goldMultiplier} <br /> Multiplier:{" "}
                    {Math.round(gameState.goldMultiplier)}x
                  </p>
                  <img src={coinImage} alt="Gold" width="20" height="20" />
                </button>
              </li>
            )}
            {gameState.level >= 10 && (
              <li>
                <button
                  className="upgrade-button"
                  onClick={() => buyMultiplier("experience")}
                >
                  Upgrade: Experience Multiplier <br />
                  <p className="costP">
                    {" "}
                    Cost: {50 * gameState.experienceMultiplier} <br />{" "}
                    Multiplier: {Math.round(gameState.experienceMultiplier)}x
                  </p>
                  <img src={coinImage} alt="Gold" width="20" height="20" />
                </button>
              </li>
            )}
            {gameState.level >= 15 && (
              <li>
                <button
                  className="upgrade-button"
                  onClick={() => buyMultiplier("points")}
                >
                  Upgrade: Points Multiplier <br />
                  <p className="costP">
                    {" "}
                    Cost: {50 * gameState.pointsMultiplier} <br /> Multiplier:{" "}
                    {Math.round(gameState.pointsMultiplier)}x
                  </p>
                  <img src={coinImage} alt="Gold" width="20" height="20" />
                </button>
              </li>
            )}
            {gameState.level >= 20 && (
              <li>
                <button className="upgrade-button" onClick={buyOfflineClicker}>
                  <p className="costP">
                    Upgrade: Offline Click (x
                    {gameState.offlineClickerLevel + 1})
                    <br />
                    <br />
                    Cost:
                    {100 * (gameState.offlineClickerLevel + 1)} <br />
                  </p>
                  <img src={coinImage} alt="Gold" width="20" height="20" />
                </button>
              </li>
            )}
          </ul>
        </aside>
      </div>
    </div>
  )
}

export default GameBoard
