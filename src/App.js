import { PureComponent, useRef, createRef } from 'react';
import style from './App.module.scss';
import SearchFrom from './components/SearchForm';
import ApiService from './ApiService';
import GalleryList from './components/GalleryList';
import Modal from './components/Modal';
import IconButton from './components/IconButton';
import { ReactComponent as CloseIcon } from './icons/cross-icon.svg';
// import { nanoid } from 'nanoid';
import classNames from 'classnames';

const apiService = new ApiService();

// function scrollToNewImages () { 
//   refs.galleryContainer.scrollIntoView({
//     behavior: 'smooth',
//     block: 'end',
//   });
// };

// const btnLoadRefs = useRef(null);

class App extends PureComponent {
  state = {
    apiResponse: null,
    showModal: false,
    modalData: {},
  }

  // btnLoadRef = createRef();

  componentDidMount () {
    console.log('componentDidMount');
    this.setState({apiResponse: null});
  }

  toggleModal = (modalData) => {
    this.setState(({showModal}) => ({showModal: !showModal}))

    this.setState({modalData});
  }

  formSubmit = (query) => {
    apiService.setQuery(query)
    apiService.resetPages();
    this.fetchRequest();
  }

  fetchRequest = (query) => {
    this.setState({apiResponse: []})
    apiService.fetchQuery().then(response => this.setState({apiResponse: response.hits}));
  }

  onLoadMoreClick = () => {
    apiService.incrementPage();
    apiService.fetchQuery().then(response => this.setState(
      prevState => ({apiResponse: prevState.apiResponse.concat(response.hits)})
    ));
 
  } 

  render () {
    const { showModal, apiResponse, modalData } = this.state;

    return (
      <div className={style.App}>
        <SearchFrom onSubmit={this.formSubmit}/>
        <GalleryList data={apiResponse} openModal={this.toggleModal} />
        {showModal && (
          <Modal closeModal={this.toggleModal}>
            <IconButton onClick={this.toggleModal} className={style.App__modal__closeButton} aria-label="close modal">
              <CloseIcon width="28" height="28" />
            </IconButton> 
            <img src={modalData.largeImageURL} alt={modalData.tags} />
            {/* <h2>Это моя модалка</h2> */}
            {/* <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem sequi animi quos iste, aspernatur distinctio?</p> */}
            {/* <button type="button" className={style.button} onClick={this.toggleModal}>Закрыть</button>     */}
          </Modal>
        )}
        {apiResponse && <button type="button" ref={this.btnLoadRef} className={classNames(style.LoadMoreButton)} onClick={this.onLoadMoreClick}>Load more</button> }
      </div>
    ) 
  }
}

export default App;

