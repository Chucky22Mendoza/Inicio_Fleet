// In App.js in a new project

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";

export default class TopTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    test = () => {
        alert("This is a test", "Hola");
    };

    static navigationOptions = {
        title: 'Inicio'
    };

    render() {
        return (
            <View style={{
                height: 90,
                marginTop: 485,
                paddingRight: 10,
                paddingTop: 5,
                position: 'absolute',
                justifyContent: 'center',
                flexDirection: 'row',
                backgroundColor: '#f0f4f7'
            }}>

                <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")}>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: 10
                    }}>
                        <Icon
                            name='home'
                            size={45}
                        />
                        <Text style={{ fontSize: 12 }}>Inicio</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.test}>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: 10
                    }}>
                        <Icon
                            name='car-side'
                            size={45}
                        />
                        <Text style={{ fontSize: 12 }}>Conductores</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.test}>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: 10
                    }}>
                        <Icon
                            name='car'
                            size={45}
                        />
                        <Text style={{ fontSize: 12 }}>Vehículos</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.test}>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: 10
                    }}>
                        <Icon
                            name='user'
                            size={45}
                        />
                        <Text style={{ fontSize: 12 }}>Mi perfil</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.test}>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: 10
                    }}>
                        <Icon
                            name='chart-pie'
                            size={45}
                        />
                        <Text style={{ fontSize: 12 }}>Gestión</Text>
                    </View>
                </TouchableOpacity>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    row: {
        height: 5,
        backgroundColor: "#f0f4f7"
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        paddingHorizontal: 4,
        paddingVertical: 2
    }
});