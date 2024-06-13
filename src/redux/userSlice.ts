import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { db } from '../config/firebase';
import { doc, getDocs, updateDoc, addDoc, collection, query } from 'firebase/firestore';
import { RootState } from './store';

interface UserData {
  id?: string;
  firstName: string;
  lastName: string;
  sharingAllowed?: string[];
}

interface UserState {
  userData: UserData | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userData: null,
  loading: false,
  error: null,
};

export const fetchUserData = createAsyncThunk<UserData, { userEmail: string }>(
  'user/fetchUserData',
  async ({ userEmail }) => {
    const q = query(collection(db, `users/${userEmail}/userData`));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const docSnapshot = querySnapshot.docs[0];
      const data = docSnapshot.data();
      return {
        id: docSnapshot.id,
        firstName: data.firstName,
        lastName: data.lastName,
        sharingAllowed: data.sharingAllowed,
      } as UserData;
    } else {
      throw new Error("User data not found");
    }
  }
);

export const addUserData = createAsyncThunk<
  UserData,
  { userEmail: string; data: Omit<UserData, "id"> }
>("user/addUser", async ({ userEmail, data }) => {
  const docRef = await addDoc(
    collection(db, `users/${userEmail}/userData`),
    data
  );
  return { id: docRef.id, ...data };
});

export const updateUser = createAsyncThunk<{ user: UserData }, { userEmail: string; user: UserData }>(
  "user/updateUser",
  async ({ userEmail, user }) => {
    if (!user.id) {
      throw new Error("User ID is missing");
    }
    const userDoc = doc(db, `users/${userEmail}/userData`, user.id);
    await updateDoc(userDoc, { ...user });
    return { user }; // Return the updated user data
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
      .addCase(
        fetchUserData.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.loading = false;
          state.userData = action.payload;
        }
      )
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user data";
      })
      .addCase(addUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUserData.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(addUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add user";
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<{ user: UserData }>) => {
        state.loading = false;
        if (state.userData && action.payload.user.sharingAllowed) {
          state.userData.sharingAllowed = action.payload.user.sharingAllowed;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update user";
      });
  },
});

// Selectors
export const selectUserData = (state: RootState) => state.user.userData;

export default userSlice.reducer;
