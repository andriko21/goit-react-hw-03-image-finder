import React from "react";
import style from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ previewURL, largeImageURL, tags }) => {
  return (
    <li className={style.ImageGalleryItem}>
      <img
        src={previewURL}
        alt={tags}
        className={style.ImageGalleryItemImage}
        data={largeImageURL}
      />
    </li>
  );
};

export default ImageGalleryItem;
