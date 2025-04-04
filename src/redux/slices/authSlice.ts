import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import EncryptedStorage from 'react-native-encrypted-storage'
import axios from 'axios'

interface AuthState {
    employeeCode: string | null
    employeeName: string | null
    token: string | null
    isAuthenticated: boolean
    loading: boolean
    error?: string | null
}

const initialState: AuthState = {
    employeeCode: null,
    employeeName: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
}

// Async Thunk for Logging In
export const loginUser = createAsyncThunk(
    'auth/login',
    async (
        credentials: { username: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            // const data = `username=${credentials.username}&password=${credentials.password}`
            // const response = await axios.post('https://krshna.com/login', data)
            // const jsonData = response.data

            // if (jsonData.API_STATUS === 'OK') {
            //     const authData = {
            //         employeeCode: jsonData.Emp_id,
            //         employeeName: jsonData.Emp_Name,
            //         token: jsonData.token || '',
            //     }

            //     await EncryptedStorage.setItem(
            //         'auth_data',
            //         JSON.stringify(authData)
            //     )

            //     return authData
            // }
            // return rejectWithValue(jsonData.message || 'Login failed')

            //fake

            if (
                credentials.username === '1' &&
                credentials.password === '123'
            ) {
                const authData = {
                    employeeCode: '12345',
                    employeeName: 'Test User',
                    token: '234234234234dfsadfd',
                }
                await EncryptedStorage.setItem(
                    'auth_data',
                    JSON.stringify(authData)
                )
                return authData
            } else {
                // Simulate failed login
                return rejectWithValue('Invalid credentials')
            }
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : 'Network error'
            )
        }
    }
)

// Async Thunk for Checking Authentication Status
// src/redux/slices/authSlice.ts
export const checkAuthStatus = createAsyncThunk(
    'auth/checkStatus',
    async (_, { rejectWithValue }) => {
        try {
            // Simulate stored data retrieval
            const storedData = await EncryptedStorage.getItem('auth_data')

            if (storedData) {
                const authData = JSON.parse(storedData)
                console.log(storedData)

                return {
                    ...authData,
                    isAuthenticated: false,
                }
            } else {
                return rejectWithValue('No stored credentials')
            }
        } catch (error) {
            return rejectWithValue(
                error instanceof Error
                    ? error.message
                    : 'Error loading credentials simulation'
            )
        }
    }
)
// Async Thunk for Logging Out
export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await EncryptedStorage.removeItem('auth_data')
            return true
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : 'Logout failed'
            )
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(
                loginUser.fulfilled,
                (
                    state,
                    action: PayloadAction<{
                        employeeCode: string
                        employeeName: string
                        token: string
                    }>
                ) => {
                    state.loading = false
                    state.employeeCode = action.payload.employeeCode
                    state.employeeName = action.payload.employeeName
                    state.token = action.payload.token
                    state.isAuthenticated = true
                }
            )
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            .addCase(
                checkAuthStatus.fulfilled,
                (state, action: PayloadAction<AuthState>) => {
                    state.employeeCode = action.payload.employeeCode
                    state.employeeName = action.payload.employeeName
                    state.token = action.payload.token
                    state.isAuthenticated = true
                }
            )
            .addCase(checkAuthStatus.rejected, (state) => {
                state.isAuthenticated = false
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.employeeCode = null
                state.employeeName = null
                state.token = null
                state.isAuthenticated = false
            })
    },
})

export default authSlice.reducer
