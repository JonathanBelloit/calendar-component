import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { db } from '../config/firebase';
import { collection, getDocs, query, addDoc, updateDoc, doc, where } from 'firebase/firestore';
import { RootState } from './store';

interface ScheduleItem {
  id?: string;
  date: string;
  time: string;
  title?: string;
  description?: string;
  type?: string;
  subtype?: string;
  available: boolean;
}

interface ScheduleState {
  schedule: ScheduleItem[];
  loading: boolean;
  error: string | null;
}

const initialState: ScheduleState = {
  schedule: [],
  loading: false,
  error: null,
};

export const fetchSchedule = createAsyncThunk<ScheduleItem[], { userEmail: string, date: string }>(
  'schedule/fetchSchedule',
  async ({ userEmail, date }) => {
    const q = query(collection(db, `users/${userEmail}/schedule`), where('date', '==', date));
    const querySnapshot = await getDocs(q);
    const schedule: ScheduleItem[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      schedule.push({ 
        id: doc.id,
        date: data.date,
        time: data.time,
        title: data.title,
        description: data.description,
        type: data.type,
        subtype: data.subtype,
        available: data.available,
      });
    });
    return schedule;
  }
);

export const addScheduleItem = createAsyncThunk<ScheduleItem, { userEmail: string; item: Omit<ScheduleItem, 'id'> }>(
  'schedule/addScheduleItem',
  async ({ userEmail, item }) => {
    const docRef = await addDoc(collection(db, `users/${userEmail}/schedule`), item);
    return { id: docRef.id, ...item };
  }
);

export const updateScheduleItem = createAsyncThunk<void, { userEmail: string; item: ScheduleItem }>(
  'schedule/updateScheduleItem',
  async ({ userEmail, item }) => {
    const itemDoc = doc(db, `users/${userEmail}/schedule`, item.id);
    await updateDoc(itemDoc, { ...item });
  }
);

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSchedule.fulfilled, (state, action: PayloadAction<ScheduleItem[]>) => {
        state.loading = false;
        state.schedule = action.payload;
      })
      .addCase(fetchSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch schedule";
      })
      .addCase(addScheduleItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addScheduleItem.fulfilled, (state, action: PayloadAction<ScheduleItem>) => {
        state.loading = false;
        state.schedule.push(action.payload);
      })
      .addCase(addScheduleItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add schedule item";
      })
      .addCase(updateScheduleItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateScheduleItem.fulfilled, (state, action: PayloadAction<ScheduleItem>) => {
        state.loading = false;
        const index = state.schedule.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.schedule[index] = action.payload;
        }
      })
      .addCase(updateScheduleItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update schedule item";
      });
  },
});

export const selectSchedule = (state: RootState) => state.schedule.schedule;

export default scheduleSlice.reducer;
