import React from 'react';

const Modal = () => {
  return (
    <div className='modal-container'>
      <div className='modal-content'>
        <h2>congrats!</h2>
        <p>you answered of questions correctly</p>
        <button className='close-btn'>play again</button>
      </div>
    </div>
  );
};

export default Modal;
