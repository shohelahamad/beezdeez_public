import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native'
import { connect } from 'react-redux';
import { addLabel, updateLabel } from '../../store/actions/labels';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';
const { height, width } = Dimensions.get("window");
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Permissions from "expo-permissions";
import * as Calendar from 'expo-calendar';



class EventsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // For adding a contact
      firstName: '',
      lastName: '',
      phoneNumber: '',
      userEvents: []
    };
  }
  componentDidMount() {

  }
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CALENDAR);
    if (status === 'granted') {
      const calendars = await Calendar.getCalendarsAsync();
      console.log('Here are all your calendars:');
      console.log({ calendars });
      this.setState({
        userEvents: calendars
      })
    }
  }
  keyExtractor = (item, index) => index.toString()
  render() {
    let datesWhitelist = [{
      start: moment(),
      end: moment().add(365, 'days'), // total 4 days enabled
    }];
    let datesBlacklist = [moment().add(1, 'days')]; // 1 day disabled
    return (
      <View style={styles.container}>
        <CalendarStrip
          calendarAnimation={{ type: 'sequence', duration: 30 }}
          daySelectionAnimation={{ type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: 'white' }}
          style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
          calendarHeaderStyle={{ color: 'white' }}
          calendarColor={'#0637a5'}
          dateNumberStyle={{ color: 'white' }}
          dateNameStyle={{ color: 'white' }}
          highlightDateNumberStyle={{ color: 'yellow' }}
          highlightDateNameStyle={{ color: 'yellow' }}
          disabledDateNameStyle={{ color: 'grey' }}
          disabledDateNumberStyle={{ color: 'grey' }}
          datesWhitelist={datesWhitelist}
          // iconLeft={require('./img/left-arrow.png')}
          // iconRight={require('./img/right-arrow.png')}
          iconContainer={{ flex: 0.1 }}
        />
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 20,
          }}
        >
          {this.state.userEvents.map(item => (
            <TouchableOpacity
              onPress={() => {
                this.setState(
                  {
                    selectedTask: item,
                    isModalVisible: true,
                  },
                  () => {
                    this._getEvent();
                  }
                );
              }}
              key={item.id}
              style={styles.taskListContent}
            >
              <View
                style={{
                  marginLeft: 13,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      height: 12,
                      width: 12,
                      borderRadius: 6,
                      backgroundColor: item.color,
                      marginRight: 8,
                    }}
                  />
                  <Text
                    style={{
                      color: '#554A4C',
                      fontSize: 20,
                      fontWeight: '700',
                    }}
                  >
                    {item.title}
                  </Text>
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 20,
                    }}
                  >
                    <Text
                      style={{
                        color: '#BBBBBB',
                        fontSize: 14,
                        marginRight: 5,
                      }}
                    > Time </Text>
                    <Text
                      style={{
                        color: '#BBBBBB',
                        fontSize: 14,
                      }}
                    >
                      {item.notes}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  height: 80,
                  width: 5,
                  backgroundColor: item.color,
                  borderRadius: 5,
                }}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
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
            onPress={() =>
              this.props.navigation.navigate('InputEvent', {
                updateCurrentTask: this._updateCurrentTask,
                createNewCalendar: this._createNewCalendar,
              })
            }
          >

            <Icon style={{ marginTop: 20, marginLeft: 46 }} name={"plus"} color={"#ffffff"} size={30} />
          </TouchableOpacity>
        </LinearGradient>
        {/* <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('InputEvent', {
              updateCurrentTask: this._updateCurrentTask,
              createNewCalendar: this._createNewCalendar,
            })
          }
          style={styles.viewTask}
        ></TouchableOpacity> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5EBE7"
  },
  taskListContent: {
    height: 100,
    width: 327,
    alignSelf: 'center',
    borderRadius: 10,
    shadowColor: '#2E66E7',
    backgroundColor: '#ffffff',
    marginTop: 10,
    marginBottom: 10,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewTask: {
    position: 'absolute',
    bottom: 40,
    right: 17,
    height: 60,
    width: 60,
    backgroundColor: '#2E66E7',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2E66E7',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 30,
    shadowOpacity: 0.5,
    elevation: 5,
    zIndex: 999,
  },
  deleteButton: {
    backgroundColor: '#ff6347',
    width: 100,
    height: 38,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 5,
    justifyContent: 'center',
  },
  updateButton: {
    backgroundColor: '#2E66E7',
    width: 100,
    height: 38,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 5,
    justifyContent: 'center',
    marginRight: 20,
  },
  sepeerator: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#979797',
    alignSelf: 'center',
    marginVertical: 20,
  },
  notesContent: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#979797',
    alignSelf: 'center',
    marginVertical: 20,
  },
  learn: {
    height: 23,
    width: 51,
    backgroundColor: '#F8D557',
    justifyContent: 'center',
    borderRadius: 5,
  },
  design: {
    height: 23,
    width: 59,
    backgroundColor: '#62CCFB',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 7,
  },
  readBook: {
    height: 23,
    width: 83,
    backgroundColor: '#4CD565',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 7,
  },
  title: {
    height: 25,
    borderColor: '#5DD976',
    borderLeftWidth: 1,
    paddingLeft: 8,
    fontSize: 19,
  },
  taskContainer: {
    height: 475,
    width: 327,
    alignSelf: 'center',
    borderRadius: 20,
    shadowColor: '#2E66E7',
    backgroundColor: '#ffffff',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowRadius: 20,
    shadowOpacity: 0.2,
    elevation: 5,
    padding: 22,
  },
});
const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    labels: state.labels.labels
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAddLabel: (userId, labelTitle, labelColor) =>
      dispatch(addLabel(userId, labelTitle, labelColor)),
    onUpdateLabel: (userId, labelKey, labelTitle, labelColor) =>
      dispatch(updateLabel(userId, labelKey, labelTitle, labelColor))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsScreen);