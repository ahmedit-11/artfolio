import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import allPortfolio from "./getAllPortfolio/getAllPortfolioSlice"
import categories from "./Categories/categoriesSlice"
import users from "./users/userSlice"
import auth from "./auth/authSlice"
import createPortfolio from "./createPortfolio/createPortfolioSlice"
import tags from "./tags/tagsSlice"
import updatePortfolio from "./updatePortfolio/updateportfolioSlice"
import currentUser from "./currentUser/currentUserSlice"
import updateProfile from "./updateProfile/updateProfileSlice"
import userPortfolios from "./userPortfolios/userPortfoliosSlice"
import deletePortfolio from "./deletePortfolio/deletPortfolioSlice"
import portfolioDetails from "./portfolioDetails/portfolioDetailsSlice"
import comments from "./comments/commentsSlice"
import dashboard from "./dashboard/dashboardSlice"
import forYou from "./forYou/forYouSlice"
import trending from "./trending/trendingSlice"
import categoryPortfolios from "./categoryPortfolios/categoryPortfoliosSlice"
import social from "./social/socialSlice"
import ratings from "./ratings/ratingsSlice"
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
const persistUpdatePortfolio = {
  key: "updatePortfolio",
  storage,
};
const persistCurrentUser = {
  key: "currentUser",
  storage,
};
const persistUpdateProfile = {
  key: "updateProfile",
  storage,
};
const persistUserPortfolios = {
  key: "userPortfolios",
  storage,
};
const persistDeletePortfolio = {
  key: "deletePortfolio",
  storage
}
const persistPortfolioDetails = {
  key: "portfolioDetails",
  storage
}

const persistComments = {
  key: "comments",
  storage
}

const persistDashboard = {
  key: "dashboard",
  storage
}

const persistCategoryPortfolios = {
  key: "categoryPortfolios",
  storage
}

const persistSocial = {
  key: "social",
  storage
}

const persistRatings = {
  key: "ratings",
  storage
}

const persistTrending = {
  key: "trending",
  storage
}

const persistForYou = {
  key: "forYou",
  storage
}


const rootReducer = combineReducers({
      allPortfolio: persistReducer(persistAllPortfolio, allPortfolio),
      categories: persistReducer(persistCategories, categories),
      users: persistReducer(persistUsers, users),
      auth: persistReducer(persistAuth, auth),
      currentUser: persistReducer(persistCurrentUser, currentUser),
      createPortfolio: persistReducer(persistCreatePortfolio, createPortfolio),
      tags: persistReducer(persistTags, tags),
      updatePortfolio: persistReducer(persistUpdatePortfolio, updatePortfolio),
      updateProfile: persistReducer(persistUpdateProfile, updateProfile),
      userPortfolios: persistReducer(persistUserPortfolios, userPortfolios),
      deletePortfolio: persistReducer(persistDeletePortfolio,deletePortfolio),
      portfolioDetails: persistReducer(persistPortfolioDetails, portfolioDetails),
      comments: persistReducer(persistComments, comments),
      dashboard: persistReducer(persistDashboard, dashboard),
      forYou: persistReducer(persistForYou, forYou),
      trending: persistReducer(persistTrending, trending),
      categoryPortfolios: persistReducer(persistCategoryPortfolios, categoryPortfolios),
      social: persistReducer(persistSocial, social),
      ratings: persistReducer(persistRatings, ratings),
    });
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: false, // Disable in development to improve performance
    }),
});
export const persistor = persistStore(store);