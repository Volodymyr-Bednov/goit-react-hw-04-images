import { PureComponent } from 'react';
import css from './Modal.module.css';
export class Modal extends PureComponent {
  modalCloseCallback = evt => {
    if (evt.key === 'Escape') {
      this.props.onCloseModal(false);
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.modalCloseCallback);
    window.addEventListener('click', this.modalCloseCallback);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.modalCloseCallback);
    window.removeEventListener('click', this.modalCloseCallback);
  }

  render() {
    return (
      <div className={css.overlay}>
        <div className={css.modal}>
          <img src={this.props.data.largeurl} alt="" />
        </div>
      </div>
    );
  }
}
