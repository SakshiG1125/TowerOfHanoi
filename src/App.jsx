import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navigation from "./components/Navigation"
import HomePage from "./pages/HomePage"
import PlayPage from "./pages/PlayPage"
import AlgorithmPage from "./pages/AlgorithmPage"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/play" element={<PlayPage />} />
            <Route path="/algorithm" element={<AlgorithmPage />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>Tower of Hanoi Visualization &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
