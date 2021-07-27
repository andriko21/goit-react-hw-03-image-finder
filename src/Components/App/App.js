import React, { Component } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchApi from "../SearchApi/SearchApi";
import ImageGallary from "../ImageGallery/ImageGallery";
import Button from "../Button/Button";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import LoaderFunc from "../Loader/Loader";
import Modal from "../Modal/Modal";
import style from "./App.module.css";

class App extends Component {
  state = {
    query: "",
    imageCollection: [],
    page: 1,
    btnVisible: false,
    loaderStatus: false,
    showModal: false,
    modalImg: {
      url: null,
      alt: null,
    },
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

  openModal = ({ target, currTarget }) => {
    if (target === currTarget) {
      return;
    }
    console.log(target)

    this.setState({
      showModal: true,
      modalImg: {
        url: target.getAttribute('data'),
        alt: target.getAttribute('alt'),
      },
    });
  };

  closeModal = () => {
     
    this.setState({
      showModal: false,
    });
  };

  incerement = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { onChangeQwery, incerement, closeModal, openModal} = this;
    const {
      imageCollection,
      btnVisible,
      loaderStatus,
      showModal,

      modalImg: { url, alt },
    } = this.state;
    return (
      <div className={style.App}>
        <SearchBar onSubmit={onChangeQwery} />
        <ImageGallary images={imageCollection} openModal={ openModal}/>
        {loaderStatus && <LoaderFunc />}
        {showModal && (
          <Modal closeModal={closeModal}>
            <img src={url} alt={alt} className={ style.modalImg}/>
          </Modal>
        )}

        {btnVisible && <Button newImages={incerement} />}
      </div>
    );
  }
}
export default App;
