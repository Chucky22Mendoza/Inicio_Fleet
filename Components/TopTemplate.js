import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";

export default class TopTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    test = () => {
        alert("This is a test", "Hola");
    };

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
                                marginRight: 5
                            }}
                        />
                    </View>
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
    }
});
