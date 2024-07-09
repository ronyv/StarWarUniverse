import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';
import CharacterList from './pages/CharacterList';
import CharacterDetail from './pages/CharacterDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CharacterList />} />
          <Route path=":characterId/detail" element={<CharacterDetail />} />
        </Route>
      </Routes>
  </BrowserRouter>
  );
}

export default App;
