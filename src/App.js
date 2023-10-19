import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Header from './Header'; 
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Header/>} />
        <Route path="/login" element={<Login/>} /> 
        <Route path="/Signup" element={<Signup/>} />    </Routes>
  );
}

export default App;
