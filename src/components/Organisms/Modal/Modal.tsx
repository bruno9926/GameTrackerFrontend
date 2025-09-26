import { type ReactNode, type FC } from 'react';
import Button from '../../Atoms/Button/Button';
import styles from './Modal.module.scss';
import { IoClose } from "react-icons/io5";
import { useEffect } from 'react';
import { AnimatePresence, motion, MotionConfig } from "framer-motion";

interface ModalProps {
    title: string,
    close: () => void,
    positiveAction?: () => void,
    children?: Readonly<ReactNode>,
    isOpen: Boolean
}

const Modal: FC<ModalProps> = ({ title, children, positiveAction, isOpen, close }) => {

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("modal-open");
        } else {
            document.body.classList.remove("modal-open");
        }
        return () => {
            document.body.classList.remove("modal-open");
        }
    }, [isOpen]);

    return (
        <MotionConfig transition={{ type: "tween", duration: 0.2 }}>
            <AnimatePresence>
                {
                    isOpen &&
                    <motion.div
                        className={styles.modal}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className={styles['modal-card']}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1, transition: { delay: 0.1, duration: 0.3 } }}
                            exit={{ y: 50 }}
                        >
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
                        </motion.div>
                        <motion.div
                            className={styles.overlay}
                            onClick={close}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />
                    </motion.div>
                }
            </AnimatePresence>
        </MotionConfig>
    )
}

export default Modal