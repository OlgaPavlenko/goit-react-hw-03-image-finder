import { Component } from "react";
import PropTypes from "prop-types";

export default class Searchbar extends Component {
  state = {
    searchQuery: "",
  };

  changeInput = (evt) => {
    this.setState({ searchQuery: evt.target.value });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();

    if (this.state.searchQuery.trim() !== "") {
      this.props.onSubmit(this.state.searchQuery);
    }
  };

  render() {
    const { searchQuery } = this.state;

    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Поиск изображений и фото"
            value={searchQuery}
            onChange={this.changeInput}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
