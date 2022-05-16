
import style from './GalleryList.module.scss';
import GalleryItem from '../GalleryItem';

// function Anchor () {
//     const ref = useRef();

//     useEffect(() => {
//         console.log(ref.current);
//         ref.current.scrollIntoView({
//             behavior: 'smooth',
//             block: 'start',
//           });
//     }, []);

//     return (
//         <li ref={ref} />
//     )
// }

function GalleryList (props) {
    const {data, step, openModal} = props;



    return (
        <ul className={style.GalleryList}>
            {data && data.map(({id, webformatURL, tags, largeImageURL}, index, array) => {
                return (
                    <GalleryItem 
                        key={id} 
                        anchor={array.length - step + 1 === index + 1} 
                        options={{id, webformatURL, tags, largeImageURL}} 
                        openModal={openModal}
                    />
                )
            })}
        </ul>
    )
}


export default GalleryList;

// largeImageURL
// webformatURL
// previewURL