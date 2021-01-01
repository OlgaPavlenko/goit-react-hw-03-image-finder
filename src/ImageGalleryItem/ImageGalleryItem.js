import PropTypes from "prop-types";

export default function ImageGalleryItem({ image }) {
  return (
    <li className="ImageGalleryItem">
      <img
        src={image.webformatURL}
        alt={image.tags}
        data-imageurl={image.largeImageURL}
        className="ImageGalleryItem-image"
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
};
