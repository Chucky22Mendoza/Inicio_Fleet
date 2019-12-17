// In App.js in a new project

/**
 *
 * TOPTEMPLATE es un componente utilizado para la parte superior de la aplicación
 * Este aún no ha sido implementado en la aplicación, pero será de utilidad cuando
 * se requiera integrar la aplicación completa
 *
 **/

import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";

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
            fontLoaded: false, //Carga de fuentes
        };
    }

    /**
     *
     *
     * @memberof TopTemplate
     *
     * Método para comprobar el funcionamiento de botones/iconos
     */
    test = () => {
        alert("This is a test", "Hola");
    };

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
     * @returns
     * @memberof TopTemplate
     */
    render() {
        return (
            <View>

                <View style={{
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    flexDirection: 'row',
                    height:60
                }}>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Icon
                            name='question-circle'
                            size={40}
                            onPress={this.test}
                            style={{
                                color: '#ff8834',
                                marginRight: 5
                            }}
                        />
                    </View>
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
    }
});
