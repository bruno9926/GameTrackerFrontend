import clsx from "clsx";
import { Skeleton } from "@shared/ui/chadcn/skeleton";

type Sizes = 'sm' | 'md' | 'lg'
interface AvatarProps {
    avatarUrl?: string;
    name?: string,
    size?: Sizes,
    loading?: boolean
}

const width: Record<Sizes, string> = {
    'sm': 'w-9',
    'md': 'w-10',
    'lg': 'w-35',
}

const fontSize: Record<Sizes, string> = {
    'sm': 'text-md',
    'md': 'text-xl',
    'lg': 'text-5xl',
}

const Avatar = ({ avatarUrl, name = "User", size = 'sm', loading = false }: AvatarProps) => {
    const DefaultPicture = () => (
        <div className={clsx([
            "flex justify-center items-center bg-brand w-full h-full",
            fontSize[size]
        ])}>
            {(name?.charAt(0) || '?').toUpperCase()}
        </div>
    )

    return (

        <div className={clsx([
            "rounded-full aspect-square overflow-hidden border",
            width[size]
        ])}>
            {
                loading ?
                    <Skeleton className="rounded-full w-full h-full" />
                    : avatarUrl ?
                        <img className="w-full h-full object-cover" src={avatarUrl} alt={name} />
                        : <DefaultPicture />
            }
        </div>

    )
}

export default Avatar;