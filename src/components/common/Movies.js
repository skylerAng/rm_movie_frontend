import React from "react";
import { ImageList, ImageListItem, ImageListItemBar, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import { IMAGES_PATH } from "../../configs/config";
import { mapGenres } from "../../lib/helper";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";

const ImgStyled = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover'
});

const ImageListItemStyled = styled(ImageListItem)({
    overflow: 'hidden'
})

const Movies = ({ movies, genres }) => {
    const theme = useTheme();
    // Match breakpoint every time it detects a small screen
    const matchDownMd = useMediaQuery(theme.breakpoints.down('sm'));
  
    if (Array.isArray(movies.results[0])) {
      return (
        <ImageList cols={matchDownMd ? 1 : 5} rowHeight={365} gap={12}>
          {movies.results[0].map((movie) => (
            <ImageListItemStyled key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                {/* Check and render poster if it exists */}
                {movie.poster_path && (
                  <ImgStyled
                    src={`${IMAGES_PATH}/w300${movie.poster_path}`}
                    alt={movie.title}
                  />
                )}
                <ImageListItemBar
                  title={movie.title}
                  subtitle={<span>{mapGenres(movie.genre_ids, genres)}</span>}
                />
              </Link>
            </ImageListItemStyled>
          ))}
        </ImageList>
      );
    } else if (Array.isArray(movies.results)) {
      return (
        <ImageList cols={matchDownMd ? 1 : 5} rowHeight={365} gap={12}>
          {movies.results.map((movie) => (
            <ImageListItemStyled key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                {/* Check and render poster if it exists */}
                {movie.poster_path && (
                  <ImgStyled
                    src={`${IMAGES_PATH}/w300${movie.poster_path}`}
                    alt={movie.title}
                  />
                )}
                <ImageListItemBar
                  title={movie.title}
                  subtitle={<span>{mapGenres(movie.genre_ids, genres)}</span>}
                />
              </Link>
            </ImageListItemStyled>
          ))}
        </ImageList>
      );
    } else {
      return null;
    }
};

export default Movies;