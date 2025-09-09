import { createSlice } from "@reduxjs/toolkit";
import { toggleFollowThunk } from "./thunk/toggleFollowThunk";
import { getFollowingCountThunk } from "./thunk/getFollowingCountThunk";
import { getFollowersCountThunk } from "./thunk/getFollowersCountThunk";
import { getFollowStatusThunk } from "./thunk/getFollowStatusThunk";
import { toggleLikeThunk } from "./thunk/toggleLikeThunk";
import { getLikesCountThunk } from "./thunk/getLikesCountThunk";
import { getLikedUsersThunk } from "./thunk/getLikedUsersThunk";
import { getLikeStatusThunk } from "./thunk/getLikeStatusThunk";

// File: src/store/social/socialSlice.js
const initialState = {
    loading: false,           // Follow button loading state
    loadingCounts: false,     // Counts loading (only initial load)
    countsLoaded: false,      // Tracks if counts were loaded once
    currentUserId: null,      // Track which user's data is currently loaded
    isFollowing: false,       // Current follow status
    followingCount: 0,        // How many people user follows
    followersCount: 0,        // How many people follow user
    
    // Like functionality
    likeLoading: false,       // Like button loading state
    loadingLikeCounts: false, // Like counts loading
    likeCountsLoaded: false,  // Tracks if like counts were loaded
    currentProjectId: null,   // Track which project's like data is loaded
    isLiked: false,          // Current like status
    likesCount: 0,           // How many likes the project has
    likedUsers: [],          // Users who liked the project
}
const socialSlice = createSlice({
    name: "social",
    initialState,
    reducers: {
        resetSocialState: (state) => {
            state.loading = false;
            state.loadingCounts = false;
            state.countsLoaded = false;
            state.currentUserId = null;
            state.error = null;
            state.isFollowing = false;
            state.followingCount = 0;
            state.followersCount = 0;
            state.followData = null;
            
            // Reset like state
            state.likeLoading = false;
            state.loadingLikeCounts = false;
            state.likeCountsLoaded = false;
            state.currentProjectId = null;
            state.isLiked = false;
            state.likesCount = 0;
            state.likedUsers = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(toggleFollowThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(toggleFollowThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.followData = action.payload;
            state.isFollowing = action.payload.following;
            
            // Optimistically update follower count locally to avoid extra API calls
            if (action.payload.userId === state.currentUserId) {
                if (action.payload.following) {
                    // User was followed, increment followers count
                    state.followersCount = Math.max(0, state.followersCount + 1);
                } else {
                    // User was unfollowed, decrement followers count
                    state.followersCount = Math.max(0, state.followersCount - 1);
                }
            }
        });
        builder.addCase(toggleFollowThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(getFollowingCountThunk.pending, (state) => {
            // Only show loading on initial load
            if (!state.countsLoaded) {
                state.loadingCounts = true;
            }
            state.error = null;
        });
        builder.addCase(getFollowingCountThunk.fulfilled, (state, action) => {
            state.loadingCounts = false;
            state.countsLoaded = true;
            state.currentUserId = action.meta.arg; // Store the user ID this data belongs to
            state.followingCount = action.payload.following_count;
        });
        builder.addCase(getFollowingCountThunk.rejected, (state, action) => {
            state.loadingCounts = false;
            state.error = action.payload;
        });
        builder.addCase(getFollowersCountThunk.pending, (state) => {
            // Only show loading on initial load
            if (!state.countsLoaded) {
                state.loadingCounts = true;
            }
            state.error = null;
        });
        builder.addCase(getFollowersCountThunk.fulfilled, (state, action) => {
            state.loadingCounts = false;
            state.countsLoaded = true;
            state.currentUserId = action.meta.arg; // Store the user ID this data belongs to
            state.followersCount = action.payload.followers_count;
        });
        builder.addCase(getFollowersCountThunk.rejected, (state, action) => {
            state.loadingCounts = false;
            state.error = action.payload;
        });
        builder.addCase(getFollowStatusThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getFollowStatusThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.isFollowing = action.payload.is_following;
        });
        builder.addCase(getFollowStatusThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        
        // Like functionality
        builder.addCase(toggleLikeThunk.pending, (state) => {
            state.likeLoading = true;
            state.error = null;
        });
        builder.addCase(toggleLikeThunk.fulfilled, (state, action) => {
            state.likeLoading = false;
            state.isLiked = action.payload.liked;
            state.currentProjectId = action.payload.projectId;
            
            // Optimistically update likes count locally
            if (action.payload.liked) {
                state.likesCount = Math.max(0, state.likesCount + 1);
            } else {
                state.likesCount = Math.max(0, state.likesCount - 1);
            }
        });
        builder.addCase(toggleLikeThunk.rejected, (state, action) => {
            state.likeLoading = false;
            state.error = action.payload;
        });
        
        builder.addCase(getLikesCountThunk.pending, (state) => {
            if (!state.likeCountsLoaded) {
                state.loadingLikeCounts = true;
            }
            state.error = null;
        });
        builder.addCase(getLikesCountThunk.fulfilled, (state, action) => {
            state.loadingLikeCounts = false;
            state.likeCountsLoaded = true;
            state.currentProjectId = action.payload.projectId;
            state.likesCount = action.payload.likes_count;
        });
        builder.addCase(getLikesCountThunk.rejected, (state, action) => {
            state.loadingLikeCounts = false;
            state.error = action.payload;
        });
        
        builder.addCase(getLikedUsersThunk.pending, (state) => {
            state.error = null;
        });
        builder.addCase(getLikedUsersThunk.fulfilled, (state, action) => {
            state.currentProjectId = action.payload.projectId;
            state.likedUsers = action.payload.liked_users;
        });
        builder.addCase(getLikedUsersThunk.rejected, (state, action) => {
            state.error = action.payload;
        });
        
        builder.addCase(getLikeStatusThunk.pending, (state) => {
            if (!state.likeCountsLoaded) {
                state.loadingLikeCounts = true;
            }
            state.error = null;
        });
        builder.addCase(getLikeStatusThunk.fulfilled, (state, action) => {
            state.loadingLikeCounts = false;
            state.likeCountsLoaded = true;
            state.currentProjectId = action.payload.projectId;
            state.isLiked = action.payload.isLiked;
            state.likesCount = action.payload.likesCount;
        });
        builder.addCase(getLikeStatusThunk.rejected, (state, action) => {
            state.loadingLikeCounts = false;
            state.error = action.payload;
        });
    }
});

export const { resetSocialState } = socialSlice.actions;
export default socialSlice.reducer;
