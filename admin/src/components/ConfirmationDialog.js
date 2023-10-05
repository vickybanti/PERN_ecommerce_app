// ConfirmationDialog.js
import React from 'react';

function ConfirmationDialog({ isOpen, onCancel, onConfirm }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="confirmation-dialog">
      <p>Are you sure you want to delete this product?</p>
      <button onClick={onCancel}>No</button>
      <button onClick={onConfirm}>Yes</button>
    </div>
  );
}

export default ConfirmationDialog;
