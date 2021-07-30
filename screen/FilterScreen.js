import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Switch,
    Platform,
    Alert
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';
import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Color';
import { setFilters } from '../store/actions/meals';

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
    const dispatch = useDispatch();

    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegetarian: isVegetarian
        };
        dispatch(setFilters(appliedFilters));
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
    const saveAlert = () => {
        Alert.alert('', 'Filter settings saved!');
        navData.navigation.getParam('save')();
    }
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
                onPress={saveAlert}
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
        color: Platform.OS === 'android' ? 'white' : Colors.extra
    }
});

export default FilterScreen;