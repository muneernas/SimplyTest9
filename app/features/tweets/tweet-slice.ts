import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define UserState interface
interface UserModel {
  username: string;
  name: string;
  image: string;
  id: number;
}

// Define TweetState interface
interface TweetState {
  id: number;
  content: string;
  image: string | null;
  numberOfLikes: number;
  createdAt: string;
  numberOfRetweets: number;
  numberOfComments: number;
  impressions: number | null;
  user: UserModel;
}

interface stateModel{
  tweets:TweetState[]
}


const initialState: stateModel={
  tweets:[]
}; 

const tweetSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {
  
    addTweet(state, action: PayloadAction<TweetState[]>) {
      state.tweets = action.payload;
    },
    
   
    incrementLikes(state, action: PayloadAction<number>) {
      const tweet = state.tweets.find((tweet) => tweet.id === action.payload);
      if (tweet) {
        tweet.numberOfLikes++;
      }
    },
  },
});

export const { addTweet, incrementLikes } = tweetSlice.actions;
export default tweetSlice.reducer;
