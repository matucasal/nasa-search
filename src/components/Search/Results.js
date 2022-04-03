import ResultCard from './ResultCard';
import constant from '../../constants/moon.json'
import React, { Component } from 'react';
import CardGroup from 'react-bootstrap/CardGroup';

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
        const resultItems = resultList.map((result) =>
            /*<li key={result.data[0].nasa_id}>{result.data[0].title}</li> */
            <ResultCard key={result.data[0].nasa_id} title={result.data[0].title} description={result.data[0].description}/>
        );

        return (
            <div>
                <CardGroup>
                    {resultItems}
                </CardGroup>
            </div>
        )
    }
}
   
export default Results;