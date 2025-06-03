import { NavLink } from "react-router-dom"
import "./Navigation.css"

function Navigation() {
  return (
    <nav className="navigation">
      <div className="logo">
        <h1>Tower of Hanoi</h1>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/play" className={({ isActive }) => (isActive ? "active" : "")}>
            Play
          </NavLink>
        </li>
        <li>
          <NavLink to="/algorithm" className={({ isActive }) => (isActive ? "active" : "")}>
            Algorithm
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
