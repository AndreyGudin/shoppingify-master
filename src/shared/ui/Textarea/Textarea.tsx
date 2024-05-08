import { cn } from "@/shared/lib/lib";
import { VariantProps, cva } from "class-variance-authority";
import * as React from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    TextareaVariantsProps {}
{
}

export type TextareaVariantsProps = VariantProps<typeof TextareaVariants>;

export const TextareaVariants = cva(
  "flex min-h-[80px] w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      theme: {
        regular: ["w-[310px] border-2 rounded-xl border-disabled"],
      },
    },
    defaultVariants: {
      theme: "regular",
    },
  }
);

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, theme, ...props }, ref) => {
    return (
      <textarea
        className={cn(TextareaVariants({ theme }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
