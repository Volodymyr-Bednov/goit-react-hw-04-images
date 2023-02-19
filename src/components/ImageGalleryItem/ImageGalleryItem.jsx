import css from './ImageGalleryItem.module.css';
export const ImageGalleryItem = ({
  data: { id, webformatURL, largeImageURL },
}) => {
  return (
    <li className={css.imageGalleryItem}>
      <img
        className={css.imageGalleryItemImage}
        src={webformatURL}
        data-id={id}
        data-largeurl={largeImageURL}
        alt=""
      />
    </li>
  );
};
