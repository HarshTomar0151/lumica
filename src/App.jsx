import React from 'react';
import { AppProvider } from './context/AppContext';
import PhoneFrame from './components/PhoneFrame';

export default function App() {
  return (
    <AppProvider>
      <PhoneFrame />
    </AppProvider>
  );
}
