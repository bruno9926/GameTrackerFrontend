import { type ReactNode, type FC } from 'react';
import Button from '../../Atoms/Button/Button';
import styles from './Modal.module.scss';
import { IoClose } from "react-icons/io5";
import { useEffect } from 'react';

interface ModalProps {
    title: string,
    close: () => void,
    positiveAction?: () => void,
    children?: Readonly<ReactNode>,
    isOpen: Boolean
}

const Modal: FC<ModalProps> = ({ title, children, positiveAction, isOpen, close }) => {

    useEffect(() => {
        document.body.classList.add("modal-open");
        return () => {
            document.body.classList.remove("modal-open");
        }
    }, []);

    return (
        <>
        {
            isOpen &&
            <div className={styles.modal}>
            <div className={styles['modal-card']}>
                <div className={styles.header}>
                    <h2>{title}</h2>
                    <IoClose className={styles.closeButton} onClick={close} />
                </div>
                <div className={styles.body}>
                    {children}
                </div>
                <div className={styles.footer}>
                    <Button variant='secondary' onClick={close}>Close</Button>
                    {
                        positiveAction &&
                        <Button onClick={() => positiveAction()}>Add</Button>
                    }
                </div>
            </div>
            <div className={styles.overlay} onClick={close}></div>
        </div>
        }
        </>
    )
}

export default Modal