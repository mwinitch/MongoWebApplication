import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/navbar.component"
import InstitutionList from "./components/institutions-list.component";
import EditInstitution from "./components/edit-institution.component";
import CreateInstitution from "./components/create-institution.component";


function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Route path="/" exact component={InstitutionList} />
      <Route path="/edit/:id" component={EditInstitution} />
      <Route path="/create" component={CreateInstitution} />
    </Router>
  );
}

export default App;
