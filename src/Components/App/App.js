import React, { Component } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchApi from "../SearchApi/SearchApi";
import ImageGallary from "../ImageGallery/ImageGallery";
import Button from "../Button/Button";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// import Loader from "react-loader-spinner";
import LoaderFunc from "../Loader/Loader";
import style from "./App.module.css";

class App extends Component {
  state = {
    query: "",
    imageCollection: [],
    page: 1,
    btnVisible: false,
    loaderStatus: false,
  };

  onChangeQwery = async (ev) => {
    this.setState({
      loaderStatus: true,
    });
    if (!ev.trim().length) {
      alert("Please enter a valid string!");
      return;
    }

    const res = await (await SearchApi(ev, this.state.page)).data.hits;

    this.setState({
      page: 1,
      query: ev,
      loaderStatus: false,
      imageCollection: [...res],
      btnVisible: true,
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { page, query } = this.state;

    if (page !== prevState.page) {
      this.setState({
        loaderStatus: true,
      });
      try {
        (async () => {
          const resolveParse = await SearchApi(query, page);

          this.setState((prevStates) => ({
            imageCollection: [
              ...prevStates.imageCollection,
              ...resolveParse.data.hits,
            ],
            loaderStatus: false,
          }));
        })();
      } catch {
        this.setState({
          btnVisible: false,
        });
        console.log("error");
      }
    }
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  incerement = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { onChangeQwery, incerement } = this;
    const { imageCollection, btnVisible, loaderStatus } = this.state;
    return (
      <div className={style.App}>
        <SearchBar onSubmit={onChangeQwery} />
        <ImageGallary images={imageCollection} />
        {loaderStatus && <LoaderFunc />}

        {btnVisible && <Button newImages={incerement} />}
      </div>
    );
  }
}
export default App;
