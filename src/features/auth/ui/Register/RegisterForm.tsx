// RegisterForm.tsx
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Input } from "@shared/ui/chadcn/input";
import { Field, FieldLabel, FieldDescription } from "@shared/ui/chadcn/field";
import { PasswordField } from "@shared/ui/Organisms/PasswordField";
import Button from "@shared/ui/Atoms/Button/Button";
import ErrorMessage from "@shared/ui/Atoms/ErrorMessage/ErrorMessage";

import useRegister from "../../hooks/useRegister";
import { useNavigate } from "react-router";
import { publicRoutes } from "@routes/routes";

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
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormFields = z.infer<typeof schema>;

const RegisterForm = () => {
    const { register: registerUser } = useRegister();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError
    } = useForm<FormFields>({
        resolver: zodResolver(schema)
    });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            await registerUser(data);
            navigate(publicRoutes.LOGIN);
        } catch (error) {
            setError("root", {
                message: error as string
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                    id="username"
                    autoComplete="username"
                    disabled={isSubmitting}
                    {...register("username")}
                />
                {errors.username && (
                    <FieldDescription className="text-error">
                        {errors.username.message}
                    </FieldDescription>
                )}
            </Field>

            <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                    id="name"
                    autoComplete="name"
                    disabled={isSubmitting}
                    {...register("name")}
                />
                {errors.name && (
                    <FieldDescription className="text-error">
                        {errors.name.message}
                    </FieldDescription>
                )}
            </Field>

            <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                    id="email"
                    autoComplete="email"
                    disabled={isSubmitting}
                    {...register("email")}
                />
                {errors.email && (
                    <FieldDescription className="text-error">
                        {errors.email.message}
                    </FieldDescription>
                )}
            </Field>

            <PasswordField
                disabled={isSubmitting}
                {...register("password")}
            />

            <Button type="submit" disabled={isSubmitting} fullWidth>
                {isSubmitting ? "Signing you up..." : "Sign Up"}
            </Button>

            {errors.root && (
                <ErrorMessage message={errors.root.message ?? "Something went wrong"} />
            )}
        </form>
    );
};

export default RegisterForm;