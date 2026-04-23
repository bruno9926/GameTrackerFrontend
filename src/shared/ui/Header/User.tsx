import { useSelector } from "react-redux";
import { type RootState } from "../../../app/store/store";
import { IoIosLogOut } from "react-icons/io";
import useOptionsMenu from "../Organisms/OptionsMenu/useOptionsMenu";
import useLogout from "@features/auth/hooks/useLogout";

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
                    <div className="top-full right-0 z-(--z-modal) absolute flex flex-col gap-2 bg-card mt-2 p-2 pb-4 border rounded-lg min-w-60">
                        <div className="flex items-center gap-2 bg-card-bg p-2 hover:bg-border rounded-lg transition-all cursor-pointer animation-duration">
                            <Avatar profilePicture={profilePicture} name={name} />
                            <div className="flex flex-col">
                                <span>{name}</span>
                                <span className="text-online text-xxs">Online</span>
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