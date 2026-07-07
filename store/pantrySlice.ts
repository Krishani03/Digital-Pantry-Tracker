import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllItems } from '../service/pantryService';
import { scheduleLowStockNotification } from '../service/notificationService';

export const fetchItems = createAsyncThunk('pantry/fetchItems', async () => {
  const items = await getAllItems();
  
  // Trigger notifications here in the async function
  items.forEach((item: any) => {
    if (item.quantity < 100) {
      scheduleLowStockNotification(item.name);
    }
  });

  return items; 
});

const pantrySlice = createSlice({
  name: 'pantry',
  initialState: { items: [] as any[], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload; // Update global state
        state.loading = false;
      });
  },
});

export default pantrySlice.reducer;