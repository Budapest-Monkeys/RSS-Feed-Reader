import { observable, action, decorate } from "mobx"; 

class FeedsStore { 

  feeds = []; 
  feed = ""; 

  setFeeds(feeds) { 
    this.feeds = feeds; 
  } 

  setSelectedFeed(feed) { 
    this.feed = feed; 
  } 
} 

FeedsStore = decorate(FeedsStore, { 
  feeds: observable, 
  feed: observable, 
  setFeeds: action, 
  setSelectedFeed: action, 
}); 

export { FeedsStore }; 