import { PureComponent, useRef, createRef } from 'react';
import style from './App.module.scss';
import SearchFrom from './components/SearchForm';
import ApiService from './ApiService';
import GalleryList from './components/GalleryList';
import Modal from './components/Modal';
import IconButton from './components/IconButton';
import Spinner from './components/Spinner';
import { ReactComponent as CloseIcon } from './icons/cross-icon.svg';
import classNames from 'classnames';


// function scrollToNewImages () { 
  //   refs.galleryContainer.scrollIntoView({
    //     behavior: 'smooth',
    //     block: 'end',
    //   });
    // };
    
    // const btnLoadRefs = useRef(null);
    
class App extends PureComponent {
  state = {
    imagesList: [],
    showModal: false,
    modalData: {},
    responseStatus: 'idle',
    error: null,
  }

  step = 12;
  // componentDidUpdate (prevProps, prevState) {
  //   if(prevState.imagesList.length !== this.state.imagesList.length) {
  //     console.log(this.ref)
  //     this.ref?.scrollIntoView({
  //       behavior: 'smooth',
  //       block: 'end',
  //     });
  //   }
  // }

  changeStatus = (responseStatus) => {
    this.setState({
      responseStatus: responseStatus.status,
    })
  }
  
  apiService = new ApiService(this.changeStatus);
  // btnLoadRef = createRef();

  // getRef = (ref) => {
  //   if (ref) {
  //     this.ref = ref;
  //   }
  // }

  toggleModal = (modalData) => {
    this.setState(({showModal}) => ({showModal: !showModal}))

    this.setState({modalData});
  }

  formSubmit = (query) => {
    this.apiService.setQuery(query)
    this.apiService.resetPages();
    this.fetchRequest(this.step);
  }

  fetchRequest = () => {
    this.setState({imagesList: []})
    this.apiService.fetchQuery(this.step)
    .then(response => this.setState({imagesList: response?.hits}))
    .catch(error => {
      this.setState({
        // status: 'reject',
        error: error.message,
      });
    });
  }

  onLoadMoreClick = () => {
    this.apiService.incrementPage();
    this.apiService.fetchQuery(this.step).then(response => this.setState(
      prevState => ({imagesList: prevState.imagesList.concat(response.hits)})
    ));
 
  } 

  render () {
    const { showModal, imagesList, modalData, responseStatus, error } = this.state;

    let content;

    // if(responseStatus === 'idle') {
    //   return (
    //     <div className={style.App}>
    //       <SearchFrom onSubmit={this.formSubmit} />
    //     </div>
    //   )
    // }

    if(responseStatus === 'resolved' && !imagesList.length) {
      content = <h1>По вашему запросу ничего не найдено</h1>;
    } else if(responseStatus === "pending" || responseStatus === 'resolved') {
      content = (
        <div className={style.wrapper}>
          <GalleryList data={imagesList} openModal={this.toggleModal} step={this.step}/>
          {imagesList && 
          <button 
            type="button"
            // ref={this.getRef}
            className={classNames(style.LoadMoreButton)} 
            onClick={this.onLoadMoreClick}
            disabled={responseStatus === "pending"}
          >
            {responseStatus === "pending" ? <Spinner size={24} /> : 'Load more images'}
          </button> }
          {!imagesList && responseStatus === "pending" && <Spinner />}
        </div>
      )
    }
    

    
    // if() {
    //   content = (
    //     <>
    //       <div>
    //         <GalleryList data={imagesList} openModal={this.toggleModal} /> 
    //         <button type="button" ref={this.btnLoadRef} className={classNames(style.LoadMoreButton)} onClick={this.onLoadMoreClick}>Load more</button>
    //       </div>
    //     </>
    //   )
    // }
    
    else {
      content = <h1>{error}</h1>;
    }
    // console.log(this.ref);
    
    return (
      <div className={style.App}>
        <header>
          <SearchFrom onSubmit={this.formSubmit}/>
        </header>
        {content}
        {showModal && (
          <Modal closeModal={this.toggleModal}>
            <IconButton onClick={this.toggleModal} className={style.closeButton} aria-label="close modal">
              <CloseIcon width="28" height="28" />
            </IconButton> 
            <img src={modalData.largeImageURL} alt={modalData.tags} />
          </Modal>
         )}
      </div>
    )

    //  TODO: Убрать по оканчанию
    // return (<p>Somthing went wrong with your code</p>) 
  }

}

export default App;

