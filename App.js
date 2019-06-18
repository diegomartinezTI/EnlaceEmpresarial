import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, YellowBox,Image } from 'react-native';
import { createStackNavigator,createAppContainer,createDrawerNavigator } from 'react-navigation';

import HomeActivity         from './activities/HomeActivity';
import LoginActivity        from './activities/LoginActivity';
import ListActivity         from './activities/ListActivity';
import ListCartActivity     from './activities/ListCartActivity';
import RegisterActivity     from './activities/RegisterActivity';
import ItemActivity         from './activities/ItemActivity';
import LogoutActivity       from './activities/LogoutActivity';
import FormActivity         from './activities/FormActivity';
import FormRegisterActivity from './activities/FormRegisterActivity';
import MyHeader from './activities/menu';

 

const RootStack = createStackNavigator(
{ 
  Home         : { screen : HomeActivity },
  Login        : { screen : LoginActivity },
  List         : { screen : ListActivity },
  Carrito      : { screen : ListCartActivity },
  Register     : { screen : RegisterActivity },
  Item         : { screen : ItemActivity },
  Out          : { screen : LogoutActivity },
  Form         : { screen : FormActivity }, 
  FormRegister : { screen : FormRegisterActivity },
  MyHeader     : { screen : MyHeader }
},
{
  initialRouteName: 'Home',
  headerMode: 'none' 
});



const App = createAppContainer(RootStack);
export default App;
/*
export default class App extends Component {
  render() {
    return <RootStack />;
  }
}*/

