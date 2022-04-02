import './Search.scss';
import React, { Component } from 'react';

class Search extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            query_seach:'',
            year_start: '',
            year_end: '',
            errors: {
                query_seach:'',
                year_start: '',
                year_end:''
            },
        };


        this.onHandleQueryChange = this.onHandleQueryChange.bind(this);
        this.onHandleYearChange = this.onHandleYearChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /*Use this function to get lenght of number*/
    getLength(number) {
        return number.toString().length;
    }

    onHandleQueryChange= e => {
        let query = e.target.value;
        this.setState({
            [e.target.name]: query
        });
    };

    onHandleYearChange = e => {
        let year = e.target.value;

        //if not number, not allowed
        if (year !== '' && !Number(year)) {
            return;
        }

        if (year !== '' && this.getLength (year)>4 ){
            return;
        }

        //If year > this year -> error
        if (year !== '' && year > new Date().getFullYear()){
            this.state.errors[e.target.name] = "Year cannot be after " +  new Date().getFullYear();
            console.log("Year cannot be after " +  new Date().getFullYear());
        }
        else if (year !== '' && year < 1900){
            this.state.errors[e.target.name] = "Year cannot be before 1900";
            console.log("Year cannot be before 1900");
        }
        else {
            this.state.errors[e.target.name] = '';
        }

        

        this.setState({
            [e.target.name]: year
        });
    };

    handleSubmit = event => {
        alert('Query search: ' + this.state.query_seach);
        
        event.preventDefault();
    };
    
    render() {
        return (
            <div className="search">
                <form id="search-form" onSubmit={this.handleSubmit}>
                    <input className="input-search-query" 
                    type="text" 
                    name="query_seach" 
                    id="query_seach" 
                    placeholder="Search"
                    value = {
                        this.state.query_seach
                    }
                    onChange = {
                        this.onHandleQueryChange
                    } 
                    />
                    
                    <div>
                        <input className="input-year-start" 
                        type="text" 
                        name="year_start" 
                        id="year_start" 
                        value = {
                            this.state.year_start
                        } 
                        placeholder="Year Start" 
                        onChange = {
                            this.onHandleYearChange
                        }/>
                        <span style={{ color: "red" }}>{this.state.errors["year_start"]}</span>
                    </div>

                    <div>
                        <input className="input-year-end" 
                        type="text" 
                        name="year_end" 
                        id="year_end"
                        value = {
                            this.state.year_end
                        } 
                        placeholder="Year End"
                        onChange = {
                            this.onHandleYearChange
                        }
                        />
                        <span style={{ color: "red" }}>{this.state.errors["year_end"]}</span>
                    </div>
                </form>
                <button type="submit" form="search-form" value="Submit">Seach</button>
            </div>
        );
    }
   }
   
   export default Search;