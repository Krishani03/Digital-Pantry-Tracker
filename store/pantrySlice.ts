import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllItems } from '../service/pantryService';

export const fetchItems = createAsyncThunk('pantry/fetchItems', async () => {
  return await getAllItems();
});

const pantrySlice = createSlice({
  name: 'pantry',
  initialState: { items: [] as any[], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export default pantrySlice.reducer;