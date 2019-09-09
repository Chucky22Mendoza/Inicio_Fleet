// In App.js in a new project

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, ScrollView, Modal } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
import { Divider } from 'react-native-elements';
import CalendarPicker from 'react-native-calendar-picker';

import TopTemplate from './TopTemplate';
//import BottomTemplate from './BottomTemplate';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            selectedStartDate: null,
            selectedEndDate: null,
        };
        this.onDateChange = this.onDateChange.bind(this);
    }

    test = () => {
        alert("This is a test", "Hola");
    };

    static navigationOptions = {
        title: 'Inicio'
    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    onDateChange(date, type) {
        if (type === 'END_DATE') {
            this.setState({
                selectedEndDate: date,
            });
        } else {
            this.setState({
                selectedStartDate: date,
                selectedEndDate: null,
            });
        }
    }

    render() {
        const { selectedStartDate, selectedEndDate } = this.state;
        const minDate = new Date(2019, 1, 1);
        const maxDate = new Date(2050, 6, 3);
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        const endDate = selectedEndDate ? selectedEndDate.toString() : '';
        return (
            <View>
                <ScrollView style={{marginBottom: 75}}>
                    <View>
                        <TopTemplate></TopTemplate>
                        <Icon
                            name='circle'
                            size={45}
                            onPress={this.test}
                            style={{
                                paddingLeft: 5,
                                paddingTop: 10,
                                position: 'absolute'
                            }}
                        />

                        <View
                            style={{
                                height: 70,
                                marginTop: -25,
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'row',
                                padding: 5
                            }}>

                            <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Text style={{ fontSize: 30 }}>$5100.00 MXN</Text>
                                <Text style={{ fontSize: 15 }}>Ganancia semana</Text>
                                <TouchableOpacity onPress = { () => this.setModalVisible(true) }>
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
                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={this.state.modalVisible}
                                    onRequestClose={() => { this.setModalVisible(!this.state.modalVisible) }}>
                                    <View style={{
                                        marginTop: 160,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: '#f0f4f7'}}>
                                        <View>
                                        <CalendarPicker
                                                startFromMonday={true}
                                                allowRangeSelection={true}
                                                minDate={minDate}
                                                maxDate={maxDate}
                                                todayBackgroundColor="#000"
                                                selectedDayColor="#7300e6"
                                                selectedDayTextColor="#FFFFFF"
                                                onDateChange={this.onDateChange}
                                                weekdays={['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB']}
                                            />

                                            <View>
                                                <Text>Día Inicial: {startDate}</Text>
                                                <Text>Día Final: {endDate}</Text>
                                            </View>
                                            <TouchableHighlight
                                                onPress={() => {
                                                    this.setModalVisible(!this.state.modalVisible);
                                                }}
                                                style={{
                                                    backgroundColor:'red',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    marginHorizontal: 50
                                                }}>
                                                <Text>Salir</Text>
                                            </TouchableHighlight>
                                        </View>
                                    </View>
                                </Modal>
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
                                <Text>$1700.00 MXN</Text>
                                <Text>Ganancia actual</Text>
                            </View>

                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: 80,
                                width: 200
                            }}>
                                <Text>166</Text>
                                <Text>Viajes</Text>
                            </View>

                        </View>

                        <Divider style={styles.row}></Divider>

                        <View style={{paddingBottom: 4}}>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Icon
                                    name='money-bill-alt'
                                    size={80}
                                    style={{
                                        paddingLeft: 20,
                                        paddingRight: 10,
                                        paddingVertical: 10

                                    }}
                                />
                                <Text style={{ fontSize: 18, paddingTop: 25 }}>Mis ganancias</Text>
                            </View>
                            <View style={{
                                width: 200,
                                paddingRight: 10,
                                marginTop: -35,
                                marginLeft: 150,
                                flexDirection: 'row',
                                justifyContent: 'flex-end'}}>
                                <TouchableOpacity
                                style={styles.button}
                                onPress={() => this.props.navigation.navigate("EarningNoDriver")}>
                                    <Text style={{fontSize: 10}}>Socio No Conductor</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                style={[styles.button, {marginLeft: .2}]}
                                onPress={() => this.props.navigation.navigate("EarningDriver")}>
                                    <Text style={{fontSize: 10}}>Socio Conductor</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Divider style={styles.row}></Divider>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate("RealTimeReport")}>
                            <View style={{ height: 90 }}>
                                <View style={{ padding: 5, flexDirection: 'row', justifyContent: 'flex-start'}}>
                                    <Text style={{ fontSize: 18, paddingHorizontal: 5  }}>Manuel Leyva</Text>
                                    <Icon
                                        name='chevron-right'
                                        size={18}
                                        style= {{
                                            paddingTop: 5
                                        }}
                                    />
                                </View>
                                <View style={{ paddingTop: 5, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                    <Text style={{ color: 'blue', fontSize: 16}}>$3000.00MXN</Text>
                                    <Text style={{fontSize: 14}}>$600.00MXN</Text>
                                    <Text style={{fontSize: 14}}>90</Text>
                                </View>
                                <View style={{ paddingBottom: 5, marginLeft: 8, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                    <Text style={{ color: 'blue', fontSize: 15}}>Ganancia semanal</Text>
                                    <Text style={{fontSize: 12}}>Ganancia actual</Text>
                                    <Text style={{fontSize: 12}}>Viajes</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <Divider style={styles.row}></Divider>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate("RealTimeReport")}>
                            <View style={{ height: 90 }}>
                                <View style={{ padding: 5, flexDirection: 'row', justifyContent: 'flex-start'}}>
                                    <Text style={{ fontSize: 18, paddingHorizontal: 5  }}>Leonel Ortega</Text>
                                    <Icon
                                        name='chevron-right'
                                        size={18}
                                        style= {{
                                            paddingTop: 5
                                        }}
                                    />
                                </View>
                                <View style={{ paddingTop: 5, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                    <Text style={{ color: 'blue', fontSize: 16}}>$2100.00MXN</Text>
                                    <Text style={{fontSize: 14}}>$1100.00MXN</Text>
                                    <Text style={{fontSize: 14}}>76</Text>
                                </View>
                                <View style={{ paddingBottom: 5, marginLeft: 8, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                    <Text style={{ color: 'blue', fontSize: 15}}>Ganancia semanal</Text>
                                    <Text style={{fontSize: 12}}>Ganancia actual</Text>
                                    <Text style={{fontSize: 12}}>Viajes</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <Divider style={styles.row}></Divider>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate("RealTimeReport")}>
                            <View style={{ height: 90 }}>
                                <View style={{ padding: 5, flexDirection: 'row', justifyContent: 'flex-start'}}>
                                    <Text style={{ fontSize: 18, paddingHorizontal: 5  }}>Jesús Mendoza</Text>
                                    <Icon
                                        name='chevron-right'
                                        size={18}
                                        style= {{
                                            paddingTop: 5
                                        }}
                                    />
                                </View>
                                <View style={{ paddingTop: 5, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                    <Text style={{ color: 'blue', fontSize: 16}}>$1200.00 MXN</Text>
                                    <Text style={{fontSize: 14}}>$700.00 MXN</Text>
                                    <Text style={{fontSize: 14}}>50</Text>
                                </View>
                                <View style={{ paddingBottom: 5, marginLeft: 8, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                    <Text style={{ color: 'blue', fontSize: 15}}>Ganancia semanal</Text>
                                    <Text style={{fontSize: 12}}>Ganancia actual</Text>
                                    <Text style={{fontSize: 12}}>Viajes</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

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