import './Navbar.css';
import React, { Component } from 'react';
import  { NavLink } from "react-router-dom";

class Navbar extends Component {
    render() {
      return (
        <div className="navbar">
            <h1>Navbar</h1>
            {/*
            <ul>
                <li><NavLink to='/'>Seach</NavLink></li>
                <li><NavLink to='/show'>Show</NavLink></li>
            </ul>
            --> */}
        </div>
      );
    }
   }
   
   export default Navbar;