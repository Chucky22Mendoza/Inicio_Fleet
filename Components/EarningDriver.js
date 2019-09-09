// In App.js in a new project

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
import { Divider } from 'react-native-elements';

import TopTemplate from './TopTemplate';
//import BottomTemplate from './BottomTemplate';


export default class EarningDriverScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    test = () => {
        alert("This is a test", "Hola");
    };

    static navigationOptions = {
        title: 'Mis ganancias Socio-Conductor'
    };

    render() {
        return (
            <View>
                <ScrollView style={{marginBottom: 75}}>
                    <View>
                        <TopTemplate></TopTemplate>
                        <View style={{
                            marginBottom: 5,
                            marginTop: -45,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Icon
                                name='money-bill-alt'
                                size={60}
                                onPress={this.test}
                            />
                        </View>

                        <Divider style={styles.row}></Divider>

                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'row',
                                padding: 5
                            }}>

                            <View style={{ alignItems: 'center', justifyContent: 'flex-end', marginBottom:20 }}>
                                <Icon
                                    name='user'
                                    size={40}
                                />
                                <Text style={{ fontSize: 18 }}>Ramon Ayala</Text>
                                <Text style={{ fontSize: 25 }}>$5100.00mxn</Text>
                                <Text style={{ fontSize: 15, marginTop: 5 }}>Ganancia semana</Text>
                                <TouchableOpacity>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 15, borderWidth: 2, paddingVertical: 2, paddingHorizontal: 5 }}>19 ago - 25 ago</Text>
                                        <Icon
                                            name='calendar-alt'
                                            size={25}
                                            style={{
                                                marginLeft: 5
                                            }}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Divider style={styles.row}></Divider>

                        <View style={{
                            height: 25,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            padding: 5
                        }}>

                            <View>
                                <Text style={{ fontSize: 15 }}>Efectivo</Text>
                            </View>

                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Text style={{ fontSize: 15 }}>$3000.00 MXN</Text>
                            </View>

                        </View>

                        <Divider style={styles.row}></Divider>

                        <View style={{
                            height: 25,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            padding: 5
                        }}>

                            <View>
                                <Text style={{ fontSize: 15 }}>Tarjeta</Text>
                            </View>

                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Text style={{ fontSize: 15 }}>$1600.00 MXN</Text>
                            </View>

                        </View>

                        <Divider style={styles.row}></Divider>

                        <View style={{
                            height: 25,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            padding: 5
                        }}>

                            <View>
                                <Text style={{ fontSize: 15 }}>Recompensas/Extras</Text>
                            </View>

                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Text style={{ fontSize: 15 }}>$500.00 MXN</Text>
                            </View>

                        </View>

                        <Divider style={styles.row}></Divider>

                        <View style={{
                            height: 25,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            padding: 5
                        }}>

                            <View>
                                <Text style={{ fontSize: 15 }}>Comisión plataforma</Text>
                            </View>

                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Text style={{ fontSize: 15 }}>$510.00 MXN</Text>
                            </View>

                        </View>

                        <Divider style={styles.row}></Divider>

                        <View style={{
                            height: 25,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            padding: 5
                        }}>

                            <View>
                                <Text style={{ fontSize: 18 }}>Ganancia Final</Text>
                            </View>

                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Text style={{ fontSize: 18 }}>$4590.00 MXN</Text>
                            </View>

                        </View>

                        <Divider style={styles.row}></Divider>

                        <View style={{
                            height: 40,
                            width: 400,
                            justifyContent: 'space-evenly',
                            flexDirection: 'row'
                        }}>

                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: 40,
                                width: 200
                            }}>
                                <Text>Viajes</Text>
                                <Text>40</Text>
                            </View>

                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: 80,
                                width: 200
                            }}>
                                <Text>Horas operadas</Text>
                                <Text>63</Text>
                            </View>

                        </View>

                        <Divider style={styles.row}></Divider>

                        <View style={{
                            height: 25,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            padding: 5
                        }}>

                            <Text style={{ fontSize: 15 }}>Adeudos por cobros con efectivo</Text>

                        </View>

                        <Divider style={styles.row}></Divider>

                        <View style={{
                            height: 25,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            padding: 5
                        }}>

                            <Text style={{ fontSize: 20 }}>$650.00MXN</Text>

                        </View>

                        <Divider style={styles.row}></Divider>

                    </View>
                </ScrollView>
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