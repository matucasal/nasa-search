import ResultCard from './ResultCard';
import constant from '../../constants/moon.json'
import React, { Component } from 'react';
import './Result.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const getPreviewFromLinks = (arrObj) => {
    console.log('arrObj', arrObj)
    if(arrObj){
        const index = arrObj.map(object => object.rel).indexOf('preview');
        console.log('arrObj[index]', arrObj[index])
        return arrObj[index].href
    }
    
}


class Results extends Component {

    constructor(props) {
        super(props);
        this.getResults = this.getResults.bind(this);
    }

    getResults() {
        if(constant.collection.items){
            return constant.collection.items;
        }
            
    }

    render() {
        const resultList = this.getResults()
        
        return (
            <div className="search-results">
                <Row xs={1}>
                    {
                        resultList.map((result) =>
                            <Col key={result.data[0].nasa_id}  md="auto"> 
                                <ResultCard 
                                key={result.data[0].nasa_id} 
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
}
   
export default Results;