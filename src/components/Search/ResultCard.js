import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './ResultCard.scss'
import { useNavigate } from "react-router-dom";


const truncate = (str, max, suffix) => str.length < max ? str : `${str.substr(0, str.substr(0, max - suffix.length).lastIndexOf(' '))}${suffix}`;

class ResultCard extends Component {

    constructor(props) {
        super(props);
        this.showPage = this.showPage.bind(this);
    }

    showPage (nasa_id) {
        console.log("I should go to nasa_id", nasa_id)
        this.props.navigate({
            pathname: '/show',
            search: `?nasa_id=${nasa_id}`,
        });
    }

    render() {

        return (
        
            <Card style={{ width: '25rem', height: '25rem' }} className="card">
                <Card.Img variant="top" className="card-image" src={this.props.thumbnail}  />
                <Card.Body className="text-center">
                    <Card.Title>{(this.props.title) ?  truncate(this.props.title, 50, '...'): '-'}</Card.Title>
                    <Card.Text>
                    {(this.props.description) ?  truncate(this.props.description, 100, '...'): '-'}
                    </Card.Text>
                    <Button
                    className="text-center"
                    variant="primary"
                    onClick={
                        this.showPage.bind(this, this.props.nasa_id)
                        }
                    >
                        Show Page
                    </Button>
                    
                </Card.Body>
            </Card>
        
        );
    }
}
   
//Export this way to use navigate
export default (props) => (
    <ResultCard
        {...props}
        navigate={useNavigate()}
    />
);
