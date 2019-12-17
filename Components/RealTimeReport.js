// In App.js in a new project

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
import { Divider } from 'react-native-elements';
import { Table, Row, Rows } from 'react-native-table-component';
import axios from 'axios';
import * as Font from 'expo-font';
import TopTemplate from './TopTemplate';
//import BottomTemplate from './BottomTemplate';

/**
 *
 *
 * @export
 * @class EarningNoDriverScreen
 * @extends {React.Component}
 */
export default class EarningNoDriverScreen extends React.Component {
    /**
     *Creates an instance of EarningNoDriverScreen.
     * @param {*} props
     * @memberof EarningNoDriverScreen
     */
    constructor(props) {
        super(props);
        this.state = {
            //Cabecera de la tabla
            tableHead: ['Total', 'Efectivo', 'Tarjeta', 'Comisión', 'Ganancia fin'],
            //Variable dinámica que contiene el cuerpo de la tabla
            tableData: [],
            id_usuario: this.props.navigation.state.params.id_chofer, //id del usuario definido por el inicio de sesión
            nombre: this.props.navigation.state.params.nombre, //Obtenido de la pantalla anterior
            ganancia_actual: this.props.navigation.state.params.ganancia_actual, //Obtenido de la pantalla anterior
            //Variables dinámicas de la aplicación
            obj_aux_final: [],
            validateWS: false,
            objChofer: [],
            obj_items: [],
            fontLoaded: false,
        };
    }

    /**
     *
     *
     * @memberof EarningNoDriverScreen
     *
     * Método para comprobar el funcionamiento de botones/iconos
     */
    test = () => {
        alert("This is a test", "Hola");
    };

    /**
     *
     *
     * @static
     * @memberof EarningNoDriverScreen
     */
    static navigationOptions = {
        title: 'Reporte en tiempo real'
    };

    /**
     *
     *
     * @memberof EarningNoDriverScreen
     */
    async componentWillMount(){
        this.principal_body(); //Llamada al método principal que contiene el tratamiento de datos y componentes dinámicos
    }

    /**
     *
     *
     * @memberof EarningNoDriverScreen
     */
    async componentDidMount(){
        await Font.loadAsync({
            'Aller_Lt': require('./../assets/fonts/Aller_Lt.ttf'),
            'Aller_Bd': require('./../assets/fonts/Aller_Bd.ttf'),
        });

        this.setState({fontLoaded: true});
    }

    /**
     *
     *
     * @memberof EarningNoDriverScreen
     */
    principal_body = async () => {
        try{

            const res = await axios.post('http://35.203.42.33:3001/inicio_fleet/interfaz_121/tiempo_real', {
                id_usuario: this.state.id_usuario
            });

            if(res.status == 200){
                //console.log(res);
                const obj = res.data.datos;
                this.setState({
                    objChofer: obj,
                    validateWS: true
                });

                this.objToChofer();
            }else{
                alert("Servicio no disponible, intente más tarde", "Error");
                this.setState({
                    validateWS: false
                });
            }

        }catch(error){
            //Error de conexión
            if(error.message == 'Network Error'){
                alert("Verifique su conexión e intente nuevamente", "Error");
            }else{
                alert("Servicio no disponible, intente más tarde", "Error");
            }

            console.log(error);
            this.setState({
                validateWS: false
            });
        }
    }

    /**
     *
     *
     * @memberof EarningNoDriverScreen
     */
    objToChofer = () => {
        const obj_chofer = this.state.objChofer;
        const obj_aux = [];

        obj_chofer.forEach(chofer => {
            if(chofer.encrypt){
                chofer.out_total = aes256.decrypt(key, chofer.out_total);
                chofer.out_efectivo = aes256.decrypt(key, chofer.out_efectivo);
                chofer.out_tarjeta = aes256.decrypt(key, chofer.out_tarjeta);
                chofer.out_comision = aes256.decrypt(key, chofer.out_comision);
                chofer.out_ganancia_final = aes256.decrypt(key, chofer.out_ganancia_final);
            }

            delete chofer.encrypt;
            obj_aux.push(chofer);
        });

        //tableHead: ['Total', 'Efectivo', 'Tarjeta', 'Comisión', 'Ganancia fin'],
        let obj_final = ['$ ' + obj_aux[0].out_total + ' MXN', '$ ' + obj_aux[0].out_efectivo + ' MXN', '$ ' + obj_aux[0].out_tarjeta + ' MXN', '$ ' + obj_aux[0].out_comision + ' MXN', '$ ' + obj_aux[0].out_ganancia_final + ' MXN'];
        this.setState({
            tableData: [obj_final]
        });

        let obj_items_aux = [];

        obj_items_aux.push(<Rows key={"row_data"} data={this.state.tableData} textStyle={styles.text} />);
        this.setState({
            obj_items: obj_items_aux
        });

    }

    /**
     *
     *
     * @returns
     * @memberof EarningNoDriverScreen
     */
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

                                {
                                    this.state.fontLoaded ? (
                                    <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                                        <Icon
                                            name='user'
                                            size={40}
                                            style={{color: '#ff8834'}}
                                        />
                                        <Text style={{fontFamily: 'Aller_Lt',  fontSize: 18 }}>{this.state.nombre}</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontFamily: 'Aller_Lt', fontSize: 18, marginTop: 5, paddingRight: 60 }}>Ganancia actual</Text>
                                            <Text style={{ fontFamily: 'Aller_Bd', fontSize: 18, marginTop: 5, color: 'blue' }}>${this.state.ganancia_actual}mxn</Text>
                                        </View>
                                    </View>
                                    ) : null
                                }
                        </View>

                        <View style={{paddingHorizontal: 10, paddingTop:5, marginBottom: 15}}>
                            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                                <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text} />
                                {this.state.obj_items}
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

//Estilos de diseño defenidos
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
        margin: 2,
        fontFamily: 'Aller_Lt'
    }
});