import { configureStore } from '@reduxjs/toolkit'
import UserSlice from '../counter/UserSlice';


export const Store = configureStore({
  reducer: {
  LogIn :  UserSlice,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  
}

});

export default Store;

