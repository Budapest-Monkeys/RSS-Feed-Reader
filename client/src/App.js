import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import Feed from './Pages/Feed';
import Search from './Pages/Search';
import Test from './Pages/Test';
import ThemeContextProvider from ".//contexts/ThemeContext";
import 'bulma/css/bulma.css';

//const history = createHistory();

function App() {
  return (  
    <ThemeContextProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/feed" element = {<Feed/>}/>
        <Route path="/search" element = {<Search/>}/>
        <Route path="/test" element={<Test/>}/>
      </Routes>
    </Router>
    </ThemeContextProvider>
  );
}

export default App;