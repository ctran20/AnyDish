import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Color';

const FilterSwitch = props => {
    return (<View style={styles.filterContainer}>
        <Text>{props.label}</Text>
        <Switch
            trackColor={{ true: Colors.extra, false: '#b5b5b5' }}
            thumbColor={Platform.OS === 'android' ? Colors.extra : ''}
            value={props.state}
            onValueChange={props.onChange}
        />
    </View>);
};

const FilterScreen = props => {
    const { navigation } = props;
    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);

    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegetarian: isVegetarian
        };
        console.log(appliedFilters);
    }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian]);

    useEffect(() => {
        navigation.setParams({ save: saveFilters });
    }, [saveFilters]
    );

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Filters</Text>
            <FilterSwitch label='Gluten-Free' state={isGlutenFree} onChange={newValue => setIsGlutenFree(newValue)} />
            <FilterSwitch label='Lactose-Free' state={isLactoseFree} onChange={newValue => setIsLactoseFree(newValue)} />
            <FilterSwitch label='Vegan' state={isVegan} onChange={newValue => setIsVegan(newValue)} />
            <FilterSwitch label='Vegetarian' state={isVegetarian} onChange={newValue => setIsVegetarian(newValue)} />
        </View>
    );
};

FilterScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Filter Screen',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title='Menu'
                iconName='ios-menu'
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }} />
        </HeaderButtons>,

        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Text style={styles.saveButton}
                onPress={navData.navigation.getParam('save')}
            >Save</Text>

        </HeaderButtons>,
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 10
    },
    saveButton: {
        margin: 10,
        fontSize: 15,
        fontFamily: 'open-sans-bold',
        color: 'white'
    }
});

export default FilterScreen;