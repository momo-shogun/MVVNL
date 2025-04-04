import React from 'react'
import { View, ViewProps } from 'react-native'

const Card = React.forwardRef<View, ViewProps>(
    ({ className, ...props }, ref) => (
        <View
            ref={ref}
            className={`rounded-lg border-b border-card-secondary bg-card text-card-foreground shadow-sm ${
                className ? className : ''
            }`}
            {...props}
        />
    )
)

Card.displayName = 'Card'

export default Card
