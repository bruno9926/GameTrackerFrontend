import Button from "@shared/ui/Atoms/Button/Button";
import type { FC, ButtonHTMLAttributes } from "react";
import { GoPlus } from "react-icons/go";

const AddGameButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (buttonProps) => {
    return (
        <Button
            variant="secondary"
            className="flex flex-row items-center gap-2"
            {...buttonProps}
        >
            <GoPlus /> Add Game
        </Button>
    )
}

export default AddGameButton