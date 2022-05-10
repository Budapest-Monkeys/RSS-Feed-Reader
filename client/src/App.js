import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { createBrowserHistory as createHistory } from "history";
import Home from './Pages/Home';
import Feed from './Pages/Feed';
import SearchPage from './Pages/SearchPage';
import Search from './Pages/Search';
import Test from './Pages/Test';
import ThemeContextProvider from ".//contexts/ThemeContext";
import 'bulma/css/bulma.css';
const history = createHistory();

function App({ feedsStore }) {
  return (  
    <ThemeContextProvider>
    <Router history={history}>
      
        <Route
          path="/"
          exact
          component={props => <Home {...props} feedsStore={feedsStore} />}
        />
        
        <Route path="/test" element={<Test/>}/>
        <Route
          path="/feed"
          exact
          component={props => <Search {...props} feedsStore={feedsStore} />}
        />
        <Route
          path="/searchP"
          exact
          component={props => <SearchPage {...props} feedsStore={feedsStore} />}
        />
        <Route path="/test" element={<Test/>}/>
    
    </Router>
    </ThemeContextProvider>
  );
}

export default App;

/**
 *  <Route
          path="/feed"
          exact
          component={props => <FeedPage {...props} searchsStore={searchsStore} />}
        />

    <Route
          path="/feedP"
          exact
          component={props => <Feed {...props} feedsStore={feedsStore} />}
        />
 */