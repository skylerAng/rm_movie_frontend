import { delay, all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { fetchedSearchMovies, searchMovies } from '../redux/features/search';
import { fetchedGenres, getGenres } from '../redux/features/genres';
import { fetchedNowPlaying, getNowPlaying } from '../redux/features/movies';
import { fetchedMovie, getMovie } from '../redux/features/movie';
import { API_KEY } from '../configs/config.js';
import TMDBApi from '../lib/api';

const api = new TMDBApi(API_KEY);

// create a generator function
function* fetchSearchMovies(action) {
    // Prevent too many requests
    yield delay(500);

    yield put(
        fetchedSearchMovies(yield call(api.searchMovies, action.payload))
    );
}

function* fetchGenres() {
    yield put(fetchedGenres(yield call(api.getGenres)));
}

function* fetchNowPlaying(action) {   
    yield put(
        fetchedNowPlaying(
            yield call(api.getNowPlaying, action.payload)
        ),
    );
}

function* fetchMovie(action){
    yield put(fetchedMovie(yield call(api.getMovie, action.payload)));
}

// watch for action then trigger another action
export default function* watcherSaga() {
    // Provide all actions to watch for and then call other generator functions
    yield all([
        yield takeLatest(searchMovies.type, fetchSearchMovies),
        yield takeEvery(getGenres.type, fetchGenres),
        yield takeEvery(getNowPlaying.type, fetchNowPlaying),
        yield takeEvery(getMovie.type, fetchMovie)
    ])
}