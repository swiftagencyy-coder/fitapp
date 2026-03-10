"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.4)] hover:bg-primary/90 hover:shadow-[0_15px_40px_-10px_hsl(var(--primary)/0.6)]",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-white/10 bg-white/5 shadow-sm hover:bg-white/10 hover:border-white/20 text-white",
        secondary: "bg-white/5 text-white shadow-sm hover:bg-white/10 border border-white/5",
        ghost: "hover:bg-white/5 text-white/70 hover:text-white",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-8 py-3",
        sm: "h-9 rounded-xl px-4 text-[9px]",
        lg: "h-16 rounded-[2rem] px-12 text-sm tracking-[0.3em]",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
