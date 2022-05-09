import React, {useEffect, useState, useContext } from 'react';
import { ThemeContext } from "../contexts/ThemeContext";
import './/Feed.css'
import Footer from './Footer'

function Home() {
    const [backEndData, setBackEndData] = useState([{}])
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
      // A proxy was define in package.json so we dont need to put the full route. 
      fetch("/simpleAPI").then(
        response => response.json()
      ).then(
        data => {
          setBackEndData(data)
        }
      )
    }, [])
    
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
       
          
        <Footer/>
       </div>
       

    );
}
export default Home;