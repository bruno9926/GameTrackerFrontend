import SettingsSection from "./SettingsSection";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

import ChangePasswordForm from "@features/user/ui/ChangePasswordForm";

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
                    className='flex justify-between items-center p-3 border rounded-xl w-full text-subtitle hover:text-white active:text-white transition-colors cursor-pointer animation-duration'>
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