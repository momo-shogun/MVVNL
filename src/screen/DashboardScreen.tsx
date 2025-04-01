import { View, Text } from 'react-native';
import { useState } from 'react';

const events = [
    {
        title: 'Present',
        start: new Date(2025, 4, 5, 9, 0),
        end: new Date(2025, 4, 5, 17, 0),
    },
    {
        title: 'Absent',
        start: new Date(2025, 4, 2, 9, 0),
        end: new Date(2025, 4, 2, 17, 0),
    },
];

export default function DashboardScreen() {

    return (
        <View className="flex-1 bg-white p-4">
            <Text className="text-xl font-bold text-center mb-4">{currentMonth} Attendance</Text>

        </View>
    );
}
