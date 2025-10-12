import { VscError } from "react-icons/vsc";
import styles from './ErrorMessage.module.scss';

type ErrorMessageProps = {
    message: string,
    retryAction?: () => void
}

const ErrorMessage = ({ message, retryAction }: ErrorMessageProps) => (
  <div className={styles['error-message']}>
    <div className={styles['error-title']}>
      <VscError />
      <span>Error</span>
    </div>
    <div>
      <span className={styles.error}>{message}, </span>
      {retryAction && (
        <button onClick={() => retryAction()}>
          Retry
        </button>
      )}
    </div>
  </div>
)

export default ErrorMessage