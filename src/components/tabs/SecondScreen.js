import React from 'react';
import { Text, View, Button, Image } from 'react-native';

class SecondScreen extends Component {
    static navigationOptions = {
        tabBarLable: 'tab2'
    }
    render () {
        return <View style={
            {
            flex: 1,
            justifyContent: 'center',
            alignItem: 'center'
            }
        }>

        <Text style={{fontSize: 30}}>
        This is tab 2
        </Text>

        </View>
    }
}

export default SecondScreen;