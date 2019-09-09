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
            tableHead: ['Total', 'Efectivo', 'Tarjeta', 'Comisión', 'Ganancia fin'],
            tableData: [
                ['$3000.00', '$2000.00', '$1000.00', '-$300.00', '$2700.00']
            ]
        };
    }

    test = () => {
        alert("This is a test", "Hola");
    };

    static navigationOptions = {
        title: 'Reporte en tiempo real'
    };

    render() {
        return (
            <View>
                <ScrollView style={{marginBottom: 75}}>
                    <View>
                        <TopTemplate></TopTemplate>
                        <View style={{
                            marginBottom: 5,
                            marginTop: 15,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
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
                                <Text style={{ fontSize: 18 }}>Manuel Leyva</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Text style={{ fontSize: 18, marginTop: 5, paddingRight: 60}}>Ganancia actual</Text>
                                    <Text style={{ fontSize: 18, marginTop: 5, color: 'blue', fontWeight: 'bold' }}>$3,000.00mxn</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{paddingHorizontal: 10, paddingTop:5, marginBottom: 15}}>
                            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                                <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text} />
                                <Rows data={this.state.tableData} textStyle={styles.text} />
                            </Table>
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
    },
    head: {
        height: 40,
        backgroundColor: '#f1f8ff'
    },
    text: {
        fontSize: 12,
        margin: 2
    }
});