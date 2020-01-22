import React, { Component } from "react";
import { bemNamesFactory } from "bem-names";
import "./ErrorBoundary.scss";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: {},
      info: ""
    };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error: error };
  }
  componentDidCatch(error, { componentStack }) {
    this.setState({ info: componentStack });
    console.error(error, componentStack);
    alert("Error: please check the console log");
  }

  render() {
    const bem = bemNamesFactory("common__error-boundary");
    return this.state.hasError ? (
      <div className={bem()}>
        <h3 className={bem("title")}>Error</h3>
        <pre className={bem("details")}>{this.state.info}</pre>
      </div>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
