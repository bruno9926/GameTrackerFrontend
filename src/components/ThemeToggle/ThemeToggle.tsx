import { useState } from 'react';
import styles from './ThemeToggle.module.scss';

import { IoSunny, IoMoon } from "react-icons/io5";


const ThemeToggle = () => {

    const [mode, setMode] = useState('dark')

    const toggleMode = () => {
        setMode((prevMode) => (prevMode === 'dark' ? 'girly' : 'dark'))
        document.body.className = mode === 'dark' ? 'girly' : 'dark'
    }

    return (
        <button
            className={`${styles['theme-toggle']} ${styles[mode]}`}
            onClick={() => toggleMode()}
            title={`change to ${mode === 'dark' ? 'girly' : 'dark'} theme`}
            >
            {
                mode === 'dark' ? <IoMoon/> : <IoSunny />
            }
        </button>
    )
}

export default ThemeToggle