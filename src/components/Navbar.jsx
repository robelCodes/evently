import {useTheme} from '../context/ThemeContext'


function Navbar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  )
}

export default Navbar