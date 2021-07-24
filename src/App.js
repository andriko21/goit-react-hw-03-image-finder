import React, { Component } from "react";
import SearchBar from "./Components/SearchBar/SearchBar";
import SearchApi from "./Components/SearchApi/SearchApi";
import ImageGallary from "./Components/ImageGallery/ImageGallery";
import Button from "./Components/Button/Button";

class App extends Component {
  state = {
    query: "",
    imageCollection: [],
    page: 1,
  };

  onChangeQwery = async (ev) => {
    const res = await (await SearchApi(ev, this.state.page)).data.hits;
    this.setState({
      query: ev,
      imageCollection: [...res],
    });
  };

  btnClick = () => {
    console.log("hi");
  };

  render() {
    const { onChangeQwery, btnClick } = this;
    const { imageCollection } = this.state;
    return (
      <>
        <SearchBar onSubmit={onChangeQwery} />
        <ImageGallary images={imageCollection} />
        <Button newImages={btnClick} />
      </>
    );
  }
}
export default App;
