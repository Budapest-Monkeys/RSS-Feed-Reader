import { observable, action, decorate } from "mobx"; 

class SearchStore { 

  searchs = []; 
  search = ""; 

  setSearchs(searchs) { 
    this.searchs = searchs; 
  } 

  setSelectedSearch(search) { 
    this.search = search; 
  } 
} 

SearchStore = decorate(SearchStore, { 
  searchs: observable, 
  search: observable, 
  setSearchs: action, 
  setSelectedSearch: action, 
}); 

export { SearchStore }; 