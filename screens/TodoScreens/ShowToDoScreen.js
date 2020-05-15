import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import CheckBox from 'react-native-check-box';
import { connect } from "react-redux";
import { Dropdown } from 'react-native-material-dropdown';
import Icon from "react-native-vector-icons/FontAwesome";
import Iconfa from "react-native-vector-icons/FontAwesome5";
import { doneTodo } from "../../store/actions/index";
import { updateDueDate } from "../../store/actions/index";
import { updatePriority } from "../../store/actions/index";
import { MaterialIcons } from '@expo/vector-icons';


class ShowToDoScreen extends Component {
  itemKey = this.props.navigation.getParam('itemKey');
  selTodo = this.props.todos.find(todo => {
    return todo.key === this.itemKey;
  });
  placeDeletedHandler = () => {
    this.props.onDeletePlace(this.selTodo.key);
    this.props.navigator.pop();
  };
  doneSelectedHandler = () => {
    altDone= !this.selTodo.isDone
    this.props.onDdoneTodo(this.props.userId,this.selTodo.key,altDone);
    this.selTodo.isDone = !this.selTodo.isDone
  };
  updateToDoDueDate = (newDueDate) => {
    this.props.onNewDate(this.selTodo.key, newDueDate);
    this.selTodo.dueDate = newDueDate;
  };
  updateToDoPriority = (newPriority) => {
    this.props.onNewPriority(this.selTodo.key, newPriority);
  };
  _handleDatePicked = (date) => {
    this.setState({
      isDateTimePickerVisible: false,
      dueDate: moment(date).format('MMMM Do YYYY, HH:mm')
    })
  };
  //   lapsList() {

  //     return this.state.selectedPlace.priority.map(() => {
  //       return (
  //         <View style={{ width: 35, marginRight: 8 }}>
  //             <Icon style={{ marginTop: 10 }} size={25} name={this.selTodo.priority === "Less Important" ? "arrow-down" : "arrow-up"} color={this.selTodo.priority === "Less Important" ? "green" : this.selTodo.priority === "Medium" ? "#ffc107" : "red"} />
  //           </View>
  //       )
  //     })

  // }
  render() {
    // let priorityIcon = (
    //  this.state.selectedPlace.priority.map(() => {
    //     return (
    //       <View style={{ width: 35, marginRight: 8 }}>
    //           <Icon style={{ marginTop: 10 }} size={25} name={this.selTodo.priority === "Less Important" ? "arrow-down" : "arrow-up"} color={this.selTodo.priority === "Less Important" ? "green" : this.selTodo.priority === "Medium" ? "#ffc107" : "red"} />
    //         </View>
    //     )
    //   })
    //   // <View style={{ width: 35, marginRight: 8 }}>
    //   //       <Icon style={{ marginTop: 10 }} size={25} name={this.selTodo.priority === "Less Important" ? "arrow-down" : "arrow-up"} color={this.selTodo.priority === "Less Important" ? "green" : this.selTodo.priority === "Medium" ? "#ffc107" : "red"} />
    //   //   </View>
    // );
    let priorityData = [{
      value: 'Important'
    }, {
      value: 'Medium'
    }, {
      value: 'Less Important'
    }];
    return (
      <ScrollView style={styles.container}>
        <View style={styles.row}>

          <CheckBox style={{ width: "10%" }}
            onClick={this.doneSelectedHandler}
            isChecked={this.selTodo.isDone}
            checkedImage={<Icon style={{}} size={30} name="check-square" color="#0641A7" />}
            unCheckedImage={<Iconfa style={{}} size={30} name="square" color="#969696" />}
          />
          <Text style={styles.placeName}>{this.selTodo.todoTitle}</Text>
        </View>
        <View
          style={{
            borderBottomColor: '#efefef',
            borderBottomWidth: 2,
            marginTop: 20
          }}
        />
        <Text style={{ marginTop: 10, marginBottom: 5, color: "#969696", fontSize: 15 }}>Description</Text>
        <Text style={{}}>{this.selTodo.todoDescribtion}</Text>
        <View
          style={{
            borderBottomColor: '#efefef',
            borderBottomWidth: 2,
            marginTop: 20
          }}
        />
        <Text style={{ marginTop: 10, marginBottom: 5, color: "#969696", fontSize: 15 }}>Due Date</Text>
        <View style={styles.row}>
          <View style={{ width: "93%", flexDirection: "row" }}>
            <Iconfa style={{ marginTop: 10 }} size={30} name="calendar" color="red" />
            <Text style={{ marginTop: 15, marginLeft: 15, marginBottom: 5, color: "red", fontSize: 20 }}>{this.selTodo.dueDate}</Text>
          </View>
          <TouchableOpacity onPress={() => { this.selTodo.dueDate != "" ? this.updateToDoDueDate("") : null }} style={{ width: "7%" }} >
            <Icon style={{ marginTop: 10 }} size={25} name="times" color="#969696" />
          </TouchableOpacity>

        </View>
        <View
          style={{
            borderBottomColor: '#efefef',
            borderBottomWidth: 2,
            marginTop: 20
          }}
        />
        <Text style={{ marginTop: 10, marginBottom: 5, color: "#969696", fontSize: 15 }}>Priority</Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: 35, marginRight: 8 }}>
            <Icon style={{ marginTop: 10 }} size={25} name={this.selTodo.priority === "Less Important" ? "arrow-down" : "arrow-up"} color={this.selTodo.priority === "Less Important" ? "green" : this.selTodo.priority === "Medium" ? "#ffc107" : "red"} />
          </View>
          <View style={{ flex: 1, marginTop: -15 }}>
            <Dropdown
              fontSize={20}
              style={{ paddingBottom: 10, height: 30 }}
              value={this.selTodo.priority}
              onChangeText={this.updateToDoPriority}
              data={priorityData}
              // pickerStyle={{width: 20, height: 20}}
              baseColor={"#969696"}
            />
          </View>
        </View>
        <View
          style={{
            borderBottomColor: '#efefef',
            borderBottomWidth: 2,
            marginTop: -10
          }}
        />
        <Text style={{ marginTop: 10, marginBottom: 5, color: "#969696", fontSize: 15 }}>Form</Text>
        <View style={styles.row}>
          <View style={{ width: "93%", flexDirection: "row" }}>

