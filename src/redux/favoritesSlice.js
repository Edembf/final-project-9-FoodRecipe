import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriterecipes: [], // Updated to handle favorite articles

};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const recipe = action.payload;
      const existingIndex = state.favoriterecipes.findIndex(
        (fav) => fav.idFood === recipe.idFood
      );
      if (existingIndex >= 0) {
        // If already in favorites, remove it
        state.favoriterecipes.splice(existingIndex, 1);
      } else {
        // Otherwise, add it to favorites
        state.favoriterecipes.push(recipe);
      }
    },
   
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
