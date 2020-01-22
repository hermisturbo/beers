import React from "react";
import { bemNamesFactory } from "bem-names";
import { toggleFavourites } from "../../actions/beerActions";
import ErrorBoundary from "../../../common/components/ErrorBoundary";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./BeerItem.scss";

const mapDispatchToProps = dispatch => {
  return {
    toggleFavourites: beerId => {
      dispatch(toggleFavourites(beerId));
    }
  };
};

const BeerItem = ({ beerData, toggleFavourites }) => {
  const { id, name: title, tagline, image_url: image, favourited } = beerData;
  const bem = bemNamesFactory("home__beer-item");
  return (
    <ErrorBoundary>
      <div className={bem()}>
        <h3 className={bem("title")}>{title}</h3>
        <img className={bem("image")} src={image} alt={title} />
        <p className={bem("tagline")}>{tagline}</p>
        <footer className={bem("footer")}>
          <button
            className={bem("favourite-button", [
              favourited ? "favourited" : "no-favourited"
            ])}
            onClick={() => {
              toggleFavourites(id);
            }}
          >
            ★
          </button>
          <Link to={`/details/${id}`} className={bem("link-to-details")}>
            View Details...
          </Link>
        </footer>
      </div>
    </ErrorBoundary>
  );
};

export default connect(null, mapDispatchToProps)(BeerItem);
