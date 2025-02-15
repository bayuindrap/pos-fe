import React from 'react';
import {
    CImage,
  } from '@coreui/react'
import loadgif from '../assets/images/loading.gif'


const LoadingOverlay = () => {
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  };

  const contentStyle = {
    textAlign: 'center',
  };

  const imageStyle = {
    width: '50px',
    height: '50px',
    marginBottom: '10px',
  };

  const textStyle = {
    color: '#fff',
    fontSize: '18px',
  };

  return (
    <div style={overlayStyle}>
      <div style={contentStyle}>
        <CImage src={loadgif} alt="Loading" style={imageStyle} />
        <p style={textStyle}>Logging out...</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;