import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import logo from '../logo.svg';

const title = (process.env.REACT_APP_TITLE || 'UNTITLED');

class TopNav extends React.Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    // Do not nest Link inside NavItem because it ends up with nested anchor tags
    // that is invalid HTML.
    return (
      <Navbar fixed="top" color="dark" dark expand="md" >
        <NavbarBrand href="/">
          <img src={ logo } height={ 32 } alt={ title } />
        </NavbarBrand>
      </Navbar>
    );
  }

}

export default TopNav;

