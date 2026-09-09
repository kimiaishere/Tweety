import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  loading: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },

    addPost(state, action) {
      state.posts.unshift(action.payload);
    },

    deletePost(state, action) {
      state.posts = state.posts.filter(
        (p) => p.id !== action.payload
      );
    },

    updatePost(state, action) {
      state.posts = state.posts.map((p) =>
        p.id === action.payload.id ? action.payload : p
      );
    },
  },
});

export const {
  setPosts,
  setLoading,
  addPost,
  deletePost,
  updatePost,
} = postsSlice.actions;

export default postsSlice.reducer;