import React from "react";
import { CircularProgress } from "@mui/material";
import { styled } from "@mui/system";

const LoaderWrapper = styled('div')(({theme}) => ({
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(3) // use theme to access spacing system
}));

const Loader = () => {
    // Render CircularProgress and customize styles
    return(
 
        <LoaderWrapper>
            <CircularProgress />
        </LoaderWrapper>

    )
};

export default Loader;