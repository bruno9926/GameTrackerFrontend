import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Field, FieldLabel, FieldDescription } from "@shared/ui/chadcn/field";
import { InputGroup, InputGroupInput, InputGroupAddon } from "@shared/ui/chadcn/input-group";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useState } from "react";

import Button from "@shared/ui/Atoms/Button/Button";
import ErrorMessage from "@shared/ui/Atoms/ErrorMessage/ErrorMessage";
import toast from "@shared/ui/Atoms/Toast";
import useChangePassword from "../hooks/useChangePassword";

const schema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});

type FormFields = z.infer<typeof schema>;

interface ChangePasswordFormProps {
    onCancel: () => void;
}

type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const PasswordInput = ({ ...props }: PasswordInputProps) => {
    const [show, setShow] = useState(false);

    return (
        <InputGroup>
            <InputGroupInput
                type={show ? "text" : "password"}
                autoComplete="new-password"
                {...props}
            />
            <InputGroupAddon align="inline-end" className="pl-2">
                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="cursor-pointer"
                >
                    {show ? <IoEyeOff /> : <IoEye />}
                </button>
            </InputGroupAddon>
        </InputGroup>
    );
};

const ChangePasswordForm = ({ onCancel }: ChangePasswordFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError
    } = useForm<FormFields>({
        resolver: zodResolver(schema)
    });

    const { changePassword } = useChangePassword();

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            await changePassword({
                currentPassword: data.currentPassword,
                newPassword: data.newPassword
            });
            toast.success("Password updated!");
            onCancel();
        } catch (error) {
            setError("root", {
                message: error as string
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-3 lg:p-5">
            <h2 className="mb-4">Change Password</h2>
            <Field>
                <FieldLabel>Current Password</FieldLabel>
                <PasswordInput
                    autoComplete="current-password"
                    disabled={isSubmitting}
                    {...register("currentPassword")}
                />
                {errors.currentPassword && (
                    <FieldDescription className="text-error">
                        {errors.currentPassword.message}
                    </FieldDescription>
                )}
            </Field>

            <Field>
                <FieldLabel>New Password</FieldLabel>
                <PasswordInput
                    autoComplete="new-password"
                    disabled={isSubmitting}
                    {...register("newPassword")}
                />
                {errors.newPassword && (
                    <FieldDescription className="text-error">
                        {errors.newPassword.message}
                    </FieldDescription>
                )}
            </Field>

            <Field>
                <FieldLabel>Confirm New Password</FieldLabel>
                <PasswordInput
                    autoComplete="new-password"
                    disabled={isSubmitting}
                    {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                    <FieldDescription className="text-error">
                        {errors.confirmPassword.message}
                    </FieldDescription>
                )}
            </Field>

            <div className="flex justify-between mt-3">
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onCancel}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>

                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Change Password"}
                </Button>
            </div>

            {errors.root && (
                <ErrorMessage message={errors.root.message ?? "Something went wrong"} />
            )}
        </form>
    );
};

export default ChangePasswordForm;