import axios from "axios";

const apiRoot = "https://api.punkapi.com/v2/";

export const getBeers = (page = 1, perPage = 50) => {
  return axios.get(apiRoot + "beers", { params: { page, per_page: perPage } });
};

export const getBeerDetails = id => {
  return axios.get(apiRoot + "beers/" + id);
};
