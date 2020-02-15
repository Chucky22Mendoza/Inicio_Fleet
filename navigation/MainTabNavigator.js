// import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import InicioFleetStack from './InicioFleetStack';

const tabNavigator = createBottomTabNavigator({
    InicioFleetStack
}, {
    initialRouteName: 'InicioFleetStack',
    defaultNavigationOptions: {
        tabBarOptions: {
            activeTintColor: "#ec6a2c",
            labelStyle: {
                fontFamily: 'aller-bd',
            },
        }
    }
});

export default tabNavigator;