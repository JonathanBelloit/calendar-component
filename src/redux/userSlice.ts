import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { db } from '../config/firebase';
import { collection, getDocs, query, addDoc, updateDoc, doc } from 'firebase/firestore';
import { RootState } from './store';

interface UserData {
  id?: string,
  firstName: string,
  lastName: string,
  sharingAllowed: string[];
}

interface UserState {
  userData: UserData[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userData: [],
  loading: false,
  error: null,
}

export const fetchUserData =  createAsyncThunk<UserData[], string>(
  async (userEmail: string) => {
    const q = query(collection(db, `users/${userEmail}/userData`));
    const querySnapshot = await getDocs(q);
    const userData: UserData[] =[];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (userEmail) {
        userData.push({
          id: doc.id,
          firstName: data.firstName,
          lastName: data.lastName,
          sharingAllowed: data.sharingAllowed
        } as UserData);
      }
    });
    return userData;
  }
)

export const addUser = createAsyncThunk<UserData, { userEmail: string; user: Omit<UserData, 'id'> }>(
  'user/addUser',
  async ({ userEmail, user }) => {
    const docRef = await addDoc(collection(db, `users/${userEmail}/userData`), user);
    return { id: docRef.id, ...user };
  }
);

export const updateUser = createAsyncThunk<void, { userEmail: string; user: UserData }>(
  'user/updateUser',
  async ({ userEmail, user }) => {
    const userDoc = doc(db, `users/${userEmail}/userData`, user.id);
    await updateDoc(userDoc, { ...user });
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action: PayloadAction<UserData[]>) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user data';
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.loading = false;
        state.userData.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add user';
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.loading = false;
        const index = state.userData.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.userData[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update user';
      });
  },
});

// Selectors
export const selectUserData = (state: RootState) => state.user.userData;

export default userSlice.reducer;

