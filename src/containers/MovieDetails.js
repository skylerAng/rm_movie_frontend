import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import movie, { getMovie, resetState } from "../redux/features/movie";
import Loader from "../components/common/Loader";
import Movie from "../components/common/Movie";

const MovieDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { movie } = useSelector((store) => store);
    const { genres } = useSelector((store) => store.genres);

    useEffect(() => {
        dispatch(getMovie(id ? parseInt(id, 10) : 0));

        return () => {
            dispatch(resetState)
        }
    }, [dispatch]);

    useEffect(() => {
        // add ternary to check for empty
        if (id !== movie.id?.toString()) {
            dispatch(getMovie(id ? parseInt(id, 10) : 0));
        }
    }, [id, movie.id])
    console.log(`Movie is fetching? : ${movie.isFetching}`)
    return (
        movie.isFetching ? <Loader /> : <Movie movie={movie} genres={genres}/>
    );
}

export default MovieDetails;