import React from 'react';
import { FlatList } from 'react-native';
import CategoryGrid from '../components/CategoryGrid';
import { CATEGORIES } from '../data/dummy-data';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

const CategoriesScreen = props => {
    const renderGridItem = itemData => {
        return <CategoryGrid
            title={itemData.item.title}
            color={itemData.item.color}
            imgUrl={itemData.item.imgUrl}
            onSelect={() => {
                props.navigation.navigate({
                    routeName: 'CategoryMeals', params: { categoryId: itemData.item.id }
                })
            }} />;
    };

    return (
        <FlatList data={CATEGORIES} renderItem={renderGridItem} numColumns={2} />
    );
};

CategoriesScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Meal Categories',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title='Menu'
                iconName='ios-menu'
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }} />
        </HeaderButtons>
    }
};

export default CategoriesScreen;