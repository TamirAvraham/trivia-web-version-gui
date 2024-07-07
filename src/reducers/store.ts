import { configureStore } from '@reduxjs/toolkit';
import authCounter from './userReducer'

const store = configureStore({
    reducer: {
        auth: authCounter,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store