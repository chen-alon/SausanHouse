import React from 'react';
import { Text, View, Button, Image } from 'react-native';

class FirstScreen extends Component {
    static navigationOptions = {
        tabBarLable: 'tab1'
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
        This is tab 1
        </Text>

        </View>
    }
}

export default FirstScreen;