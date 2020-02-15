// In App.js in a new project

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Dimensions, ScrollView, Modal, Image, Alert } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
import { Divider } from 'react-native-elements';
import CalendarPicker from 'react-native-calendar-picker';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo'
import Globals from '../../constants/Globals';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

/**
 *
 *
 * @export
 * @class HomeScreen
 * @extends {React.Component}
 */
export default class HomeScreen extends React.Component {
    /**
     *Creates an instance of HomeScreen.
     * @param {*} props
     * @memberof HomeScreen
     */
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false, //Mostrar el calendario
            selectedDate: null, //Variable para la búsqueda por fecha
            id_usuario: this.props.screenProps.id_propietario, //id del usuario definido por el inicio de sesión
            //Variables dinámicas de la aplicación
            obj_aux_final: [],
            obj_items: [],
            validateWS: false,
            objChofer: [],
            out_total_general: "0.00",
            out_ganancia_actual_general: "0.00",
            out_viajes_general: "0",
            out_semana: "00/00 - 00/00",
            nombre_propietario: '',
            fecha_actual: '',
            width_window: Dimensions.get("window").width,
            height_window: Dimensions.get("window").height,
        };
        this.onDateChange = this.onDateChange.bind(this);
    }

    /**
     *
     *
     * @memberof HomeScreen
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
     * @memberof HomeScreen
     */
    static navigationOptions = {
        title: 'Inicio',
        headerTitleStyle: {
            fontFamily: 'aller-bd',
            textAlign: "center",
            flex: 1
        },
        headerRight: (
            <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('#ff8834', true)}
                onPress={() => alert('Ayuda')}
            >
                    <View style={{ flexDirection: 'column', alignItems: 'center', marginRight: 15 }}>
                        <Ionicons
                            name={'ios-help-circle'}
                            size={32}
                            color='#ff8834'
                        />
                </View>
            </TouchableNativeFeedback>
        ),
        headerLeft: (
            <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('#ff8834', true)}
            >
                <View>
                    <Image
                        style={{
                            width: 32,
                            height: 32,
                            resizeMode: 'cover',
                            marginLeft: 15,
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}
                        source={require('../../assets/images/Yimi.png')}
                    />
                </View>
            </TouchableNativeFeedback>
        )
    }

    /**
     *
     *
     * @param {*} visible
     * @memberof HomeScreen
     */
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    /**
     *
     *
     * @memberof HomeScreen
     */
    async componentWillMount(){
        this.principal_body(); //Llamada al método principal que contiene el tratamiento de datos y componentes dinámicos
    }

    /**
     *
     *
     * @memberof HomeScreen
     */
    principal_body = async () => {
        const state = await NetInfo.fetch();
        if (state.isConnected) {
            /******* Calcular fecha actual formateada ******/
            let date, day, month, year, fecha;
            date = new Date();  //Generar objeto de una nueva fecha

            day = date.getDate();  //Obtener el día actual, formato 'DD'
            month = date.getMonth() + 1;  //Mes actual, se suma uno por su inicializción como objeto en 0, formata 'MM'
            year = date.getFullYear();  //Obtener el año actual en formato 'YYYY'

            if (day.toString().length == 1) {
                day = '0' + day;  //Tratamiento del formato del día
            }

            if (month.toString().length == 1) {
                month = '0' + month;  //tratamiento del formato del mes
            }

            fecha = day + "/" + month + "/" + year;  //Formato completo de la fecha actual: 'DD/mm/YYYY'
            this.setState({
                fecha_actual: fecha  //Actualizar en su variable
            });
            /******* Calcular fecha actual formateada ******/

            //Try-catch para manejar error de conexión
            try {

                /******* Calcular fecha actual formateada para petición al WS ******/
                let date, day, month, year, fecha;
                date = new Date();

                day = date.getDate();
                month = date.getMonth() + 1;
                year = date.getFullYear();

                if (day.toString().length == 1) {
                    day = '0' + day;
                }

                if (month.toString().length == 1) {
                    month = '0' + month;
                }

                fecha = year + "-" + month + "-" + day; //Formato requerido
                /******* Calcular fecha actual formateada para petición al WS ******/

                //Variable que contiene los datos de respuesta del WS
                const res = await axios.post(`${Globals.server}:${Globals.port_1}/inicio_fleet/interfaz_42/fleet_home`, {
                    id_usuario: this.state.id_usuario,
                    fecha_filtro: fecha
                }); //Se requiere enviar las variables requeridas por el WS en formato JSON

                if (res.status == 200) {
                    //console.log(res);
                    const obj = res.data.datos;
                    this.setState({
                        objChofer: obj,
                        validateWS: true
                    });

                    this.objToChofer();
                } else {
                    Alert.alert('Error', 'Servicio no disponible, intente de nuevo más tarde.');
                    this.setState({
                        validateWS: false
                    });
                }

            } catch (error) { //Obtención del error
                //Error de conexión
                Alert.alert('Error', 'Servicio no disponible, intente de nuevo más tarde.');
                console.error(error);

                this.setState({
                    validateWS: false
                });
            }
        } else {
            Alert.alert('Sin conexión', 'Verifique su conexión e intente nuevamente.');
        }
    }

    /**
     *
     *
     * @memberof HomeScreen
     */
    objToChofer() {
        const obj_chofer = this.state.objChofer;
        const obj_aux = [];

        obj_chofer.forEach(chofer => {
            if(chofer.encrypt){
                chofer.id_chofer = aes256.decrypt(key, chofer.id_chofer);
                chofer.nombre = aes256.decrypt(key, chofer.nombre);
                chofer.ganancia_semanal = aes256.decrypt(key, chofer.ganancia_semanal);
                chofer.ganancia_actual = aes256.decrypt(key, chofer.ganancia_actual);
                chofer.numero_viajes_actual = aes256.decrypt(key, chofer.numero_viajes_actual);
                chofer.rango_fechas = aes256.decrypt(key, chofer.rango_fechas);
                chofer.nombre_propietario = aes256.decrypt(key, chofer.nombre_propietario);
            }

            obj_aux.push(chofer);
        });

        let semana;
        const nombre_propietario = obj_aux[0].nombre_propietario;

        if(obj_aux[0].rango_fechas != null){

            let obj_semana = obj_aux[0].rango_fechas.split('-');

            let fecha_dia_1 = obj_semana[2];
            let fecha_mes_1 = this.getMonthLetter(obj_semana[1]);
            let fecha_dia_2 = obj_semana[5];
            let fecha_mes_2 = this.getMonthLetter(obj_semana[4]);


            if(fecha_dia_1.substring(0,1) == "0"){
                fecha_dia_1 = fecha_dia_1.replace('0', '');
            }

            if(fecha_dia_2.substring(0,1) == "0"){
                fecha_dia_2 = fecha_dia_2.replace('0', '');
            }

            semana = fecha_dia_1 + ' ' + fecha_mes_1 + ' - ' + fecha_dia_2 + ' ' + fecha_mes_2;
        }else{
            semana = 'Sin registro';
        }

        this.setState({
            obj_aux_final: obj_aux,
            out_semana: semana,
            nombre_propietario: nombre_propietario
        });

        this.calculateTotal();
        this.componentBody();
    }

    /**
     *
     *
     * @memberof HomeScreen
     */
    componentBody() {
        const obj = this.state.obj_aux_final;
        let obj_items_aux = [];

        if(obj.length != 0){

            let obj_actual = obj;
            this.setState({
                obj_aux_final: obj_actual
            });
            let last_index_obj = obj_actual.length;

            obj_actual.forEach((object, index) => {
                obj_items_aux.push(<Divider key={"divider_inicio_" + index} style={styles.row}></Divider>);
                obj_items_aux.push(
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("RealTimeReportScreen", { id_chofer: object.id_chofer, nombre: object.nombre, ganancia_actual: object.ganancia_actual })} key={"button_" + index}>
                        <View key={"view_1_" + index} style={{ height: 90 }}>
                            <View key={"view_2_" + index} style={{ padding: 5, flexDirection: 'row', justifyContent: 'flex-start' }}>

                                <Text key={"text_nombre_" + index} style={{ fontFamily: 'aller-lt', fontSize: 18, paddingHorizontal: 5 }}>{object.nombre}</Text>

                                <Icon
                                    key={"icon_chevron_" + index}
                                    name='chevron-right'
                                    size={18}
                                    style={{
                                        paddingTop: 5
                                    }}
                                />
                            </View>

                            <View key={"view_3_" + index} style={{ paddingTop: 5, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <Text key={"text_total_ganancia_semanal_" + index} style={{ fontFamily: 'aller-lt', color: 'blue', fontSize: 16 }}>${object.ganancia_semanal}MXN</Text>
                                <Text key={"text_total_ganancia_actual_" + index} style={{ fontFamily: 'aller-lt', fontSize: 14 }}>${object.ganancia_actual}MXN</Text>
                                <Text key={"text_total_viajes_" + index} style={{ fontFamily: 'aller-lt', fontSize: 14 }}>{object.numero_viajes_actual}</Text>
                            </View>

                            <View key={"view_4_" + index} style={{ paddingBottom: 5, marginLeft: 8, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <Text key={"text_ganancia_semanal_" + index} style={{ fontFamily: 'aller-lt', color: 'blue', fontSize: 15 }}>Ganancia semanal</Text>
                                <Text key={"text_ganancia_actual_" + index} style={{ fontFamily: 'aller-lt', fontSize: 12 }}>Ganancia actual</Text>
                                <Text key={"text_viajes_" + index} style={{ fontFamily: 'aller-lt', fontSize: 12 }}>Viajes</Text>
                            </View>

                        </View>
                    </TouchableOpacity>
                );

                if ((index + 1) == last_index_obj) {
                    obj_items_aux.push(<Divider key={"divider_final_" + index} style={styles.row}></Divider>);
                }
            });

            this.setState({
                obj_items: obj_items_aux
            });

        }
    }

    /**
     *
     *
     * @returns
     * @memberof HomeScreen
     */
    setInfoWS() {
        return(<View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 400,
                    height: 400
                }}>
                    <Image
                        source= {require('../../assets/images/loading.gif')}
                        style= {styles.img}
                    />
                </View>);
    }

    /**
     *
     *
     * @memberof HomeScreen
     */
    calculateTotal() {
        let obj_convert = this.state.obj_aux_final;
        let total = 0;
        let ganancia_actual = 0;
        let viajes = 0;
        obj_convert.forEach((object, index) => {
            total += parseFloat(object.ganancia_semanal);
            ganancia_actual += parseFloat(object.ganancia_actual);
            viajes += parseInt(object.numero_viajes_actual);
        });

        total = this.getCentavos(total);
        ganancia_actual = this.getCentavos(ganancia_actual);

        this.setState({
            out_total_general: total,
            out_ganancia_actual_general: ganancia_actual,
            out_viajes_general: viajes
        });
    }

    /**
     *
     *
     * @param {*} date
     * @param {*} type
     * @memberof HomeScreen
     */
    async onDateChange(date, type) {
        const state = await NetInfo.fetch();
        if (state.isConnected) {
            let fecha = this.getDateHourFullDate(date);
            this.setState({
                selectedDate: fecha
            });

            try {

                const res = await axios.post(`${Globals.server}:${Globals.port_1}/inicio_fleet/interfaz_42/fleet_home`, {
                    id_usuario: this.state.id_usuario,
                    fecha_filtro: fecha
                });

                if(res.status == 200){
                    const obj = res.data.datos;

                    this.setState({
                        objChofer: obj,
                        validateWS: true
                    });

                    this.objToChofer();

                    this.setModalVisible(!this.state.modalVisible);
                }else{
                    Alert.alert('Error', 'Servicio no disponible, intente de nuevo más tarde.');
                    this.setState({
                        validateWS: false
                    });
                }

            } catch (e) {
                Alert.alert('Error', 'Servicio no disponible, intente de nuevo más tarde.');
                console.error(error);

                this.setState({
                    validateWS: false
                });
            }
        } else {
            Alert.alert('Sin conexión', 'Verifique su conexión e intente nuevamente.');       
        }

    }

    /**
     *
     *
     * @param {*} date
     * @returns
     * @memberof HomeScreen
     */
    getDateHourFullDate(date) {
        const fecha_aux = date.toString();

        const split_fecha = fecha_aux.split(' ');
        const mes_final = this.getMonthNumber(split_fecha[1]);
        const dia_final = split_fecha[2];
        const agno_final = split_fecha[3];
        const fecha_final = agno_final + '-' + mes_final + '-' + dia_final;

        return fecha_final;
    }

    /**
     *
     *
     * @param {*} mes
     * @returns
     * @memberof HomeScreen
     */
    getMonthNumber(mes) {
        switch (mes) {
            case 'Jan':
                return '01';
            case 'Feb':
                return '02';
            case 'Mar':
                return '03';
            case 'Apr':
                return '04';
            case 'May':
                return '05';
            case 'Jun':
                return '06';
            case 'Jul':
                return '07';
            case 'Aug':
                return '08';
            case 'Sep':
                return '09';
            case 'Oct':
                return '10';
            case 'Nov':
                return '11';
            case 'Dec':
                return '12';
        }
    }

    /**
     *
     *
     * @param {*} mes
     * @returns
     * @memberof HomeScreen
     */
    getMonthLetter (mes) {
        switch (mes) {
            case '01':
                return 'ene';
            case '02':
                return 'feb';
            case '03':
                return 'mar';
            case '04':
                return 'abr';
            case '05':
                return 'may';
            case '06':
                return 'jun';
            case '07':
                return 'jul';
            case '08':
                return 'ago';
            case '09':
                return 'sep';
            case '10':
                return 'oct';
            case '11':
                return 'nov';
            case '12':
                return 'dic';
        }
    }

    /**
     *
     *
     * @param {*} numberValue
     * @returns
     * @memberof HomeScreen
     */
    getCentavos (numberValue){
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

    /**
     *
     *
     * @returns
     * @memberof HomeScreen
     */
    render() {
        const { selectedDate } = this.state;
        const minDate = new Date(2019, 1, 1);
        const maxDate = new Date(2050, 6, 3);
        const date = selectedDate ? selectedDate.toString() : '';

        return (
            <View>
                <ScrollView>
                    <View>

                        <View
                            style={{
                                height: 70,
                                marginTop: 30,
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'row',
                                padding: 5
                            }}>

                            <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>

                                <Text style={{ fontFamily: 'aller-lt', fontSize: 30 }}>${this.state.out_total_general} MXN</Text>

                                <Text style={{ fontFamily: 'aller-lt', fontSize: 15 }}>Ganancia semana</Text>

                                <TouchableOpacity onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                                    <View style={{ flexDirection: 'row' }}>

                                        <Text style={{ fontFamily: 'aller-lt', fontSize: 15, borderWidth: 2, paddingVertical: 2, paddingHorizontal: 5 }}>{this.state.out_semana}</Text>

                                        <Icon
                                            name='calendar-alt'
                                            size={25}
                                            color='#ff8834'
                                            style={{
                                                marginLeft: 5,
                                            }}
                                        />
                                    </View>
                                </TouchableOpacity>
                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={this.state.modalVisible}
                                    onRequestClose={() => { this.setModalVisible(!this.state.modalVisible) }}>
                                    <View style={{
                                        marginTop: 160,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: '#f0f4f7'
                                    }}>
                                        <View>
                                            <CalendarPicker
                                                minDate={minDate}
                                                maxDate={maxDate}
                                                todayBackgroundColor="#000"
                                                selectedDayColor="#7300e6"
                                                selectedDayTextColor="#FFFFFF"
                                                onDateChange={this.onDateChange}
                                            />
                                        </View>
                                    </View>
                                </Modal>
                            </View>

                        </View>

                        <Divider style={styles.row}></Divider>

                        <View style={{
                            height: 25,
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 5,
                            backgroundColor: '#979898'
                        }}>

                            <View>

                                <Text style={{ fontFamily: 'aller-lt' }}>{this.state.fecha_actual}</Text>

                            </View>

                        </View>

                        <Divider style={styles.row}></Divider>

                        <View style={{
                            height: 60,
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
                                <Text style={{ fontFamily: 'aller-lt' }}>${this.state.out_ganancia_actual_general} MXN</Text>
                                <Text style={{ fontFamily: 'aller-lt' }}>Ganancia actual</Text>
                            </View>



                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: 80,
                                width: 200
                            }}>
                                <Text style={{ fontFamily: 'aller-lt' }}>{this.state.out_viajes_general}</Text>
                                <Text style={{ fontFamily: 'aller-lt' }}>Viajes</Text>
                            </View>

                        </View>


                        <Divider style={styles.row}></Divider>

                        <View style={{ paddingBottom: 4 }}>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Icon
                                    name='money-bill-alt'
                                    size={80}
                                    style={{
                                        paddingLeft: 20,
                                        paddingRight: 10,
                                        paddingVertical: 10,
                                        color: '#ec6a2c'
                                    }}
                                />

                                <Text style={{ fontFamily: 'aller-lt', fontSize: 18, paddingTop: 25 }}>Mis ganancias</Text>

                            </View>
                            <View style={{
                                width: 200,
                                paddingRight: 10,
                                marginTop: -35,
                                marginLeft: 150,
                                flexDirection: 'row',
                                justifyContent: 'flex-end'
                            }}>
                                <TouchableOpacity
                                    style={[styles.button, { backgroundColor: '#ff8834' }]}
                                    onPress={() => this.props.navigation.navigate("EarningNoDriverScreen", { out_semana: this.state.out_semana, id_usuario: this.state.id_usuario, nombre_propietario: this.state.nombre_propietario })}>

                                    <Text style={{ fontFamily: 'aller-lt', fontSize: 10 }}>Socio No Conductor</Text>

                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, { marginLeft: .2, backgroundColor: '#ff8834' }]}
                                    onPress={() => this.props.navigation.navigate("EarningDriverScreen", { out_semana: this.state.out_semana, id_usuario: this.state.id_usuario, nombre_propietario: this.state.nombre_propietario })}>

                                    <Text style={{ fontFamily: 'aller-lt', fontSize: 10 }}>Socio Conductor</Text>

                                </TouchableOpacity>
                            </View>
                        </View>

                        {this.state.validateWS ? this.state.obj_items : this.setInfoWS()}

                    </View>
                </ScrollView>
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