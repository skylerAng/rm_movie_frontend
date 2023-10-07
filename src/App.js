import { BrowserRouter, Route, Routes } from "react-router-dom";
import NowPlaying from "./containers/NowPlaying";
import MovieDetails from "./containers/MovieDetails";
import Layout from "./components/layout/Layout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getGenres } from "./redux/features/genres";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);
  
  return (
    <div>
      {/* Enable client side routing */}
      <BrowserRouter>
        {/* Apply styles to all components within*/}
        <Layout>
          {/* This component is used to define what routes are going to be available*/}
          <Routes>
              <Route path="/" element={<NowPlaying/>}></Route>
              <Route path="/movie/:id" element={<MovieDetails/>}></Route>
          </Routes>
        </Layout>
          
      </BrowserRouter>

    </div>
  );
}

export default App;
