import React from "react";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { Link } from "react-router-dom";
import { IMAGES_PATH } from "../../configs/config";
import { mapGenres } from "../../lib/helper";
import { styled } from "@mui/system";

const ImgStyled = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover'
});

const Movies = ({movies, genres}) => {
    
    if (Array.isArray(movies.results[0])){
        return (
            <ImageList cols={5} rowHeight={365} gap={12}>
                {
                    movies.results[0].map((movie) => (  
                        
                        console.log("Movie:", movie),
                        console.log("Poster Path:", movie.poster_path),
                        console.log("Genres:", mapGenres(movie.genre_ids, genres)),
                    
                        <ImageListItem key={movie.id}>
                            <Link to={`/movie/${movie.id}`}>
                                {/* Check and render poster if exist */}
                                {
                                    movie.poster_path && (
                                        <ImgStyled src={`${IMAGES_PATH}/w300${movie.poster_path}`} 
                                             alt={movie.title} />
                                    )
                                }
                                <ImageListItemBar
                                    title={movie.title}
                                    subtitle={<span>{mapGenres(movie.genre_ids, genres)}</span>}
                                />
                            </Link>
                        </ImageListItem>
                    ))
                }
            </ImageList>
        )
    }else{
        return null;
    }
    
}

export default Movies;