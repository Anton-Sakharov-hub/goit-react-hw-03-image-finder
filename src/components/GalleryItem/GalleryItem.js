import { useEffect, useRef } from 'react';
import style from './GalleryItem.module.scss';

function GalleryItem (props) {
    const {options, openModal, anchor} = props;
    const {id, webformatURL, tags, largeImageURL} = options;

    const handleClick = (modalData) => () => {
        openModal(modalData);
    }

    const ref = useRef();

    useEffect(() => {
        // console.log(anchor)
        if(anchor) {
            console.log(ref.current);
            ref.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    }, []);

    return (
        <li key={id} ref={ref} className={style.GalleryItem}>
            <img className={style.GalleryItem__img} src={webformatURL} alt={tags} onClick={handleClick({largeImageURL, tags})} />
        </li>
    )
}

export default GalleryItem;