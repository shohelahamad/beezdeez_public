import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import CityNavigator from './navigation/CityNavigator';
import StartNavigator from './navigation/StartNavigator';
import AppNavigator from './navigation/AppNavigator';
import ShopNavigator from './navigation/ShopNavigator';

import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import productsReducer from './store/reducers/products';
import startContentReducer from './store/reducers/startContent';
import welcomeMsgReducer from './store/reducers/welcome';
import locationReducer from './store/reducers/location';
import startArticleReducer from './store/reducers/startArticle';
import uiReducer from "./store/reducers/ui";
import authReducer from "./store/reducers/auth";
import eventsReducer from "./store/reducers/events";
import todosReducer from "./store/reducers/todos";
import notesReducer from "./store/reducers/notes";
import labelsReducer from "./store/reducers/labels";
import contactReducer from "./store/reducers/userContacts";
import { Button, ThemeProvider } from 'react-native-elements';
import themstyle from './assets/style/theme';
import NavigatorService from "./components/UI/NavStart/NavigatorService";
import * as Permissions from 'expo-permissions';

const rootReducer = combineReducers({
  products: productsReducer,
  startContent: startContentReducer,
  ui: uiReducer,
  auth: authReducer,
  events: eventsReducer,
  todos: todosReducer,
  notes: notesReducer,
  labels: labelsReducer,
  userContacts: contactReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk)),
);
const fetchFonts = () => {
  Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};
export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  async function askForPermission() {
    await this._askForCalendarPermissions();
    await this._askForReminderPermissions();
  }
  useEffect(() => {
    askForPermission();
  }, []);
  _askForCalendarPermissions = async () => {
    await Permissions.askAsync(Permissions.CALENDAR);
  };

  _askForReminderPermissions = async () => {
    if (Platform.OS === 'android') {
      return true;
    }
    await Permissions.askAsync(Permissions.REMINDERS);
  };
  if (!fontLoaded) {
    return <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setFontLoaded(true)}
    />
  }
  return (
    <ThemeProvider theme={themstyle}>
      <Provider store={store}>
        <AppNavigator ref={navigatorRef => {
          NavigatorService.setContainer(navigatorRef);
        }}/>
      </Provider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
