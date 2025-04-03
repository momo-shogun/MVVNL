// Step 1: Create calendar slice
// src/store/slices/calendarSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Moment from 'moment'
import string from '../../constant/string'

// Create async thunk for fetching calendar data
export const fetchCalendarData = createAsyncThunk(
    'calendar/fetchData',
    async ({ employeeCode, month, year }, { rejectWithValue }) => {
        try {
            const data = `Emp_id=${employeeCode}&A_Month=${month}&A_Year=${year}`
            const response = await axios.post(
                string.url + '/HolidayWeekOFF?',
                data
            )
            const jsonData = response.data

            if (jsonData.API_STATUS === 'OK') {
                return jsonData
            }
            return rejectWithValue('Failed to fetch data')
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [],
        eventsWeek: [],
        currentDate: '',
        currentMonthIndex: new Date().getMonth() + 1,
        currentYear: new Date().getFullYear(),
        isLoading: false,
        error: null,
    },
    reducers: {
        setCurrentDate: (state, action) => {
            state.currentDate = action.payload
        },
        setCurrentMonthIndex: (state, action) => {
            state.currentMonthIndex = action.payload
        },
        setCurrentYear: (state, action) => {
            state.currentYear = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCalendarData.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchCalendarData.fulfilled, (state, action) => {
                state.isLoading = false
                state.eventsWeek = action.payload.ATTENDANCE

                // Process and format events
                const attendanceData = action.payload.ATTENDANCE
                const weekOffData = action.payload.WEEKOFF
                const holidayData = action.payload.HOLIDAY
                const empParList = action.payload.EmpParList
                const empLeave = action.payload.EmpLeave

                let formattedEvents = []

                // Format holidays
                holidayData.forEach((holiday) => {
                    const momentObj = Moment(holiday.F_Date, 'DD-MM-YYYY')
                    formattedEvents.push({
                        title: holiday.H_Name,
                        start: new Date(momentObj),
                        end: new Date(momentObj),
                        color: 'blue',
                    })
                })

                // Format week offs
                weekOffData.forEach((weekOff) => {
                    const momentObj = Moment(weekOff.PunchDt, 'DD-MM-YYYY')
                    formattedEvents.push({
                        title: 'Week Off',
                        start: new Date(momentObj),
                        end: new Date(momentObj),
                        color: 'orange',
                    })
                })

                // Format attendance
                attendanceData.forEach((attendance) => {
                    const momentObj = Moment(attendance.PunchDt, 'DD-MM-YYYY')
                    formattedEvents.push(
                        {
                            title: 'Present',
                            start: new Date(momentObj),
                            end: new Date(momentObj),
                            color: 'green',
                        },
                        {
                            title: 'In' + attendance.punchIN,
                            start: new Date(momentObj),
                            end: new Date(momentObj),
                            color: '#AADA6A',
                        },
                        {
                            title: 'Out' + attendance.punchOut,
                            start: new Date(momentObj),
                            end: new Date(momentObj),
                            color: '#FF5733',
                        }
                    )
                })

                // Format absences
                empParList.forEach((absent) => {
                    const momentObj = Moment(absent.F_Date, 'DD-MM-YYYY')
                    formattedEvents.push({
                        title: 'Absent',
                        start: new Date(momentObj),
                        end: new Date(momentObj),
                        color: 'red',
                    })
                })

                // Format leaves
                empLeave.forEach((leave) => {
                    const momentObj = Moment(leave.F_Date, 'DD-MM-YYYY')
                    formattedEvents.push({
                        title: 'leave',
                        start: new Date(momentObj),
                        end: new Date(momentObj),
                        color: 'pink',
                    })
                })

                state.events = formattedEvents
            })
            .addCase(fetchCalendarData.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    },
})

export const { setCurrentDate, setCurrentMonthIndex, setCurrentYear } =
    calendarSlice.actions
export default calendarSlice.reducer

// Step 2: Create user slice
// src/store/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        employeeCode: '',
        employeeName: '',
    },
    reducers: {
        setEmployeeDetails: (state, action) => {
            state.employeeCode = action.payload.code
            state.employeeName = action.payload.name
        },
    },
})

export const { setEmployeeDetails } = userSlice.actions
export default userSlice.reducer

// Step 3: Create UI slice
// src/store/slices/uiSlice.js
import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        snackBarText: '',
        visibleSnackBar: false,
    },
    reducers: {
        showSnackBar: (state, action) => {
            state.snackBarText = action.payload
            state.visibleSnackBar = true
        },
        hideSnackBar: (state) => {
            state.visibleSnackBar = false
        },
    },
})

