import React from 'react'
import ReactDom from 'react-dom'
import './modal2.css'


const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#000',
    borderRadius: '5px', 
    zIndex: 1000,
    width: 'auto',
    
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.7)',
    zIndex: 1000,
    width: 'auto',
    
}



const Modal2 = ({ children, open, onClose, theme }) => {
    
    
    if (!open) {
        
        return null
    }


    return ReactDom.createPortal(
        <>
            <div id={theme}>
                <div style={OVERLAY_STYLES} onClick={onClose}></div>

                <div style={MODAL_STYLES}>
                   
                    <div>{children}</div>

                </div>
            </div>

        </>,
        document.getElementById('portal')

    )
}

export default Modal2