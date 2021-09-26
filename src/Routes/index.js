import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MovieList from "../movie/movieCard";
import MovieDetail from "../movie/movieDetail";

const SwitchRouter = () => {
  return (
    <>
      <Router>
        <Route exact path="/">
          <MovieList />
        </Route>

        <Route path="/detail/:id">
          <MovieDetail />
        </Route>
      </Router>
    </>
  );
};

export default SwitchRouter;
