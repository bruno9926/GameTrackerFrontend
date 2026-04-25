import { useDispatch } from "react-redux";
import { useState } from "react";
import { Field, FieldLabel } from "@shared/ui/chadcn/field";
import { Input } from "@shared/ui/chadcn/input";
import Button from "@shared/ui/Atoms/Button/Button";
import useUpdateUserInfo from "@features/user/hooks/useUpdateUserInfo";
import { setUser } from "@features/user/state";
import type { UserInfo } from "@features/user/model/User";
import ErrorMessage from "@shared/ui/Atoms/ErrorMessage/ErrorMessage";
import toast from "@shared/ui/Atoms/Toast";

type UserInfoChanges = Partial<UserInfo>;

interface EditInfoFormProps {
    name: string;
    email: string;
    onEdit: () => void;
    onCancel: () => void;
}

const EditInfoForm = ({ name, email, onCancel, onEdit }: EditInfoFormProps) => {
    const [editedName, setEditedName] = useState(name);
    const [editedEmail, setEditedEmail] = useState(email);

    const { updateUserInfo, loading, error, clearError } = useUpdateUserInfo();
    const dispatch = useDispatch();

    const buildUserChanges = (): UserInfoChanges => {
        const userInfo: UserInfoChanges = {};

        if (editedName !== name) userInfo.name = editedName;
        if (editedEmail !== email) userInfo.email = editedEmail;

        return userInfo;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userInfoChanges = buildUserChanges();

        if (Object.keys(userInfoChanges).length === 0) {
            onEdit();
            return;
        }

        try {
            const user = await updateUserInfo(userInfoChanges);
            dispatch(setUser(user));
            toast.success("Your data has been updated!");
            onEdit();
        } catch {
            // error handled in hook
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Field>
                <FieldLabel htmlFor="name">Username</FieldLabel>
                <Input
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={editedName}
                    onChange={(e) => {
                        clearError();
                        setEditedName(e.target.value);
                    }}
                />
            </Field>

            <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={editedEmail}
                    onChange={(e) => {
                        clearError();
                        setEditedEmail(e.target.value);
                    }}
                />
            </Field>

            <div className="flex justify-between mt-3">
                <Button
                    type="button"
                    onClick={onCancel}
                    variant="secondary"
                    disabled={loading}
                >
                    Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                    Save Changes
                </Button>
            </div>

            {error && <ErrorMessage message={error} />}
        </form>
    );
};

export default EditInfoForm;