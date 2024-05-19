import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, Pressable, SectionList, StyleSheet, Text, View } from 'react-native';
import colors from '../../res/colors';
import CoinMarketItem from './CoinMarketItem';
import Storage from '../libs/storage';

const CoinDetailScreen = (props) => {
    const [markets, setMarkets] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const { coin } = props.route.params;

    const getFavorite = async () => {
        try {
            const key = `favorite-${coin.id}`;
            const favStr = await Storage.instance.get(key);

            if (favStr != null) {
                setIsFavorite(true);
            }
        } catch (error) {
            console.log('Get favorites err', error);
        }
    };

    const getSymbolIcon = (name) => {
        if (name) {
            const symbol = name.toLowerCase().replace(' ', '-');

            return `https://c1.coinlore.com/img/25x25/${symbol}.png`;
        }
    };

    useEffect(() => {
        props.navigation.setOptions({ title: coin.symbol });    
        getMarkets(coin.id)
        getFavorite();
    }, []);

    const getMarkets = async (coinId) => {
        const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
        const response = await fetch(url);
        const responseJson = await response.json();

        setMarkets(responseJson);
    };

    const getSections = (coin) => {
        const sections = [
            {
                title: 'Market cap',
                data: [coin.market_cap_usd]
            },
            {
                title: 'Volume 24h',
                data: [coin.volume24]
            },
            {
                title: 'Change 24h',
                data: [coin.percent_change_24h]
            }
        ];

        return sections;
    };

    const toggleFavorite = () => {
        if (isFavorite) {
            removeFavorite();
        } else {
            addFavorite();
        }
    };

    const addFavorite = async () => {
        console.log('coin', coin);
        const coinStringified = JSON.stringify(coin);
        const key = `favorite-${coin.id}`;

        const stored = await Storage.instance.store(key, coinStringified);

        console.log('stored', stored);
        console.log('stored', key);

        if (stored) {
            setIsFavorite(true);
        }
    };

    const removeFavorite = () => {
        Alert.alert('Remove favorite', 'Are you sure?', [
            {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel'
            },
            {
                text: 'Remove',
                onPress: async () => {
                    const key = `favorite-${coin.id}`;
                    await Storage.instance.remove(key);
            
                    setIsFavorite(false);
                },
                style: 'destructive'
            }
        ]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.subHeader}>

                <View style={styles.row}>
                    <Image style={styles.iconImage} source={{ uri: getSymbolIcon(coin.name) }} />
                    <Text style={styles.titleText}>{coin.name}</Text>
                </View>

                <Pressable 
                    onPress={toggleFavorite}
                    style={[
                        styles.btnFavorite,
                        isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd       
                ]}>
                    <Text style={styles.btnFavoriteText}>{isFavorite ? 'Remove favorite' : 'Add favorite'}</Text>
                </Pressable>
            </View>

            <SectionList 
                style={styles.section}
                sections={getSections(coin)} 
                keyExtractor={(item) => item}
                renderSectionHeader={({ section }) => 
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionText}>{section.title}</Text>
                    </View>
                }
                renderItem={({ item }) => 
                    <View style={styles.sectionItem}>
                        <Text style={styles.itemText}>{item}</Text>
                    </View>
                } 
            />

            <Text style={styles.marketsTitle}>Markets</Text>
            <FlatList 
                style={styles.list}
                horizontal={true}
                data={markets}
                renderItem={({ item }) => <CoinMarketItem item={item} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.charade
    },
    subHeader: {
        backgroundColor: 'rgba(0, 0, 0, 0, 0.1)',
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row'
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.white,
        marginLeft: 8
    },
    iconImage: {
        width: 25,
        height: 25
    },
    sectionHeader: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: 8
    },
    sectionItem: {
        padding: 8
    },
    itemText: {
        color: colors.white,
        fontSize: 14,
    },
    sectionText: {
        color: colors.white,
        fontSize: 14,
        fontWeight: 'bold'
    },
    section: {
        maxHeight: 220
    },
    list: {
        maxHeight: 100,
        paddingLeft: 16
    },
    marketsTitle: {
        color: colors.white,
        fontSize: 16,
        marginBottom: 16,
        marginLeft: 16,
        fontWeight: 'bold'
    },
    btnFavorite: {
        padding: 8,
        borderRadius: 8,
    },
    btnFavoriteAdd: {
        backgroundColor: colors.picton,
    },
    btnFavoriteRemove: {
        backgroundColor: colors.carmine
    },
    btnFavoriteText: {
        color: colors.white
    }
});

export default CoinDetailScreen;