import * as React from "react";
import { Pressable, Text, View, PressableProps } from "react-native";
import { cn } from "../../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
    "flex-row items-center justify-center gap-2 rounded-md",
    {
        variants: {
            variant: {
                default: "bg-primary",
                destructive: "bg-destructive",
                outline: "border border-input bg-background",
                secondary: "bg-secondary",
                ghost: "",
                link: "",
            },
            size: {
                default: "px-4 py-2",
                sm: "rounded-md px-3 py-1",
                lg: "rounded-md px-8 py-3",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

const buttonTextVariants = cva(
    "text-sm font-medium",
    {
        variants: {
            variant: {
                default: "text-primary-foreground",
                destructive: "text-destructive-foreground",
                outline: "text-foreground",
                secondary: "text-secondary-foreground",
                ghost: "text-foreground",
                link: "text-primary underline",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export interface ButtonProps
    extends PressableProps,
    VariantProps<typeof buttonVariants> {
    children?: React.ReactNode;
}

const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
    ({ className, variant, size, children, ...props }, ref) => {
        return (
            <Pressable
                ref={ref}
                className={cn(buttonVariants({ variant, size, className }))}
                {...props}
            >
                {({ pressed }) => {
                    const pressedClass = pressed ?
                        variant === "default" ? "bg-primary/90" :
                            variant === "destructive" ? "bg-destructive/90" :
                                variant === "secondary" ? "bg-secondary/80" :
                                    variant === "outline" ? "bg-accent" :
                                        variant === "ghost" ? "bg-accent" : "" : "";

                    return typeof children === "string" ? (
                        <Text
                            className={cn(
                                buttonTextVariants({ variant }),
                                variant === "outline" && pressed ? "text-accent-foreground" : "",
                                variant === "ghost" && pressed ? "text-accent-foreground" : ""
                            )}
                        >
                            {children}
                        </Text>
                    ) : (
                        <View className={cn(pressedClass)}>{children}</View>
                    );
                }}
            </Pressable>
        );
    }
);

Button.displayName = "Button";

export { Button, buttonVariants, buttonTextVariants };