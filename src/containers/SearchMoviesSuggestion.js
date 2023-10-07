import React from "react";
import Suggestion from "../components/common/Suggestion";
import { useSelector } from "react-redux";

const SearchMoviesSuggestion = () => {
    // Select state from redux store
    const {search} = useSelector((store) => store);
    const {genres} = useSelector((store) => store.genres);

    console.log(search.isFetching);
    return (<Suggestion movies={search} genres={genres}/>);
}

export default SearchMoviesSuggestion;