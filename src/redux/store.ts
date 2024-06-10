import { configureStore } from "@reduxjs/toolkit";
import eventSlice from "./eventSlice";
import scheduleSlice from "./scheduleSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    events: eventSlice,
    schedule: scheduleSlice,
    user: userSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;