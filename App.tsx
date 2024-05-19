/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import CoinsStack from './src/components/coins/CoinStack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import colors from './src/res/colors';
import FavoritesStack from './src/components/favorites/FavoritesStack';

const Tabs = createBottomTabNavigator();
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];

const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#297BFF',
          tabBarActiveBackgroundColor: colors.blackPearl,
          tabBarInactiveTintColor: 'white',
          tabBarInactiveBackgroundColor: colors.blackPearl,
          headerShown: false,
        }}>
        <Tabs.Screen
          name="Coins"
          component={CoinsStack}
          options={{
            tabBarIcon: ({size, color}) => (
              <Image
                style={{tintColor: color, width: size, height: size}}
                source={require('./src/assets/bank.png')}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="Favorites"
          component={FavoritesStack}
          options={{
            tabBarIcon: ({size, color}) => (
              <Image
                style={{tintColor: color, width: size, height: size}}
                source={require('./src/assets/star.png')}
              />
            ),
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default App;
