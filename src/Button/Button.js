import React from "react";
import PropTypes from "prop-types";

export default function Button({ onClick }) {
  return (
    <div className="Button_container">
      <button
        className="Button Button_loadmore"
        type="button"
        onClick={onClick}
      >
        Load more
      </button>
    </div>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
