import _ from "lodash";

export default (
  state = {
    beers: [],
    favouriteBeers: {},
    isFetching: false,
    fetched: false,
    isError: false,
    errorMessage: null
  },
  { type, payload }
) => {
  const addKeysToElements = (oneArray, favouriteBeers) => {
    oneArray.forEach(oneItem => {
      oneItem.favourited = !!favouriteBeers[oneItem.id];
    });
  };
  switch (type) {
    case "BEERS_GET_PENDING": {
      return {
        ...state,
        isFetching: true,
        fetched: false,
        isError: false,
        errorMessage: null
      };
    }
    case "BEERS_GET_REJECTED": {
      return {
        ...state,
        isFetching: false,
        fetched: false,
        isError: true,
        errorMessage: null
      };
    }
    case "BEERS_GET_FULFILLED": {
      const { favouriteBeers } = state;
      const beers = _.cloneDeep(payload.data);
      addKeysToElements(beers, favouriteBeers);
      return {
        ...state,
        beers,
        fetched: true,
        isFetching: false,
        isError: false,
        errorMessage: null
      };
    }
    case "BEERS_FAVOURITES_TOGGLE": {
      const favouriteBeers = _.cloneDeep(state.favouriteBeers);
      const beers = _.cloneDeep(state.beers);
      if (favouriteBeers[payload]) {
        delete favouriteBeers[payload];
      } else {
        favouriteBeers[payload] = beers.find(oneBeer => {
          return oneBeer.id === payload;
        });
      }
      addKeysToElements(beers, favouriteBeers);
      return {
        ...state,
        favouriteBeers,
        beers
      };
    }
    default: {
      return state;
    }
  }
};
