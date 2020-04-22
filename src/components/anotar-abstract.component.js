import React, { Component } from 'react';
import axios from 'axios';

export default class AnotarAbstracts extends Component {

    constructor(props) {
        super(props);

        this.onChangeTipo = this.onChangeTipo.bind(this);
        this.onChangecorriente = this.onChangecorriente.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            // declarar variables por states las ata al componente
            id:"",
            titulo:"",
            input_url: "",
            texto: "",
            tipo: "",
            corriente: ""
        }

    }
    
    componentDidMount() {
        axios.get('http://localhost:5000/abstracts/'+this.props.match.params.id)
        .then(response => {
          this.setState({
            id: response.data._id,
            titulo: response.data.titulo,
            input_url: response.data.input_url,
            texto: response.data.text,
            tipo: response.data.tipo,
            corriente: response.data.corriente
          })   
        })
        .catch(function (error) {
          console.log(error)
        })
    }
      
    onChangeTipo(e) {
        this.setState({ tipo: e.target.value })
    }

    onChangecorriente(e) {
        this.setState({ corriente: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        const abstract = {
            tipo: this.state.tipo,
            corriente: this.state.corriente
        }

        axios.post('http://localhost:5000/abstracts/anotar/' + this.state.id, abstract)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
            <div>
            <h3>Clasificar Abstract</h3>

            <h4>{this.state.titulo}</h4>

            <p><strong>id:</strong>{this.state.id}</p>
            <p><strong>url:</strong> <a href={this.state.input_url}>{this.state.input_url}</a></p>
            <p><strong>text:</strong> {this.state.texto}</p>

            <form onSubmit={this.onSubmit}>
                
                <div className="form-group"> 
                  <label><input type="radio" onChange={this.onChangeTipo} value="teorico" name="tipo"/> Teórico </label><br />
                  <label><input type="radio" onChange={this.onChangeTipo} value="metodologico" name="tipo"/> Metodológico </label><br />
                  <label><input type="radio" onChange={this.onChangeTipo} value="descriptivo" name="tipo"/> Descriptivo con encuestas </label><br />
                  <label><input type="radio" onChange={this.onChangeTipo} value="cualitativo" name="tipo"/> Cualitativo </label><br />  
                  <label><input type="radio" onChange={this.onChangeTipo} value="expost" name="tipo"/> Ex post facto </label><br />  
                  <label><input type="radio" onChange={this.onChangeTipo} value="experimental" name="tipo"/> Experimental o cuasi </label><br />  
                </div>

                <div className="form-group"> 
                    <label>corriente: </label>
                    <input  type="text" className="form-control"
                    value={this.state.corriente}
                    onChange={this.onChangecorriente} />
                </div>

              <div className="form-group">
                <input type="submit" value="Dale fiesta" className="btn btn-primary" />
              </div>
            </form>
          </div>
        )
    }
}