import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';

import { Route, BrowserRouter, Routes } from 'react-router-dom';

import NavBar from './Components/NavBar.tsx';
import Home from './Components/Home.tsx'
import Archives from './Components/Archives.tsx';
import AddArchive from './Components/AddArchive.tsx';
import OneArchive from './Components/OneArchive.tsx'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/archives' element={<Archives/>} />
        <Route path='/archives/0' element={<AddArchive/>} />
        <Route path='/archives/:id' element={<OneArchive/>} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
