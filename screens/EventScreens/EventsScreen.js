import _ from 'lodash';
import React, { Component } from 'react';
import {
  Platform,
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
  Dimensions,
  StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header } from 'react-navigation-stack';
import { LinearGradient } from 'expo-linear-gradient';
const { height, width } = Dimensions.get("window");
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { ExpandableCalendar, AgendaList, CalendarProvider, WeekCalendar } from 'react-native-calendars';


const testIDs = {
  menu: {
    CONTAINER: 'menu',
    CALENDARS: 'calendars_btn',
    CALENDAR_LIST: 'calendar_list_btn',
    HORIZONTAL_LIST: 'horizontal_list_btn',
    AGENDA: 'agenda_btn',
    EXPANDABLE_CALENDAR: 'expandable_calendar_btn',
    WEEK_CALENDAR: 'week_calendar_btn'
  },
  calendars: {
    CONTAINER: 'calendars',
    FIRST: 'first_calendar',
    LAST: 'last_calendar'
  },
  calendarList: { CONTAINER: 'calendarList' },
  horizontalList: { CONTAINER: 'horizontalList' },
  agenda: {
    CONTAINER: 'agenda',
    ITEM: 'item'
  },
  expandableCalendar: { CONTAINER: 'expandableCalendar' },
  weekCalendar: { CONTAINER: 'weekCalendar' }
}


const today = new Date().toISOString().split('T')[0];
const fastDate = getPastDate(3);
const futureDates = getFutureDates(9);
const dates = [fastDate, today].concat(futureDates);
const themeColor = '#00AAAF';
const lightThemeColor = '#EBF9F9';

function getFutureDates(days) {
  const array = [];
  for (let index = 1; index <= days; index++) {
    const date = new Date(Date.now() + (864e5 * index)); // 864e5 == 86400000 == 24*60*60*1000
    const dateString = date.toISOString().split('T')[0];
    array.push(dateString);
  }
  return array;
}

function getPastDate(days) {
  return new Date(Date.now() - (864e5 * days)).toISOString().split('T')[0];
}

const ITEMS = [
  { title: dates[0], data: [{ hour: '12am', duration: '1h', title: 'Ashtanga Yoga' }] },
  { title: dates[1], data: [{ hour: '4pm', duration: '1h', title: 'Pilates ABC' }, { hour: '5pm', duration: '1h', title: 'Vinyasa Yoga' }] },
  { title: dates[2], data: [{ hour: '1pm', duration: '1h', title: 'Ashtanga Yoga' }, { hour: '2pm', duration: '1h', title: 'Deep Streches' }, { hour: '3pm', duration: '1h', title: 'Private Yoga' }] },
  { title: dates[3], data: [{ hour: '12am', duration: '1h', title: 'Ashtanga Yoga' }] },
  { title: dates[4], data: [{}] },
  { title: dates[5], data: [{ hour: '9pm', duration: '1h', title: 'Pilates Reformer' }, { hour: '10pm', duration: '1h', title: 'Ashtanga' }, { hour: '11pm', duration: '1h', title: 'TRX' }, { hour: '12pm', duration: '1h', title: 'Running Group' }] },
  { title: dates[6], data: [{ hour: '12am', duration: '1h', title: 'Ashtanga Yoga' }] },
  { title: dates[7], data: [{}] },
  { title: dates[8], data: [{ hour: '9pm', duration: '1h', title: 'Pilates Reformer' }, { hour: '10pm', duration: '1h', title: 'Ashtanga' }, { hour: '11pm', duration: '1h', title: 'TRX' }, { hour: '12pm', duration: '1h', title: 'Running Group' }] },
  { title: dates[9], data: [{ hour: '1pm', duration: '1h', title: 'Ashtanga Yoga' }, { hour: '2pm', duration: '1h', title: 'Deep Streches' }, { hour: '3pm', duration: '1h', title: 'Private Yoga' }] },
  { title: dates[10], data: [{ hour: '12am', duration: '1h', title: 'Ashtanga Yoga' }] }
];
class EventsScreen extends Component {

