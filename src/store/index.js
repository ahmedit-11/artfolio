import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import allPortfolio from "./getAllPortfolio/getAllPortfolioSlice"
import categories from "./Categories/categoriesSlice"
import users from "./users/userSlice"
import auth from "./auth/authSlice"
import createPortfolio from "./createPortfolio/createPortfolioSlice"
import tags from "./tags/tagsSlice"
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
const persistAllPortfolio = {
  key: "allPortfolio",
  storage,
};
const persistCategories = {
  key: "categories",
  storage,
};
const persistUsers = {
      key: "users",
      storage,
    };
const persistAuth = {
  key: "auth",
  storage,
};
const persistCreatePortfolio = {
  key: "createPortfolio",
  storage,
};
const persistTags = {
  key: "tags",
  storage,
};

const rootReducer = combineReducers({
      allPortfolio: persistReducer(persistAllPortfolio, allPortfolio),
      categories: persistReducer(persistCategories, categories),
      users: persistReducer(persistUsers, users),
      auth: persistReducer(persistAuth, auth),
      createPortfolio: persistReducer(persistCreatePortfolio, createPortfolio),
      tags: persistReducer(persistTags, tags),
  });
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);