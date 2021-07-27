import React, { Component } from "react";
import style from "./Modal.module.css";

export default class Modal extends Component {
  state = {};

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDownClick);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDownClick);
  }

  handleBackDropClick = ({ target, currTarget }) => {
    if (target !== currTarget) {
      this.props.closeModal();
      return;
    }
  };
  handleKeyDownClick = (ev) => {
    // console.log(ev.code)
    if (ev.code === "Escape") {
    
      console.log(ev.code)
      this.props.closeModal();
      return;
    }
  };

  render() {
    const { children } = this.props;
    const { handleBackDropClick } = this;
    return (
      <div className={style.Overlay} onClick={handleBackDropClick}>
        <div className={style.Modal}>{children}</div>
      </div>
    );
  }
}


