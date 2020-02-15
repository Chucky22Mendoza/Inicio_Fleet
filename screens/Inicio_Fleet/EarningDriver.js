// In App.js in a new project
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, ScrollView, Dimensions, Alert } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
import { Divider } from 'react-native-elements';
import axios from 'axios';
import * as Font from 'expo-font';
import NetInfo from '@react-native-community/netinfo'
import Globals from '../../constants/Globals';
import { Ionicons } from '@expo/vector-icons';


/**
 *
 *
 * @export
 * @class EarningDriverScreen
 * @extends {React.Component}
 */
export default class EarningDriverScreen extends React.Component {
    /**
     *Creates an instance of EarningDriverScreen.
     * @param {*} props
     * @memberof EarningDriverScreen
     */
    constructor(props) {
        super(props);
        //Variables necesarias para la dinámica de la app
        this.state = {
            id_usuario: this.props.navigation.state.params.id_usuario, //id del usuario definido por el inicio de sesión
            rango_fechas: this.props.navigation.state.params.out_semana, //Obtenido de la pantalla anterior
            nombre_propietario: this.props.navigation.state.params.nombre_propietario, //Obtenido de la pantalla anterior
            //Variables dinámicas
            tarjeta_gan: '0.00',
            efectivo_gan: '0.00',
            externo_gan: '0.00',
            total_gan: '0.00',
            total_gan_dia: '0.00',
            cuota_plat_r: '0.00',
            cuota_socio_r: '0.00',
            cant_servicios: 0,
            ganancia_final: '0.00',
            out_adeudo_plataforma_efec: '0.00',
            out_adeudo_socio_efec: '0.00',
            adeudo_total: '0.00',
            fontLoaded: false, //Cargado de fuentes
            fecha_actual: '',  //Calculado al iniciar la app
            width_window: Dimensions.get("window").width,
            height_window: Dimensions.get("window").height,
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
     * @memberof EarningDriverScreen
     */
    static navigationOptions = {
        title: 'Mis ganancias Socio-Conductor',
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
        )
    }
    /**
     *
     *
     * @memberof EarningDriverScreen
     *
     * Método que ejecuta las peticiones de datos al WS antes de renderizar la vista
     *
     */
    async componentWillMount() {
        this.principal_body(); //Llamada al método principal que contiene el tratamiento de datos y componentes dinámicos
    }

    /**
     *
     *
     * @memberof EarningDriverScreen
     *
     * Método que contiene el tratamiento de datos y componentes dinámicos, al igual que las peticiones al WS
     *
     */
    principal_body = async () => {
        const state = await NetInfo.fetch();
        if (state.isConnected) {
            /******* Calcular fecha actual formateada ******/

            let date, day, month, year, fecha;
            date = new Date(); //Generar objeto de una nueva fecha

            day = date.getDate();  //Obtener el día actual, formato 'DD'
            month = date.getMonth() + 1; //Mes actual, se suma uno por su inicializción como objeto en 0, formata 'MM'
            year = date.getFullYear(); //Obtener el año actual en formato 'YYYY'

            if (day.toString().length == 1) {
                day = '0' + day; //Tratamiento del formato del día
            }

            if (month.toString().length == 1) {
                month = '0' + month; //tratamiento del formato del mes
            }

            fecha = day + "/" + month + "/" + year; //Formato completo de la fecha actual: 'DD/mm/YYYY'
            this.setState({
                fecha_actual: fecha //Actualizar en su variable
            });

            /******* Calcular fecha actual formateada ******/

            //Try-catch para manejar error de conexión
            try {
                //Variable que contiene los datos de respuesta del WS
                const res = await axios.post(`${Globals.server}:${Globals.port_1}/inicio_fleet/interfaz_124/socio_conductor`, {
                    id_usuario: this.state.id_usuario
                });//Se requiere enviar las variables requeridas por el WS en formato JSON

                //Comprobar que la respuesta del WS es correcta
                if (res.status == 200) {
                    //Inicialización de variables necesarias para la reconlacción de los datos
                    let tarjeta_gan, efectivo_gan, externo_gan, total_gan, total_gan_dia, cuota_plat_r, cuota_socio_r, cant_servicios;

                    //Comprobar si la información ha sido encriptada
                    if (res.data.datos[0].encrypt) {
                        //Desencriptación y asignación a variables de los datos
                        tarjeta_gan = aes256.decrypt(res.data.datos[0].tarjeta_gan);
                        efectivo_gan = aes256.decrypt(res.data.datos[0].efectivo_gan);
                        externo_gan = aes256.decrypt(res.data.datos[0].externo_gan);
                        total_gan = aes256.decrypt(res.data.datos[0].total_gan);
                        total_gan_dia = aes256.decrypt(res.data.datos[0].total_gan_dia);
                        cuota_plat_r = aes256.decrypt(res.data.datos[0].cuota_plat_r);
                        cuota_socio_r = aes256.decrypt(res.data.datos[0].cuota_socio_r);
                        cant_servicios = aes256.decrypt(res.data.datos[0].cant_servicios);
                        ganancia_final = aes256.decrypt(res.data.datos[0].ganancia_final);
                        out_adeudo_plataforma_efec = aes256.decrypt(res.data.datos[0].out_adeudo_plataforma_efec);
                        out_adeudo_socio_efec = aes256.decrypt(res.data.datos[0].out_adeudo_socio_efec);
                    } else {
                        //Asignación a variables de los datos
                        tarjeta_gan = res.data.datos[0].tarjeta_gan;
                        efectivo_gan = res.data.datos[0].efectivo_gan;
                        externo_gan = res.data.datos[0].externo_gan;
                        total_gan = res.data.datos[0].total_gan;
                        total_gan_dia = res.data.datos[0].total_gan_dia;
                        cuota_plat_r = res.data.datos[0].cuota_plat_r;
                        cuota_socio_r = res.data.datos[0].cuota_socio_r;
                        cant_servicios = res.data.datos[0].cant_servicios;
                        ganancia_final = res.data.datos[0].ganancia_final;
                        out_adeudo_plataforma_efec = res.data.datos[0].out_adeudo_plataforma_efec;
                        out_adeudo_socio_efec = res.data.datos[0].out_adeudo_socio_efec;
                    }

                    let adeudo_total = parseFloat(out_adeudo_plataforma_efec) + parseFloat(out_adeudo_socio_efec);
                    adeudo_total = this.getCentavos(adeudo_total);

                    //Actualización de las variables con los datos del WS ya tratados
                    this.setState({
                        tarjeta_gan: tarjeta_gan,
                        efectivo_gan: efectivo_gan,
                        externo_gan: externo_gan,
                        total_gan: total_gan,
                        total_gan_dia: total_gan_dia,
                        cuota_plat: cuota_plat_r,
                        cuota_socio: cuota_socio_r,
                        cant_servicios: cant_servicios,
                        ganancia_final: ganancia_final,
                        out_adeudo_plataforma_efec: out_adeudo_plataforma_efec,
                        out_adeudo_socio_efec: out_adeudo_socio_efec,
                        adeudo_total: adeudo_total
                    });
                } else { //Error en el WS
                    Alert.alert('Error', 'Servicio no disponible, intente de nuevo más tarde.');
                    this.setState({
                        validateWS: false
                    });
                }

            } catch (error) {  //Obtención del error
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
     * @param {*} numberValue
     * @returns
     * @memberof EarningDriverScreen
     *
     * Método para comprobar o formatear una cadena que contiene el valor monetario
     */
    getCentavos(numberValue) {
        if (numberValue == '' || numberValue == null) {
            numberValue = 0;
        }

        let valueString = numberValue.toString();
        let split_numberValue = valueString.split('.');
        let outValue = 0;
        if (split_numberValue.length > 1) {
            outValue = numberValue + '0';
        } else {
            outValue = numberValue + '.00';
        }
        return outValue;
    }

    /**
     *
     *
     * @returns
     * @memberof EarningDriverScreen
     */
    render() {
        return (
            <View>
                <ScrollView>
                    <View>
                        <View style={{
                            marginBottom: 5,
                            marginTop: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Icon
                                name='money-bill-alt'
                                size={60}
                                onPress={this.test}
                                style={{ color: '#ec6a2c' }}
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

                            <View style={{ alignItems: 'center', justifyContent: 'flex-end', marginBottom: 20 }}>
                                <Icon
                                    name='user'
                                    size={40}
                                    style={{ color: '#ff8834' }}
                                />

                                <View>
                                    <Text style={{ fontFamily: 'aller-lt', fontSize: 18, textAlign: 'center' }}>{this.state.nombre_propietario}</Text>
                                    <Text style={{ fontFamily: 'aller-lt', fontSize: 25 }}>${this.state.total_gan}mxn</Text>
                                    <Text style={{ fontFamily: 'aller-lt', fontSize: 15, marginTop: 5 }}>Ganancia semana</Text>
                                </View>

                                <TouchableOpacity>
                                    <View style={{ flexDirection: 'row' }}>

                                        <Text style={{ fontFamily: 'aller-lt', fontSize: 15, borderWidth: 2, paddingVertical: 2, paddingHorizontal: 5 }}>{this.state.rango_fechas}</Text>

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

                        <Divider style={styles.row}></Divider>

                        <View style={{
                            height: 25,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            padding: 5
                        }}>

                            <View>

                                <Text style={{ fontFamily: 'aller-lt', fontSize: 15 }}>Efectivo</Text>

                            </View>

                            <View style={{
                                flexDirection: 'row'
                            }}>

                                <Text style={{ fontFamily: 'aller-lt', fontSize: 15 }}>${this.state.efectivo_gan}mxn</Text>

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

                                <Text style={{ fontFamily: 'aller-lt', fontSize: 15 }}>Tarjeta</Text>

                            </View>

                            <View style={{
                                flexDirection: 'row'
                            }}>

                                <Text style={{ fontFamily: 'aller-lt', fontSize: 15 }}>${this.state.tarjeta_gan}mxn</Text>

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

                                <Text style={{ fontFamily: 'aller-lt', fontSize: 15 }}>Recompensas/Extras</Text>

                            </View>

                            <View style={{
                                flexDirection: 'row'
                            }}>

                                <Text style={{ fontFamily: 'aller-lt', fontSize: 15 }}>${this.state.externo_gan}mxn</Text>

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

                                <Text style={{ fontFamily: 'aller-lt', fontSize: 15 }}>Comisión plataforma</Text>

                            </View>

                            <View style={{
                                flexDirection: 'row'
                            }}>

                                <Text style={{ fontFamily: 'aller-lt', fontSize: 15 }}>${this.state.cuota_plat_r}mxn</Text>

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

                                <Text style={{ fontFamily: 'aller-lt', fontSize: 18 }}>Ganancia Final</Text>

                            </View>

                            <View style={{
                                flexDirection: 'row'
                            }}>

                                <Text style={{ fontFamily: 'aller-lt', fontSize: 18 }}>${this.state.ganancia_final}mxn</Text>

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
                                <Text style={{ fontFamily: 'aller-lt', }}>Viajes</Text>
                                <Text style={{ fontFamily: 'aller-lt', }}>{this.state.cant_servicios}</Text>
                            </View>

                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: 80,
                                width: 200
                            }}>
                                <Text style={{ fontFamily: 'aller-lt', }}>Horas operadas</Text>
                                <Text style={{ fontFamily: 'aller-lt', }}>0</Text>
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

                                <Text style={{ fontFamily: 'aller-lt', }}>Ganancias del día</Text>

                            </View>

                            <View>

                                <Text style={{ fontFamily: 'aller-bd', fontSize: 16 }}>${this.state.total_gan_dia}mxn</Text>

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

                                <Text style={{ fontFamily: 'aller-lt' }}>Adeudos por cobros en efecivo</Text>

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

                                <Text style={{ fontFamily: 'aller-lt', }}>${this.state.out_adeudo_plataforma_efec}mxn</Text>

                                <Text style={{ fontFamily: 'aller-lt', }}>Cuota de servicio YiMi</Text>

                            </View>

                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: 80,
                                width: 200
                            }}>

                                <Text style={{ fontFamily: 'aller-lt', }}>${this.state.out_adeudo_socio_efec}mxn</Text>

                                <Text style={{ fontFamily: 'aller-lt', }}>Cuota de socio</Text>

                            </View>

                        </View>

                        <Divider style={styles.row}></Divider>

                    </View>
                </ScrollView>
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
    }
});