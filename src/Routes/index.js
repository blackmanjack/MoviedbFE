import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MovieList from "../movie/movieCard";
import MovieDetail from "../movie/movieDetail";

const SwitchRouter = () => {
  return (
    <>
      <Router>
        <nav id="navbar">
          <div className="nav-wrapper">
            <div className="logo">MovieDB Clone</div>
            {/* <ul id="menu">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/collection">Collection</Link>
              </li>
            </ul> */}
          </div>
        </nav>
        <Route exact path="/">
          <MovieList />
        </Route>

        <Route path="/detail/:id-:title">
          <MovieDetail />
        </Route>
      </Router>
    </>
  );
};

export default SwitchRouter;
