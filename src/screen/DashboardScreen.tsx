import { View, Text } from 'react-native'
import { useState } from 'react'
import { Calendar, HasDateRange } from 'react-native-big-calendar'

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
]

const months = [
    '',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

const handleMonthChange = ([startDate, endDate]: HasDateRange) => {
    const value = new Date(startDate)
    console.log(value)

    // setCurrentMonthIndex(value[0]);
    // setCurrentYear(value.getFullYear());
}

// const eventCellStyle = (event, start, end, isSelected) => ({
//     backgroundColor: event.color,
//     borderColor: event.color,
//     borderRadius: 5,
//     color: isSelected ? 'white' : 'black',
// })

export default function DashboardScreen() {
    const [currentMonthIndex, setCurrentMonthIndex] = useState(
        new Date().getMonth()
    )
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
    return (
        <View className="flex-1 bg-white p-4">
            <View className="flex-row justify-center py-2">
                <Text className="text-3xl font-bold">
                    {' '}
                    {months[currentMonthIndex].toUpperCase()} {currentYear}
                </Text>
            </View>
            <Calendar
                events={events}
                height={600}
                mode="month"
                swipeEnabled={true}
                showAdjacentMonths={true}
                onChangeDate={(value) => handleMonthChange(value)}
            />
        </View>
    )
}
