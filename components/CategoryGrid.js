import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    TouchableNativeFeedback,
    ImageBackground,
} from 'react-native';

const CategoryGrid = (props) => {
    let TouchableCmp = TouchableOpacity;

    if (Platform.OS == 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <View style={styles.gridItem}>
            <TouchableCmp style={{ flex: 1 }} onPress={props.onSelect}>
                <ImageBackground source={require('../images/italians.jpeg')} style={styles.image}>
                    <View style={styles.container}>
                        <View style={{ ...styles.textBox, ...{ backgroundColor: props.color } }}>
                            <Text style={styles.title} numberOfLines={2}>{props.title}</Text>
                        </View>

                    </View>
                </ImageBackground>
            </TouchableCmp >
        </View>
    );
}

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150,
        borderRadius: 10,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
        elevation: 6,
    },
    container: {
        flex: 1,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,

        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'right',
        alignItems: 'center',
        padding: 5
    },
    image: {
        width: '100%',
        height: '100%'
    },
    textBox: {
        backgroundColor: '#ffffffdb',
        width: '100%',
        height: '28%'
    }

});

export default CategoryGrid;