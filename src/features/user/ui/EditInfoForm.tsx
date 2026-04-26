import { useDispatch } from "react-redux";
import { Field, FieldLabel, FieldDescription } from "@shared/ui/chadcn/field";
import { Input } from "@shared/ui/chadcn/input";
import Button from "@shared/ui/Atoms/Button/Button";
import useUpdateUserInfo from "@features/user/hooks/useUpdateUserInfo";
import { setUser } from "@features/user/state";
import type { UserInfo } from "@features/user/model/User";
import ErrorMessage from "@shared/ui/Atoms/ErrorMessage/ErrorMessage";
import toast from "@shared/ui/Atoms/Toast";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type UserInfoChanges = Partial<UserInfo>;

interface EditInfoFormProps {
    initialName: string;
    initialEmail: string;
    onEdit: () => void;
    onCancel: () => void;
}

const schema = z.object({
    name: z.string().min(8, "Username must have at least 8 characters"),
    email: z.email("This is not a valid email"),
});

type FormFields = z.infer<typeof schema>;

const EditInfoForm = ({ initialName, initialEmail, onCancel, onEdit }: EditInfoFormProps) => {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError
    } = useForm<FormFields>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: initialName,
            email: initialEmail
        }
    });

    const { updateUserInfo } = useUpdateUserInfo();
    const dispatch = useDispatch();

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        const { name: editedName, email: editedEmail } = data;
        const userInfo: UserInfoChanges = {};

        if (editedName !== initialName) userInfo.name = editedName;
        if (editedEmail !== initialEmail) userInfo.email = editedEmail;

        if (Object.keys(userInfo).length === 0) {
            onEdit();
            return;
        }

        try {
            const user = await updateUserInfo(userInfo);
            dispatch(setUser(user));
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
                <FieldLabel htmlFor="name">Username</FieldLabel>
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