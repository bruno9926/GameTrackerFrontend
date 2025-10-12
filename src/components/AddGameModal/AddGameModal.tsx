import Modal from "../Organisms/Modal/Modal";
import Input from "../Atoms/Input/Input";
import { useState, type FC } from "react";
import useGames from "../../hooks/useGames";
import styles from './AddGameModal.module.scss';
import { Select, SelectItem } from "../Atoms/Select/";
import { type GameStatus, DEFAULT_GAME_STATUS, GAME_STATUSES } from "../../types/Game";
import ErrorMessage from "../Atoms/ErrorMessage/ErrorMessage";

type AddGameModalProps = {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    refreshAction: () => {}
}

const AddGameModal: FC<AddGameModalProps> = ({ open, setOpen, refreshAction }) => {
    const [name, setName] = useState('');
    const [status, setStatus] = useState<GameStatus>(DEFAULT_GAME_STATUS);

    const clearFields = () => {
        setName('');
        setStatus(DEFAULT_GAME_STATUS);
    }

    const { submitGame, loading, error } = useGames();

    const postGame = async () => {
        try {
            await submitGame({ name, status });
            clearFields();
            setOpen(false);
            refreshAction();
        } catch {
            // dont close the modal
        }
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
            <div className={styles['modal-content']}>
                <form className={styles.form}>
                <Input
                    label='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                />
                <Select
                    label="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as GameStatus)}
                >
                    {
                        Object.entries(GAME_STATUSES).map(([name, label]) => (
                            <SelectItem key={name} value={name}>{label}</SelectItem>
                        ))
                    }
                </Select>
            </form>
            {
                error && <ErrorMessage message={error} />
            }
            </div>
        </Modal>
    )
}

export default AddGameModal