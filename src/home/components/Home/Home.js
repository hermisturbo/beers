import React from "react";
import Beers from "../Beers";
import FavouriteBeers from "../FavouriteBeers";
import { bemNamesFactory } from "bem-names";
import { connect } from "react-redux";
import ErrorBoundary from "../../../common/components/ErrorBoundary";
import "./Home.scss";

const mapStateToProps = state => {
  return {
    favouriteBeers: state.home.beersReducer.favouriteBeers
  };
};
const Home = ({
  favouriteBeers,
  match: {
    params: { number = 1 }
  }
}) => {
  const bem = bemNamesFactory("home");
  const hasFavourites = Object.values(favouriteBeers).length > 0;
  const mainClassName = hasFavourites ? bem(["with-favourites"]) : bem();
  return (
    <ErrorBoundary>
      <div className={mainClassName}>
        <Beers number={number} />
        {hasFavourites && <FavouriteBeers data={favouriteBeers} />}
      </div>
    </ErrorBoundary>
  );
};

export default connect(mapStateToProps, null)(Home);
