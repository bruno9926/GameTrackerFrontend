import Avatar from "@shared/ui/Atoms/Avatar/Avatar";
import SettingsSection from "./SettingsSection";
import { useSelector } from "react-redux";
import type { RootState } from "@app/store/store";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import { Field, FieldLabel } from "@shared/ui/chadcn/field";
import { Input } from "@shared/ui/chadcn/input";


const UserSection = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const name = user?.name ?? 'user';
    const profilePicture = user?.profilePicture ?? '';

    const [editedName, editedUserName] = useState(name);

    return (
        <SettingsSection title="User Info" id="user">
            <div className="flex flex-col" aria-label="Edit avatar">
                {/* Profile Picture */}
                <div className="flex flex-col items-center">
                    <button
                        className="w-fit cursor-pointer"
                        aria-label="Edit avatar"
                    >
                        <div className="group relative">

                            {/* Avatar */}
                            <div className="group-hover:opacity-50 transition-opacity">
                                <Avatar name={name} profilePicture={profilePicture} size="lg" />
                            </div>

                            {/* Icono overlay */}
                            <MdEdit className="absolute inset-0 opacity-0 group-hover:opacity-100 m-auto text-2xl transition-opacity pointer-events-none" />

                        </div>
                    </button>
                </div>
                {/* User Name*/}
                <Field>
                    <FieldLabel htmlFor="name">Username</FieldLabel>
                    <Input
                        id="name"
                        name="name"
                        autoComplete="name"
                        value={editedName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => editedUserName(e.target.value)}
                    />
                </Field>
                
            </div>
        </SettingsSection>
    )
};

export default UserSection;