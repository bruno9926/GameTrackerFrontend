import { InputGroup, InputGroupAddon, InputGroupInput } from "@shared/ui/chadcn/input-group";
import { Field, FieldLabel } from "@shared/ui/chadcn/field";

import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

type PasswordFieldProps = {
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
} & React.InputHTMLAttributes<HTMLInputElement>;

const PasswordField = ({ password, setPassword, ...props }: PasswordFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    return (
        <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <InputGroup>
                <InputGroupInput
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    name="password"
                    autoComplete="current-password"
                    {...props} // pass down any additional props (like disabled)
                />
                <InputGroupAddon align="inline-end" className="pl-2">
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="cursor-pointer"
                    >
                        {showPassword ? <IoEyeOff /> : <IoEye />}
                    </button>
                </InputGroupAddon>
            </InputGroup>
        </Field>
    )
}

export default PasswordField;