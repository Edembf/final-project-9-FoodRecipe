# FoodRecipe

A React Native (Expo) mobile app to browse, view, favorite, and create custom food recipes.

This project demonstrates a small recipe application built with Expo, React Native, and Redux Toolkit. Custom recipes are persisted using AsyncStorage and the app is responsive across screen sizes using `react-native-responsive-screen`.

## Features
- Browse curated recipes by category
- View recipe details and instructions
- Save favorites (in-app via Redux)
- Create, edit and delete custom recipes (persisted in AsyncStorage)
- Simple navigation using React Navigation

## Tech Stack
- React Native + Expo
- React Navigation (native stack)
- Redux Toolkit (`@reduxjs/toolkit`) + `react-redux`
- AsyncStorage (`@react-native-async-storage/async-storage`)
- `react-native-responsive-screen` for responsive sizing
- `react-native-reanimated` for small animations

## Project Structure (important files)
- `App.js` — app root and Redux `Provider`
- `src/navigation/index.js` — app navigation stack
- `src/screens/` — screen components (Home, RecipeDetail, MyRecipe, Favorites, etc.)
- `src/components/` — shared UI components (Categories, Recipes)
- `src/redux/` — Redux store and `favoritesSlice`

## Setup & Run
Prerequisites: Node.js, npm, and Expo CLI installed.

1. Install dependencies

```bash
npm install
```

2. Start the Expo development server

```bash
npx expo start
```

3. Open on a device/emulator
- Scan the QR code with Expo Go (Android) or open the project in an iOS/Android emulator from the Expo UI.

## Scripts
- `npm start` — start Expo
- `npm run android` — open on Android
- `npm run ios` — open on iOS
- `npm run web` — open in web browser

## Notes & Troubleshooting
- Custom recipes are stored under the AsyncStorage key `customrecipes`. If you edit the structure, you may need to clear storage.
- Favorites are stored only in Redux state and are not persisted between app restarts.
- If categories don't filter correctly, ensure `Categories` receives `handleChangeCategory` (prop) and the `HomeScreen` uses the filtered list when rendering recipes.

## Contributing
- Fork the repository, create a branch, add features or fixes, and open a pull request.

## License
This repository includes an `LICENSE` file. Check it for usage terms.

---
If you'd like, I can also:
- Add a CONTRIBUTING.md with development tips
- Add automated tests or a simple E2E check
- Persist favorites to AsyncStorage

Tell me what you'd like next.
