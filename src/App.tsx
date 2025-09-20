import GameList from './components/GameList/GameList';
import Friends from './components/Friends/Friends';

import { useState } from 'react'
import './styles/main.scss'


function App() {

  const [mode, setMode] = useState('dark')

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'dark' ? 'girly' : 'dark'))
    document.body.className = mode === 'dark' ? 'girly' : 'dark'
  }

  return (
    <>

      <button className="toggle-mode" onClick={() => toggleMode()}>
        Cambiar a {mode === "dark" ? "Girly Mode 🌸" : "Dark Mode 🌑"}
      </button>


      <h1>Gaming Dashboard</h1>
      <p>Welcome to your gaming dashboard!</p>

      <div className='dashboard'>
        <GameList />
        <Friends />
      </div>

    </>
  )
}

export default App
