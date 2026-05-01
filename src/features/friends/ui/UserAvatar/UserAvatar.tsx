type UserAvatarProps = {
    name: string;
    avatarUrl?: string;
};

const UserAvatar = ({ name, avatarUrl }: UserAvatarProps) => {
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

    return (
        <div className="rounded-xl w-12 aspect-square overflow-hidden shrink-0">
            {avatarUrl
                ? <img className="w-full h-full object-cover" src={avatarUrl} alt={`${name}'s avatar`} />
                : <div className="flex justify-center items-center bg-primary w-full h-full font-bold text-primary-foreground">{initials}</div>
            }
        </div>
    );
};

export default UserAvatar;
