import React from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.css';
import './index.css';
import App from './App';
import  { FeedsStore } from "./store";
import reportWebVitals from './reportWebVitals';
const feedsStore = new FeedsStore();

ReactDOM.render(
  <App feedsStore={feedsStore} />,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
