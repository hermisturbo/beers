import React from "react";
import { bemNamesFactory } from "bem-names";
import ErrorBoundary from "../../../common/components/ErrorBoundary";
import BeerItem from "../BeerItem";
import "./FavouriteBeers.scss";

const FavouriteBeers = ({ data }) => {
  const bem = bemNamesFactory("home__favourite-beers");
  return (
    <ErrorBoundary>
      <aside className={bem()}>
        <h3 className={bem("title")}>Favourites</h3>
        <div className={bem("list")}>
          {Object.values(data).map(oneFavouriteBeer => {
            return (
              <BeerItem key={oneFavouriteBeer.id} beerData={oneFavouriteBeer} />
            );
          })}
        </div>
      </aside>
    </ErrorBoundary>
  );
};
export default FavouriteBeers;
