import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component"
import AbstractsList from "./components/abstracts-list.component";
import EditAbstracts from "./components/edit-abstracts.component";
import CreateAbstracts from "./components/create-abstracts.component";
import FirstAbstract from "./components/first-abstract.component";
import DesanotarAbstracts from "./components/desanotar-abstract.component";
import DeleteAbstracts from "./components/delete-abstracts.components";

function App() {
  return (

    <Router>
      <Navbar />
      <br />
      <Route path="/" exact component={AbstractsList} />
      <Route path="/edit/:id" exact component={EditAbstracts} />
      <Route path="/desanotar/:id" exact component={DesanotarAbstracts} />
      <Route path="/create" exact component={CreateAbstracts} />
      <Route path="/first" exact component={FirstAbstract} />
      <Route path="/delete/:id" exact component={DeleteAbstracts} />
    </Router>

  );
}

export default App;
  