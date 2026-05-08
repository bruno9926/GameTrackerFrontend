import { cva, type VariantProps } from "class-variance-authority";
import { Skeleton } from "@shared/ui/chadcn/skeleton";

const avatarVariants = cva("rounded-full aspect-square overflow-hidden", {
    variants: {
        size: {
            sm: "w-9",
            md: "w-10",
            lg: "w-35",
        },
    },
    defaultVariants: { size: "sm" },
});

const avatarInitialsVariants = cva("flex justify-center items-center bg-accent w-full h-full", {
    variants: {
        size: {
            sm: "text-md",
            md: "text-xl",
            lg: "text-5xl",
        },
    },
    defaultVariants: { size: "sm" },
});

type AvatarProps = VariantProps<typeof avatarVariants> & {
    avatarUrl?: string;
    name?: string;
    loading?: boolean;
};

const Avatar = ({ avatarUrl, name = "User", size = 'sm', loading = false }: AvatarProps) => {
    const DefaultPicture = () => (
        <div className={avatarInitialsVariants({ size })}>
            {(name?.charAt(0) || '?').toUpperCase()}
        </div>
    )

    return (
        <div className={avatarVariants({ size })}>
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