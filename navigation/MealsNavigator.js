import React from 'react';
import { Text, Platform, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from "react-navigation";
import { Ionicons } from '@expo/vector-icons';

import CategoriesScreen from '../screen/CategoriesScreen'
import CategoryMealScreen from '../screen/CategoryMealScreen';
import MealDetailScreen from '../screen/MealDetailScreen';
import FavoritesScreen from '../screen/FavoritesScreen';
import FilterScreen from '../screen/FilterScreen';
import Colors from '../constants/Color';

const MealsNavigator = createStackNavigator({
    Categories: CategoriesScreen,
    CategoryMeals: CategoryMealScreen,
    MealDetail: MealDetailScreen
},
    {
        initialRouteName: 'Categories',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
            },
            headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        }

    }
);

const FavNavigator = createStackNavigator({
    Favorite: FavoritesScreen,
    MealDetail: MealDetailScreen
},
    {
        initialRouteName: 'Favorite',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.accent : ''
            },
            headerTitleStyle: {
                fontFamily: 'open-sans-bold'
            },
            headerBackTitleStyle: {
                fontFamily: 'open-sans'
            },
            headerTintColor: Platform.OS === 'android' ? 'white' : Colors.accent,
        }
    }
);

const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />;
            },
            tabBarColor: Colors.primary,
            tabBarLabel: Platform.OS === 'android' ? <Text style={{ fontFamily: 'open-sans-bold' }} >Meals</Text> : 'Meals'
        }
    },
    Favorite: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />;
            },
            tabBarColor: Colors.accent,
            tabBarLabel: Platform.OS === 'android' ? <Text style={{ fontFamily: 'open-sans-bold' }} >Favorites</Text> : 'Favorites'
        }
    }
};

const MealsFavTabNavigator = Platform.OS == 'android' ?
    createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: Colors.accent,
        shifting: true
    })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
            activeTintColor: Colors.accent
        }
    }
    );

const FiltersNavigator = createStackNavigator({
    Filters: FilterScreen
},
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.extra : ''
            },
            headerTintColor: Platform.OS === 'android' ? 'white' : Colors.extra,
        }
    }
);

function LogoTitle() {
    return (
        <Image
            style={{ width: 120, height: 50 }}
            source={require('../data/logo.png')}
        />
    );
}

const MainNavigator = createDrawerNavigator({
    Title: {
        screen: MealsFavTabNavigator,
        navigationOptions: {
            drawerLabel: () => <LogoTitle />,
            backgroundColor: '#c6cbef',
        }
    },
    MealsFavs: {
        screen: MealsFavTabNavigator,
        navigationOptions: {
            drawerLabel: 'Meal Categories'
        }
    },
    Filters: FiltersNavigator
},
    {
        contentOptions: {
            activeTintColor: Colors.accent,
            labelStyle: {
                fontFamily: 'open-sans-bold'
            }
        }

    });

export default createAppContainer(MainNavigator);