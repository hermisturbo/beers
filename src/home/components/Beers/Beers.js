import React, { useState, useEffect, Fragment } from "react";
import ErrorBoundary from "../../../common/components/ErrorBoundary";
import BeerItem from "../BeerItem";
import Pagination from "./Pagination";
import { fetchBeers } from "../../actions/beerActions";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bemNamesFactory } from "bem-names";
import "./Beers.scss";

const mapStateToProps = state => {
  return {
    beers: state.home.beersReducer.beers,
    isFetching: state.home.beersReducer.isFetching,
    fetched: state.home.beersReducer.fetched,
    isError: state.home.beersReducer.isError,
    errorMessage: state.home.beersReducer.errorMessage
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchBeers: beer => {
      dispatch(fetchBeers(beer));
    }
  };
};
const Beers = ({
  number = 1,
  fetchBeers,
  beers,
  isFetching,
  fetched,
  isError,
  errorMessage
}) => {
  const bem = bemNamesFactory("home__beers");
  const [redirectToFirstPage, setRedirectToFirstPage] = useState(false);

  useEffect(() => {
    fetchBeers(number, 50);
  }, [number]);

  useEffect(() => {
    fetched && beers.length <= 0 && setRedirectToFirstPage(true);
  }, [beers]);

  useEffect(() => {
    if (isError) {
      console.error(errorMessage);
      alert(errorMessage);
    }
  }, [isError]);

  return (
    <ErrorBoundary>
      <div className={bem()}>
        {redirectToFirstPage && <Redirect to="/" />}
        {isFetching ? (
          <h3 className={bem("fetching-state")}>Fetching data...</h3>
        ) : (
          <Fragment>
            <Pagination currentPage={number} />
            <div className={bem("content")}>
              {beers.map(oneBeer => {
                return <BeerItem key={oneBeer.id} beerData={oneBeer} />;
              })}
            </div>
            <Pagination currentPage={number} />
          </Fragment>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Beers);
