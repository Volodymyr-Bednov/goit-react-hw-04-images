import { useState  } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import css from './App.module.css';

export const App = () => {
  const [searchWord, setSearchWord] = useState('');


  const submitForm = evt => {
    evt.preventDefault();
    if (!evt.target.elements.searchWord.value.trim()) return;
    setSearchWord(evt.target.elements.searchWord.value);
    evt.target.reset();

  };


  return(
      <div className={css.app}>
        <Searchbar onSubmitFormHandler={submitForm} />
        <ImageGallery searchWord={searchWord} />
      </div>

  )
}
// export class App extends Component {
//   state = {
//     searchWord: '',
//     page: 1,
//   };

//   submitForm = evt => {
//     evt.preventDefault();
//     if (!evt.target.elements.searchWord.value.trim()) return;
//     this.setState({
//       searchWord: evt.target.elements.searchWord.value,
//     });
//     //evt.target.reset();
//     evt.target.elements.searchWord.value = '';
//   };

//   render() {
//     const { searchWord, page } = this.state;

//     return (
//       <div className={css.app}>
//         <Searchbar onSubmitFormHandler={this.submitForm} />
//         <ImageGallery searchWord={searchWord} page={page} />
//       </div>
//     );
//   }
// }
