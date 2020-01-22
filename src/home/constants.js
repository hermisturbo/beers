import Home from "./components/Home";
import BeerDetails from "./components/BeerDetails";

export const ROUTES = [
  { isExact: true, component: Home, path: "/" },
  { isExact: true, component: Home, path: "/page/:number" },
  { isExact: true, component: BeerDetails, path: "/details/:beerId" }
];
