import { useSelector } from "react-redux";
import { type RootState } from "../../../app/store/store";
import { IoIosLogOut } from "react-icons/io";
import styles from './User.module.scss';
import useOptionsMenu from "../Organisms/OptionsMenu/useOptionsMenu";
import useLogout from "@features/auth/hooks/useLogout";

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

    const { logout } = useLogout();

    const { ref, toggleOpen, open } = useOptionsMenu();

    const LogoutButton = () => (
        <button className={styles.logout}
            onClick={() => logout()}>
            <IoIosLogOut size={20} />
            <span>Logout</span>
        </button>
    )

    return (
        <div className="relative" ref={ref}>
            <div className="flex items-center gap-2 p-2 hover:bg-border active:bg-border rounded-xl transition-all cursor-pointer" onClick={toggleOpen}>
                <Avatar profilePicture={profilePicture} name={name} />
                <div className="flex flex-col">
                    <span>{name}</span>
                    <span className="text-online text-xxs">Online</span>
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
        <div className="flex justify-center items-center bg-brand rounded-full w-9 aspect-square overflow-hidden align-center">
            {
                profilePicture ?
                    <img className="w-full h-full object-cover" src={profilePicture} alt={name} />
                    : ((name?.charAt(0) || '?').toUpperCase())
            }
        </div>
    )
}

export default User