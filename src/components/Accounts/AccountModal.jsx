import React from 'react';
import warningGIF from '../../assets/warning.gif';

import './AccountCardModal.scss';

export default function AccountModal({
  isOpen,
  onContinue,
  onConfirm,
  operation,
  accountSelected,
}) {
  return (
  <>
    <div className='modal'>
      <div className='modal-box'>
        <img src={warningGIF} alt="warning" />
        <div className="modal-message">
          <h1>{operation} Sucessfully</h1>
          <h2>{accountSelected}</h2>
        </div>
        <div className="modal-controls">
          <button onClick={onContinue}>Continue</button>
        </div>
      </div>
    </div>
  </>
  );
}

// WIP
