import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import css from './App.module.css';

export class App extends Component {
  state = {
    searchWord: '',
    page: 1,
  };

  submitForm = evt => {
    evt.preventDefault();
    if (!evt.target.elements.searchWord.value.trim()) return;
    this.setState({
      searchWord: evt.target.elements.searchWord.value,
    });
    //evt.target.reset();
    evt.target.elements.searchWord.value = '';
  };

  render() {
    const { searchWord, page } = this.state;

    return (
      <div className={css.app}>
        <Searchbar onSubmitFormHandler={this.submitForm} />
        <ImageGallery searchWord={searchWord} page={page} />
      </div>
    );
  }
}
