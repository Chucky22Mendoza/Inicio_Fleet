// In App.js in a new project

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
import { Divider } from 'react-native-elements';
import { Table, Row, Rows } from 'react-native-table-component';

import TopTemplate from './TopTemplate';
//import BottomTemplate from './BottomTemplate';


export default class EarningNoDriverScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHeadProd: ['Vehículo', 'Comisión'],
            tableDataProd: [
                ['Chevrolet-Beat(Azul) COL-4568R', '$2500.00mxn'],
                ['Chevrolet-Aveo(Gris) COL-6462J', '$2600.00mxn'],
            ],
            tableDataTotal: [
                ['Total', '$5100.00mxn']
            ]
        };
    }

    test = () => {
        alert("This is a test", "Hola");
    };

    static navigationOptions = {
        title: 'Mis ganancias Socio-No Conductor'
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
                                size={120}
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

                            <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Icon
                                    name='user'
                                    size={40}
                                />
                                <Text style={{ fontSize: 18 }}>Ramon Ayala</Text>
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

                        <View style={{paddingHorizontal: 10, paddingTop:5}}>
                            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                                <Row data={this.state.tableHeadProd} style={styles.head} textStyle={styles.text} />
                                <Rows data={this.state.tableDataProd} textStyle={styles.text} />
                            </Table>
                            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                                <Rows data={this.state.tableDataTotal}  style={styles.head} textStyle={styles.text} />
                            </Table>
                        </View>

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
    },
    head: {
        height: 20,
        backgroundColor: '#f1f8ff'
    },
    text: {
        margin: 2
    }
});