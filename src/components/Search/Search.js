import './Search.scss';
import React, { Component } from 'react';

class Search extends Component {
    render() {
      return (
        <div className="search">
            <form action="">
                <input className="input-search" type="text" name="search" id="search" placeholder="Search"/>
                <button type="submit" className="search-button">
                    <img src="search.png" alt="search-icon"/>
                </button>
            </form>
        </div>
      );
    }
   }
   
   export default Search;