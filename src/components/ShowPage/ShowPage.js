import React, { Component } from 'react';
import { useSearchParams, useNavigate  } from 'react-router-dom';
import axios from 'axios';
import './ShowPage.scss';

class ShowPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nasa_id: [],
            name:'',
            description:'',
            keywords:'',
            data:'',
            image:''
        }
    }

    componentDidUpdate(){

        const [searchParams]= this.props.params;
        
        if (searchParams){
            let nasa_id = searchParams.get('nasa_id')
            //if nasa_id are diffrente from new ones -> i update and print them
            if (this.state.nasa_id !== nasa_id) {
                this.setState({ nasa_id: nasa_id});
            }
            
        }
        
    }

    componentDidMount() {
        const [searchParams]= this.props.params;

        if (searchParams){
            let nasa_id = searchParams.get('nasa_id')
            this.setState({ nasa_id: nasa_id});
        }
        

    }

    showCollection(nasa_id){
        let params = 
        {
            nasa_id: nasa_id, 
        }

        axios.get('https://images-api.nasa.gov/search', {params: params})
            .then(res => {
                const results = res.data
                this.setState({ results: results, showLoading: false});
        })
    }

    render() {
        return (
            <div className="show-page">
                <h1>SHOW PAGE - {this.state.nasa_id}</h1>
                <button
                className="button icon-left"
                onClick={() => this.props.navigate(-1) }>
                    Go Back
                </button>
                
                <div className="show-page-title">
                    <h1>Title</h1>
                </div>
                <hr className="rounded"></hr>
                <div className="show-page-images">
                    <img src="nasa_test_img.jpg"></img>
                </div>
                <hr className="rounded"></hr>
                <div className="show-page-description">
                    <span>Lorem .orem ipsum dolor sit amet, consectetur adip. 
                        Lorem ipsum dolor sit amet et, consectetur adipiscing elit.
                        Lorem ipsum dolor sit amet et, consectetur adipiscing elit</span>
                </div>
                <hr className="rounded"></hr>
                <div className="show-page-data">
                    <span>201907_Apollo_50th_in_DC</span>
                </div>
                <hr className="rounded"></hr>
                <div className="show-page-keywords">
                    <h2>Keywords</h2>
                    <ul>
                        <li>Apollo 11</li>
                        <li>Moons</li>
                        <li>Test</li>
                        <li>Test2</li>
                    </ul>
                </div>
                
            </div>
            
        );
    }
}

//Export this way to use search params
export default (props) => (
    <ShowPage
        {...props}
        params={useSearchParams()}
        navigate={useNavigate()}
    />
);