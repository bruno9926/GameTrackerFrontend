import { useSelector } from "react-redux";
import { type RootState } from "../../redux/store";
import styles from './User.module.scss';
import useOptionsMenu from "../Organisms/OptionsMenu/useOptionsMenu";
import { IoIosLogOut } from "react-icons/io";
// routing
import { useNavigate } from "react-router";
import { publicRoutes as routes } from "../../routes/routes";

const User = () => {
    const user = useSelector((state: RootState) => state.user.user);

    const {
        name,
        profilePicture,
        email
    } = user ?? {
        name: '',
        profilePicture: undefined,
        email: ''
    };

    const { ref, toggleOpen, open } = useOptionsMenu();
    const navigate = useNavigate();

    const LogoutButton = () => (
        <button className={styles.logout}
            onClick={() => {
                navigate(routes.LOGIN);
            }}>
            <IoIosLogOut size={20} />
            <span>Logout</span>
        </button>
    )

    return (
        <div className={styles.container} ref={ref}>
            <div className={styles.user} onClick={toggleOpen}>
                <Avatar profilePicture={profilePicture} name={name} />
                <div className={styles['user-info']}>
                    <span>{name}</span>
                    <span className={`${styles.status} ${styles.online}`}>Online</span>
                </div>
            </div>
            {
                open && (
                    <div className={styles['user-menu']}>
                        <div className={styles.user}>
                            <Avatar profilePicture={profilePicture} name={name} />
                            <div className={styles['user-info']}>
                                <span>{email}</span>
                            </div>
                        </div>
                        <LogoutButton />
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