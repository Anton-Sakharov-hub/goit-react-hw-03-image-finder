// import { Component  } from 'react';
import style from './GalleryList.module.scss';

function GalleryList (props) {
    const {data, openModal} = props;

    const handleClick = (modalData) => () => {
        openModal(modalData);
    }

    return (
        <ul className={style.GalleryList}>
            {data && data.map(({id, webformatURL, tags, largeImageURL}) => {
                return (
                    <li key={id} className={style.GalleryItem}>
                        <div className={style.GalleryItem__thumb}>
                            <img className={style.GalleryItem__img} src={webformatURL} alt={tags} onClick={handleClick({largeImageURL, tags})} />
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

export default GalleryList;

// largeImageURL
// webformatURL
// previewURL