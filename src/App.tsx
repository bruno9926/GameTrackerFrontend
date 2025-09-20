import Dashboard from './components/Dashboard/Dashboard';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';

import { useState } from 'react'
import './styles/main.scss'


function App() {

  const [mode, setMode] = useState('dark')

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'dark' ? 'girly' : 'dark'))
    document.body.className = mode === 'dark' ? 'girly' : 'dark'
  }

  return (
    <main className='app-layout'>

      <button className="toggle-mode" onClick={() => toggleMode()}>
        Cambiar a {mode === "dark" ? "Girly Mode 🌸" : "Dark Mode 🌑"}
      </button>
      <Navigation />
      <Header />
      <div className='main-content'>
        <Dashboard />
        {/* <div>
          <h1>
            Página en construcción...
          </h1>
        </div> */}
      </div>
    </main>
  )
}

export default App
