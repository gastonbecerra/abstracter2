import React, { Component } from 'react';
import axios from 'axios';
axios.defaults.baseURL = 'https://abstracter2.herokuapp.com/abstracts';

export default class EditAbstracts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // declarar variables por states las ata al componente
            id:"",
            input_url: "",
            texto: "",
            tipo: "",
            corriente: ""
        }
    }

    componentDidMount() {
      axios.get('/first')
      .then(response => {
        this.setState({
          id: response.data._id,
          input_url: response.data.input_url,
          texto: response.data.text,
          tipo: response.data.tipo,
          corriente: response.data.corriente
        })   
        window.location = '/anotar/'+this.state.id;
      })
      .catch(function (error) {
        console.log(error)
      })
    }
    
    render() {
        return (
          <div>
          encontramos {this.state.id}
          </div>
        )
    }

}