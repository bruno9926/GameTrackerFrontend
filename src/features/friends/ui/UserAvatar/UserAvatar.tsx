import type { FriendStatus } from "@features/user/model/Friend";
import { cn } from "@shared/lib/utils";
import { cva } from "class-variance-authority";

const avatarColors = [
    'bg-avatar-1',
    'bg-avatar-2',
    'bg-avatar-3',
    'bg-avatar-4',
    'bg-avatar-5',
    'bg-avatar-6',
];

const getAvatarColor = (name: string) => {
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return avatarColors[hash % avatarColors.length];
};

type AvatarSizes = "sm" | "md" | "lg";

type UserAvatarProps = {
    name: string;
    avatarUrl?: string;
    status?: FriendStatus;
    size?: AvatarSizes,
    className?: string
};

// style variants
const avatarStyles = cva(
    "rounded-2xl aspect-square overflow-hidden shrink-0",
    {
        variants: {
            size: {
                "sm": "w-12",
                "md": "w-24",
                "lg": "w-40",
            }
        }
    }
)

const statusStyles = cva(
    "block right-0 -bottom-1 absolute rounded-full outline-background aspect-square",
    {
        variants: {
            status: {
                online: "bg-online",
                busy: "bg-busy",
                offline: "bg-background border-2 border-offline",
            },
            size: {
                "sm": "w-3.5 outline-3",
                "md": "w-5 outline-4",
                "lg": "w-6 outline-6",
            }
        }
    }
)

const UserAvatar = ({ name, avatarUrl, status, size = "sm", className = "" }: UserAvatarProps) => {
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

    const AvatarImage = () => (
        <div className={avatarStyles({ size })}>
            {avatarUrl
                ? <img className="w-full h-full object-cover" src={avatarUrl} alt={`${name}'s avatar`} />
                : <div className={cn("flex justify-center items-center w-full h-full font-bold text-white", getAvatarColor(name))}>{initials}</div>
            }
        </div>
    )

    return (
        <div className={cn("relative", className)}>
            <AvatarImage />
            {status && <span className={statusStyles({ status, size })} title={status}/>}
        </div>
    );
};

export default UserAvatar;
