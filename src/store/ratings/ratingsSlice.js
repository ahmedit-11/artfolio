import { createSlice } from "@reduxjs/toolkit";
import { rateProjectThunk } from "./thunk/rateProjectThunk";
import { getRatingsThunk } from "./thunk/getRatingsThunk";
import { deleteRatingThunk } from "./thunk/deleteRatingThunk";

const initialState = {
    loading: false,
    currentProjectId: null,
    userRating: null, // Current user's rating for the project
    averageRating: 0,
    ratingsCount: 0,
    ratings: [], // All ratings for the project
    error: null
};

const ratingsSlice = createSlice({
    name: "ratings",
    initialState,
    reducers: {
        clearRatings: (state) => {
            state.ratings = [];
            state.userRating = null;
            state.averageRating = 0;
            state.ratingsCount = 0;
            state.currentProjectId = null;
            state.error = null;
        },
        setUserRatingFromProject: (state, action) => {
            const { projectId, userRating, averageRating, ratingsCount } = action.payload;
            state.currentProjectId = projectId;
            state.userRating = userRating;
            state.averageRating = averageRating;
            state.ratingsCount = ratingsCount;
        },
        resetRatingsState: (state) => {
            state.loading = false;
            state.currentProjectId = null;
            state.userRating = null;
            state.averageRating = 0;
            state.ratingsCount = 0;
            state.ratings = [];
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        // Rate project
        builder.addCase(rateProjectThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(rateProjectThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.currentProjectId = action.payload.projectId;
            state.userRating = action.payload.rating;
            state.averageRating = action.payload.average_rating;
            state.ratingsCount = action.payload.ratings_count;
        });
        builder.addCase(rateProjectThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Get ratings
        builder.addCase(getRatingsThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getRatingsThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.currentProjectId = action.payload.projectId;
            state.ratings = action.payload.ratings;
            state.averageRating = action.payload.averageRating;
            state.ratingsCount = action.payload.ratingsCount;
            
            // Preserve existing user rating if it was already set, otherwise find from ratings
            if (action.payload.preserveUserRating !== null) {
                state.userRating = action.payload.preserveUserRating;
            } else {
                const currentUserId = action.payload.currentUserId;
                const userRatingObj = state.ratings.find(rating => rating.user_id === currentUserId);
                state.userRating = userRatingObj ? userRatingObj.rating : null;
            }
            
            state.error = null;
        });
        builder.addCase(getRatingsThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Delete rating
        builder.addCase(deleteRatingThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteRatingThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.userRating = null;
            state.averageRating = action.payload.average_rating;
            state.ratingsCount = action.payload.ratings_count;
            // Remove user's rating from ratings array
            state.ratings = state.ratings.filter(r => r.user_id !== action.payload.userId);
        });
        builder.addCase(deleteRatingThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export const { resetRatingsState } = ratingsSlice.actions;
export default ratingsSlice.reducer;
