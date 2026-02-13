import styles from './GOTW.module.scss';
import game from '../../assets/silksong.webp';

const GOTW = () => {
  return (
    <section className={`${styles.gotw} dashboard-tile`}>
        <img src={game} alt="Game of the Week" />
        <div className={styles['gotw-info']}>
            <h2>Game of the Week</h2>
            <p>Hollow Knight: Silksong</p>
        </div>
    </section>
  )
}

export default GOTW