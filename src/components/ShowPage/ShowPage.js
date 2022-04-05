import React, { Component } from 'react';
import { useSearchParams, useNavigate  } from 'react-router-dom';
import axios from 'axios';
import './ShowPage.scss';

class ShowPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nasa_id: '',
            name:'',
            description:'',
            keywords:[],
            photographer:'',
            images_json:'',
            image:'',
            date_created:'',
            location:''
            
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
            this.getCollection(nasa_id);
            this.setState({ nasa_id: nasa_id});
        }
        

    }

    getCollection(nasa_id){
        
        let me = this;

        let params = 
        {
            nasa_id: nasa_id, 
        }

        axios.get('https://images-api.nasa.gov/search', {params: params})
            .then(res => {
                const result = res.data
                if (result){
                    let images_json = result.collection.items[0].href
                    let name = result.collection.items[0].data[0].title
                    let photographer = result.collection.items[0].data[0].photographer
                    let description = result.collection.items[0].data[0].description
                    let keywords = result.collection.items[0].data[0].keywords
                    let date_created = result.collection.items[0].data[0].date_created
                    let location = result.collection.items[0].data[0].location
                    

                    me.getImageFromJson(images_json)
                    this.setState({ name: name, description:description, photographer: photographer, keywords: keywords, date_created: date_created, location:location});
                }

                
        })
    }

    getKeywords(keywords) {
        if (keywords){
            return (<ul>
                {keywords.map((object, i) => 
                    <li key={i}>
                    {object}
                    </li>)
                }
            </ul>)
        }
        else {
            return ("There are no keywords")
        }
    }

    getImageFromJson(images_json) {
        let me = this;
        if (images_json){
            console.log('images_json', images_json)
            axios.get(images_json)
            .then(res => {
                const result = res.data
                //large medium or orig and NO tif
                var i = result.findIndex(v => (v.includes("large") || v.includes("medium") || v.includes("orig")) && !v.includes("tif") );
                let item = result[i]
                me.setState({ image: item});
            })
        }
    }



    render() {
        return (
            <div className="show-page">
                <button
                className="button"
                onClick={() => this.props.navigate(-1) }>
                    Go Back
                </button>
                
                <div className="show-page-title">
                    <h1>{this.state.name}</h1>
                    <h3>Photographer: {(this.state.photographer) ? this.state.photographer : '-'}</h3>
                    <h3>Date: {(this.state.date_created) ? this.state.date_created : '-'}</h3>
                    <h3>Location: {(this.state.location) ? this.state.location : '-'}</h3>
                </div>
                <hr className="rounded"></hr>
                <div className="show-page-images">
                    <img src={this.state.image}></img>
                </div>
                <hr className="rounded"></hr>
                <div className="show-page-description">
                    <span>{this.state.description}</span>
                </div>
                <hr className="rounded"></hr>
                <div className="show-page-keywords">
                    <h2>Keywords</h2>
                    {this.getKeywords(this.state.keywords)}
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