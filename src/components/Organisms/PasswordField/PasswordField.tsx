import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Field, FieldLabel } from "@/components/ui/field";

import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

interface PasswordFieldProps {
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
}
const PasswordField = ({ password, setPassword }: PasswordFieldProps) => {
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