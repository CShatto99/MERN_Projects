import React, { Component, Fragment } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from 'reactstrap';
import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';
import LoginModal from './auth/LoginModal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class AppNavbar extends Component {
  state = {
    isOpen: false
  }

  static propTypes = {
    auth: PropTypes.object.isRequired
  }

  toggle = () => {
    this.setState((state, props) => ({
      isOpen: !state.isOpen
    }));
  }

  render() {
    const { user, isAuthenticated } = this.props.auth
    const loggedIn = (
      <Fragment>
        <NavItem>
          <span className='navbar-text mr-3'>
            <strong>
              { user ? `Welcome, ${user.name}` : null }
            </strong>
          </span>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );

    const loggedOut = (
      <Fragment>
        <NavItem>
          <LoginModal />
        </NavItem>
        <NavItem>
          <RegisterModal />
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <Navbar color='dark' dark expand='sm' className='mb-5'>
          <Container>
            <NavbarBrand href='/'>Shopping List</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='ml-auto' navbar>
                { isAuthenticated ? loggedIn : loggedOut }
                <NavItem>
                  <NavLink href='https://github.com/CShatto99/MERN_Projects/tree/master/MERN_Shopping_List'>CShatto99</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(AppNavbar);
