import React, { Component } from 'react';
import Header from './Header/Header';
import Search from './Search/Search';
import './Home.css'

class Home extends Component {
    render() {
      return (
        <div>
            <Search></Search>
            <hr className="rounded"></hr>
        </div>
      );
    }
}
   
export default Home;