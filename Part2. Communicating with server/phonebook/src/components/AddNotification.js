import React from 'react';

const AddNotification = ({ message }) => {
  if (message === '') {
    return null;
  }

  return (
  <div className="add">{message}</div>
  );
};

export default AddNotification;
