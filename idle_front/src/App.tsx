import ProtectedRoutes from "./routes/ProtectedRoutes"
import "./assets/scss/global.scss"

function App() {
  return (
    <div className="App">
      <ProtectedRoutes></ProtectedRoutes>
    </div>
  )
}

export default App
