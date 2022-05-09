import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { createBrowserHistory as createHistory } from "history";
import Home from './Pages/Home';
import Feed from './Pages/Feed';
import Search from './Pages/Search';
import Test from './Pages/Test';
import ThemeContextProvider from ".//contexts/ThemeContext";
import 'bulma/css/bulma.css';
const history = createHistory();

function App({ searchsStore }) {
  return (  
    <ThemeContextProvider>
    <Router history={history}>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/feed" element = {<Feed/>}/>
        <Route path="/search" element = {<Search/>}/>
        <Route
          path="/search"
          exact
          component={props => <Search {...props} searchsStore={searchsStore} />}
        />
        <Route path="/test" element={<Test/>}/>
      </Routes>
    </Router>
    </ThemeContextProvider>
  );
}

export default App;

/**
 *  <Route
          path="/feed"
          exact
          component={props => <FeedPage {...props} feedsStore={feedsStore} />}
        />
 */