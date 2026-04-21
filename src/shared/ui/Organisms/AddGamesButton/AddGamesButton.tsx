import Button from "@shared/ui/Atoms/Button/Button";
import type { FC, ButtonHTMLAttributes } from "react";
import { GoPlus } from "react-icons/go";

const AddGameButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (buttonProps) => {
    return (
        <Button
            variant="secondary"
            className="flex flex-row items-center gap-2 min-w-0"
            {...buttonProps}
        >
            <GoPlus />
            <span className="md:block">Add Game</span>
        </Button>
    )
}

export default AddGameButton