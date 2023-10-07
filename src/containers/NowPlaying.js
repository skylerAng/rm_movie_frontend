import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNowPlaying, resetState } from "../redux/features/movies";
import Loader from "../components/common/Loader";
import Movies from "../components/common/Movies";
import { Typography } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

const NowPlaying = () => {
    const dispatch = useDispatch();

    const { movies } = useSelector((store) => store);
    const { genres } = useSelector((store) => store.genres);
    
    useEffect(() => {
        // Clean up everything to the original state when navigating to this page
        dispatch(getNowPlaying());
        return () => {
            dispatch(resetState());
        }
    }, [dispatch]);
    
    console.log(movies);

    // Create function to call api when bottom of page is reached
    const loadMore = () => {
        if(movies.hasMore) {
            dispatch(getNowPlaying(movies.page + 1));
        }
    }

    // Display a loader, otherwise fetch movies
    return movies.page === 0 && movies.isFetching ? <Loader />
    : <>
        <Typography component="h2" variant="h3" gutterBottom={true}>
            Now Playing
        </Typography>
        <InfiniteScroll 
            dataLength={movies.totalResults} 
            next={loadMore} 
            hasMore={movies.hasMore}
            loader={<Loader />}
            style={{overflow: 'hidden'}}
            endMessage={<p>End of the line!</p>}
        >

            <Movies movies={movies} genres={genres}/>
        </InfiniteScroll>
    </>;
}

export default NowPlaying;