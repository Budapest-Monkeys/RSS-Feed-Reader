//UCYmET81J6olojeOvXsi_n8g


import './/Lectures.css'
import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";

import Button from "react-bootstrap/Button";
import { parseDate } from "../contexts/utils";


const youtubeRssFeed =
  "https://api.rss2json.com/v1/api.json?rss_url=https://youtube.com/feeds/videos.xml?channel_id=UCYmET81J6olojeOvXsi_n8g";



const Lectures = () => {
  const MAX_VIDEOS = 10;

  const [videos, setVideos] = useState();

  useEffect(() => {
    const loadVideos = async () => {
      fetch(youtubeRssFeed, { headers: { Accept: "application/json" } })
        .then((res) => res.json())
        .then((data) => data.items.filter((item) => item.title.length > 0))
        .then((newVideos) => newVideos.slice(0, MAX_VIDEOS))
        .then((videos) => setVideos(videos))
        .catch((error) => console.log(error));
    };

    loadVideos();
  }, [MAX_VIDEOS]);

  return (
    <div maxWidth="sm">
      <h2 className="heading">Latest Videos</h2>

      {videos
        ? videos.map((item) => (
            <a
              className="link"
              href={item.link}
              target="_blank"
              rel="nofollow noopener noreferrer"
              title={item.title}
              aria-label={item.link}
              key={item.link}
            >
              <div >
                
                  <div
                    image={item.thumbnail}
                    title={item.title}
                  />
                  
                    <div gutterBottom variant="h5" component="h2">
                      {item.title}
                    </div>
                    <div
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {parseDate(item.pubDate)}
                    
                  
                </div>
              </div>
            </a>
          ))
        : "no video shown"}
     
    </div>
  );
};

export default Lectures;
