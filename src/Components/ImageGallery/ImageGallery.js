import React from "react";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import style from "./ImageGallery.module.css";

const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={style.ImageGallery} onClick={openModal}>
      {images.map(({ previewURL, largeImageURL, tags }, index) => (
        <ImageGalleryItem
          previewURL={previewURL}
          largeImageURL={largeImageURL}
          tags={tags}
          key={index}
          
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
