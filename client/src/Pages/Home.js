import React, {useEffect, useState, useContext } from 'react';
import { createApp } from 'vue'
import App from './App.vue'
import { ThemeContext } from "../../contexts/ThemeContext";
import '/Home.css'


function Home() {
    const [backEndData, setBackEndData] = useState([{}])
    const context = useContext(ThemeContext);
    const theme = context.isLightTheme ? context.light : context.dark;
 //   const theme2 = context.isLightTheme ? context.cardLight : context.cardDark;

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
        <div>
        {(typeof backEndData.users === 'undefined') ? (
          <p>Loading...</p>
        ): (
          backEndData.users.map((user,i)=> (
            <p key={i}>{user}</p>
          ))
        )}
         <div className= {`Home ${theme}` }>
         <ThemeToggler className="themeBtn"/>
        <div className='nav'>
          <div className="logo">RSS-Feed<span>.</span></div>  
          <ul>
            <li> Home</li>
           
          </ul>
          <div class="content">
            <h2>🐒 <span >Budapest-Monkeys</span>CS4800  
            </h2>
          </div>
       </div>
       </div>
      </div>
//Comments
//

    );
}
export default Home;

function createApp(rootComponent: Component, rootProps?: object): App
const app = createApp(/* ... */)
app.provide('message', 'hello')