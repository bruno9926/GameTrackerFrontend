import styles from './GOTW.module.scss';

const GOTW = () => {
  return (
    <section className={`${styles.gotw} dashboard-tile`}>
        <img src="/src/assets/silksong.webp" alt="Game of the Week" />
        <div className={styles['gotw-info']}>
            <h2>Game of the Week</h2>
            <p>Hollow Knight: Silksong</p>
        </div>
    </section>
  )
}

export default GOTW