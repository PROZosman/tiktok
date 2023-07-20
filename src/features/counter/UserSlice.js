
import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({

    name: 'Login',

    initialState: {
      login :  localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : null
    },

    reducers: {
      LogingUser: (state, action) => {
        state.login = action.payload
      },
    },
  });

  export const { LogingUser } = UserSlice.actions;

export default UserSlice.reducer;