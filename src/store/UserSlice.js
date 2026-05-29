import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const BACKEND_URL = import.meta.env.VITE_BACKEND_API

export const getAllUsers = createAsyncThunk('/getAllUsers', async (token, { rejectWithValue }) => { 
    try {
        const response = await fetch(`${BACKEND_URL}/users`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })

        const data = await response.json()

        if (!response.ok) { 
            return rejectWithValue(data?.message || "Failed to fetch users")
        }

        return data

    } catch (error) { 
        return rejectWithValue(error?.message || "Internal Server Error")
    }
})

export const deleteUser = createAsyncThunk('/deleteUser', async (userId, { rejectWithValue }) => { 
    try {
        const response = await fetch(`${BACKEND_URL}/user/${userId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })

        const data = await response.json()

        if (!response.ok) { 
            return rejectWithValue(data?.message || "Failed to delete users")
        }

        return data

    } catch (error) { 
        return rejectWithValue(error?.message || "Internal Server Error")
    }
})

export const addUser = createAsyncThunk('/addUser', async (userDetails, { rejectWithValue }) => { 
    try {
        const response = await fetch(`${BACKEND_URL}/add-user`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(userDetails)
        })

        const data = await response.json()

        if (!response.ok) { 
            return rejectWithValue(data?.message || "Failed to delete users")
        }

        return data

    } catch (error) { 
        return rejectWithValue(error?.message || "Internal Server Error")
    }
})

export const updateUser = createAsyncThunk('/updateUser', async ({userDetails, userId}, { rejectWithValue }) => { 
    try {
        const response = await fetch(`${BACKEND_URL}/user/${userId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(userDetails)
        })

        const data = await response.json()

        if (!response.ok) { 
            return rejectWithValue(data?.message || "Failed to delete users")
        }

        return data

    } catch (error) { 
        return rejectWithValue(error?.message || "Internal Server Error")
    }
})

const UserSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        loading: true,
        currentUser: null
    },
    reducers: {
        setCurrentUser(state, action) {
            state.currentUser = action.payload
        }
    },
    extraReducers: (builders) => { 
        builders
        .addCase(getAllUsers.pending, (state, action) => {
                state.loading = true
            })
        .addCase(getAllUsers.fulfilled, (state, action) => {
            state.users = action.payload
            state.loading = false
        })
        .addCase(getAllUsers.rejected, (state, action) => { 
            state.loading = false
        })
        .addCase(deleteUser.pending, (state, action) => {
                state.loading = true
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
            state.users = state.users.filter((user) => user.id != action.payload.userId)
            state.loading = false
        })
        .addCase(deleteUser.rejected, (state, action) => { 
            state.loading = false
        })
        .addCase(addUser.pending, (state, action) => {
            state.loading = true
        })
        .addCase(addUser.fulfilled, (state, action) => {
            state.users.push(action.payload.user)
            state.loading = false
        })
        .addCase(addUser.rejected, (state, action) => { 
            state.loading = false
        })
        .addCase(updateUser.pending, (state, action) => {
            state.loading = true
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            const updateUserIndex = state.users.findIndex((user) => user.id == action.payload.user.id)
            state.users[updateUserIndex] = action.payload.user
            state.loading = false
        })
        .addCase(updateUser.rejected, (state, action) => { 
            state.loading = false
        })
    } 
})

export const userActions = UserSlice.actions

export default UserSlice