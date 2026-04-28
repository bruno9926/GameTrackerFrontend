import SettingsSection from "./SettingsSection";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

import ChangePasswordForm from "@features/user/ui/ChangePasswordForm";
import clsx from "clsx";

const AccountAndSecuritySection = () => {

    return (
        <SettingsSection title="Security and Account" id="password">
            <div className="py-4 card">
                <PasswordChangeSection />
            </div>
        </SettingsSection>
    );
};

const PasswordChangeSection = () => {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <>
            {!isEditing ? (
                <button
                    onClick={() => setIsEditing(true)}
                    className={clsx(
                        "flex justify-between items-center p-3 border rounded-xl w-full text-muted-foreground",
                        "hover:text-foreground active:text-foreground",
                        "transition-color cursor-pointer animation-duration"
                    )}>
                    Change Password
                    <FaArrowRight />
                </button>
            ) : (
                <div className="flex flex-col gap-4">
                    <ChangePasswordForm onCancel={() => setIsEditing(false)} />
                </div>
            )}
        </>
    )
}

export default AccountAndSecuritySection;