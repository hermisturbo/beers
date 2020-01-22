import React from "react";
import ReactDOM from "react-dom";
import Core from "./core";
import * as serviceWorker from "./serviceWorker";
import "./index.scss";

ReactDOM.render(<Core />, document.getElementById("root"));
serviceWorker.unregister();
