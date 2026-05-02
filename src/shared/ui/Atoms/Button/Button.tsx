import type { ButtonHTMLAttributes, FC } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "tertiary";
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
  loading?: boolean;
};

const sizeClasses = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

const variantClasses = {
  primary:
    "bg-primary border-nopne text-primary-foreground hover:bg-primary/80",
  secondary:
    "bg-transparent border border-primary text-primary hover:bg-primary/20",
  tertiary:
    "bg-transparent p-0 w-fit underline",
};

const Button: FC<ButtonProps> = ({
  size = "md",
  variant = "primary",
  fullWidth = false,
  className,
  children,
  loading,
  ...props
}) => {
  return (
    <button
      className={clsx(
        // base styles
        "rounded-[32px] cursor-pointer font-normal min-w-20 transition-colors animation-duration",
        "focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
        "disabled:opacity-50 disabled:cursor-default",

        // layout
        fullWidth ? "w-full" : "w-fit",

        // variant + size
        variantClasses[variant],
        sizeClasses[size],

        className
      )}
      disabled={loading}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;