import styles from './Header.module.scss';
import User from './User';


const Header = () => {
  return (
    <header className={styles.header}>
      <User />
    </header>
  )
}

export default Header;