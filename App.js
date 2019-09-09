import React from 'react';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import HomeScreen from './Components/Home';
import EarningNoDriverScreen from './Components/EarningNoDriver';
import EarningDriverScreen from './Components/EarningDriver';
import RealTimeReportScreen from './Components/RealTimeReport';
//import BottomTemplate from './Components/BottomTemplate';

const MainStack = createStackNavigator({
  Home : { screen: HomeScreen },
  EarningNoDriver : { screen: EarningNoDriverScreen },
  EarningDriver : { screen: EarningDriverScreen },
  RealTimeReport : { screen: RealTimeReportScreen }
},{
  initialRouteName: "Home",
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: "#fff"
    },
    headerTintColor: "#000",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  }
});

const AppContainer = createAppContainer(MainStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

