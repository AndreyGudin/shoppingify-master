import { forwardRef } from "react";

import { cn } from "@/shared/lib/lib";
import { VariantProps, cva } from "class-variance-authority";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    InputVariantsProps {}

export type InputVariantsProps = VariantProps<typeof InputVariants>;

export const InputVariants = cva(
  "px-3 py-2 text-sm shadow ring-offset-primary file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      theme: {
        regular: ["flex h-10 w-full rounded-md border border-input bg-primary"],
        clear: ["w-[275px] h-[50px] rounded-xl"],
      },
    },
    defaultVariants: {
      theme: "regular",
    },
  }
);

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, theme, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(InputVariants({ theme }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
