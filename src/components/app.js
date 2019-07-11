import React from 'react';
import Weather from './weather/weather';
import ToastContainer from './_common/toast-container';
import './_styles/app.scss';


export default function App() {
  return (
    <div>
      <Weather />
      <ToastContainer />
    </div>
  );
};
 