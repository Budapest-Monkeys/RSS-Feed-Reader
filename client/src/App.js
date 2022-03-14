import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import Test from './Pages/Test';
import ThemeContextProvider from ".//contexts/ThemeContext";

function App() {
  return (  
    <ThemeContextProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/test" element={<Test/>}/>
      </Routes>
    </Router>
    </ThemeContextProvider>
  );
}

export default App;