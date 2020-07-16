import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Table } from 'reactstrap';
import { Link } from "react-router-dom";
import axios from "axios";

const Institute = props => (
    <tr>
      <td>{props.institute.name}</td>
      <td>{props.institute.city}</td>
      <td>{props.institute.country}</td>
      <td>
        <Link to={"/edit/"+props.institute._id}>Update</Link>
      </td>
    </tr>
)



export default class InstitutionList extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.tableHead = this.tableHead.bind(this);
        this.tableBody = this.tableBody.bind(this);
        this.searchArray = this.searchArray.bind(this);

        this.state = {
            institutions: [],
            name: '',
            city: '',
            country: ''
        };
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
        const searchCriteria = {
            name: this.state.name,
            city: this.state.city,
            country: this.state.country
        }

        // console.log(searchCriteria);
        axios.get('http://localhost:5000/institutions/')
            .then(response => {
                this.searchArray(searchCriteria, response.data);
                //this.setState({ institutions: response.data })
            })
            .catch((error) => {
                console.log(error);
            });
        
    }

    searchArray(searchCriteria, data) {
        console.log(searchCriteria.name);
        console.log(searchCriteria.city);
        let newArray = data.filter(institute => {
            return (institute.name.includes(searchCriteria.name) && 
                    institute.city.includes(searchCriteria.city) && 
                    institute.country.includes(searchCriteria.country))
        });
        this.setState({ institutions: newArray });
    }

    tableBody() {
        if (this.state.institutions.length > 0){
            return this.state.institutions.map(currentInstitute => {
                return <Institute institute={currentInstitute} key={currentInstitute._id}/>;
              })
        }
    }

    tableHead() {
        if (this.state.institutions.length > 0){
            return (
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Country</th>
              <th>Edit</th>
            </tr>
            );
        }
    }
    
    render() {
       return (
       <div>
            <Form inline style={{'margin': 30}} onSubmit={this.onSubmit}>
                <FormGroup style={{padding: 5}}>
                    <Label for="name" hidden>Name</Label>
                    <Input type="text" name="name" id="name" placeholder="Name" value={this.state.name} onChange={this.onChangeName}/>
                </FormGroup>
                <FormGroup style={{padding: 5}}>
                    <Label for="city" hidden>City</Label>
                    <Input type="text" name="city" id="city" placeholder="City" value={this.state.city} onChange={this.onChangeCity}/>
                </FormGroup>
                <FormGroup style={{padding: 5}}>
                    <Label for="country" hidden>Country</Label>
                    <Input type="text" name="country" id="country" placeholder="Country" value={this.state.country} onChange={this.onChangeCountry}/>
                </FormGroup>
                <Button style={{padding: 5}} type="submit">Search</Button>
            </Form>
            <div>
                <Table striped style={{width: "90%", margin: "auto"}}>
                   <thead>
                      { this.tableHead() }
                   </thead>
                   <tbody>
                       { this.tableBody() }
                   </tbody>
                </Table>
            </div>

        </div>
       );
    }
}