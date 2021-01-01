import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.checkEvent);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.checkEvent);
  }

  checkEvent = (evt) => {
    if (evt.key === "Escape" || evt.target === evt.currentTarget) {
      this.props.toggleModal({ status: false });
    }
  };

  render() {
    const { src, alt } = this.props;

    return (
      <div className="Overlay" onClick={this.checkEvent}>
        <div className="Modal">
          <img src={src} alt={alt} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
};
