import React from "react";
import { Grid, Typography } from "@mui/material";
import movie from "../../redux/features/movie";
import { IMAGES_PATH, COVER_PLACEHOLDER} from "../../configs/config";
import { styled } from "@mui/system";

const GridStyled = styled(Grid)(({theme}) => {
    marginBottom: theme.spacing(3)
});

const ImgStyled = styled('img')({
    width: "100%"  
})

const Movie = ({movie, genres}) => {

    return(
        <GridStyled container={true} spacing={2}>
            <Grid item={true} md={3}>
                {
                     movie.poster_path ? 
                     <ImgStyled 
                        src={`${IMAGES_PATH}/w300${movie.poster_path}`}
                        alt={movie.title}
                     /> 
                     :
                     <ImgStyled 
                        src={COVER_PLACEHOLDER}
                        alt={movie.title}
                     />
                }
            </Grid>
            <Grid item={true} md={9}></Grid>
        </GridStyled>
    )
};

export default Movie;