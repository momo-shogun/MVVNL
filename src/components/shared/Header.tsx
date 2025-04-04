import { View, Text, Image } from 'react-native'
import React from 'react'
import Card from '../ui/Card'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Header() {
    return (
        <Card className="bg-secondary-dark">
            <SafeAreaView className="flex-row p-4 items-center ">
                <View className="flex-row">
                    <Image
                        source={require('../../assets/profile.png')}
                        className="w-12 h-12 rounded-full"
                    />
                    <View>
                        <Text className="">Hello!</Text>
                        <Text className="text-white text-2xl font-bold">
                            MVVNL Attendence
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
        </Card>
    )
}
