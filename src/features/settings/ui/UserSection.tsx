import Avatar from "@shared/ui/Atoms/Avatar/Avatar";
import SettingsSection from "./SettingsSection";
import { useSelector } from "react-redux";
import type { RootState } from "@app/store/store";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import EditInfoForm from "@features/user/ui/EditInfoForm";
import Button from "@shared/ui/Atoms/Button/Button";
import { Skeleton } from "@shared/ui/chadcn/skeleton";

const UserSection = () => {
    const userState = useSelector((state: RootState) => state.user);
    const { user, loading } = userState;
    const [isEditing, setIsEditing] = useState(false);

    if (!user) return null;

    const { name, username, email } = user;
    const avatarUrl = user.avatarUrl ?? '';


    const AvatarButton = () => {
        if (loading) {
            return <div className="flex justify-center md:justify-start">
                <Avatar size="lg" loading />
            </div>;
        }

        return (
            <div className="flex justify-center md:justify-start">
                <div className="group relative w-fit cursor-pointer">
                    <div className="group-hover:opacity-50 transition-opacity">
                        <Avatar
                            name={name}
                            avatarUrl={avatarUrl}
                            size="lg"
                        />
                    </div>
                    <MdEdit className="absolute inset-0 opacity-0 group-hover:opacity-100 m-auto text-2xl transition-opacity pointer-events-none" />
                </div>
            </div>
        )
    }

    const UserInfo = () => {
        const baseClass = "flex flex-col md:justify-between items-center gap-1 md:items-start md:text-left text-center grow";

        if (loading) return (
            <div className={baseClass}>
                <Skeleton className="mb-2 w-30 h-7" />
                <Skeleton className="w-50 h-7" />
            </div>
        )
        return (
            <div className={baseClass}>
                <span className="font-semibold text-2xl">{name}</span>
                <span className="text-muted-foreground text-sm">@{username}</span>

                {!isEditing && (
                    <div className="mt-5">
                        <Button
                            onClick={() => setIsEditing(true)}
                        >
                            Edit Profile
                        </Button>
                    </div>
                )}
            </div>
        )
    }

    return (
        <SettingsSection title="User Info" id="user">
            <div className="flex lg:flex-row flex-col gap-5 lg:gap-15 p-7 lg:p-10 card">
                {/* Top Section */}
                <div className="flex md:flex-row flex-col md:items-center gap-2 md:gap-6 h-fit">
                    <AvatarButton />
                    <UserInfo />
                </div>
                {/* Form */}
                {
                    isEditing && (
                        <div className="flex-1 max-w-xl">
                            <EditInfoForm
                                initialUsername={username}
                                initialName={name}
                                initialEmail={email}
                                onCancel={() => setIsEditing(false)}
                                onEdit={() => setIsEditing(false)}
                            />
                        </div>
                    )
                }
            </div>
        </SettingsSection>
    );
};

export default UserSection;