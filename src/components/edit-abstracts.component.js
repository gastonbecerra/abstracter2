import React, { Component } from 'react';
import axios from 'axios';
axios.defaults.baseURL = 'https://abstracter2.herokuapp.com/abstracts';

export default class EditAbstracts extends Component {

    constructor(props) {
        super(props);

        this.onChangeInput = this.onChangeInput.bind(this);
        this.onChangeTexto = this.onChangeTexto.bind(this);
        this.onChangeTipo = this.onChangeTipo.bind(this);
        this.onChangeCorriente = this.onChangeCorriente.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            // declarar variables por states las ata al componente
            input_url: "",
            texto: "",
            tipo: "",
            corriente: ""
        }
    }

    componentDidMount() {
      axios.get('/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          id: response.data.data._id,
          input_url: response.data.input_url,
          texto: response.data.text,
          tipo: response.data.tipo,
          corriente: response.data.corriente,
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

    onChangeCorriente(e) {
        this.setState({ corriente: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        const abstract = {
            input_url: this.state.input_url,
            texto: this.state.texto,
            tipo: this.state.tipo,
            corriente: this.state.corriente
        }

        console.log(abstract);

        axios.post('/'+this.props.match.params.id, abstract)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
            <div>
            <h3>Create Abstract</h3>

            <form onSubmit={this.onSubmit}>

                <p><strong>id:</strong>{this.state.id}</p>
                <p><strong>url:</strong> <a href="{this.state.input_url}">{this.state.input_url}</a></p>
                <p><strong>text:</strong> {this.state.texto}</p>

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
                    <label>corriente: </label>
                    <input  type="text" className="form-control"
                    value={this.state.corriente}
                    onChange={this.onChangeCorriente} />
                </div>

              <div className="form-group">
                <input type="submit" value="Dale fiesta" className="btn btn-primary" />
              </div>
            </form>
          </div>
        )
    }

}