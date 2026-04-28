import { useDispatch, useSelector } from "react-redux";
import { Field, FieldLabel, FieldDescription } from "@shared/ui/chadcn/field";
import { Input } from "@shared/ui/chadcn/input";
import Button from "@shared/ui/Atoms/Button/Button";
import useUpdateUserInfo from "@features/user/hooks/useUpdateUserInfo";
import { setUser } from "@features/user/state";
import ErrorMessage from "@shared/ui/Atoms/ErrorMessage/ErrorMessage";
import toast from "@shared/ui/Atoms/Toast";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { RootState } from "@app/store/store";
import type { User } from "../model/User";

interface EditInfoFormProps {
    initialName: string;
    initialUsername: string;
    initialEmail: string;
    onEdit: () => void;
    onCancel: () => void;
}

const schema = z.object({
    username: z
        .string()
        .min(3, "Username must have at least 3 characters")
        .max(20, "Username must have at most 20 characters")
        .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers and underscores"),
    name: z.string()
        .min(1, "Name is required")
        .max(50, "Name is too long")
        .trim(),
    email: z.email("Invalid email"),
});

type FormFields = z.infer<typeof schema>;

const EditInfoForm = ({ initialName, initialEmail, initialUsername, onCancel, onEdit }: EditInfoFormProps) => {

    const userState = useSelector((state: RootState) => state.user);
    const { user: actualUser } = userState;

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError
    } = useForm<FormFields>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: initialName,
            email: initialEmail,
            username: initialUsername
        }
    });

    const { updateUserInfo } = useUpdateUserInfo();
    const dispatch = useDispatch();

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        const {
            name: editedName,
            email: editedEmail,
            username: editedUsername
        } = data;

        const userInfo = {
            ...(editedName !== initialName && { name: editedName }),
            ...(editedEmail !== initialEmail && { email: editedEmail }),
            ...(editedUsername.toLowerCase() !== initialUsername.toLowerCase()
                && { username: editedUsername }),
        };

        if (Object.keys(userInfo).length === 0) {
            onEdit();
            return;
        }

        try {
            const updatedUser = await updateUserInfo(userInfo);
            dispatch(setUser({...actualUser, ...updatedUser} as User));
            toast.success("Your data has been updated!");
            onEdit();
        } catch (error) {
            // error handled in hook
            setError("root", {
                message: error as string
            })
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                    id="username"
                    autoComplete="username"
                    aria-invalid={!!errors.username}
                    disabled={isSubmitting}
                    {...register("username")}
                />
                {
                    errors.username &&
                    <FieldDescription className="text-error" role="alert">{errors.username.message}</FieldDescription>
                }
            </Field>

            <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                    id="name"
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    disabled={isSubmitting}
                    {...register("name")}
                />
                {
                    errors.name &&
                    <FieldDescription className="text-error" role="alert">{errors.name.message}</FieldDescription>
                }
            </Field>

            <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                    id="email"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    disabled={isSubmitting}
                    {...register("email")}
                />
                {
                    errors.email &&
                    <FieldDescription className="text-error" role="alert">{errors.email.message}</FieldDescription>
                }
            </Field>

            <div className="flex justify-between mt-3">
                <Button
                    type="button"
                    onClick={onCancel}
                    variant="secondary"
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
            </div>

            {errors.root && <ErrorMessage message={errors.root.message ?? "Something went wrong, try again later."} />}
        </form>
    );
};

export default EditInfoForm;