//import liabaries
import React from 'react';
import { View } from 'react-native';

//creating a component
const Card = (props) => {
    return (
    <View style={styles.containerStyle}>{props.children}</View>
    );
};

const styles =  {
    containerStyle: {
        // borderWidth: 1,
        // borderRadius: 5,
        // borderColor: '#000',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        //marginTop: 320
        backgroundColor: '#4b6584'

        

    }

};

//"Rendring"
export default Card;