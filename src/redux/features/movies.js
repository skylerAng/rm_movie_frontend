import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  results: [],
  hasMore: false,
  totalResults: 0,
  page: 0,
  totalPages: 0,
  isFetching: false
};

const moviesSlice = createSlice({
  name: "moviesSlice",
  initialState,
  reducers: {
    getNowPlaying: (state, action) => {
      return {
        ...state,
        isFetching: true
      }
    },
    fetchedNowPlaying: (state, action) => {
      return {
        ...state,
        results: [...state.results, action.payload.results], // using result from state and adding back
        hasMore: action.payload.page < action.payload.total_pages, 
        totalResults: action.payload.total_results,
        page: action.payload.page,
        totalPages: action.payload.totalPages,
        isFetching: false,
      }
    },
    resetState: (state) =>{
      return initialState;
    }
  }
});

export const {
  getNowPlaying,
  fetchedNowPlaying,
  resetState
} = moviesSlice.actions;

export default moviesSlice.reducer;