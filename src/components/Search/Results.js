import ResultCard from './ResultCard';
import constant from '../../constants/moon.json'
import React, { Component } from 'react';
import './Result.scss';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSearchParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';


const getPreviewFromLinks = (arrObj) => {
    if(arrObj){
        const index = arrObj.map(object => object.rel).indexOf('preview');
        return arrObj[index].href
    }
}

class Results extends Component {

    constructor(props) {
        super(props);
        this.state = {
            results: [],
            q: '',
            media_type: '',
            year_start: '',
            year_end: '',
            showLoading: false,
        }
    };
    
    componentDidUpdate(){

        //const {state} = this.props.location
        const [searchParams]= this.props.params;
        
        console.log('searchParams q updated', searchParams.get('q'))
        //If searchParams exists
        if (searchParams){
            let media_type = searchParams.get('media_type')
            let q = searchParams.get('q')
            let year_start = searchParams.get('year_start')
            let year_end = searchParams.get('year_end')

            //if state params are diffrente from new ones -> i update and print them
            if (this.state.q !== q || this.state.media_type !== media_type || this.state.year_start !== year_start || this.state.year_end !== year_end) {
                this.setState({ q: q, media_type: media_type, year_start: year_start, year_end: year_end });
                this.getResults(q, media_type, year_start, year_end);
            }
            
        }
        

    }

    componentDidMount() {
        const {searchParams} = this.props.params
        if (searchParams){
            let media_type = searchParams.get('media_type')
            let q = searchParams.get('q')
            let year_start = searchParams.get('year_start')
            let year_end = searchParams.get('year_end')
            
            this.setState({ q: q, media_type: media_type, year_start: year_start, year_end: year_end });
            this.getResults(q, media_type,year_start,year_end);
        }
        

    }

    getResults(q, media_type,year_start, year_end) {
        
        //Put the setloading to true to make the loading animation
        this.setState({showLoading: true})
        
        let params = 
        {
            q: q, 
            media_type:media_type,
            ...(year_start && {year_start: year_start}),
            ...(year_end && {year_end: year_end}),
        }

        axios.get('https://images-api.nasa.gov/search', {params: params})
            .then(res => {
                const results = res.data
                this.setState({ results: results, showLoading: false});
        })
            
    }

    render() {
        let resultsList = this.state.results
        console.log('resultsList', resultsList)
        
       if(resultsList.collection){
            const resultList = resultsList.collection.items
            return (
                <div className="search-results">
                    { this.state.showLoading ? 
                        <Spinner animation="border" role="status">
                        </Spinner> 
                        : null 
                    }
                    <Row xs={1}>
                        {
                            resultList.map((result) =>
                                <Col key={result.data[0].nasa_id}  md="auto"> 
                                    <ResultCard 
                                    key={result.data[0].nasa_id}
                                    nasa_id ={result.data[0].nasa_id}
                                    title={result.data[0].title} 
                                    description={result.data[0].description}
                                    location={result.data[0].location}
                                    photographer={result.data[0].photographer}
                                    thumbnail={getPreviewFromLinks(result.links)}
                                    />
                                </Col>
                            )
                        }
                    </Row>
                
                   
                    
                </div>
            )
        }
        else {
            return (
            <div className="search-results">
                There is no results to show.
                { this.state.showLoading ? 
                    <Spinner animation="border" role="status">
                    </Spinner> 
                    : null 
                }
            </div>
            );
        }
        
    }
}
   
//Export this way to use search params
export default (props) => (
    <Results
        {...props}
        params={useSearchParams()}
    />
);