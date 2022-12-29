import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    notes :[],
    isLoading:false,
    isSuccess:false,
    isError: false,
    message:''
}

export const fetchNotes = createAsyncThunk('/notes/fetchNotes',async(notes,thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        const response = await axios.get('http://localhost:5000/api/notes/',config)
        // console.log(response.data)
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
export const createNote = createAsyncThunk('api/createNote',async(notes,thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        const response = axios.post('http://localhost:5000/api/notes/',notes,config)
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
export const deleteNote = createAsyncThunk('api/deleteNote',async(notesID,thunkAPI)=>{
    try {
      const token = thunkAPI.getState().auth.user.token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        const response = await axios.delete(`http://localhost:5000/api/notes/${notesID}`,config)
        console.log(notesID)
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
export const updateNote = createAsyncThunk('api/updateNote',async(note,thunkAPI)=>{
    try {
      const token = thunkAPI.getState().auth.user.token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        const response = await axios.put(`http://localhost:5000/api/notes/${note.id}`,note,config)
        console.log(note._id)
        console.log(response.data)
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

const noteSlice = createSlice({
    name:'notes',
    initialState,
    reducers:{
    reset: (state) => initialState,
    },
    extraReducers(builder){
        builder
           .addCase(fetchNotes.pending,(state)=>{
            state.isLoading = true
           })
           .addCase(fetchNotes.fulfilled,(state,action)=>{
            state.isLoading = true
            state.notes = action.payload
           })
           .addCase(fetchNotes.rejected,(state,action)=>{
            state.isLoading = true
            state.isError = false
            state.message = action.payload
           })
           .addCase(createNote.pending,(state)=>{
            state.isLoading = true
           })
           .addCase(createNote.fulfilled,(state,action)=>{
            state.isLoading = true
            state.notes.push(action.payload)
           })
           .addCase(createNote.rejected,(state,action)=>{
            state.isLoading = true
            state.isError = false
            state.message = action.payload
           })
           .addCase(deleteNote.pending,(state)=>{
            state.isLoading = true
           })
           .addCase(deleteNote.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.notes = state.notes.filter((item)=>{
                return item._id != action.payload
            })
            state.isLoading = true
            state.isError = false
           })
           .addCase(deleteNote.rejected,(state,action)=>{
            state.isLoading = true
            state.isError = false
            state.message = action.payload
           })
           .addCase(updateNote.pending,(state)=>{
            state.isLoading = true
           })
           .addCase(updateNote.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.notes.push(action.payload)
            state.isLoading = true
            state.isError = false
           })
           .addCase(updateNote.rejected,(state,action)=>{
            state.isLoading = true
            state.isError = false
            state.message = action.payload
           })
    }
})

export const {reset} = noteSlice.actions
export default noteSlice.reducer