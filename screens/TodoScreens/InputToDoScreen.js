import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native'
// import {Navigation} from 'react-native-navigation';
import TodoInput from '../../components/TodoInput/TodoInput';
import { connect } from 'react-redux';
import { addTodo } from '../../store/actions/index';

class InputToDoScreen extends Component {
  todoAddedHandler = (todoTitle,todoDescribtion,priority,dueDate,eventId,isDone)=> {
      this.props.onAddTodo(todoTitle,todoDescribtion,priority,dueDate,eventId,isDone,this.props.userId);
      // Navigation.pop(this.props.componentId);
  }

  render () {
      return (
          <View>
              <TodoInput
              events={this.props.events}
              onTodoAdded={this.todoAddedHandler}/>
          </View>
      );
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onAddTodo: (todoTitle,todoDescribtion,priority,dueDate,eventId,isDone,userId) => 
      dispatch(addTodo(todoTitle,todoDescribtion,priority,dueDate,eventId,isDone,userId))
  };
};
const mapStateToProps = state => {
  return {
    events: state.events.events,
    userId: state.auth.userId,
    token: state.auth.token
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(InputToDoScreen);