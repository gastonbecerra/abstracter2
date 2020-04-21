import React, { Component } from 'react';
import axios from 'axios';

export default class CreateAbstracts extends Component {

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
            corriente: "",
        }

    }

    componentDidMount() {
        axios.get('http://localhost:5000/abstracts/')
            .then(response => {
                this.setState({
                })
            })
    }

    onChangeInput(e) {
        this.setState({ input_url: e.target.value });
    }
    
    onChangeTexto(e) {
        this.setState({ texto: e.target.value });
    }

    onChangeTipo(e) {
        this.setState({ tipo: e.target.value });
    }

    onChangeCorriente(e) {
        this.setState({ corriente: e.target.value });
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
        axios.post('http://localhost:5000/abstracts/add', abstract)
            .then(res => console.log(res.data));
        window.location = '/';
    }

    render() {
        var Data =  [
            'Teórico',
            'Metodológico',
            'Descriptivo x encuestas',
            'Cualitativo',
            'Expostfacto',
            'Experimentos'
        ] ,
            MakeItem = function(X) {
                return <option>{X}</option>;
            };
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
                    <label>Tipo: </label>
                    <select onChange={this.onChangeTipo}>{Data.map(MakeItem)}</select>
                </div>

                <div className="form-group"> 
                    <label>corriente: </label>
                    <input  type="text" className="form-control"
                    value={this.state.corriente}
                    onChange={this.onChangeCorriente} />
                </div>

              <div className="form-group">
                <input type="submit" value="Create Abstract" className="btn btn-primary" />
              </div>
            </form>
          </div>
        )
    }
}