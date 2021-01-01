import React, { Component } from "react";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Loader from "react-loader-spinner";

export default class Spinner extends Component {
  render() {
    return (
      <Loader
        className="loader"
        type="Circles"
        color="#3f51b5"
        height={80}
        width={80}
        timeout={3000} //3 secs
      />
    );
  }
}
