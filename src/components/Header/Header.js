import './Header.scss';

import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Person } from 'react-bootstrap-icons';

class Header extends Component {
    
    clickMyAccount() {
        console.log('Account clicked');
    }
    
    render() {
        return (
            <header>

                <div className="top-header">
                    
                    <div className="logo">
                        <img src='NASA_logo.png' alt='nasa-logo'></img>
                        <h1>NASA SEARCH</h1>
                    </div>
                    <div className="actions-header">
                        
                        <Button variant="outline-secondary" onClick={this.clickMyAccount}>
                            <Person className="account-icon"/> <span className="account-text">My Account</span>
                        </Button>
                    
                    </div>
                </div>
            </header>
        );
    }
   }
   
   export default Header;