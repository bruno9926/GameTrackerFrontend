import type { ButtonHTMLAttributes, FC } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@shared/lib/utils";

const buttonVariants = cva(
  "rounded-[32px] cursor-pointer font-normal min-w-20 transition-colors animation-duration focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-default",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "bg-transparent border border-primary text-primary hover:bg-primary/20",
        tertiary: "bg-transparent p-0 w-fit underline",
      },
      size: {
        sm: "px-2 py-1 text-sm",
        md: "px-3 py-2 text-base",
        lg: "px-4 py-3 text-lg",
      },
      fullWidth: {
        true: "w-full",
        false: "w-fit",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean;
  };

const Button: FC<ButtonProps> = ({
  variant,
  size,
  fullWidth,
  className,
  children,
  loading,
  ...props
}) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      disabled={loading}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;