import { View, Text } from 'react-native';
import { Calendar } from 'react-native-big-calendar';
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
    const [currentMonth, setCurrentMonth] = useState(() => {
        const today = new Date();
        return today.toLocaleString('default', { month: 'long', year: 'numeric' });
    });

    const handleDateChange = ([startDate]: any) => {
        const newMonth = startDate.toLocaleString('default', { month: 'long', year: 'numeric' });
        setCurrentMonth(newMonth);
    };
    return (
        <View className="flex-1 bg-white p-4">
            <Text className="text-xl font-bold text-center mb-4">{currentMonth} Attendance</Text>
            <Calendar
                events={events}
                height={600}
                mode="month"

            />
        </View>
    );
}
