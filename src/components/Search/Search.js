import './Search.scss';
import React, { Component } from 'react';
import { useNavigate, createSearchParams } from "react-router-dom";




const isEmpty = (str) => {
    return (!str || str.length === 0 );
}


class Search extends Component {
    
    

    state = {
        results: [],
        errors: {
            query_seach:'',
            year_start: '',
            year_end:''
        },
    }

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
        }
        else if (year !== '' && year < 1900){
            this.state.errors[e.target.name] = "Year cannot be before 1900";
        }
        else {
            this.state.errors[e.target.name] = '';
        }

        

        this.setState({
            [e.target.name]: year,
            errors: this.state.errors
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        
        let validation = true

        //Validations
        //1) Query cannot be empty
        if (isEmpty(this.state.query_seach)){
            this.state.errors['query_seach'] = "The query cannot be empty";
            //console.log('this.state.errors["query_seach"]',this.state.errors["query_seach"])
            this.setState({ errors: this.state.errors });
            validation = false
        }
        //2) Validate the year end not < than year start
        if (this.state.year_end < this.state.year_start ){
            this.state.errors['year_start'] = "The start year cannot be bigger than the end year";
            //console.log('this.state.errors["query_seach"]',this.state.errors["query_seach"])
            this.setState({ errors: this.state.errors });
            validation = false
        }
        
        //Validations where ok
        if (validation){
            //Set errors to null
            this.state.errors['query_seach'] = '';
            this.state.errors['year_start'] = '';
            this.state.errors['year_end'] = '';

            this.setState({ errors: this.state.errors });
            let params =
            {
                q:this.state.query_seach, 
                media_type:'image',
                ...(this.state.year_start && {year_start: this.state.year_start}),
                ...(this.state.year_end && {year_end: this.state.year_end}),
            }

            console.log('params query input', params)
           
            this.props.navigate({
                pathname: '/results',
                search: `?${createSearchParams(params)}`,
            });
        }


    };
    
    render() {
        return (
            <div>
                <div className="search">
                    <form id="search-form" onSubmit={this.handleSubmit}>
                        <div>
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
                            <span style={{ color: "red" }}>{this.state.errors["query_seach"]}</span>
                            
                        </div>
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

               
                
            </div>
        );
    }
   }



//Export this way to use navigate
export default (props) => (
    <Search
        {...props}
        navigate={useNavigate()}
    />
);




