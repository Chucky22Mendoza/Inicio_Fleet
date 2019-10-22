// In App.js in a new project

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
import { Divider } from 'react-native-elements';
import { Table, Row, Rows } from 'react-native-table-component';
import axios from 'axios';
import TopTemplate from './TopTemplate';
import * as Font from 'expo-font';
//import BottomTemplate from './BottomTemplate';


export default class EarningNoDriverScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHeadProd: ['Vehículo', 'Comisión'],
            tableDataTotal: [
                ['Total', '$5100.00mxn']
            ],
            id_usuario: this.props.navigation.state.params.id_usuario,
            out_semana: this.props.navigation.state.params.out_semana,
            nombre_propietario: this.props.navigation.state.params.nombre_propietario,
            obj_aux_final: [],
            validateWS: false,
            objChofer: [],
            obj_items: [],
            obj_items_2: [],
            fontLoaded: false,
        };
    }

    test = () => {
        alert("This is a test", "Hola");
    };

    static navigationOptions = {
        title: 'Mis ganancias Socio-No Conductor'
    };

    async componentDidMount(){
        await Font.loadAsync({
            'Aller_Lt': require('./../assets/fonts/Aller_Lt.ttf'),
        });

        this.setState({fontLoaded: true});

        try{

            const res = await axios.post('http://34.95.33.177:3001/inicio_fleet/interfaz_126/socio_no_conductor', {
                id_usuario: this.state.id_usuario
            });

            //console.log(res);
            const obj = res.data.datos;
            this.setState({
                objChofer: obj,
                validateWS: true
            });
            this.objToChofer();

        }catch(e){
            console.log(e);
            alert("Servicio no disponible, intente más tarde", "Error");
            this.setState({
                validateWS: false
            });
        }

    }

    objToChofer = () => {
        const obj_chofer = this.state.objChofer;
        const obj_aux = [];
        let obj_items_aux = [];

        obj_chofer.forEach((chofer, index) => {
            if(chofer.encrypt){
                chofer.info_vehiculo = aes256.decrypt(key, chofer.out_total);
                chofer.ganancia_propietario = aes256.decrypt(key, chofer.out_efectivo);
            }

            delete chofer.encrypt;
            obj_aux.push(chofer);

            chofer.ganancia_propietario = '$' + chofer.ganancia_propietario + 'mxn';

            let obj_final = [chofer.info_vehiculo, chofer.ganancia_propietario];

            obj_items_aux.push(
                <Rows key={"row_data_" + index} data={[obj_final]} textStyle={styles.text} />
            );

        });

        this.setState({
            obj_aux_final: obj_aux,
            obj_items: obj_items_aux
        });

        this.calculateTotal();

    }

    calculateTotal = () => {
        let obj_convert = this.state.obj_aux_final;
        let total = 0;

        obj_convert.forEach((object, index) => {
            object.ganancia_propietario = object.ganancia_propietario.replace('$', '').replace('mxn','');
            total += parseFloat(object.ganancia_propietario);
        });

        total = this.getCentavos(total);

        let obj_items_aux= [];
        let obj_final = ['Total', '$' + total + 'mxn'];
        obj_items_aux.push(
            <Rows key={"row_data_total"} data={[obj_final]} style={styles.head} textStyle={styles.text} />
        );

        this.setState({
            obj_items_2: obj_items_aux
        });
    }

    getCentavos = (numberValue) =>{
        if(numberValue == '' || numberValue == null){
            numberValue = 0;
        }

        let valueString = numberValue.toString();
        let split_numberValue = valueString.split('.');
        let outValue = 0;
        if(split_numberValue.length > 1){
            outValue = numberValue + '0';
        }else{
            outValue = numberValue + '.00';
        }
        return outValue;
    }

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
                                style={{color: '#ec6a2c'}}
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
                                    style={{color: '#ff8834'}}
                                />
                                {
                                    this.state.fontLoaded ? (
                                        <View>
                                            <Text style={{ fontFamily: 'Aller_Lt', fontSize: 18, textAlign: 'center' }}>{this.state.nombre_propietario}</Text>
                                            <Text style={{ fontFamily: 'Aller_Lt', fontSize: 15, marginTop: 5 }}>Ganancia semana</Text>
                                        </View>
                                    ) : null
                                }
                                <TouchableOpacity>
                                    <View style={{ flexDirection: 'row' }}>
                                        {
                                            this.state.fontLoaded ? (
                                                <Text style={{ fontFamily: 'Aller_Lt', fontSize: 15, borderWidth: 2, paddingVertical: 2, paddingHorizontal: 5 }}>{this.state.out_semana}</Text>
                                            ) : null
                                        }
                                        <Icon
                                            name='calendar-alt'
                                            size={25}
                                            style={{
                                                marginLeft: 5,
                                                color: '#ff8834'
                                            }}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{paddingHorizontal: 10, paddingTop:5}}>
                            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                                <Row data={this.state.tableHeadProd} style={styles.head} textStyle={styles.text} />
                                {this.state.obj_items}
                            </Table>
                            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                                {this.state.obj_items_2}
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
                                style={{color: '#ec6a2c'}}
                            />
                            {
                                this.state.fontLoaded ? (
                                    <Text style={{ fontFamily: 'Aller_Lt', fontSize: 12 }}>Inicio</Text>
                                ) : null
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
                                    <Text style={{ fontFamily: 'Aller_Lt', fontSize: 12 }}>
                                    Conductores
                                    </Text>
                                ) : null
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
                                    <Text style={{ fontFamily: 'Aller_Lt', fontSize: 12 }}>
                                    Vehículos
                                    </Text>
                                ) : null
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
                                    <Text style={{ fontFamily: 'Aller_Lt', fontSize: 12 }}>
                                    Mi perfil
                                    </Text>
                                ) : null
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
                                    <Text style={{ fontFamily: 'Aller_Lt', fontSize: 12 }}>
                                    Gestión
                                    </Text>
                                ) : null
                            }
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
        margin: 2,
        textAlign: 'center',
        fontFamily: 'Aller_Lt'
    }
});