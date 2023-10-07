import React from "react";
import { TextField, Paper, MenuItem, Grid, Typography } from "@mui/material";
import { useDispatch } from "react-redux/es/exports";
import { searchMovies } from "../../redux/features/search";
import Downshift from "downshift";
import { Link } from "react-router-dom";
import { IMAGES_PATH, COVER_PLACEHOLDER } from "../../configs/config";
import { styled } from '@mui/system';
import { mapGenres } from "../../lib/helper";

const PaperStyled = styled(Paper)({
    // backgroundColor: 'darkgoldenrod',
    backgroundColor: '#2F7BC5',
    top: -40,
    position: 'relative'
});

const MenuItemStyled = styled(MenuItem)({
    paddingTop: 5,
    paddingBottom: 5
})

const ImgStyled = styled('img')({
    height: '100%'
})

const LinkStyled = styled(Link)({
    display: 'block',
    textDecoration: 'none'
})

const TitleStyled = styled(Typography)({
    color: 'black',
    paddingTop: 10
})

const CaptionStyled = styled(Typography)({
    color: 'black',
})

const Suggestion = ({ movies, genres }) => {
  // Gain access to the function to trigger actions in the redux store
  // and update the state of the application
  const dispatch = useDispatch();

  const inputOnChange = (event) => {
    if (!event.target.value) {
      return;
    }
    // Get value of input
    dispatch(searchMovies(event.target.value));
    
  };

  const itemToString = () => "";

  return (
    <Downshift itemToString={itemToString}>
      {/* Callback function to access certain fields */}
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
      }) => (
        <div>
          <TextField
            id="search"
            placeholder="Search"
            fullWidth={true}
            sx={{ mb: 5 }}
            variant="standard"
            InputProps={{
              ...getInputProps({
                onChange: inputOnChange,
              }),
            }}
          />
          {isOpen ? (
            <PaperStyled square={true} {...getMenuProps()}>
              {movies.results
                .slice(0, 10)
                // filter movies by search term
                .filter(
                  (item) =>
                    !inputValue ||
                    item.title.toLowerCase().includes(inputValue.toLowerCase())
                )
                .map((item, index) => (
                  <MenuItemStyled
                    {...getItemProps({
                      item,
                      key: item.id,
                      selected: highlightedIndex === index, // determine whether is selected
                      style: {
                        fontWeight: selectedItem === item ? 500 : 400, // set semi-bold or regular
                      },
                    })}
                  >
                    <LinkStyled to={`/movie/${item.id}`}>
                      {/* First grid acts as a property container */}
                      <Grid container={true} spacing={8}>
                        <Grid item={true}>
                          {item.poster_path ? (
                            <img
                              src={`${IMAGES_PATH}/w92${item.poster_path}`}
                              alt={item.title}
                            />
                          ) : (
                            <img src={`${COVER_PLACEHOLDER}`} alt={item.title} />
                          )}
                        </Grid>
                        <Grid item={true}>
                            <TitleStyled variant="h4">
                                {item.title}
                            </TitleStyled>
                            <CaptionStyled variant="caption">
                                {/* list and map down genres based on tag numbers */}
                                {mapGenres(item.genre_ids, genres)}
                            </CaptionStyled>
                        </Grid>
                      </Grid>
                    </LinkStyled>
                  </MenuItemStyled>
                ))}
            </PaperStyled>
          ) : null}
        </div>
      )}
    </Downshift>
  );
};

export default Suggestion;
