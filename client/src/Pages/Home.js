import React, {useEffect, useState, useContext } from 'react';
//import { createApp } from 'vue'
//import App from './App.vue'
import { ThemeContext } from "../contexts/ThemeContext";
import './/Home.css'
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
        /*<div>
        {(typeof backEndData.users === 'undefined') ? (
          <p>Loading...</p>
        ): (
          backEndData.users.map((user,i)=> (
            <p key={i}>{user}</p>
          ))
        )}
        </div> */
         <div className= {`Home ${theme}` }>
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
       
          <div className={`headerH ${theme3}`}>
          <div className={`info ${theme3}`}>
          <div className={theme3}>
          <ThemeToggler className="themeBtn"/>  
          </div>

            <h2>🐒</h2> <span >Budapest-Monkeys</span>
            
            <h3>RSS Feed Reader</h3>
          
       
       </div>
        <Footer/>
       </div>
       </div>

    );
}
export default Home;

//function createApp(rootComponent: Component, rootProps?: object): App
//const app = createApp(/* ... */)
//app.provide('message', 'hello')