            <Iconfa style={{ marginTop: 10 }} size={30} name="calendar" color="#0641A7" />

            <Text style={{ marginTop: 15, marginLeft: 15, marginBottom: 5, color: "#000000", fontSize: 20 }}>{this.selTodo.eventId}</Text>
          </View>
          <View style={{ width: "7%" }}>
            <Icon style={{ marginTop: 10 }} size={25} name="times" color="#969696" />
          </View>
        </View>
        <View
          style={{
            borderBottomColor: '#efefef',
            borderBottomWidth: 2,
            marginTop: 20
          }}
        />
        {/* <View>
          <TouchableOpacity onPress={this.placeDeletedHandler}>
            <View style={styles.deleteButton}>
              <Icon size={30} name="trash" color="red" />
            </View>
          </TouchableOpacity>
        </View> */}
        {/* <Text style={styles.placeName}>{this.selTodo.todoTitle}</Text>
          <Text style={styles.placeName}>{this.selTodo.todoDescribtion}</Text>
          <Text style={styles.placeName}>{this.selTodo.priority}</Text>
          <Text style={styles.placeName}>{this.selTodo.dueDate}</Text>
          <Text style={styles.placeName}>{this.selTodo.eventId}</Text> */}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 22,
    padding: 10
  },
  placeImage: {
    width: "100%",
    height: 200
  },
  placeName: {
    fontWeight: "bold",
    fontSize: 28,
    marginLeft: 0
  },
  deleteButton: {
    alignItems: "center"
  },
  row: {
    flex: 1,
    flexDirection: "row",
    // justifyContent: "space-between",
  }
});
const mapStateToProps = state => {
  return {
    todos: state.todos.todos,
    userId: state.auth.userId
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onDdoneTodo: (userId,key,isDone) => dispatch(doneTodo(userId,key, isDone)),
    onNewDate: (key, newDueDate) => dispatch(updateDueDate(key, newDueDate)),
    onNewPriority: (key, newDueDate) => dispatch(updatePriority(key, newDueDate)),
  };
};
ShowToDoScreen.navigationOptions = navData => {
  return {
    // headerTitle: (
    //     <Image
    //       style={{
    //         alignSelf: 'stretch',
    //         width: 40,
    //         height: 40,
    //       }}
    //       resizeMode="contain"
    //       source={require('../../assets/DEU_Memmelsdorf.png')}
    //     />
    // ),
    // headerStyle: {
    //     backgroundColor: 'darkgreen',
    // },
    // headerTintColor: '#fff',
    // stateBar: '#ffffff',
    headerRight: <MaterialIcons name="edit" style={{ color: '#0637a5', fontSize: 25, paddingRight: 10 }} onPress={() => {
      navData.navigation.navigate('InputToDo',
        {
          toDoId: navData.navigation.getParam('itemKey')
        }
      );
    }} />
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowToDoScreen);
