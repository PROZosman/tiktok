
import { createSlice } from '@reduxjs/toolkit';


export const themeSlice = createSlice({

  name : "Darkmode",

  initialState : {
    Darkmode : localStorage.getItem("mode") ? JSON.parse(localStorage.getItem("mode")) : false,
  },

  reducers: {
      Thememode : (state, action) => {
        state.Darkmode = action.payload
      },
    },
  });

export const { Thememode } = themeSlice.actions;
export default themeSlice.reducer;