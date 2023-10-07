import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import searchReducer from "./features/search";
import genresReducer from "./features/genres";
import moviesReducer from "./features/movies";
import movieReducer from "./features/movie";

import watcherSaga from "../sagas";
// Create new instance of middleware for store
import createSagaMiddleware from "@redux-saga/core";



const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    search: searchReducer,
    genres: genresReducer,
    movies: moviesReducer,
    movie: movieReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ think: false}).prepend(sagaMiddleware);
  }
    
});

sagaMiddleware.run(watcherSaga); 


export default store;