import React, { useEffect, useState } from "react";
import { bemNamesFactory } from "bem-names";
import { getBeerDetails } from "../../../core/provider";
import { toggleFavourites } from "../../actions/beerActions";
import ErrorBoundary from "../../../common/components/ErrorBoundary";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./BeerDetails.scss";

const mapStateToProps = state => {
  return {
    favouriteBeers: state.home.beersReducer.favouriteBeers
  };
};
const mapDispatchToProps = dispatch => {
  return {
    toggleFavourites: beerId => {
      dispatch(toggleFavourites(beerId));
    }
  };
};
const BeerDetails = ({
  favouriteBeers,
  toggleFavourites,
  match: {
    params: { beerId }
  }
}) => {
  const bem = bemNamesFactory("home__beer-details");
  const [beerData, setBeerData] = useState({});
  useEffect(() => {
    getBeerDetails(beerId).then(response => {
      setBeerData(response.data[0]);
    });
  }, [beerId]);
  const {
    id,
    name,
    tagline,
    image_url: image,
    description,
    brewers_tips: brewersTips,
    first_brewed: firstBrewed,
    abv,
    ibu,
    target_fg: targetFg,
    target_og: targetOg,
    ebc,
    srm,
    ph,
    attenuation_level: attenuationLevel
  } = beerData;
  return (
    <ErrorBoundary>
      <div className={bem()}>
        <header className={bem("header")}>
          <h3 className={bem("title")}>{name}</h3>
          <h4 className={bem("tagline")}>{tagline}</h4>
          <nav className={bem("navigation")}>
            <Link className={bem("link-to-full-list")} to="/">
              ← Back to Full List
            </Link>
            <button
              className={bem("favourite-button", [
                !!favouriteBeers[id] ? "favourited" : "regular"
              ])}
              onClick={() => toggleFavourites(id)}
            >
              {!!favouriteBeers[id]
                ? "Remove from Favourites"
                : "Mark as Favourite ★"}
            </button>
          </nav>
        </header>
        <div className={bem("description")}>
          <p>{description}</p>
          <h4>Brewers Tips</h4>
          <p>{brewersTips}</p>
          <ul>
            <li>First Brewed: {firstBrewed}</li>
            <li>Abv: {abv}</li>
            <li>Ibu: {ibu}</li>
            <li>Target fg: {targetFg}</li>
            <li>Target Og: {targetOg}</li>
            <li>Ebc: {ebc}</li>
            <li>Srm: {srm}</li>
            <li>Ph: {ph}</li>
            <li>Attenuation level: {attenuationLevel}</li>
          </ul>
        </div>
        <img className={bem("image")} src={image} alt={name} />
      </div>
    </ErrorBoundary>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BeerDetails);
