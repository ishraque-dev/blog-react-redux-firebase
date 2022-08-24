import { createSlice, configureStore } from '@reduxjs/toolkit';
import { getDatabase, ref, set, push } from 'firebase/database';
const initialPosts = {
  photoUrl: '',
};
const postSlice = createSlice({
  name: 'postSlice',
  initialState: initialPosts,
  reducers: {
    addPost: (state, action) => {},
    deletePost: (state, action) => {},
    updatePost: (state, action) => {},
    uploadHandler: (state, action) => {
      const db = getDatabase();
      // console.log(action.payload);
      const { title, description, photoUrl, createdDate, author } =
        action.payload;
      set(push(ref(db, 'items/')), {
        title: title,
        description: description,
        photoUrl: photoUrl,
        createdDate: createdDate,
        author: author,
        status: false,
      });
    },
  },
});
const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['postSlice/uploadHandler'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    }),
  reducer: {
    postReducer: postSlice.reducer,
  },
});
export const postActions = postSlice.actions;
export default store;
