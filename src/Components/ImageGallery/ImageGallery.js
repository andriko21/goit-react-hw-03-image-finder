import React from "react";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import style from "./ImageGallery.module.css";

const ImageGallery = ({ images }) => {
  return (
    <ul className={style.ImageGallery}>
      {images.map(({ previewURL, largeImageURL, tags }, index) => (
        <ImageGalleryItem
          previewURL={previewURL}
          largeImageUR={largeImageURL}
          tags={tags}
          key={index}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