export const { showSnackBar, hideSnackBar } = uiSlice.actions
export default uiSlice.reducer

// Step 4: Configure store
// src/store/index.js
import { configureStore } from '@reduxjs/toolkit'
import calendarReducer from './slices/calendarSlice'
import userReducer from './slices/userSlice'
import uiReducer from './slices/uiSlice'

export const store = configureStore({
    reducer: {
        calendar: calendarReducer,
        user: userReducer,
        ui: uiReducer,
    },
})

// Step 5: Set up Provider in App.js or index.js
// App.js or index.js
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
// ... other imports

const App = () => {
    return <Provider store={store}>{/* Your app components */}</Provider>
}

export default App

// Step 6: Update your Calendar component
// Calendar.js
import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Calendar } from 'react-native-big-calendar'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Moment from 'moment'
import Header from '../Component/Header'
import Loader from '../Component/Loader'
import { Snackbar } from 'react-native-paper'
import { useIsFocused } from '@react-navigation/native'

// Import actions and selectors
import {
    fetchCalendarData,
    setCurrentDate,
    setCurrentMonthIndex,
    setCurrentYear,
} from '../store/slices/calendarSlice'
import { setEmployeeDetails } from '../store/slices/userSlice'
import { showSnackBar, hideSnackBar } from '../store/slices/uiSlice'

export default function CalendarScreen({ navigation }) {
    const dispatch = useDispatch()
    const isFocused = useIsFocused()

    // Selectors
    const {
        events,
        currentDate,
        currentMonthIndex,
        currentYear,
        isLoading,
        error,
    } = useSelector((state) => state.calendar)

    const { employeeCode, employeeName } = useSelector((state) => state.user)
    const { snackBarText, visibleSnackBar } = useSelector((state) => state.ui)

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

    useEffect(() => {
        if (isFocused) {
            callDash()
        }
    }, [isFocused])

    useEffect(() => {
        if (error) {
            dispatch(showSnackBar(error))
        }
    }, [error])

    const callDash = async () => {
        Moment.locale('en')
        const d = new Date()
        const dateFormatted = Moment(d).format('DD-MM-YYYY')
        const month = Moment(d).format('M')
        const year = Moment(d).format('Y')

        dispatch(setCurrentDate(dateFormatted))
        dispatch(setCurrentMonthIndex(month))
        dispatch(setCurrentYear(year))

        // Get employee details from AsyncStorage
        const code = await AsyncStorage.getItem('@empCode')
        const name = await AsyncStorage.getItem('@empName')

        if (code) {
            dispatch(setEmployeeDetails({ code, name }))
            dispatch(fetchCalendarData({ employeeCode: code, month, year }))
        }
    }

    const eventCellStyle = (event, start, end, isSelected) => ({
        backgroundColor: event.color,
        borderColor: event.color,
        borderRadius: 5,
        color: isSelected ? 'white' : 'black',
    })

    const showDateDetails = (value) => {
        const momentObj = Moment(value[0])
        const month = momentObj.format('M')
        const year = momentObj.format('Y')

        dispatch(setCurrentMonthIndex(month))
        dispatch(setCurrentYear(year))
        dispatch(fetchCalendarData({ employeeCode, month, year }))
    }

    return (
        <>
            <Header isback={true} name={employeeName} navigation={navigation} />
            <View style={styles.container}>
                <View
                    style={{
                        height: Dimensions.get('window').height - 150,
                        marginTop: 20,
                    }}
                >
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 25,
                            fontWeight: 'bold',
                            marginBottom: 20,
                            color: 'blue',
                        }}
                    >
                        {months[currentMonthIndex].toUpperCase()} {currentYear}
                    </Text>
                    <Calendar
                        events={events}
                        height={200}
                        swipeEnabled={true}
                        mode="month"
                        hideNowIndicator={true}
                        showAdjacentMonths={true}
                        startAccessor="start"
                        endAccessor="end"
                        defaultDate={Moment().toDate()}
                        eventCellStyle={eventCellStyle}
                        onChangeDate={(value) => showDateDetails(value)}
                    />
                </View>
            </View>
            <Snackbar
                visible={visibleSnackBar}
                onDismiss={() => dispatch(hideSnackBar())}
                style={styles.snackBar}
                action={{
                    label: 'Dismiss',
                    onPress: () => dispatch(hideSnackBar()),
                }}
            >
                {snackBarText}
            </Snackbar>
            {isLoading && <Loader />}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        color: 'black',
    },
    snackBar: {
        backgroundColor: '#5d6fe2',
    },
})