  onDateChanged = (/* date, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
    // fetch and set data for date + week ahead
  }

  onMonthChange = (/* month, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onMonthChange: ', month, updateSource);
  }

  buttonPressed() {
    Alert.alert('show more');
  }

  itemPressed(id) {
    Alert.alert(id);
  }

  renderEmptyItem() {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned</Text>
      </View>
    );
  }

  renderItem = ({ item }) => {
    if (_.isEmpty(item)) {
      return this.renderEmptyItem();
    }

    return (
      <TouchableOpacity
        onPress={() => this.itemPressed(item.title)}
        style={styles.item}
      >
        <View>
          <Text style={styles.itemHourText}>{item.hour}</Text>
          <Text style={styles.itemDurationText}>{item.duration}</Text>
        </View>
        <Text style={styles.itemTitleText}>{item.title}</Text>
        <View style={styles.itemButtonContainer}>
          <Button color={'grey'} title={'Info'} onPress={this.buttonPressed} />
        </View>
      </TouchableOpacity>
    );
  }

  getMarkedDates = () => {
    const marked = {};
    ITEMS.forEach(item => {
      // NOTE: only mark dates with data
      if (item.data && item.data.length > 0 && !_.isEmpty(item.data[0])) {
        marked[item.title] = { marked: true };
      } else {
        marked[item.title] = { disabled: true };
      }
    });
    return marked;
  }

  getTheme = () => {
    const disabledColor = '#efefef';

    return {
      // arrows
      arrowColor: 'black',
      arrowStyle: { padding: 0 },
      // month
      monthTextColor: 'black',
      textMonthFontSize: 16,
      textMonthFontFamily: 'HelveticaNeue',
      textMonthFontWeight: 'bold',
      // day names
      textSectionTitleColor: 'black',
      textDayHeaderFontSize: 12,
      textDayHeaderFontFamily: 'HelveticaNeue',
      textDayHeaderFontWeight: 'normal',
      // dates
      dayTextColor: themeColor,
      textDayFontSize: 18,
      textDayFontFamily: 'HelveticaNeue',
      textDayFontWeight: '500',
      textDayStyle: { marginTop: Platform.OS === 'android' ? 2 : 4 },
      // selected date
      selectedDayBackgroundColor: themeColor,
      selectedDayTextColor: 'white',
      // disabled date
      textDisabledColor: disabledColor,
      // dot (marked date)
      dotColor: themeColor,
      selectedDotColor: 'white',
      disabledDotColor: disabledColor,
      dotStyle: { marginTop: -2 }
    };
  }

  render() {
    return (
      <CalendarProvider
        date={ITEMS[0].title}
        onDateChanged={this.onDateChanged}
        onMonthChange={this.onMonthChange}
        showTodayButton
        disabledOpacity={0.6}
      // theme={{
      //   todayButtonTextColor: themeColor,
      // }}
      // todayBottomMargin={16}
      >
        <StatusBar barStyle="light-content" />

        {this.props.weekView ?
          <WeekCalendar
            testID={testIDs.weekCalendar.CONTAINER}
            firstDay={1}
            markedDates={this.getMarkedDates()}
          /> :
          <ExpandableCalendar
            testID={testIDs.expandableCalendar.CONTAINER}
            // horizontal={false}
            // hideArrows
            // disablePan
            // hideKnob
            // initialPosition={ExpandableCalendar.positions.OPEN}
            // calendarStyle={styles.calendar}
            // headerStyle={styles.calendar} // for horizontal only
            // disableWeekScroll
            // theme={this.getTheme()}
            disableAllTouchEventsForDisabledDays
            firstDay={4}
            markedDates={this.getMarkedDates()} // {'2019-06-01': {marked: true}, '2019-06-02': {marked: true}, '2019-06-03': {marked: true}};
          // leftArrowImageSource={require('../../assets/left-arrow.png')}
          // rightArrowImageSource={require('../../assets/right-arrow')}
          />
        }
        <View style={{ flexDirection: 'row', marginTop: 10}}>
          <FontAwesome name="calendar" style={{ color: 'darkblue', fontSize: 30, paddingLeft: 10 }} />
          <Text style={{ fontSize: 30, paddingLeft: 15, fontWeight: 'bold'}}> Next Events </Text>
        </View>
        <AgendaList
          sections={ITEMS}
          extraData={this.state}
          renderItem={this.renderItem}
        // sectionStyle={styles.section}
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
            onPress={() => { this.props.navigation.navigate('InputEvent') }}
          >

            <Icon style={{ marginTop: 20, marginLeft: 46 }} name={"plus"} color={"#ffffff"} size={30} />
          </TouchableOpacity>
        </LinearGradient>
      </CalendarProvider>
    );
  }
}
EventsScreen.navigationOptions = navData => {
  return {
    headerTitle: "Events",
    headerTintColor: 'white',
    headerBackground: (
      <LinearGradient
        colors={['#0637a5', '#0fadd5']}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
    ),
    ...Platform.select({
      android: {
        headerForceInset: { top: 'never', bottom: 'never' },
        // headerStyle: {
        //   height: 90
        // },
      },
      ios: {
        // headerStyle: {
        //   height: 60
        // }
      }
    }),
    headerTitleStyle: { color: '#fff', fontSize: width * 0.06, textAlign: 'center' },
    headerLeft: <Ionicons name="ios-menu" style={{ color: '#ffffff', fontSize: 35, paddingLeft: 10 }} onPress={() => {
      navData.navigation.toggleDrawer()
    }} />

  }
}
const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20
  },
  section: {
    backgroundColor: lightThemeColor,
    color: 'grey',
    textTransform: 'capitalize'
  },
  item: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    flexDirection: 'row'
  },
  itemHourText: {
    color: 'black'
  },
  itemDurationText: {
    color: 'grey',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4
  },
  itemTitleText: {
    color: 'black',
    marginLeft: 16,
    fontWeight: 'bold',
    fontSize: 16
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey'
  },
  emptyItemText: {
    color: 'lightgrey',
    fontSize: 14
  }

});
const mapStateToProps = state => {
  return {
    notes: state.notes.notes,
    userId: state.auth.userId,
    token: state.auth.token,
    isLoading: state.ui.isLoading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onLoadNotes: (userId, token) => dispatch(getNotes(userId, token)),
    onLoadLabels: (userId) => dispatch(getLabels(userId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EventsScreen);