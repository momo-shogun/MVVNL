import React from 'react'
import { SafeAreaView, Text, TextProps, View, ViewProps } from 'react-native'
import { SafeAreaViewProps } from 'react-native-safe-area-context'

const Card = React.forwardRef<View, ViewProps>(
    ({ className, ...props }, ref) => (
        <View
            ref={ref}
            className={`rounded-lg border-b border-card-secondary bg-card  shadow-sm ${
                className ? className : ''
            }`}
            {...props}
        />
    )
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<View, ViewProps>(
    ({ className, ...props }, ref) => (
        <View
            ref={ref}
            className={`flex flex-col space-y-1.5  ${
                className ? className : ''
            }`}
            {...props}
        />
    )
)

CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<Text, TextProps>(
    ({ className, ...props }, ref) => (
        <Text
            ref={ref}
            className={`font-semibold leading-none tracking-tight ${
                className ? className : ''
            }`}
            {...props}
        />
    )
)

CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<Text, TextProps>(
    ({ className, ...props }, ref) => (
        <Text
            ref={ref}
            className={`text-sm text-primary-muted ${
                className ? className : ''
            }`}
            {...props}
        />
    )
)

CardDescription.displayName = 'CardDescription '

export { Card, CardHeader, CardTitle, CardDescription }
