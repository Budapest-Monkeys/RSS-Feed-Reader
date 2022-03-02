import React, {useEffect, useState, } from 'react';
import { createApp } from 'vue'
import App from './App.vue'

function Home() {
    const [backEndData, setBackEndData] = useState([{}])
    


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
      </div>
    );
}
export default Home;

function createApp(rootComponent: Component, rootProps?: object): App
const app = createApp(/* ... */)
app.provide('message', 'hello')