import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-green-500 text-white hover:bg-green-600",
        warning: "bg-yellow-500 text-white hover:bg-yellow-600",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-md px-10 text-base",
        "2xl": "h-14 rounded-md px-12 text-lg",
        icon: "h-10 w-10",
      },
      shape: {
        default: "",
        pill: "rounded-full",
        square: "aspect-square",
      },
      animation: {
        none: "",
        ringHover: "hover:ring-4 hover:ring-primary/20",
        shine: "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent hover:before:translate-x-full",
        gooeyRight: "before:absolute before:inset-0 before:-z-10 before:-translate-x-full before:bg-white/20 before:transition-transform before:duration-300 hover:before:translate-x-0",
        gooeyLeft: "before:absolute before:inset-0 before:-z-10 before:translate-x-full before:bg-white/20 before:transition-transform before:duration-300 hover:before:translate-x-0",
        linkHover1: "relative after:absolute after:bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-bottom-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100",
        linkHover2: "relative after:absolute after:bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100",
        expandIcon: "flex items-center gap-2 [&>svg]:transition-all [&>svg]:duration-300 [&>svg]:w-0 [&>svg]:opacity-0 hover:[&>svg]:w-5 hover:[&>svg]:opacity-100",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "default",
      animation: "none",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  IconLeft?: React.ElementType
  IconRight?: React.ElementType
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, animation, asChild = false, isLoading, IconLeft, IconRight, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    // When using asChild, we pass children directly through
    if (asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, shape, animation, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Comp>
      )
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, shape, animation, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!isLoading && IconLeft && <IconLeft className="mr-2 h-4 w-4" />}
        <span className="relative z-10 flex items-center">{children}</span>
        {IconRight && <IconRight className="ml-2 h-4 w-4" />}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
