import { createSlice } from "@reduxjs/toolkit";


const  initialState = {
    currentUser:null,
    loading: false,
    error: null,

}


const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart: (state) =>{
            state.loading = true;
            console.log('leaving the start from slice abc')
        },
        signInSuccess:  (state, action) =>{
            console.log('abc from slice',action.payload)
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure:  (state, action) =>{
            state.error = action.payload;
            state.loading = false;

        }


    }
})

export  const {signInStart,signInSuccess,signInFailure} = userSlice.actions;

export  default userSlice.reducer;


