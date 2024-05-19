import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import colors from '../../res/colors';
import FavoritesScreen from './FavoritesScreen';

const Stack = createStackNavigator();

const FavoritesStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.blackPearl,
                    shadowOpacity: 0
                },
                headerTintColor: colors.white
            }}
        >
            <Stack.Screen 
                name='Favorites' 
                component={FavoritesScreen}    
            />
        </Stack.Navigator>
    );
};

export default FavoritesStack;