import { View, Text, Image } from 'react-native'
import React from 'react'
import { Card, CardHeader, CardTitle } from '../ui/Card'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '../ui/Button'
import { logoutUser } from '../../redux/slices/authSlice'
import { useAppDispatch } from '../../redux/types'

export default function Header() {
    const dispatch = useAppDispatch()
    const handleLogin = () => {
        dispatch(logoutUser())
    }
    return (
        <Card className="bg-secondary-dark">
            <SafeAreaView className="flex-row items-center justify-around p-4">
                <View className="flex-row gap-2 items-center justify-between w-full">
                    <Image
                        source={require('../../assets/profile.png')}
                        className="w-12 h-12 rounded-full"
                    />
                    <CardHeader>
                        <CardTitle className="text-primary-light">
                            Hello!
                        </CardTitle>
                        <Text className="text-white text-2xl font-bold">
                            Jitendra Kumar Mishra
                        </Text>
                    </CardHeader>
                    <Button variant="ghost" size="icon" onPress={handleLogin}>
                        <Image
                            source={require('../../assets/log-out.png')}
                            className="w-8 h-8"
                        />
                    </Button>
                </View>
            </SafeAreaView>
        </Card>
    )
}
