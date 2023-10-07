import React from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";
import { Link } from "react-router-dom"
import logo from '../../img/logo.png';
import { styled } from "@mui/system";
import SearchMoviesSuggestion from "../../containers/SearchMoviesSuggestion";

const darkTheme = createTheme({
    palette: {
        mode: 'dark'
    }
})

const Img = styled('img')({
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
    width: 500,
    maxWidth: '100%'
});

// Set custom style for larger screens
const LayoutWrapper = styled('div')(({theme}) => ({
    margin: 24, 
    width: 'auto',
    [theme.breakpoints.up("lg")] : {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: theme.breakpoints.values.lg
    }
}));

// Create wrapper component for content
const Layout = ({children}) => {
    return(
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <LayoutWrapper>
                <Link to="/">
                    <Img src={logo} alt="Movie Logo"/>
                </Link>
                <SearchMoviesSuggestion />
                {children}
            </LayoutWrapper>
        </ThemeProvider>
    );
}

export default Layout;