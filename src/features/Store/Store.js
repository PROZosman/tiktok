import { configureStore } from '@reduxjs/toolkit'
import UserSlice from '../counter/UserSlice';
import  activeChatSlice from '../counter/activeChatSlice';
import modeSlice from '../counter/themeSlice';


export const Store = configureStore({
  reducer: {
  LogIn :  UserSlice,
  activechat : activeChatSlice,
  themechange : modeSlice,
},

middleware: (getDefaultMiddleware) =>
getDefaultMiddleware({
  serializableCheck: false,
}),

});

export default Store;

