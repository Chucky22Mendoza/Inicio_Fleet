// In App.js in a new project

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
import { Divider } from 'react-native-elements';
import axios from 'axios';
import TopTemplate from './TopTemplate';
import * as Font from 'expo-font';
//import BottomTemplate from './BottomTemplate';


export default class EarningDriverScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id_usuario: this.props.navigation.state.params.id_usuario,
            rango_fechas: this.props.navigation.state.params.out_semana,
            nombre_propietario: this.props.navigation.state.params.nombre_propietario,
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
            fontLoaded: false,
        };
    }

    test = () => {
        alert("This is a test", "Hola");
    };

    static navigationOptions = {
        title: 'Mis ganancias Socio-Conductor'
    };

    async componentDidMount(){
        await Font.loadAsync({
            'Aller_Lt': require('./../assets/fonts/Aller_Lt.ttf'),
        });

        this.setState({fontLoaded: true});

        try{
            const res = await axios.post('http://34.95.33.177:3001/inicio_fleet/interfaz_124/socio_conductor', {
                id_usuario: this.state.id_usuario
            });

            // handle success
            let tarjeta_gan, efectivo_gan, externo_gan, total_gan, total_gan_dia, cuota_plat_r, cuota_socio_r, cant_servicios;

            if(res.data.datos[0].encrypt){
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
            }else{
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
        }catch(e){
            console.log(e);
            alert("No hay conexión al web service", "Error");
        }
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
                                size={60}
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

                            <View style={{ alignItems: 'center', justifyContent: 'flex-end', marginBottom:20 }}>
                                <Icon
                                    name='user'
                                    size={40}
                                    style={{color: '#ff8834'}}
                                />
                                {
                                    this.state.fontLoaded ? (
                                        <View>
                                            <Text style={{ fontFamily: 'Aller_Lt', fontSize: 18 }}>{this.state.nombre_propietario}</Text>
                                            <Text style={{ fontFamily: 'Aller_Lt', fontSize: 25 }}>${this.state.total_gan}mxn</Text>
                                            <Text style={{ fontFamily: 'Aller_Lt', fontSize: 15, marginTop: 5 }}>Ganancia semana</Text>
                                        </View>
                                    ): null
                                }
                                <TouchableOpacity>
                                    <View style={{ flexDirection: 'row' }}>
                                        {
                                            this.state.fontLoaded ? (
                                                <Text style={{ fontFamily: 'Aller_Lt', fontSize: 15, borderWidth: 2, paddingVertical: 2, paddingHorizontal: 5 }}>{this.state.rango_fechas}</Text>
                                            ): null
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

                        <Divider style={styles.row}></Divider>

                        <View style={{
                            height: 25,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            padding: 5
                        }}>

                            <View>
                                {
                                    this.state.fontLoaded ? (
                                        <Text style={{ fontFamily: 'Aller_Lt', fontSize: 15 }}>Efectivo</Text>
                                    ) : null
                                }
                            </View>

                            <View style={{
                                flexDirection: 'row'
                            }}>
                                {
                                    this.state.fontLoaded ? (
                                        <Text style={{ fontFamily: 'Aller_Lt', fontSize: 15 }}>${this.state.efectivo_gan} MXN</Text>
                                    ) : null
                                }
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
                                {
                                    this.state.fontLoaded ? (
                                        <Text style={{ fontFamily: 'Aller_Lt', fontSize: 15 }}>Tarjeta</Text>
                                    ) : null
                                }
                            </View>

                            <View style={{
                                flexDirection: 'row'
                            }}>
                                {
                                    this.state.fontLoaded ? (
                                        <Text style={{ fontFamily: 'Aller_Lt', fontSize: 15 }}>${this.state.tarjeta_gan} MXN</Text>
                                    ) : null
                                }
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
                                {
                                    this.state.fontLoaded ? (
                                        <Text style={{ fontFamily: 'Aller_Lt', fontSize: 15 }}>Recompensas/Extras</Text>
                                    ) : null
                                }
                            </View>

                            <View style={{
                                flexDirection: 'row'
                            }}>
                                {
                                    this.state.fontLoaded ? (
                                        <Text style={{ fontFamily: 'Aller_Lt', fontSize: 15 }}>${this.state.externo_gan} MXN</Text>
                                    ) : null
                                }
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
                                {
                                    this.state.fontLoaded ? (
                                        <Text style={{ fontFamily: 'Aller_Lt', fontSize: 15 }}>Comisión plataforma</Text>
                                    ) : null
                                }
                            </View>

                            <View style={{
                                flexDirection: 'row'
                            }}>
                                {
                                    this.state.fontLoaded ? (
                                        <Text style={{ fontFamily: 'Aller_Lt', fontSize: 15 }}>${this.state.cuota_plat_r} MXN</Text>
                                    ) : null
                                }
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
                                {
                                    this.state.fontLoaded ? (
                                        <Text style={{ fontFamily: 'Aller_Lt', fontSize: 18 }}>Ganancia Final</Text>
                                    ) : null
                                }
                            </View>

                            <View style={{
                                flexDirection: 'row'
                            }}>
                                {
                                    this.state.fontLoaded ? (
                                        <Text style={{ fontFamily: 'Aller_Lt', fontSize: 18 }}>${this.state.ganancia_final} MXN</Text>
                                    ) : null
                                }
                            </View>

                        </View>

                        <Divider style={styles.row}></Divider>

                        <View style={{
                            height: 40,
                            width: 400,
                            justifyContent: 'space-evenly',
                            flexDirection: 'row'
                        }}>
                            {
                                this.state.fontLoaded ? (
                                    <View style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginLeft: 40,
                                        width: 200
                                    }}>
                                        <Text style={{fontFamily: 'Aller_Lt', }}>Viajes</Text>
                                        <Text style={{fontFamily: 'Aller_Lt', }}>{this.state.cant_servicios}</Text>
                                    </View>
                                ) : null
                            }
                            {
                                this.state.fontLoaded ? (
                                    <View style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginRight: 80,
                                        width: 200
                                    }}>
                                        <Text style={{fontFamily: 'Aller_Lt', }}>Horas operadas</Text>
                                        <Text style={{fontFamily: 'Aller_Lt', }}>0</Text>
                                    </View>
                                ) : null
                            }

                        </View>

                        <Divider style={styles.row}></Divider>

                        <View style={{
                            height: 25,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            padding: 5
                        }}>
                            {
                                this.state.fontLoaded ? (
                                    <Text style={{ fontFamily: 'Aller_Lt', fontSize: 15 }}>Adeudos por cobros con efectivo</Text>
                                ) : null
                            }
                        </View>

                        <Divider style={styles.row}></Divider>

                        <View style={{
                            height: 25,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            padding: 5
                        }}>
                            {
                                this.state.fontLoaded ? (
                                    <Text style={{ fontFamily: 'Aller_Lt', fontSize: 20 }}>${this.state.out_adeudo_plataforma_efec}MXN</Text>
                                ) : null
                            }
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
                                    <Text style={{ fontFamily: 'Aller_Lt', fontSize: 12 }}>Conductores</Text>
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
                                    <Text style={{ fontFamily: 'Aller_Lt', fontSize: 12 }}>Vehículos</Text>
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
                                    <Text style={{ fontFamily: 'Aller_Lt', fontSize: 12 }}>Mi perfil</Text>
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
                                    <Text style={{ fontFamily: 'Aller_Lt', fontSize: 12 }}>Gestión</Text>
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
    }
});