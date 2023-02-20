import { useEffect, useState } from 'react';
// import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';
import { getImageList } from 'components/api';
import { Button } from 'components/Button/Button';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import { Modal } from 'components/Modal/Modal';
import css from './ImageGallery.module.css';
import { Loader } from 'components/Loader/Loader';

export const ImageGallery = ({searchWord}) =>{
  const [listData, setListData] = useState([]);
  const [page, setPage] = useState(1);
  const [per_page, setPer_page] = useState(12);
  // eslint-disable-next-line no-unused-vars
  const [totalHits, setTotalHits] = useState(null);
  const [isVisibleLoadMo, setIsVisibleLoadMo] = useState(false);
  const [isVisibleLoader, setIsVisibleLoader] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);  
  const [modalImage, setModalImage] = useState(''); 
  const [activeScroll, setActiveScroll] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

useEffect(()=>{
    if (searchWord) {
          getDataImages(searchWord, page, per_page);
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [searchWord, page, per_page])

useEffect(()=>{
  //console.log("Reset ");
  resetState();
// eslint-disable-next-line react-hooks/exhaustive-deps
},[searchWord])


  const getDataImages = async (searchWord, page, per_page) => {
    setIsVisibleLoader(true);
    setActiveScroll(false);
    try {
      const result = await getImageList(searchWord, page, per_page);
      const totalPages = Math.floor(result.data.totalHits / per_page);
      setListData([...listData, ...result.data.hits]);
      setTotalHits(result.data.totalHits);
  
      setIsVisibleLoadMo(totalPages <= page ? false : true);

    } catch (error) {
      setErrorMessage(error)
      console.log(errorMessage);
    }
    setIsVisibleLoader(false);
     setActiveScroll(true);

  };

  const resetState = () => {
    setListData([]);
    searchWord="";
    setPage(1);
    setTotalHits(null);
    setErrorMessage('');
    setPer_page(12);
    setIsVisibleLoader(false);
  };

  const loadMore = () => {
      setPage(page + 1)
  };

  const onImageItem = evt => {
    setIsVisibleModal(true);
    setModalImage(evt.target.dataset);
  };

  const closeModal = value => {
    setIsVisibleModal(value)
  };

  return (
      <div className="scrollUp">
        {isVisibleLoader && <Loader />}

        <ul className={css.imageGallery} onClick={onImageItem}>
          {listData.map(item => (
            <ImageGalleryItem key={item.id} data={item} />
          ))}
        </ul>

        {isVisibleLoadMo && (
          <Button onLoadMore={loadMore} active={activeScroll} />
        )}

        {isVisibleModal && (
          <Modal data={modalImage} onCloseModal={closeModal} />
        )}
      </div>
  )
}


// export class ImageGallery extends Component {
//   state = {
//     listData: [],
//     page: 1,
//     per_page: 12,
//     totalHits: null,
//     totalPages: null,
//     isVisibleLoadMo: false,
//     isVisibleLoader: false,
//     isVisibleModal: false,
//     modalImage: '',
//     activeScroll: false,
//   };
//   // componentDidMount(prevProps, prevState) {}

//   componentDidUpdate(prevProps, prevState) {
//     if (prevProps.searchWord !== this.props.searchWord) {
//       this.resetState();
//     }

//     if (
//       prevProps.searchWord !== this.props.searchWord ||
//       prevState.page !== this.state.page
//     ) {
//       this.getDataImages(
//         this.props.searchWord,
//         this.state.page,
//         this.state.per_page
//       );
//     }
//   }

//   resetState = () => {
//     this.setState({
//       listData: [],
//       isActiveMo: false,
//       selectedImageID: null,
//       searchWord: '',
//       page: 1,
//       totalHits: null,
//       errorMessage: '',
//       setScrolling: false,
//     });
//   };

//   getDataImages = async (searchWord, page, per_page) => {
//     this.setState({ isVisibleLoader: true, activeScroll: false });
//     try {
//       const result = await getImageList(searchWord, page, per_page);
//       const totalPages = Math.floor(result.data.totalHits / per_page);
//       this.setState(prevState => ({
//         listData: [...prevState.listData, ...result.data.hits],
//         totalHits: result.data.totalHits,
//         totalPages,
//         isVisibleLoadMo: totalPages <= this.state.page ? false : true,
//       }));
//     } catch (error) {
//       this.setState({ errorMessage: error });
//     }
//     this.setState({
//       isVisibleLoader: false,
//       activeScroll: true,
//     });
//   };

//   loadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   onImageItem = evt => {
//     this.setState({ isVisibleModal: true, modalImage: evt.target.dataset });
//   };

//   closeModal = value => {
//     this.setState({ isVisibleModal: value });
//   };

//   //handleScrollToggle = () => this.setState({ active: !this.state.active });

//   render() {
//     return (
//       <div className="scrollUp">
//         {this.state.isVisibleLoader && <Loader />}

//         <ul className={css.imageGallery} onClick={this.onImageItem}>
//           {this.state.listData.map(item => (
//             <ImageGalleryItem key={item.id} data={item} />
//           ))}
//         </ul>

//         {this.state.isVisibleLoadMo && (
//           <Button onLoadMore={this.loadMore} active={this.state.activeScroll} />
//         )}

//         {this.state.isVisibleModal && (
//           <Modal data={this.state.modalImage} onCloseModal={this.closeModal} />
//         )}
//       </div>
//     );
//   }
// }
