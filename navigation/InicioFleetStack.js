import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';

import HomeScreen from '../screens/Inicio_Fleet/HomeScreen';
import EarningNoDriverScreen from '../screens/Inicio_Fleet/EarningNoDriver';
import EarningDriverScreen from '../screens/Inicio_Fleet/EarningDriver';
import RealTimeReportScreen from '../screens/Inicio_Fleet/RealTimeReport';

import Colors from "../constants/Colors";
import Icon from "react-native-vector-icons/FontAwesome5";


const config = Platform.select({
    web: { headerMode: 'screen' },
    default: {},
});

const InicioFleetStack = createStackNavigator(
    {
        HomeScreen: HomeScreen,
        EarningNoDriverScreen: EarningNoDriverScreen,
        EarningDriverScreen: EarningDriverScreen,
        RealTimeReportScreen: RealTimeReportScreen
    },
    config
);

InicioFleetStack.navigationOptions = {
    tabBarLabel: 'Inicio',
        tabBarIcon: ({ focused }) => (
            <Icon
                focused={focused}
                name='home'
                size={26}
                style={{ marginBottom: -3 }}
                color={focused ? Colors.primaryDark : Colors.primaryLight}
            />
        ),
};

export default InicioFleetStack;