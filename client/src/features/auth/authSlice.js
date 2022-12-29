import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user:user? user: null,
    isLoading:false,
    isSuccess:true,
    isError:false,
    message:''
}

export const register = createAsyncThunk('api/register',async(user,thunkAPI)=>{
     try {
        const response = await axios.post('http://localhost:5000/api/auth/register',user)
        if(response.data){
            localStorage.setItem('user',JSON.stringify(response.data))
        }
        return response.data
    } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
})

export const login = createAsyncThunk('api/login',async(user,thunkAPI)=>{
     try {
        const response = await axios.post('http://localhost:5000/api/auth/login',user)
        if(response.data){
            localStorage.setItem('user',JSON.stringify(response.data))
        }
        return response.data
    } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
})
export const logout = createAsyncThunk('auth/logout', async () => {
    localStorage.removeItem('user')
  })

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{

    },
    extraReducers(builder){
        builder
        .addCase(register.pending,(state)=>{
            state.isLoading= true
        })
        .addCase(register.fulfilled, (state,action)=>{
            state.isLoading = false
            state.user  = action.payload
            state.isError = false
            state.message = null
        })
        .addCase(register.rejected,(state,action)=>{
            state.isError = true
            state.isLoading = false
            state.user = null
            state.message = action.payload
        })
        .addCase(login.pending,(state)=>{
            state.isLoading= true
        })
        .addCase(login.fulfilled, (state,action)=>{
            state.isLoading = false
            state.user  = action.payload
            state.isError = false
            state.message = null
        })
        .addCase(login.rejected,(state,action)=>{
            state.isError = true
            state.isLoading = false
            state.user = null
            state.message = action.payload
        })
        .addCase(logout.fulfilled, (state) => {
            state.user = null
          })
    }
})

export default authSlice.reducer