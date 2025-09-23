import styles from './Header.module.scss';

import ThemeToggle from '../ThemeToggle/ThemeToggle';

const Header = () => {
  return (
    <header className={styles.header}>
      <ThemeToggle/>
    </header>
  )
}

export default Header