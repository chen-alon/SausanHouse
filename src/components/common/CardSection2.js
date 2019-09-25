import React from 'react';
import { View } from 'react-native';

const CardSection2 = (props) => {
    return (
        <View style={styles.containerStyle}>{props.children}</View>
    );

};

const styles = {
    containerStyle: {
        // borderBottomWidth: 1,
        padding: 5,
        // backgroundColor: '#636e72',
        //justifyContent: 'flex-start',
        flexDirection: 'row',
        //borderColor: '#e84393',
        //borderRadius: 5,
        borderWidth: 0,
        position: 'relative',
        marginTop: 5,
        marginBottom: 5

    }
};

export default CardSection2;