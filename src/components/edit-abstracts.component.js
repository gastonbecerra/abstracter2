import React, { Component } from 'react';
import axios from 'axios';

export default class EditAbstracts extends Component {

    constructor(props) {
        super(props);

        this.onChangeInput = this.onChangeInput.bind(this);
        this.onChangeTexto = this.onChangeTexto.bind(this);
        this.onChangeTipo = this.onChangeTipo.bind(this);
        this.onChangeMetodo = this.onChangeMetodo.bind(this);
        this.onChangeFuente = this.onChangeFuente.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            // declarar variables por states las ata al componente
            input_url: "",
            texto: "",
            tipo: "",
            metodo: "",
            fuente: "",
            corriente: "",
        }
    }

    componentDidMount() {
      axios.get('http://localhost:5000/abstracts/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          input_url: response.data.input_url,
          texto: response.data.texto,
          tipo: response.data.tipo,
          metodo: response.data.metodo,
          fuente: response.data.fuente
        })   
      })
      .catch(function (error) {
        console.log(error)
      })
    }

    onChangeInput(e) {
        this.setState({ input_url: e.target.value })
    }
    
    onChangeTexto(e) {
        this.setState({ texto: e.target.value })
    }

    onChangeTipo(e) {
        this.setState({ tipo: e.target.value })
    }

    onChangeMetodo(e) {
        this.setState({ metodo: e.target.value })
    }

    onChangeFuente(e) {
        this.setState({ fuente: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        const abstract = {
            input_url: this.state.input_url,
            texto: this.state.texto,
            tipo: this.state.tipo,
            metodo: this.state.metodo,
            fuente: this.state.fuente
        }

        console.log(abstract);

        axios.post('http://localhost:5000/abstracts/update/'+this.props.match.params.id, abstract)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
            <div>
            <h3>Create Abstract</h3>

            <form onSubmit={this.onSubmit}>

                <div className="form-group"> 
                    <label>input_url: </label>
                    <input  type="text" className="form-control"
                        value={this.state.input_url}
                        onChange={this.onChangeInput} />
                </div>

                <div className="form-group"> 
                    <label>texto: </label>
                    <input  type="text" className="form-control"
                    value={this.state.texto}
                    onChange={this.onChangeTexto} />
                </div>

                <div className="form-group"> 
                    <label>tipo: </label>
                    <input  type="text" className="form-control"
                    value={this.state.tipo}
                    onChange={this.onChangeTipo} />
                </div>

                <div className="form-group"> 
                    <label>metodo: </label>
                    <input  type="text" className="form-control"
                    value={this.state.metodo}
                    onChange={this.onChangeMetodo} />
                </div>

                <div className="form-group"> 
                    <label>fuentes: </label>
                    <input  type="text" className="form-control"
                    value={this.state.fuente}
                    onChange={this.onChangeFuente} />
                </div>

              <div className="form-group">
                <input type="submit" value="Create Abstract" className="btn btn-primary" />
              </div>
            </form>
          </div>
        )
    }

}