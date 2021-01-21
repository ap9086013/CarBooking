/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import StackNagivations from './src/nagivations/StackNagivations';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './src/components/reduce/Reducer';

const store = createStore(reducer); 
const App = () => {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications
  return (
    <Provider store={store}>
    <StackNagivations/>
      </Provider >
  );
};


export default App;
