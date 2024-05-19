import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import colors from '../../res/colors';
import CoinsItem from '../coins/CoinsItem';
import Storage from '../libs/storage';
import FavoritesEmptyState from './FavoritesEmptyState';

const FavoritesScreen = (props) => {
    const [favorites, setFavorites] = useState([]);

    const getFavorites = async () => {
        try {
            const allKeys = await Storage.instance.getAllKeys();
            const keys = allKeys.filter((key) => key.includes('favorite-'));
            const favs = await Storage.instance.multiGet(keys);
            const favorites = favs.map((fav) => JSON.parse(fav[1]));            

            console.log('favs', favorites);

            setFavorites(favorites);
        } catch (error) {
            console.log('get favorites error', error)
        }
    };
    
    const handlePress = (coin) => {
        props.navigation.navigate('CoinDetail', { coin });
    };

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getFavorites();
        });

        return unsubscribe;
    }, [props.navigation]);

    return (
        <View style={styles.container}>
            { favorites.length == 0 ?  
                <FavoritesEmptyState /> 
                : null
            }

            {
                favorites.length > 0 ? 
                <FlatList 
                    data={favorites}
                    renderItem={({ item }) => 
                    <CoinsItem 
                        item={item} 
                        onPress={() => handlePress(item)} 
                    />
                }
                /> 
                : null
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.charade,
        flex: 1
    }
});

export default FavoritesScreen;