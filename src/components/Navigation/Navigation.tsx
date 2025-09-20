import styles from './Navigation.module.scss';

const Navigation = () => {
    return (
        <nav className={styles.navigation}>
            <span>Gaming Tracker</span>
            <span className={styles.link}>Home</span>
            <span className={styles.link}>Games</span>
            <span className={styles.link}>Friends</span>
        </nav>
    )
}

export default Navigation