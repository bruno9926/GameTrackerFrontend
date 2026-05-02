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
                : <div className={`flex justify-center items-center w-full h-full font-bold text-white ${getAvatarColor(name)}`}>{initials}</div>
            }
        </div>
    );
};

export default UserAvatar;
