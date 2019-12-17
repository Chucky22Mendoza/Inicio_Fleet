// In App.js in a new project

/**
 *
 * BOTTOMTEMPLATE es un componente utilizado para la parte superior de la aplicación
 * Este aún no ha sido implementado en la aplicación, pero será de utilidad cuando
 * se requiera integrar la aplicación completa
 *
 **/

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
import * as Font from 'expo-font';

/**
 *
 *
 * @export
 * @class TopTemplate
 * @extends {React.Component}
 */
export default class TopTemplate extends React.Component {
    /**
     *Creates an instance of TopTemplate.
     * @param {*} props
     * @memberof TopTemplate
     */
    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: false,  //Variable para comprobar el cargado de fuentes
        };
    }

    /**
     *
     *
     * @memberof WalletScreen
     *
     * Método para comprobar el funcionamiento de botones/iconos
     *
     */
    test = () => {
        alert("This is a test", "Hola");
    };

    /**
     *
     *
     * @static
     * @memberof TopTemplate
     */
    static navigationOptions = {
        title: 'Inicio'
    };

    /**
     *
     *
     * @memberof TopTemplate
     */
    async componentDidMount(){
        //cargar fuentes
        await Font.loadAsync({
            'Aller_Lt': require('./../assets/fonts/Aller_Lt.ttf'),
        });

        //Variable de carga de fuentes
        this.setState({fontLoaded: true});
    }

    /**
     *
     *
     * @returns
     * @memberof TopTemplate
     */
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
                            style={{color: '#ec6a2c'}}
                        />
                        {
                            this.state.fontLoaded ? (
                                <Text style={{ fontFamily: 'Aller_Lt', fontSize: 12 }}>Inicio</Text>
                            ): null
                        }
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
                            style={{color: '#ec6a2c'}}
                        />
                        {
                            this.state.fontLoaded ? (
                                <Text style={{ fontFamily: 'Aller_Lt', fontSize: 12 }}>Conductores</Text>
                            ): null
                        }
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
                            style={{color: '#ec6a2c'}}
                        />
                        {
                            this.state.fontLoaded ? (
                                <Text style={{ fontFamily: 'Aller_Lt', fontSize: 12 }}>Vehículos</Text>
                            ): null
                        }
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
                            style={{color: '#ec6a2c'}}
                        />
                        {
                            this.state.fontLoaded ? (
                                <Text style={{ fontFamily: 'Aller_Lt', fontSize: 12 }}>Mi perfil</Text>
                            ): null
                        }
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
                            style={{color: '#ec6a2c'}}
                        />
                        {
                            this.state.fontLoaded ? (
                                <Text style={{ fontFamily: 'Aller_Lt', fontSize: 12 }}>Gestión</Text>
                            ): null
                        }
                    </View>
                </TouchableOpacity>

            </View>

        );
    }
}

//Estilos de diseño defenidos
const styles = StyleSheet.create({
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