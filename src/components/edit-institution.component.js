import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';

export default class EditInstitution extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            name: '',
            city: '',
            country: ''
        }
    }
    
    componentDidMount() {
        axios.get('http://localhost:5000/institutions/'+this.props.match.params.id)
          .then(response => {
            this.setState({
              name: response.data.name,
              city: response.data.city,
              country: response.data.country,
            })   
          })
          .catch((error) => {
            console.log(error);
          })
    }
    
    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }
    
    onChangeCity(e) {
        this.setState({
            city: e.target.value
        });
    }

    onChangeCountry(e) {
        this.setState({
            country: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const institute = {
            name: this.state.name,
            city: this.state.city,
            country: this.state.country
        }

        // console.log(institue);
        axios.post('http://localhost:5000/institutions/add', institute)
            .then(result => console.log(result.data));
        
        /*
            this.setState({
            name: '',
            city: '',
            country: ''
        });
        */

        axios.post('http://localhost:5000/institutions/update/' + this.props.match.params.id, institute)
        .then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
            <div>
                <Form style={{'margin': 30}} onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" placeholder="Name" required value={this.state.name} onChange={this.onChangeName}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="city">City</Label>
                        <Input type="text" name="city" id="city" placeholder="City" required value={this.state.city} onChange={this.onChangeCity}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="country">Country</Label>
                        <Input type="text" name="country" id="country" placeholder="Country" required value={this.state.country} onChange={this.onChangeCountry}/>
                    </FormGroup>
                    <Button type="submit">Update</Button>
                </Form>
            </div>
        );
    }
}