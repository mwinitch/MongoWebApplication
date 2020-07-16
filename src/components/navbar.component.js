import React, { Component } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
/*
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
*/

export default class Navbar extends Component {
    render() {
    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Institution Database</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Institutions</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create Institution</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
    }
};