import { getBeers } from "../../core/provider";

export const fetchBeers = (page = 1, perPage = 50) => {
  return {
    type: "BEERS_GET",
    payload: getBeers(page, perPage)
  };
};

export const toggleFavourites = beerId => {
  return {
    type: "BEERS_FAVOURITES_TOGGLE",
    payload: beerId
  };
};
