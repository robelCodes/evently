import {useTheme} from '../context/ThemeContext'
import {Link, NavLink} from 'react-router-dom'
import logo from '../assets/evently_logo.svg'


function Navbar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="navbar">
      <div className="container navbar-inner">

        <Link to="/" className="navbar-logo">
        <div className="navbar-logo-icon">🎟</div>
        Evently        
        
        {/* <svg width="160" height="44" viewBox="0 0 340 64" xmlns="http://www.w3.org/2000/svg">
            <img src={logo} alt="Evently" height="44" />
          </svg> */}

        </Link>

          <ul className="navbar-links">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'navbar-link active' : 'navbar-link'
              }
            >
              Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/bookings"
              className={({ isActive }) =>
                isActive ? 'navbar-link active' : 'navbar-link'
              }
            >
              My Tickets
            </NavLink>
          </li>
        </ul>

        
        <div className="navbar-actions">
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button className="btn btn-outline btn-sm hide-mobile">
            Sign In
          </button>
          <button className="btn btn-primary btn-sm">
            Get Started
          </button>
        </div>

          


      </div>
    </nav>
  )
}

export default Navbar