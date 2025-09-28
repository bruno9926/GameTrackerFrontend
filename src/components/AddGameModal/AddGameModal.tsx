import Modal from "../Organisms/Modal/Modal";
import Input from "../Atoms/Input/Input";
import { useState, type FC } from "react";
import useGames from "../../hooks/useGames";
import styles from './AddGameModal.module.scss';

type AddGameModalProps = {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    refreshAction: () => {}
}

const AddGameModal: FC<AddGameModalProps> = ({ open, setOpen, refreshAction }) => {
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');

    const clearFields = () => {
        setName('');
        setStatus('');
    }

    const { submitGame, loading } = useGames();

    let validatedStatus = status as 'playing' | 'completed' | 'wishlist' | 'paused'

    const postGame = async () => {
        let game = {
            name, status: validatedStatus
        }
        await submitGame(game);
        refreshAction();
        clearFields();
        setOpen(false)
    }
    return (
        <Modal
            isOpen={open}
            title='Add a game'
            close={() => {
                clearFields();
                setOpen(false);
            }}
            positiveAction={postGame}
            loading={loading}
        >
            <form className={styles.form}>
                <Input
                    label='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                />
                <Input
                    label='status'
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    disabled={loading}
                />
            </form>
        </Modal>
    )
}

export default AddGameModal