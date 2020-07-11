import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';

class ShoppingList extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = id => {
    this.props.deleteItem(id);
  }

  static propTypes = {
    item: PropTypes.object.isRequired,
    getItems: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  }

  render() {
    const { items } = this.props.item;

    const isAuthenticated = this.props.isAuthenticated

    return(
      <div>
        <Container>
          <ListGroup>
            <TransitionGroup className="shopping-list">
              { items.map(({ _id, name }) => (
                <CSSTransition key={_id} timeout={500} classNames="fade">
                  <ListGroupItem>
                    { isAuthenticated ?
                      <Button className="remove-btn" color="danger" size="sm" onClick={this.onDeleteClick.bind(this, _id)}>&times;</Button> :
                      null
                    }

                    { name }
                  </ListGroupItem>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </ListGroup>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
