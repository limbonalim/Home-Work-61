import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
  return (
    <div className="mx-auto my-3">
      <Spinner animation="border"/>
    </div>
  );

};

export default Loading;