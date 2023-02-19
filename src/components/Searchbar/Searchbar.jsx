import { BsSearch } from 'react-icons/bs';

import css from './Searchbar.module.css';
export const Searchbar = ({ onSubmitFormHandler }) => {
  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={onSubmitFormHandler}>
        <button type="submit" className={css.searchFormButton}>
          <BsSearch />
          <span className={css.searchFormButtonLabel}>Search</span>
        </button>

        <input
          name="searchWord"
          className={css.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
