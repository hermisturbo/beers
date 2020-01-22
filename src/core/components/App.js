import React from "react";
import { bemNamesFactory } from "bem-names";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";
import { ROUTES as HOME_ROUTES } from "../../home";
import "./App.scss";

const App = () => {
  const routes = [...HOME_ROUTES];
  const bem = bemNamesFactory("app");
  return (
    <Provider store={store}>
      <h1 className={bem("title")}>Beers</h1>
      <BrowserRouter>
        {routes.map(oneRoute => {
          const { isExact, path, component } = oneRoute;
          return (
            <Route
              exact={isExact}
              path={path}
              component={component}
              key={path}
            />
          );
        })}
      </BrowserRouter>
      <footer className={bem("footer")}>That's all Folks!</footer>
    </Provider>
  );
};

export default App;
