import type { ButtonHTMLAttributes, FC } from "react";
import styles from './Button.module.scss';
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "tertiary";
    fullWidth?: boolean;
    size?: "sm" | "md" | "lg";
    loading?: boolean
};

const Button: FC<ButtonProps> = ({
    size = 'md',
    variant = 'primary',
    fullWidth = false,
    className,
    children,
    loading, ...props
}) => {

    const btnClass = clsx(
        styles.button,
        styles[variant],
        styles[size],
        fullWidth ? "w-full" : "w-fit",
        className
    )

    return (
        <button
            className={btnClass}
            disabled={loading}
            {...props}>
        {children}</button>
    )
}

export default Button;