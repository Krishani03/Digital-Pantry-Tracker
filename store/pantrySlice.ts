import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllItems, deleteItem } from '../service/pantryService';
import { scheduleLowStockNotification } from '../service/notificationService';

export const fetchItems = createAsyncThunk('pantry/fetchItems', async () => {
  const items = await getAllItems();
  items.forEach((item: any) => {
    if (item.quantity < 100) {
      scheduleLowStockNotification(item.name);
    }
  });
  return items;
});

export const deletePantryItem = createAsyncThunk('pantry/deleteItem', async (id: string) => {
  await deleteItem(id);
  return id; 
});

const pantrySlice = createSlice({
  name: 'pantry',
  initialState: { items: [] as any[], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => { state.loading = true; })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(deletePantryItem.fulfilled, (state, action) => {
        
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default pantrySlice.reducer;