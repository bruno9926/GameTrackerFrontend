import { useSelector } from "react-redux";
import { type RootState } from "../../../app/store/store";
import { IoIosLogOut } from "react-icons/io";
import useOptionsMenu from "../Organisms/OptionsMenu/useOptionsMenu";
import useLogout from "@features/auth/hooks/useLogout";
import { Link } from "react-router";
import { userRoutes } from "@app/routes/routes";
import Avatar from "../Atoms/Avatar/Avatar";

const User = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const {
        name,
        profilePicture
    } = user ?? {
        name: '',
        profilePicture: undefined,
        email: ''
    };

    const { logout } = useLogout();

    const { ref, toggleOpen, open } = useOptionsMenu();

    const LogoutButton = () => (
        <button className="flex items-center gap-2 bg-card p-2 hover:bg-border rounded-lg transition-all cursor-pointer animation-duration"
            onClick={() => logout()}>
            <IoIosLogOut size={20} />
            <span>Logout</span>
        </button>
    )

    const UserInfo = () => (
        <Link to={userRoutes.SETTINGS} onClick={() => toggleOpen()}>
            <div className="flex items-center gap-2 bg-card-bg p-2 hover:bg-border rounded-lg transition-all cursor-pointer animation-duration">
                <Avatar profilePicture={profilePicture} name={name} />
                <div className="flex flex-col">
                    <span>{name}</span>
                    <span className="text-online text-xxs">Online</span>
                </div>
            </div>
        </Link>
    )

    return (
        <div className="relative" ref={ref}>
            <button
                className="hover:opacity-80 active:opacity-70 p-1 rounded-xl transition-opacity cursor-pointer"
                onClick={toggleOpen}
                aria-label="User menu"
            >
                <Avatar profilePicture={profilePicture} name={name} />
            </button>
            {
                open && (
                    <div
                        className="top-full right-0 z-(--z-modal) absolute flex flex-col gap-2 bg-card mt-2 p-2 pb-4 border rounded-lg min-w-60"
                    >
                        <UserInfo />
                        <LogoutButton />
                    </div>
                )}
        </div>
    )
}

export default User