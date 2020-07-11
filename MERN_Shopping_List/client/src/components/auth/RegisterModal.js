import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class RegisterModal extends Component {
  state = {
    isOpen: false,
    name: '',
    email: '',
    password: '',
    msg: null
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;

    if(error !== prevProps.error) {
      // Check for register error
      if(error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.msg.msg });
      }
      else {
        this.setState({ msg: null });
      }
    }

    if(this.state.isOpen) {
      if(isAuthenticated) {
        this.toggle();
      }
    }
  }

  toggle = () => {
    this.props.clearErrors();
    this.setState({ isOpen: !this.state.isOpen });
  }

  onSubmit = e => {
    e.preventDefault();

    const { name, email, password } = this.state;

    this.props.register({ name, email, password });

  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href='#'>Register</NavLink>
        <Modal isOpen={this.state.isOpen}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            { this.state.msg ? <Alert color='danger'>{this.state.msg}</Alert> : null }
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='name'>Name</Label>
                <Input className='mb-3' type='text' name='name' id='name' placeholder='Name' onChange={this.onChange}/>

                <Label for='email'>Email</Label>
                <Input className='mb-3' type='email' name='email' id='email' placeholder='Email' onChange={this.onChange}/>

                <Label for='name'>Password</Label>
                <Input className='mb-3' type='password' name='password' id='password' placeholder='Password' onChange={this.onChange}/>
                <Button color='dark' className='mt-3' block>Register</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);
