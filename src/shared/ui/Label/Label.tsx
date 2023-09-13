"use client";

import { forwardRef } from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/lib";

export const labelVariants = cva(
  "font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 leading-5",
  {
    variants: {
      type: {
        regular: ["text-base leading-5 text-black"],
        white: ["text-base text-white"],
        medium: ["text-sm font-bold"],
        small: ["text-xs text-textSmall"],
        big: ["text-[26px] leading-[32.5px]"],
      },
      sort: {
        start: ["text-start"],
        center: ["text-center"],
        end: ["text-end"],
      },
    },
    defaultVariants: {
      type: "regular",
      sort: "start",
    },
  }
);

const Label = forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, type, sort, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants({ type, sort }), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
