import { View, Text, TextInput } from "react-native";
import React from "react";
import { cn } from "../../lib/utils";

export default function input() {
  return (
    <View className="my-5 flex flex-row justify-between items-center gap-8">
      <Text className="text-white text-2xl font-bold">Password Length</Text>
      <TextInput
        className="text-black bg-white text-xl font-bold w-28 p-4"
        placeholder="ex 8"
        // onChangeText={text => setPasswordLength(text)}
        // value={passwordLength}
      />
    </View>
  );
}
