import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      let index = state.items.findIndex((item) => item.id == action.payload);
      if (index >= 0) state.items.splice(index, 1);
    
    },
  },
});
// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions;
export const selectBasketItem = (state) => state.basketReducer.items;
export const selectTotal = (state) =>
  state.basketReducer.items.length > 0 &&
  state.basketReducer.items.reduce((total, item) => total + item.price, 0);
export const selectGroupedBasket = (state) => {
 return state.basketReducer.items.reduce((group, item) => {
    const { id } = item;
    group[id] = group[id] ?? [];
    group[id].push(item);
    return group;
  }, {});
};
export const selectBasketItemById = (state, id) =>
  state.basketReducer.items.filter((item) => item.id === id);
// export const setecBacketTotal=(state) => state.basket.items.reducer((total,tiem) =>total+=item.price,0)
export default basketSlice.reducer;
