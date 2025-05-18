/*
import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Ripple } from 'primereact/ripple';

export interface DialogConfirmProps {
  visible: boolean;
  message: string;
  handleOk: () => void;
  handleReject: () => void;
}

const DialogConfirmComponent: React.FC<DialogConfirmProps> = ({ visible, message, handleOk, handleReject }) => {
  const footer = (
    <div className={'text-center'}>
      <button onClick={handleReject} className="p-button-text btn p-ripple orange-ripple">
        <i className="pi pi-times" /> No
        <Ripple />
      </button>
      <button onClick={handleOk} className="p-button-text btn p-ripple orange-ripple" autoFocus>
        <i className="pi pi-check" /> Yes
        <Ripple />
      </button>
    </div>
  );

  return (
    <Dialog header="Confirmation" visible={visible} modal style={{ width: '350px' }} footer={footer} onHide={handleReject}>
      <div className="confirmation-content text-center">
        {/!*<i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />*!/}
        <span>{message}</span>
      </div>
    </Dialog>
  );
};

export default DialogConfirmComponent;
*/

import React, { JSX } from 'react';
import { Dialog } from 'primereact/dialog';
import { Ripple } from 'primereact/ripple';

export interface DialogConfirmProps {
  visible: boolean;
  message: string | JSX.Element;
  handleOk: () => void;
  handleReject: () => void;
  header?: string | JSX.Element;
}

const DialogConfirmComponent: React.FC<DialogConfirmProps> = ({ visible, message, handleOk, handleReject, header }) => {
  const footer = (
    <div className="text-center">
      <button onClick={handleReject} className="p-button-text btn p-ripple orange-ripple">
        <i className="pi pi-times" /> No
        <Ripple />
      </button>
      <button onClick={handleOk} className="p-button-text btn p-ripple orange-ripple" autoFocus>
        <i className="pi pi-check" /> Yes
        <Ripple />
      </button>
    </div>
  );

  return (
    <Dialog header={header ?? 'Confirmation'} visible={visible} modal style={{ width: '80vw', height: '60vh' }} footer={footer} onHide={handleReject}>
      <div className="confirmation-content text-center">{message}</div>
    </Dialog>
  );
};

export default DialogConfirmComponent;
