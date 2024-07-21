import { configureStore } from '@reduxjs/toolkit';
import authCounter from './userReducer'
import roomCounter from './roomsReducer'
const store = configureStore({
    reducer: {
        auth: authCounter,
        room: roomCounter,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store