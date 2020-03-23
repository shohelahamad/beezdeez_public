import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, TextInput, Button, Text, TouchableOpacity, Dimensions } from 'react-native';
const { height, width } = Dimensions.get("window");
import Icon from 'react-native-vector-icons/FontAwesome';
import IconFa from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import { Dropdown } from 'react-native-material-dropdown';
import TodoList from '../../components/TodoList/TodoList';
import { doneTodo } from "../../store/actions/index";
import { getTodos } from "../../store/actions/index";
import { getLabels } from "../../store/actions/index";
import { getEvents } from "../../store/actions/index";

import { Header } from 'react-navigation-stack';
import { LinearGradient } from 'expo-linear-gradient';

class ToDosScreen extends Component {
  componentDidMount() {
    this.props.onLoadTodos(this.props.userId, this.props.token);
    // this.props.onLoadLabels();
    // this.props.onLoadEvents();
    // console.log(Header.HEIGHT);
  }
  doneSelectedHandler = key => {
    const selTodo = this.props.todos.find(todo => {
      return todo.key === key;
    });
    this.props.onDdoneTodo(selTodo.key);
  }
  itemSelectedHandler = key => {
    const selTodo = this.props.todos.find(todo => {
      return todo.key === key;
    });
    this.props.navigation.navigate('TodoDetailsScreen', {
      itemKey: selTodo.key,
      selectedPlace: selTodo
    });
  };

  render() {
    let priorityData = [{
      value: 'Important'
    }, {
      value: 'Medium'
    }, {
      value: 'Less Important'
    }];
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.headerContainer}>
          <IconFa style={{ marginTop: 5, marginLeft: 5 }} name={"check-square"} color={"#0641A7"} size={30} />
          <Dropdown
          pickerStyle={{marginTop: Header.HEIGHT}}
          fontSize={25}
          baseColor={"#fff"}
          containerStyle={{ width: "80%", marginLeft: "2.5%", borderBottomColor: "#ffffff", marginTop: "-7.5%"}}
          placeholder='Prioritize your ToDo'
          value={"All"}
          data={priorityData}
          onChangeText={this.priorityDataHandelar}
        />
          <Icon style={{ marginTop: 5, marginRight: 5 }} name={"caret-down"} color={"#000000"} size={30} />
        </View>
        <TodoList
          todos={this.props.todos}
          onItemSelected={this.itemSelectedHandler}
          onDoneSelected={this.doneSelectedHandler}
        />

        <LinearGradient
          colors={['#0637a5', '#0fadd5']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            width: 120,
            height: 120,
            position: "absolute",
            left: width / 2 - 120 / 2,
            bottom: -60,
            backgroundColor: "#0641A7",
            borderRadius: 120 / 2
          }}
        >
          <TouchableOpacity
            onPress={() => { this.props.navigation.navigate('InputToDo') }}
          >

            <Icon style={{ marginTop: 20, marginLeft: 46 }} name={"plus"} color={"#ffffff"} size={30} />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  headerContainer: {
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "2.5%"

  }
});
const mapStateToProps = state => {
  return {
    todos: state.todos.todos,
    userId: state.auth.userId,
    token: state.auth.token,

  };
};
const mapDispatchToProps = dispatch => {
  return {
    onDdoneTodo: key => dispatch(doneTodo(key)),
    onLoadTodos: (userId, token) => dispatch(getTodos(userId, token)),
    // onLoadLabels: () => dispatch(getLabels()),
    // onLoadEvents: () => dispatch(getEvents())
  };
};
ToDosScreen.navigationOptions = {
  headerBackground: (
    <LinearGradient
      colors={['#0637a5', '#0fadd5']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    />
  ),
  headerTitleStyle: { color: '#fff' },
};
export default connect(mapStateToProps, mapDispatchToProps)(ToDosScreen);