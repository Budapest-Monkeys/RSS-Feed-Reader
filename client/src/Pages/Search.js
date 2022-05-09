import React, {useEffect, useState, useContext } from 'react';
import { ThemeContext } from "../contexts/ThemeContext";
import { observer } from "mobx-react"; 
import { withRouter } from "react-router-dom"; 
import Card from "react-bootstrap/Card"; 
import Button from "react-bootstrap/Button"; 
import './/Search.css'
import Footer from './Footer'
import { getSearchListing } from "../contexts/requests"; 
const querystring = require("querystring"); 

function Search({searchsStore, location}) {
    const [initialized, setInitialized] = useState(false); 
    const [url, setUrl] = useState(""); 
    const [listings, setListings] = useState([]); 
    const [data, setData] = useState({}); 
    const context = useContext(ThemeContext);
    const theme = context.isLightTheme ? context.light : context.dark;
    const theme2 = context.isLightTheme ? context.cardLight : context.cardDark;


    const ThemeToggler = (props) => {
      const context = useContext(ThemeContext);
      const btnText = context.isLightTheme ? "Light ☀️" : "Dark 🌘";
      const toggleTheme = context.toggleTheme;
      
    
      return (
        <button className={`button is-light rounded`} onClick={toggleTheme}>
          {btnText}
        </button>
      );
    };

    const getListings = async url => { 
      try { 
        const response = await getSearchListing(url); 
        setListings(response.data.items); 
        setData(response.data.search); 
      } catch (ex) { 
        console.log(ex); 
      } 
  }; 

  const openLink = url => { 
    window.location.href = url; 
  }

  useEffect(() => {
    if (!initialized) {
      const url = querystring.decode(location.search)["?url"];
      setUrl(url);
      getListings(url);
      setInitialized(true);
    }
  });
    
    return (
       
         <div className= {`Search ${theme}` }>
         <div className={`nav ${theme2}`}>
          <div className="logo">RSS-Feed<span>.</span></div> 
          
          <ul>
            <li> <a href ="/" id = "home-link" >
                         Home
                       </a> </li>
            <li> <a href ="/feed" id = "feed-link" >
                         Feed
                        </a> </li>
            <li> <a href ="/search" id = "search-link" >
                         Search
                        </a> </li>           
           
          </ul>
          </div>
          {listings.map((l, i) => {
            return (
              <Card key={i}>
                <Card.Title className="card-title">{l.title}</Card.Title>
                <Card.Body>
                  <p>{l.description}</p>
                  <p>{l.content}</p>
                  <Button variant="primary" onClick={openLink.bind(this, l.link)}>
                    Open
                  </Button>{" "}
                </Card.Body>
              </Card>
            );
          })}
          
        <Footer/>
       </div>
       

    );
}


//export default Search;
export default withRouter(observer(Search));

