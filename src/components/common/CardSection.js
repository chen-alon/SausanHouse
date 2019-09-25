import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
    return (
        <View style={styles.containerStyle}>{props.children}</View>
    );

};

const styles = {
    containerStyle: {
        // borderBottomWidth: 1,
        padding: 5,
        // backgroundColor: '#dfe6e9',
        //justifyContent: 'flex-start',
        flexDirection: 'row',
        // borderColor: '#2d3436',
        // borderRadius: 30,
        // borderWidth: 1,
        position: 'relative',
        marginTop: 5,
        marginBottom: 5

    }
};

export default CardSection;