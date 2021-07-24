import React, { Component } from "react";
import style from "./SearchBar.module.css";


class SearchBar extends Component {
  state = { qwery: "" };

  handleChange = (e) => {
    this.setState({
      qwery: e.currentTarget.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.qwery);
    this.reset();
  };

  reset = () => {
    this.setState({
      qwery: "",
    });
  };

  render() {
    return (
      <header className={style.Searchbar}>
        <form className={style.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={style.SearchFormButton}>
            <span className={style.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={style.SearchFormInput}
            type="text"
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;
