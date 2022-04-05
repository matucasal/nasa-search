import ResultCard from './ResultCard';
import React, { Component } from 'react';
import './Result.scss';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSearchParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Pagination from '../Utils/Pagination'


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
            currentResults: [],
            currentPage: null, 
            totalPages: null,
            totalRecords:0,
            q: '',
            media_type: '',
            year_start: '',
            year_end: '',
            showLoading: false,
        }
    };
    
    componentDidUpdate(){

        const [searchParams]= this.props.params;
        
        //If searchParams exists
        if (searchParams){
            let media_type = searchParams.get('media_type')
            let q = searchParams.get('q')
            let year_start = searchParams.get('year_start')
            let year_end = searchParams.get('year_end')

            if(q && media_type){
                //if state params are diffrente from new ones -> i update and print them
                if (this.state.q !== q || this.state.media_type !== media_type || this.state.year_start !== year_start || this.state.year_end !== year_end) {
                    this.setState({ q: q, media_type: media_type, year_start: year_start, year_end: year_end });
                    this.getResults(q, media_type, year_start, year_end, 1);
                }
            }
            
            
        }
        

    }

    componentDidMount() {
        const [searchParams] = this.props.params
        if (searchParams){
            let media_type = searchParams.get('media_type')
            let q = searchParams.get('q')
            let year_start = searchParams.get('year_start')
            let year_end = searchParams.get('year_end')
            if(q && media_type){
                this.setState({ q: q, media_type: media_type, year_start: year_start, year_end: year_end });
                this.getResults(q, media_type,year_start,year_end, 1);
            }
            
        }
        

    }

    onPageChanged = data => {
        const { results } = this.state;
        const { currentPage, totalPages, pageLimit } = data;
        //const offset = (currentPage - 1) * pageLimit;
        //const currentResults = results.slice(offset, offset + pageLimit);
        this.getResults(this.state.q, this.state.media_type,this.state.year_start,this.state.year_end, currentPage);
        
        this.setState({ currentPage});
    }

    getResults(q, media_type,year_start, year_end, page) {
        
        //Put the setloading to true to make the loading animation
        if (q)
            this.setState({showLoading: true})
        
        let params = 
        {
            q: q, 
            media_type:media_type,
            ...(year_start && {year_start: year_start}),
            ...(year_end && {year_end: year_end}),
            page: page 
        }

        //${currentPage}&limit=${pageLimit}
        axios.get('https://images-api.nasa.gov/search', {params: params})
            .then(res => {
                const results = res.data
                this.setState({ currentResults: results, currentPage: page, results: results, showLoading: false, totalRecords: results.collection.metadata.total_hits});
        })
            
    }

    render() {
        let resultsList = this.state.results
        
        if(resultsList.collection){
            console.log('resultsList.collection.metadata', resultsList.collection.metadata)
            const resultList = resultsList.collection.items
            return (
                <div className="search-results">
                    { this.state.showLoading ? 
                        <Spinner animation="border" role="status">
                        </Spinner> 
                        : null 
                    }

                    { (this.state.totalRecords) ? (
                        <div className="d-flex flex-row py-4 align-items-center">
                            <Pagination totalRecords={this.state.totalRecords} pageLimit={100} pageNeighbours={1} onPageChanged={this.onPageChanged} />
                        </div>
                    ) : ('')
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
                There are no results to show.
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