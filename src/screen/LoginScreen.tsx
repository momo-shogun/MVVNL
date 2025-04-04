import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    SafeAreaView,
} from 'react-native'
import { ProfileScreenNavigationProp } from '../navigation/AppNavigator'
import { useAppDispatch, useAppSelector } from '../redux/types'
import { loginUser } from '../redux/slices/authSlice'

export default function LoginScreen() {
    const [userId, setUserId] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useAppDispatch()
    const { loading, error, isAuthenticated } = useAppSelector(
        (state) => state.auth
    )

    const handleLogin = async () => {
        try {
            const res = dispatch(loginUser({ username: userId, password }))
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    const navigation = useNavigation<ProfileScreenNavigationProp>()
    return (
        <SafeAreaView className="flex-1 h-full bg-primary-light">
            <View className="flex-1 px-6 justify-between">
                {/* Logo Section */}
                <View className="items-center mt-12 justify-center">
                    <View className="bg-white rounded-full p-2 w-24 h-24 items-center justify-center">
                        <Image
                            source={require('../assets/logo.png')}
                            className="w-24 h-24 rounded-full"
                            resizeMode="contain"
                        />
                    </View>
                    <Text className="mt-4 text-xl font-bold tracking-tight ">
                        MVVNL Attendence
                    </Text>
                </View>

                {/* Main Content */}
                <View className="w-full items-center">
                    <Text className="text-secondary-dark text-2xl font-bold mb-1">
                        Hi There!
                    </Text>
                    <Text className="text-primary-muted text-sm mb-4">
                        Please enter required details.
                    </Text>
                    <Image
                        source={require('../assets/login.png')}
                        className="w-full h-1/4 "
                        resizeMode="contain"
                    />
                    {/* Input Fields */}
                    <TextInput
                        placeholder="Enter User Id"
                        placeholderTextColor="#8b9389"
                        value={userId}
                        onChangeText={setUserId}
                        className="bg-green-900 w-full rounded-full px-5 py-3 text-white mb-4"
                        keyboardType="default"
                        autoCapitalize="none"
                    />

                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#8b9389"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        className="bg-green-900 w-full rounded-full px-5 py-3 text-white mb-2"
                    />

                    <View className="w-full items-end mb-6">
                        <TouchableOpacity>
                            <Text className="text-primary-muted text-sm">
                                Forgot Password?
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Login Button */}
                    <TouchableOpacity
                        className="bg-secondary w-full rounded-full py-4 items-center mb-4"
                        onPress={handleLogin}
                    >
                        <Text className="text-black font-bold">Log In</Text>
                    </TouchableOpacity>
                </View>

                {/* Footer */}
                <View className="flex-row justify-center mb-8">
                    <TouchableOpacity className="mr-2">
                        <Text className="text-gray-400 text-xs">
                            Terms of Service
                        </Text>
                    </TouchableOpacity>
                    <Text className="text-gray-400 text-xs">|</Text>
                    <TouchableOpacity className="ml-2">
                        <Text className="text-gray-400 text-xs">
                            Privacy Policy
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}
