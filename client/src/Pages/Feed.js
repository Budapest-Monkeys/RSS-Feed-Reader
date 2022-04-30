import React, {useEffect, useState, useContext } from 'react';
import { ThemeContext } from "../contexts/ThemeContext";
import './/Feed.css'
import Footer from './Footer'

function Feed () {
    const [backEndData, setBackEndData] = useState([{}]);
    const [rssUrl, setRssUrl] = useState("");
    const [items, setItems] = useState([]);
  
    const getRss = async (e) => {
        e.preventDefault();
        
        const urlRegex = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
        if (!urlRegex.test(rssUrl)) {
          return;
        }

    var postBody = JSON.stringify({"url": rssUrl})
    console.log(postBody)
    const res = await fetch(`/simpleAPI`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: postBody
     });
    const { contents } = await res.json();
    const feed = new window.DOMParser().parseFromString(contents, "text/xml");
    const items = feed.querySelectorAll("item");
    const feedItems = [...items].map((el) => ({
          link: el.querySelector("link").innerHTML,
          title: el.querySelector("title").innerHTML,
          author: el.querySelector("author").innerHTML
    }));
  
    setItems(feedItems);
    };


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
          <form onSubmit={getRss}>
            <div>
            <div>
                <label> Enter URL here </label>
                    <br />
          <input onChange={(e) => setRssUrl(e.target.value)} value={rssUrl} />
        </div>
        <input type="submit" />
      </div>
      </form>
      {items.map((item) => {
        return (
          <div>
            <h1>{item.title}</h1>
            <p>{item.author}</p>
            <a href={item.link}>{item.link}</a>
          </div>
        );
      })}
          
       
       </div>

        <Footer/>
       </div>
       

    );
}

export default Feed;





