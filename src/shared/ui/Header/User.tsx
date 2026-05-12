import { useState } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "../../../app/store/store";
import { IoIosLogOut } from "react-icons/io";
import useLogout from "@features/auth/hooks/useLogout";
import { Link } from "react-router";
import { userRoutes } from "@app/routes/routes";
import Avatar from "../Atoms/Avatar/Avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../chadcn/popover";

const User = () => {
    const { user, loading } = useSelector((state: RootState) => state.user);
    const [open, setOpen] = useState(false);
    const { logout } = useLogout();

    if (!user) return null;

    const { name, username, avatarUrl } = user;

    const itemClass = "flex items-center gap-2 p-2 hover:bg-border rounded-lg text-foreground transition-all cursor-pointer animation-duration";

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button
                    className="hover:opacity-80 active:opacity-70 p-1 rounded-xl transition-opacity cursor-pointer"
                    aria-label="User menu"
                    disabled={loading}
                >
                    <Avatar avatarUrl={avatarUrl} name={name} loading={loading} />
                </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="gap-2 bg-card p-2 pb-4 w-60">
                <Link to={userRoutes.SETTINGS} aria-label="Go to settings" onClick={() => setOpen(false)}>
                    <div className={itemClass}>
                        <Avatar avatarUrl={avatarUrl} name={name} />
                        <div className="flex flex-col">
                            <span>{username}</span>
                            <span className="text-online text-xxs">Online</span>
                        </div>
                    </div>
                </Link>
                <button className={itemClass} onClick={() => logout()}>
                    <IoIosLogOut size={20} />
                    <span>Logout</span>
                </button>
            </PopoverContent>
        </Popover>
    );
};

export default User;
