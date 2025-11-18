import { useSelector } from "react-redux";
import { type RootState } from "../../redux/store";
import styles from './User.module.scss';
import useOptionsMenu from "../Organisms/OptionsMenu/useOptionsMenu";
import { IoIosLogOut } from "react-icons/io";

const User = () => {
    const user = useSelector((state: RootState) => state.user.user);

    const { name, profilePicture, email } = user ?? { name: '', profilePicture: undefined, email: '' };

    const { ref, toggleOpen, open, setOpen } = useOptionsMenu();

    return (
        <div className={styles.container} ref={ref}>
            <div className={styles.user} onClick={toggleOpen}>
                <Avatar profilePicture={profilePicture} name={name} />
                <div className={styles['user-info']}>
                    <span>{name}</span>
                    <span className={`${styles.status} ${styles.online}`}>Online</span>
                </div>
            </div>
            {open && (
                <div className={styles['user-menu']}>
                    <div className={styles.user}>
                        <Avatar profilePicture={profilePicture} name={name} />
                        <div className={styles['user-info']}>
                            <span>{email}</span>
                        </div>
                    </div>
                    <button className={styles.logout}
                        onClick={() => {
                            setOpen(false)
                        }}>
                        <IoIosLogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            )}

        </div>
    )
}

const Avatar = ({ profilePicture, name }: { profilePicture?: string; name: string }) => {
    return (
        <div className={styles.avatar}>
            {profilePicture ? (
                <img src={profilePicture} alt={name} />
            ) : (
                (name?.charAt(0) || '?').toUpperCase() 
            )}
        </div>
    )
}

export default User