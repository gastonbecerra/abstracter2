import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Abstracter</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Listar</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Crear</Link>
          </li>
          <li className="navbar-item">
          <Link to="/first" className="nav-link">Anotar uno</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}