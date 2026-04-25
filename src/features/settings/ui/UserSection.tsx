import Avatar from "@shared/ui/Atoms/Avatar/Avatar";
import SettingsSection from "./SettingsSection";
import { useSelector } from "react-redux";
import type { RootState } from "@app/store/store";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import EditInfoForm from "@features/user/ui/EditInfoForm";
import Button from "@shared/ui/Atoms/Button/Button";

const UserSection = () => {
    const user = useSelector((state: RootState) => state.user.user);

    const name = user?.name ?? 'user';
    const email = user?.email ?? 'email';
    const profilePicture = user?.profilePicture ?? '';

    const [isEditing, setIsEditing] = useState(false);

    return (
        <SettingsSection title="User Info" id="user">
            <div className="flex lg:flex-row flex-col gap-5 lg:gap-15">
                {/* Top Section */}
                <div className="flex md:flex-row flex-col md:items-center gap-2 md:gap-6 h-fit">
                    {/* Avatar */}
                    <div className="flex justify-center md:justify-start">
                        <div className="group relative w-fit cursor-pointer">
                            <div className="group-hover:opacity-50 transition-opacity">
                                <Avatar
                                    name={name}
                                    profilePicture={profilePicture}
                                    size="lg"
                                />
                            </div>
                            <MdEdit className="absolute inset-0 opacity-0 group-hover:opacity-100 m-auto text-2xl transition-opacity pointer-events-none" />
                        </div>
                    </div>
                    {/* User Info */}
                    <div className="flex flex-col md:justify-between items-center md:items-start gap-1 md:text-left text-center grow">
                        <span className="font-semibold text-lg">
                            {name}
                        </span>
                        <span className="text-muted-foreground text-sm">
                            {email}
                        </span>
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
                </div>

                {/* Form */}
                {isEditing && (
                    <div className="flex-1 max-w-xl">
                        <EditInfoForm
                            name={name}
                            email={email}
                            onCancel={() => setIsEditing(false)}
                            onEdit={() => setIsEditing(false)}
                        />
                    </div>
                )}
            </div>
        </SettingsSection>
    );
};

export default UserSection;