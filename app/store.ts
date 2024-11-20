// store.ts
import { configureStore } from "@reduxjs/toolkit";
import tweetReducer from "./features/tweets/tweet-slice";

const Stoore = configureStore({
  reducer: {
    tweets: tweetReducer, 
  },
});

export type RootState = ReturnType<typeof Stoore.getState>;
export type AppDispatch = typeof Stoore.dispatch;

export default Stoore;
