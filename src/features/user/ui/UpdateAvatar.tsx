import Avatar from "@shared/ui/Atoms/Avatar/Avatar";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@app/store/store";
import { MdEdit } from "react-icons/md";
import { useRef, useState } from "react";
import { uploadAvatar } from "../api/uploadAvatar";
import toast from "@shared/ui/Atoms/Toast";
import { getErrorMessage } from "@shared/lib/error-messages";
import { setUser } from "@features/user/state";
import clsx from "clsx";

const UpdateAvatar = () => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [updating, setUpdating] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const dispatch = useDispatch();
    const userState = useSelector((state: RootState) => state.user);
    const { user, loading } = userState;

    if (!user) return null;

    const { name, avatarUrl } = user;
    const displayedUrl = previewUrl ?? avatarUrl;

    if (loading) {
        return <div className="flex justify-center md:justify-start">
            <Avatar size="lg" loading />
        </div>;
    }

    const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const previewUrl = URL.createObjectURL(file);
        setPreviewUrl(previewUrl);

        setUpdating(true);
        try {
            const { avatarUrl: url } = await uploadAvatar(file);
            dispatch(setUser({ ...user, avatarUrl: url }));
            toast.success("Your picture has been updated!")
        } catch (e) {
            toast.error(getErrorMessage(e))
        } finally {
            // revok preview URL
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
            setUpdating(false);
        }
    }

    return (
        <div
            className="flex justify-center md:justify-start" >
            <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileInput}
            />

            <div className="group relative w-fit cursor-pointer">
                <div className={clsx(
                    "group-hover:opacity-50 transition-opacity",
                    updating ? "cursor-not-allowed opacity-20" : ""
                )}>
                    <Avatar
                        name={name}
                        avatarUrl={displayedUrl}
                        size="lg"
                    />
                </div>
                <MdEdit
                    onClick={() => fileInputRef.current?.click()}
                    className={clsx(
                        "absolute inset-0 opacity-0 group-hover:opacity-100 m-auto text-2xl transition-opacity cursor-pointer",
                        updating ? "hidden" : "block"
                    )} />
            </div>
        </div>
    )
}

export default UpdateAvatar;