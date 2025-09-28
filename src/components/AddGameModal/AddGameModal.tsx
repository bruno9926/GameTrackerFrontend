import Modal from "../Organisms/Modal/Modal";
import Input from "../Atoms/Input/Input";
import { useState, type FC } from "react";
import useGames from "../../hooks/useGames";
import styles from './AddGameModal.module.scss';
import { Select, SelectItem } from "../Atoms/Select/";

type AddGameModalProps = {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    refreshAction: () => {}
}

const AddGameModal: FC<AddGameModalProps> = ({ open, setOpen, refreshAction }) => {
    const [name, setName] = useState('');
    const [status, setStatus] = useState('playing');

    const clearFields = () => {
        setName('');
        setStatus('');
    }

    const { submitGame, loading } = useGames();

    const postGame = async () => {
        let game = {
            name, status: status as 'playing' | 'completed' | 'wishlist' | 'paused'
        }
        console.log(game)
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
                <Select
                    value={status}
                    onChange={(e) => {
                        console.log(e.target.value)

                        setStatus(e.target.value)
                    }}
                >
                    {
                        ["playing", "completed", "paused", "wishlist"].map((value, index) => (
                            <SelectItem key={index} value={value}>{value}</SelectItem>
                        ))
                    }
                </Select>
            </form>
        </Modal>
    )
}

export default AddGameModal