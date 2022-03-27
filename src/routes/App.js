import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FormChat from '../views/FormChat'


export const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<FormChat/>} />
      </Routes>
    </BrowserRouter>
  );
};
