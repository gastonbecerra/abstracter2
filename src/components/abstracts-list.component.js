import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
axios.defaults.baseURL = 'https://abstracter2.herokuapp.com/abstracts';

function anotar(tipo,corriente,id) { 
  if ( (tipo !== undefined ) && (tipo !== "" ) ) {
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
      <a href="{props.abstract.input_url}">{props.abstract.input_url}</a> <br />
    </td>
    <td>{anotar(props.abstract.tipo, props.abstract.corriente, props.abstract._id)} </td>
    <td>{props.abstract.tipo} <br /> {props.abstract.corriente}</td>
    <td><Link to={"/delete/"+props.abstract._id}><i>borrar</i></Link>
    </td>
  </tr>
)

const Abstract2 = props => (
  <div>
    <div>
        {titulo_corto(props.abstract.titulo)} <br/> 
        <a href="{props.abstract.input_url}">{props.abstract.input_url}</a>
    </div>
    <div>
      {props.abstract.tipo} {props.abstract.corriente} 
      {anotar(props.abstract.tipo, props.abstract.corriente, props.abstract._id)} 
    </div>
    <hr></hr>
  </div>
)

export default class AbstractsList extends Component {

  constructor(props) {
    super(props);
    this.state = {abstracts: []}
    this.state.total = 0
    this.state.next = 0
  }

  componentDidMount() {
    axios.get('/')
      .then(response => {
        this.setState({ abstracts: response.data })
      })
      .catch((error)=>{
        console.log(error); 
      })
    axios.get('/count')
      .then(response => {
        this.setState({ total: response.data })
      })
      .catch((error)=>{
        console.log(error); 
      })
    axios.get('/next')
      .then(response => {
        this.setState({ next: response.data })
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

  abstractsList2() {
    return this.state.abstracts.map(currentabstract => {
      return <Abstract2 
        abstract={currentabstract} 
        key={currentabstract._id}/>;
    })
  }

  render() {
    return (

    <div>
      <h4>Quedan {this.state.total} <Link to={"/anotar/" + this.state.next}><Button variant="primary" > Anotar siguiente </Button> </Link></h4>
      <div>
        <p>El laburo consiste en anotar los siguiente abstracts, con 2 campos: el <b>tipo</b>, siguiendo <a href="http://www.aepc.es/ijchp/articulos_pdf/ijchp-53.pdf">Leon & Montero (2002)</a>, y las <b>corrientes</b>, que es un campo abierto.</p>
      </div>
      <div>
      { this.abstractsList2() }
      </div>
      </div>    
    )
  }
}