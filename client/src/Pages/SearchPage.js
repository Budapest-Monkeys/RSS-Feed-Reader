import React, { useState, useEffect, useContext } from "react";
import './/SearchPage.css'
import { ThemeContext } from "../contexts/ThemeContext";
import { observer } from "mobx-react";
import Card from "react-bootstrap/Card";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import { Redirect } from "react-router-dom";
import Footer from './Footer'
const querystring = require("querystring");

const schema = yup.object({
    name: yup.string().required("URL is required"),
    url: yup
      .string()
      .required("URL is required")
      .matches(
        /(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/,
        "Invalid URL"
      ),
  });
  
function SearchPage({ feedsStore }) {
    const [initialized, setInitialized] = useState(false);
    const [redirectToFeed, setRedirectToFeed] = useState(false);

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
  
    const handleSubmit = async evt => {
      const isValid = await schema.validate(evt);
      if (!isValid) {
        return;
      }
      feedsStore.feeds.push(evt);
      feedsStore.setFeeds(feedsStore.feeds);
      localStorage.setItem("feeds", JSON.stringify(feedsStore.feeds));
    };
  
    const setSelectedFeed = url => {
        feedsStore.setSelectedFeed(url);
      setRedirectToFeed(true);
    };
  
    const deleteFeed = index => {
      feedsStore.feeds.splice(index, 1);
      feedsStore.setFeeds(feedsStore.feeds);
      localStorage.setItem("feeds", JSON.stringify(feedsStore.feeds));
    };
  
    useEffect(() => {
      if (!initialized) {
        let rssFeeds = [];
        try {
          rssFeeds = JSON.parse(localStorage.getItem("feeds"));
          if (Array.isArray(rssFeeds)) {
            feedsStore.setFeeds(rssFeeds);
          }
        } catch (ex) {}
        setInitialized(true);
      }
    });
  
    if (redirectToFeed) {
      return (
        <Redirect to={`/feed?${querystring.encode({ url: feedsStore.feed })}`} />
      );
    }
  
    return (

        <div className= {`Search ${theme}` }>
        <div className={`nav ${theme2}`}>
         <div className="logo">RSS-Feed<span>.</span></div> 
         
         <ul>
           <li> <a href ="/" id = "home-link" >
                        Home
                      </a> </li>
            
           <li> <a href ="/searchP" id = "search-link" >
                        Search
                       </a> </li>         
          
         </ul>
         </div>
         <ThemeToggler className="themeBtn"/>  
         <div className= {`search-page ${theme}` }>
         <Formik validationSchema={schema} onSubmit={handleSubmit}>
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isInvalid,
          errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} md="12" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={values.name || ""}
                  onChange={handleChange}
                  isInvalid={touched.name && errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="url">
                <Form.Label>URL</Form.Label>
                <Form.Control
                  type="text"
                  name="url"
                  placeholder="URL"
                  value={values.url || ""}
                  onChange={handleChange}
                  isInvalid={touched.url && errors.url}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.url}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Button type="submit" variant="info" class="btn btn-info">Add</Button>
          </Form>
        )}
      </Formik>
      <br />
      {feedsStore.feeds.map((f, i) => {
        return (
            <Card key={i}>
              <Card.Title className="card-title">{f.name}</Card.Title>
              <Card.Body>
                <p>{f.url}</p>
                <Button
                  variant="info"
                  onClick={setSelectedFeed.bind(this, f.url)}
                >
                  Open
                </Button>{" "}
                <Button variant="info" onClick={deleteFeed.bind(this, i)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          );
      })}
    </div>
    
      <Footer/>
     </div>
    );
  }

//export default SearchPage;
export default observer(SearchPage);