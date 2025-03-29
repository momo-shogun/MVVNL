import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import "./global.css";

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-xl text-blue-500">Hello from NativeWind with Tailwind!</Text>
      </View>
    </SafeAreaView>
  );
}