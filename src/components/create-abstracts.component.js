import React, { Component } from 'react';
import axios from 'axios';

export default class CreateAbstracts extends Component {

    constructor(props) {
        super(props);

        this.onChangeInput = this.onChangeInput.bind(this);
        this.onChangeTexto = this.onChangeTexto.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            // declarar variables por states las ata al componente
            input_url: "",
            texto: ""
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

    onSubmit(e) {
        e.preventDefault();
        const abstract = {
            input_url: this.state.input_url,
            texto: this.state.texto
        }
        console.log(abstract);
        axios.post('http://localhost:5000/abstracts/add', abstract)
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
                <input type="submit" value="Create Abstract" className="btn btn-primary" />
              </div>
            </form>
          </div>
        )
    }
}