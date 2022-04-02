import React, { Component } from 'react';
import Header from './Header/Header';
import Search from './Search/Search';

class Home extends Component {
    render() {
      return (
        <div>
            <Header></Header>
            <Search></Search>
        </div>
      );
    }
   }
   
   export default Home;