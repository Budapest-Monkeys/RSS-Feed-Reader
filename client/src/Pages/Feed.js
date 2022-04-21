import React, {useEffect, useState, useContext } from 'react';
import axios from "axios";
import { ThemeContext } from "../contexts/ThemeContext";
import { useParams } from "react-router-dom";
import './/Feed.css'
import Footer from './Footer'

const Feed = () => {
    const [backEndData, setBackEndData] = useState([{}])
    const [items, setItems] = useState([]);
    const context = useContext(ThemeContext);
    const theme = context.isLightTheme ? context.light : context.dark;
    const theme2 = context.isLightTheme ? context.cardLight : context.cardDark;
    const theme3 = context.isLightTheme ? context.pageLight : context.pageDark;

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


    useEffect(() => {
      // A proxy was define in package.json so we dont need to put the full route. This will be changed in production
      fetch("/api").then(
        response => response.json()
      ).then(
        data => {
          setBackEndData(data)
        }
      )
    }, [])
    
    return (
        
         <div className= {`Feed ${theme}` }>
         <div className={`nav ${theme2}`}>
          <div className="logo">RSS-Feed<span>.</span></div> 
          
          <ul>
            <li> <a href ="/" id = "home-link" >
                         Home
                       </a> </li>
            <li> <a href ="/feed" id = "feed-link" >
                         Feed
                       </a> </li>
           
          </ul>
          </div>
       
          <div className={`${theme3}`}>
          <div className={theme3}>
          <ThemeToggler className="themeBtn"/>  
          </div>

            
          
       
       </div>
        <Footer/>
       </div>
       

    );
}
export default Feed;