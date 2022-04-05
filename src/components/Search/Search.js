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
            this.setState(prevState => {
                let errors = Object.assign({}, prevState.errors);
                errors[e.target.name] = 'Year cannot be after ' +  new Date().getFullYear();      
                return { errors };
            })
        }
        else if (year !== '' && year < 1900){
            this.setState(prevState => {
                let errors = Object.assign({}, prevState.errors);
                errors[e.target.name] = "Year cannot be before 1900";      
                return { errors };
            })
        }
        else {
            this.setState(prevState => {
                let errors = Object.assign({}, prevState.errors);
                errors[e.target.name] = '';      
                return { errors };
            })
        }

        this.setState({
            [e.target.name]: year,
        });

    };

    handleSubmit = event => {
        event.preventDefault();
        
        let validation = true

        //Validations
        //1) Query cannot be empty
        if (isEmpty(this.state.query_seach)){
            //this.state.errors['query_seach'] = "The query cannot be empty";
            this.setState(prevState => {
                let errors = Object.assign({}, prevState.errors);
                errors['query_seach'] = "The query cannot be empty";      
                return { errors };
            })
            //console.log('this.state.errors["query_seach"]',this.state.errors["query_seach"])
            //this.setState({ errors: this.state.errors });
            validation = false
        }
        //2) Validate the year end not < than year start
        if (this.state.year_end && (this.state.year_end < this.state.year_start) ){
            //this.state.errors['year_start'] = "Wrong years";
            this.setState(prevState => {
                let errors = Object.assign({}, prevState.errors);
                errors['year_start'] = "Wrong years";      
                return { errors };
            })
            //console.log('this.state.errors["query_seach"]',this.state.errors["query_seach"])
            //this.setState({ errors: this.state.errors });
            validation = false
        }
        
        //Validations where ok
        if (validation){
            //Set errors to null
            this.setState(prevState => {
                let errors = Object.assign({});
                errors['query_search'] = '';      
                errors['year_end'] = '';      
                errors['year_start'] = '';      
                return { errors };
            })
            /*this.state.errors['query_seach'] = '';
            this.state.errors['year_start'] = '';
            this.state.errors['year_end'] = '';

            this.setState({ errors: this.state.errors });*/
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
                            data-testid="search-input"
                            value = {
                                this.state.query_seach
                            }
                            onChange = {
                                this.onHandleQueryChange
                            } 
                            />
                            {(this.state.errors["query_seach"]) ?
                                (<span style={{ color: "red" }} data-testid="query-search-error-msg">{this.state.errors["query_seach"]}</span>)
                                : ('')
                            }
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
                            data-testid="year-start-input"
                            onChange = {
                                this.onHandleYearChange
                            }/>
                            {
                                this.state.errors["year_start"] ? (
                                    <span style={{ color: "red" }} data-testid="year-start-error-msg">{this.state.errors["year_start"]}</span>
                                ) :
                                ('')
                            }
                        </div>

                        <div>
                            <input className="input-year-end" 
                            type="text" 
                            name="year_end" 
                            id="year_end"
                            data-testid="year-end-input"
                            value = {
                                this.state.year_end
                            } 
                            placeholder="Year End"
                            onChange = {
                                this.onHandleYearChange
                            }
                            />
                            {(this.state.errors["year_end"]) ? 
                            (<span style={{ color: "red" }} data-testid="year-end-error-msg">{this.state.errors["year_end"]}</span>)
                            : ('')
                            }
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




