import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { db } from '../config/firebase'; // Adjust the import according to your Firebase setup
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query } from 'firebase/firestore';
import { RootState } from './store';
import { Timestamp } from 'firebase/firestore'

// Define the event type
interface Event {
  id?: string;
  title: string;
  description: string;
  date: string | Date;
  dateString: string; // Store dates as ISO strings for simplicity
  time: string;
  user: string | undefined;
}

interface EventState {
  events: Event[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: EventState = {
  events: [],
  loading: false,
  error: null,
};

// Async thunks for CRUD operations
export const fetchEvents = createAsyncThunk<Event[], string>(
  'events/fetchEvents',
  async (userEmail) => {
    const q = query(collection(db, `users/${userEmail}/calendarEvents`));
    const querySnapshot = await getDocs(q);
    const events: Event[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.date) {
        events.push({
          id: doc.id,
          title: data.title,
          description: data.description,
          date: data.date instanceof Timestamp ? data.date.toDate().toISOString() : new Date(data.date).toISOString(), // Convert to ISO string
          dateString: data.date instanceof Timestamp ? data.date.toDate().toISOString() : new Date(data.date).toISOString(), // Convert to ISO string
          time: data.time,
          user: data.user
        } as Event);
      }
    });
    return events;
  }
);

export const addEvent = createAsyncThunk<Event, { userEmail: string; event: Omit<Event, 'id'> }>(
  'events/addEvent',
  async ({ userEmail, event }) => {
    const eventWithISODate = {
      ...event,
      date: new Date(event.date).toISOString(), // Convert date to ISO string
      dateString: new Date(event.date).toISOString() // Convert date to ISO string
    };
    const docRef = await addDoc(collection(db, `users/${userEmail}/calendarEvents`), eventWithISODate);
    return { id: docRef.id, ...eventWithISODate };
  }
);

export const shareEvent = createAsyncThunk<Event, { userEmail: string; event: Event }>(
  'events/shareEvent',
  async ({ userEmail, event }) => {
    const eventWithISODate = {
      ...event,
      date: new Date(event.date).toISOString(), // Convert date to ISO string
      dateString: new Date(event.date).toISOString() // Convert date to ISO string
    };
    const docRef = await addDoc(collection(db, `users/${userEmail}/calendarEvents`), eventWithISODate);
    return { id: docRef.id, ...eventWithISODate };
  }
);

export const updateEvent = createAsyncThunk<void, { userEmail: string; event: Event }>(
  'events/updateEvent',
  async ({ userEmail, event }) => {
    const eventWithISODate = {
      ...event,
      date: new Date(event.date).toISOString(), // Convert date to ISO string
      dateString: new Date(event.date).toISOString() // Convert date to ISO string
    };
    const eventDoc = doc(db, `users/${userEmail}/calendarEvents`, event.id!);
    await updateDoc(eventDoc, eventWithISODate);
  }
);

export const deleteEvent = createAsyncThunk<void, { userEmail: string; eventId: string }>(
  'events/deleteEvent',
  async ({ userEmail, eventId }) => {
    const eventDoc = doc(db, `users/${userEmail}/calendarEvents`, eventId);
    await deleteDoc(eventDoc);
  }
);

// Slice
const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchEvents.fulfilled,
        (state, action: PayloadAction<Event[]>) => {
          state.loading = false;
          state.events = action.payload;
        }
      )
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch events";
      })
      .addCase(addEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addEvent.fulfilled, (state, action: PayloadAction<Event>) => {
        state.loading = false;
        state.events.push(action.payload);
      })
      .addCase(addEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add event";
      })
      .addCase(shareEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(shareEvent.fulfilled, (state, action: PayloadAction<Event>) => {
        state.loading = false;
        state.events.push(action.payload);
      })
      .addCase(shareEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add event";
      })
      .addCase(updateEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEvent.fulfilled, (state, action: PayloadAction<Event>) => {
        state.loading = false;
        const index = state.events.findIndex(
          (event) => event.id === action.payload.id
        );
        if (index !== -1) {
          state.events[index] = action.payload;
        }
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update event";
      })
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteEvent.fulfilled,
        (state) => {
          state.loading = false;
        }
      )
      .addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete event";
      });
  },
});

// Selectors
export const selectEvents = (state: RootState) => state.events.events;
export const selectLoading = (state: RootState) => state.events.loading;
export const selectError = (state: RootState) => state.events.error;

export default eventSlice.reducer;
