import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground
} from 'react-native';

const MealItem = props => {
    return (
        <View style={styles.mealItem}>
            <TouchableOpacity onPress={props.onSelectMeal}>
                <View>
                    <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
                        <ImageBackground source={{ uri: props.image }} style={styles.bgImage}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title} numberOfLines={1} >{props.title}</Text>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
                        <Text style={styles.description} >{props.duration} mins</Text>
                        <Text style={styles.description}>{props.complexity.toUpperCase()} </Text>
                        <Text style={styles.description}>{props.affordability.toUpperCase()}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: 'white',
        paddingVertical: 5,
        paddingHorizontal: 12,
        textAlign: 'center'
    },
    titleContainer: {
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    mealRow: {
        flexDirection: 'row',
    },
    bgImage: {
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end'
    },
    mealItem: {
        height: 200,
        width: '100%',
        backgroundColor: '#2f2f2f',
        borderRadius: 10,
        marginBottom: 20,
        overflow: 'hidden'
    },
    mealHeader: {
        height: '85%'
    },
    mealDetail: {
        height: '15%',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignContent: 'center',
        marginTop: 2
    },
    description: {
        color: 'white',
        fontFamily: 'open-sans'
    }

});

export default MealItem;