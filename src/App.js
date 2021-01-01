import React, { Component } from "react";
import Searchbar from "./Searchbar/Searchbar";
import Modal from "./Modal/Modal";
import { ToastContainer } from "react-toastify";
import ImageGallery from "./ImageGallery/ImageGallery";

export default class App extends Component {
  state = {
    searchQuery: "",
    showPopup: false,
    targetImage: null,
  };

  onSubmit = (value) => {
    this.setState({ searchQuery: value });
  };

  toggleModal = ({ status, src, alt }) => {
    if (status) {
      this.setState({
        targetImage: { src, alt },
        showPopup: true,
      });
    } else {
      this.setState({
        targetImage: null,
        showPopup: false,
      });
    }
  };

  render() {
    const { showPopup, targetImage, searchQuery } = this.state;

    return (
      <div>
        <ToastContainer autoClose={3000} />
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery
          searchQuery={searchQuery}
          toggleModal={this.toggleModal}
        />
        {showPopup && (
          <Modal
            src={targetImage.src}
            alt={targetImage.alt}
            toggleModal={this.toggleModal}
          />
        )}
      </div>
    );
  }
}
