import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Button from 'react-bootstrap/Button'

function anotar(tipo,corriente,id) { 
  if (tipo !== "" && corriente !== "") {
    return  <Link to={"/desanotar/"+id}><Button variant="outline-danger" > desanotar </Button></Link>;
  } else {
    return  <Link to={"/anotar/"+id}><Button variant="outline-success" > anotar </Button></Link>;
  }
}

function titulo_corto(titulo) {
  var t="";
  if (typeof(titulo)=="undefined") {
    t = ""
  } else {
    t = titulo.substring(0,50)
  }
  return <strong>{t}...</strong>
}

const Abstract = props => (
  <tr>
    <td>
      {titulo_corto(props.abstract.titulo)} <br/> 
      <a href="{props.abstract.input_url}">{props.abstract.input_url}</a>
    </td>
    {/*
    <td>{props.abstract.tipo}</td>
    <td>{props.abstract.corriente}</td>
    */}
    <td>{anotar(props.abstract.tipo, props.abstract.corriente, props.abstract._id)}</td>
    <td>
      <Link to={"/edit/"+props.abstract._id}> editar </Link> |
      <Link to={"/delete/"+props.abstract._id}> <i>borrar</i> </Link>
    </td>
  </tr>
)

export default class AbstractsList extends Component {

  constructor(props) {
    super(props);
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

  abstractsList() {
    return this.state.abstracts.map(currentabstract => {
      return <Abstract 
        abstract={currentabstract} 
        key={currentabstract._id}/>;
    })
  }

  render() {
    return (
    <div>
      <h3>Abstracts psico social</h3>
      <div>
        <p>El laburo consiste en anotar los siguiente abstracts, con 2 campos:</p>
        <p>** El campo <b>tipo</b> se toma de Leon & Montero (2002) = http://www.aepc.es/ijchp/articulos_pdf/ijchp-53.pdf</p>
        <p>** El campo <b>corriente</b> es abierto</p>
      </div>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>titulo</th>
            {/*
            <th>tipo</th>
            <th>corriente</th>
            */}
            <th>anotado?</th>
            <th>operaciones</th>
          </tr>
        </thead>
        <tbody>
          { this.abstractsList() }
        </tbody>
      </table>
    </div>    
    )
  }
}