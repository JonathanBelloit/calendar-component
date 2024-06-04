import { configureStore } from "@reduxjs/toolkit";
import eventSlice from "./eventSlice";

export const store = configureStore({
  reducer: {
    events: eventSlice,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;