import React, { Component } from 'react';
import axios from 'axios';

export default class DeleteAbstracts extends Component {

    constructor(props) {
        super(props);
        this.state = { }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/abstracts/delete/' + this.props.match.params.id)
            .then(res => console.log(res.data))
            .catch(function (error) { console.log(error) })
        window.location = '/';
    }

    render() {
        return (
        <div>actualizando {this.props.match.params.id}</div>
        )
    }

}