import React from "react";
import { bemNamesFactory } from "bem-names";
import { Link } from "react-router-dom";
import "./Pagination.scss";

const Pagination = ({ currentPage = 1, lastPage }) => {
  const bem = bemNamesFactory("home__beers__pagination");
  const isNotTheFirstPage = currentPage > 1;
  const isNotTheLastPage = !lastPage || currentPage < lastPage;
  const url = "/page";

  return (
    <div className={bem()}>
      <Link
        to={
          isNotTheFirstPage
            ? url + "/" + (parseInt(currentPage) - 1)
            : url + "/1"
        }
        className={bem("link-to-page", [
          isNotTheFirstPage ? "previous" : "disabled"
        ])}
      >
        ← Previous Page
      </Link>

      <h3 className={bem("current-page")}>{currentPage}</h3>

      {isNotTheLastPage && (
        <Link
          to={url + "/" + (parseInt(currentPage) + 1)}
          className={bem("link-to-page", [
            isNotTheLastPage ? "next" : "disabled"
          ])}
        >
          Next Page →
        </Link>
      )}
    </div>
  );
};

export default Pagination;
