import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import './ResultCard.scss'


const truncate = (str, max, suffix) => str.length < max ? str : `${str.substr(0, str.substr(0, max - suffix.length).lastIndexOf(' '))}${suffix}`;

class ResultCard extends Component {


    render() {

        
        return (
        
            <Card style={{ width: '25rem', height: '25rem' }} className="card">
                <Card.Img variant="top" className="card-image" src={this.props.thumbnail}  />
                <Card.Body>
                    <Card.Title>{this.props.title}</Card.Title>
                    <Card.Text>
                    {(this.props.description) ?  truncate(this.props.description, 100, '...'): '-'}
                    </Card.Text>
                    <Card.Link href="#">Show Page</Card.Link>
                </Card.Body>
            </Card>
        
        );
    }
}
   
export default ResultCard;