import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Stores items in the cart
  },
  reducers: {
    // Add a new item to the cart
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.name === action.payload.name
      );
      if (existingItem) {
        // If item already exists, just increase quantity
        existingItem.quantity += 1;
      } else {
        // Add new item with quantity 1
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    // Remove an item completely from the cart
    removeItem: (state, action) => {
      const itemName = action.payload; // payload should be the name of the plant
      state.items = state.items.filter((item) => item.name !== itemName);
    },

    // Update quantity of a specific item
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload; // payload: { name, quantity }
      const item = state.items.find((item) => item.name === name);
      if (item) {
        item.quantity = quantity;
        // Optional: Remove item if quantity <= 0
        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i.name !== name);
        }
      }
    },
  },
});

// Export actions to use in components
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export reducer to use in store.js
export default CartSlice.reducer;