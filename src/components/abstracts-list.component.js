import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

const Abstract = props => (
  <tr>
    <td>{props.abstract._id}</td>
    <td>{props.abstract.tipo}</td>
    <td>{props.abstract.corriente}</td>
    <td>{props.abstract.estado}</td>
    <td>
      <Link to={"/edit/"+props.abstract._id}> editar </Link> |
      <Link to={"/desanotar/"+props.abstract._id}> desanotar</Link> |
      <Link to={"/delete/"+props.abstract._id}> <i>borrar</i> </Link>
    </td>
  </tr>
)

export default class AbstractsList extends Component {

  constructor(props) {
    super(props);
    this.delete = this.deleteAbstract.bind(this);
    this.state = {abstracts: []}
  }

  componentDidMount() {
    Axios.get('http://localhost:5000/abstracts')
      .then(response => {
        this.setState({ abstracts: response.data })
      })
      .catch((error)=>{
        console.log(error); 
      })
  }

  deleteAbstract(id) {
    Axios.delete('http://localhost:5000/abstracts/'+id)
      .then(res => console.log(res.data));
      this.setState({
        abstracts: this.state.abstracts.filter(el => el._id !== id)
      })
  }

  abstractsList() {
    return this.state.abstracts.map(currentabstract => {
      return <Abstract 
        abstract={currentabstract} 
        deleteAbstract={this.deleteAbstract} 
        key={currentabstract._id}/>;
    })
  }

  render() {
    return (
<div>
  <h3>Abstracts</h3>
  <table className="table">
    <thead className="thead-light">
      <tr>
        <th>id</th>
        <th>tipo</th>
        <th>corriente</th>
        <th>estado</th>
        <th>operaciones</th>
      </tr>
    </thead>
    <tbody>
      { this.abstractsList() }
    </tbody>
  </table>
</div>    )
  }
}