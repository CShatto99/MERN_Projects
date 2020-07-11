import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addItem } from '../actions/itemActions';

class ItemModal extends Component {
  state = {
    isOpen: false,
    name: ''
  }

  static propTypes = {
    addItem: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  onSubmit = e => {
    e.preventDefault();

    this.props.addItem({ name: this.state.name});

    this.toggle();
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div>
        { this.props.isAuthenticated ?
          <Button color='dark' className='mb-3' onClick={this.toggle}>Add Item</Button> :
          <h4 className='mb-3 text-center'>Please log in to modify your shopping list!</h4>
        }
        <Modal isOpen={this.state.isOpen}>
          <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='item'>Item</Label>
                <Input type='text' name='name' id='item' placeholder='Add shopping item' onChange={this.onChange}/>
                <Button color='primary' className='mt-3' block>Add Item</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { addItem })(ItemModal);
