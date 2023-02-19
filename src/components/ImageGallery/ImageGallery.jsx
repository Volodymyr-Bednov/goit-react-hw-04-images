import { Component } from 'react';
// import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';
import { getImageList } from 'components/api';
import { Button } from 'components/Button/Button';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import { Modal } from 'components/Modal/Modal';
import css from './ImageGallery.module.css';
import { Loader } from 'components/Loader/Loader';

export class ImageGallery extends Component {
  state = {
    listData: [],
    page: 1,
    per_page: 12,
    totalHits: null,
    totalPages: null,
    isVisibleLoadMo: false,
    isVisibleLoader: false,
    isVisibleModal: false,
    modalImage: '',
    activeScroll: false,
  };
  // componentDidMount(prevProps, prevState) {}

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchWord !== this.props.searchWord) {
      this.resetState();
    }

    if (
      prevProps.searchWord !== this.props.searchWord ||
      prevState.page !== this.state.page
    ) {
      this.getDataImages(
        this.props.searchWord,
        this.state.page,
        this.state.per_page
      );
    }
  }

  resetState = () => {
    this.setState({
      listData: [],
      isActiveMo: false,
      selectedImageID: null,
      searchWord: '',
      page: 1,
      totalHits: null,
      errorMessage: '',
      setScrolling: false,
    });
  };

  getDataImages = async (searchWord, page, per_page) => {
    this.setState({ isVisibleLoader: true, activeScroll: false });
    try {
      const result = await getImageList(searchWord, page, per_page);
      const totalPages = Math.floor(result.data.totalHits / per_page);
      this.setState(prevState => ({
        listData: [...prevState.listData, ...result.data.hits],
        totalHits: result.data.totalHits,
        totalPages,
        isVisibleLoadMo: totalPages <= this.state.page ? false : true,
      }));
    } catch (error) {
      this.setState({ errorMessage: error });
    }
    this.setState({
      isVisibleLoader: false,
      activeScroll: true,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onImageItem = evt => {
    this.setState({ isVisibleModal: true, modalImage: evt.target.dataset });
  };

  closeModal = value => {
    this.setState({ isVisibleModal: value });
  };

  //handleScrollToggle = () => this.setState({ active: !this.state.active });

  render() {
    return (
      <div className="scrollUp">
        {this.state.isVisibleLoader && <Loader />}

        <ul className={css.imageGallery} onClick={this.onImageItem}>
          {this.state.listData.map(item => (
            <ImageGalleryItem key={item.id} data={item} />
          ))}
        </ul>

        {this.state.isVisibleLoadMo && (
          <Button onLoadMore={this.loadMore} active={this.state.activeScroll} />
        )}

        {this.state.isVisibleModal && (
          <Modal data={this.state.modalImage} onCloseModal={this.closeModal} />
        )}
      </div>
    );
  }
}
