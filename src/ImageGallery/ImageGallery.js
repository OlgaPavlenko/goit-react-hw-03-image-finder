import React, { Component } from "react";
import Spinner from "../Loader/Loader";
import Button from "../Button/Button";
import fetchImage from "../services/gallery-api";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export default class ImageGallery extends Component {
  state = {
    images: [],
    totalHits: 0,
    page: 1,
    error: null,
    emptyNotify: false,
    showButton: false,
    status: Status.IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ status: Status.PENDING, page: 1 });
      this.searchImages();
      return;
    }

    if (prevState.page !== this.state.page) {
      this.searchImages();
      return;
    }
  }

  onButtonMoreClick = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  checkButtonAndNotify = () => {
    const { totalHits, images } = this.state;

    if (totalHits > images.length) {
      this.setState({ showButton: true });
    } else {
      this.setState({ showButton: false });
    }

    if (!totalHits) {
      this.setState({ emptyNotify: true });
    } else {
      this.setState({ emptyNotify: false });
    }
  };

  searchImages() {
    const { page } = this.state;
    const { searchQuery } = this.props;

    fetchImage(searchQuery, page)
      .then((data) => {
        if (page === 1) {
          this.setState({
            totalHits: data.totalHits,
            images: data.hits,
            status: Status.RESOLVED,
          });
        } else {
          this.setState((prevState) => ({
            images: [...prevState.images, ...data.hits],
            status: Status.RESOLVED,
          }));
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        }
        this.checkButtonAndNotify();
      })
      .catch((error) => this.setState({ error, status: Status.REJECTED }))
      .finally(() => this.setState({ status: Status.IDLE }));
  }

  checkEvent = (evt) => {
    const { toggleModal } = this.props;
    if (evt.target !== evt.currentTarget) {
      toggleModal({
        status: true,
        src: evt.target.dataset.imageurl,
        alt: evt.target.alt,
      });
    }
  };

  render() {
    const { images, error, status, totalHits } = this.state;

    if (status === Status.PENDING) {
      return <Spinner />;
    }

    if (status === Status.REJECTED) {
      toast.error(error.message, { toastId: "id" });
    }

    if (status === Status.RESOLVED || status === Status.IDLE) {
      if (!images.length && status !== Status.IDLE) {
        toast.info("Нет информации по Вашему запросу", { toastId: "newId" });
      }

      return (
        <>
          if(images){}
          <ul className="ImageGallery" onClick={this.checkEvent}>
            {images.map((image) => (
              <ImageGalleryItem image={image} key={image.id} />
            ))}
          </ul>
          {images.length && images.length < totalHits && (
            <Button onClick={this.onButtonMoreClick} />
          )}
        </>
      );
    }

    return <></>;
  }
}

ImageGallery.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
};
