import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
} from 'react-native'

// Button Props definition
interface ButtonProps extends TouchableOpacityProps {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost'
    size?: 'default' | 'sm' | 'xs' | 'lg' | 'icon'
}

// Button Component
const Button = React.forwardRef<View, ButtonProps>(
    (
        { variant = 'default', size = 'default', style, children, ...props },
        ref
    ) => {
        const variantClasses = {
            default: 'bg-blue-500 text-white hover:bg-blue-400',
            destructive: 'bg-red-500 text-white hover:bg-red-400',
            outline:
                'border border-gray-300 bg-white text-gray-800 hover:bg-gray-100',
            secondary: 'bg-gray-300 text-black hover:bg-gray-200',
            ghost: 'text-blue-500 hover:bg-blue-100 flex-row items-center justify-center ',
            link: 'text-blue-500 underline hover:bg-blue-100',
        }

        const sizeClasses = {
            default: 'h-10 px-4 py-2',
            sm: 'h-9 rounded-md px-3',
            xs: 'h-6 rounded-md px-2 text-xs',
            lg: 'h-11 rounded-md px-8',
            icon: 'h-10 w-10 ',
        }

        const buttonClass = `${variantClasses[variant]} ${sizeClasses[size]} rounded-md`

        return (
            <View ref={ref}>
                <TouchableOpacity
                    {...props}
                    className={buttonClass} // NativeWind className applied here
                >
                    <Text
                        style={{ color: 'white', textAlign: 'center' }}
                        className="text-white"
                    >
                        {children}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
)

Button.displayName = 'Button'

export { Button }
