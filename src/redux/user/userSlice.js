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

        },
        updateUserStart:  (state) =>{
            state.loading = true;
        },
        updateUserSuccess:  (state, action) =>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateUserFailure:  (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        },
        deleteUserStart: (state)=>{
            state.loading = true;
        
        },
        deleteUserSuccess: (state, action) =>{
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        deleteUserFailure:(state,action)=>{
            state.error = action.payload;
            state.loading = false;
        },
        signOutStart: (state)=>{
            state.loading = true;
        
        },
        signOutsuccess: (state, action) =>{
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        signOutFailure:(state,action)=>{
            state.error = action.payload;
            state.loading = false;
        }



    }
})

export  const {signInStart,signInSuccess,signInFailure,updateUserStart,updateUserSuccess,updateUserFailure,deleteUserFailure,deleteUserStart,deleteUserSuccess,signOutFailure,signOutStart,signOutsuccess} = userSlice.actions;

export  default userSlice.reducer;


