import type { ButtonHTMLAttributes, FC } from "react";
import styles from './Button.module.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "tertiary";
    size?: "sm" | "md" | "lg";
};

const Button: FC<ButtonProps> = ({
    size = 'md',
    variant = 'primary',
    className,
    children, ...props
}) => {
    const btnClass = `
        ${styles.button}
        ${styles[variant]}
        ${styles[size]}
        ${className ?? ""}
    `;
    return (
        <button className={btnClass} {...props}>{children}</button>
    )
}

export default Button;