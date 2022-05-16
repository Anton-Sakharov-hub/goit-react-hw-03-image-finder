import { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.scss';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
    componentDidMount() {
        console.log('componentDidMount');
        
        window.addEventListener('keydown', this.closeModalByEsc);
    }
    
    componentWillUnmount() {
        console.log('componentWillUnmount');
        
        window.removeEventListener('keydown', this.closeModalByEsc);
    }
    
    closeModalByEsc = (e) => {
        if(e.code === 'Escape') {
            this.props.closeModal();
        }
    }

    onBackdropClick = (e) => {
        if(e.target === e.currentTarget) {
            this.props.closeModal();
        }
    }

    
    render() {
        return createPortal(
            (
                <div className={s.Modal__backdrop} onClick={this.onBackdropClick}>
                    <div className={s.Modal__content}>
                        <div className={s.preloader}><span>Loading...</span></div>
                        {this.props.children}
                    </div>
                </div>
            ),
            modalRoot
        )
    }
}

export default Modal;