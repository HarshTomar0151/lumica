import React from 'react';
import { Toaster } from 'react-hot-toast';

export default function Toast() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerStyle={{
        position: 'absolute',
        top: 52,
        left: 0,
        right: 0
      }}
      toastOptions={{
        duration: 3200,
        style: {
          background: 'rgba(26, 21, 18, 0.95)',
          color: '#F0ECE6',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '9999px',
          padding: '8px 14px',
          fontSize: '11.5px',
          fontWeight: 500,
          letterSpacing: '-0.01em',
          boxShadow: '0 8px 24px -6px rgba(0, 0, 0, 0.6)',
          maxWidth: '86%',
          backdropFilter: 'blur(20px)',
          pointerEvents: 'none'
        }
      }}
    />
  );
}
