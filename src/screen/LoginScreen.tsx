import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { ProfileScreenNavigationProp } from '../navigation/AppNavigator';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation<ProfileScreenNavigationProp>();
    return (
        <SafeAreaView className="flex-1 h-full bg-default">
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
                    <Text className='mt-4 text-xl font-bold tracking-tight '>MVVNL Attendence</Text>
                </View>

                {/* Main Content */}
                <View className="w-full items-center">
                    <Text className="text-secondary-dark text-2xl font-bold mb-1">Hi There!</Text>
                    <Text className="text-primary-muted text-sm mb-4">Please enter required details.</Text>
                    <Image
                        source={require('../assets/login.png')}
                        className="w-full h-1/4 "
                        resizeMode="contain"
                    />
                    {/* Input Fields */}
                    <TextInput
                        placeholder="Email address"
                        placeholderTextColor="#8b9389"
                        value={email}
                        onChangeText={setEmail}
                        className="bg-green-900 w-full rounded-full px-5 py-3 text-white mb-4"
                        keyboardType="email-address"
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
                            <Text className="text-primary-muted text-sm">Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Login Button */}
                    <TouchableOpacity className="bg-secondary w-full rounded-full py-4 items-center mb-4" onPress={() => navigation.navigate('Dashboard')}>
                        <Text className="text-black font-bold">Log In</Text>
                    </TouchableOpacity>

                </View>

                {/* Footer */}
                <View className="flex-row justify-center mb-8">
                    <TouchableOpacity className="mr-2">
                        <Text className="text-gray-400 text-xs">Terms of Service</Text>
                    </TouchableOpacity>
                    <Text className="text-gray-400 text-xs">|</Text>
                    <TouchableOpacity className="ml-2">
                        <Text className="text-gray-400 text-xs">Privacy Policy</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}