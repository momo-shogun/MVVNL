import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Image } from 'react-native-reanimated/lib/typescript/Animated'

export default function InsideClockInArea() {
    return (
        <View className="mb-4 bg-secondary-600 rounded-xl p-4 flex-row items-center justify-between">
            <View className="flex-1">
                <Text className="text-secondary-400 font-semibold">
                    You are in the clock-in area!
                </Text>
                <Text className="text-white text-xs mt-1">
                    Now you can press clock in in this area
                </Text>
            </View>
            {/* <Image
                source={{ uri: '/placeholder.svg?height=40&width=40' }}
                className="w-10 h-10"
            /> */}
        </View>
    )
}
