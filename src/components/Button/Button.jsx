import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';
import css from './Button.module.css';

export const Button = ({ onLoadMore, active }) => {
  return (
    <ScrollIntoViewIfNeeded active={active}>
      <div>
        <button className={css.button} type="button" onClick={onLoadMore}>
          Load more
        </button>
      </div>
    </ScrollIntoViewIfNeeded>
  );
};
