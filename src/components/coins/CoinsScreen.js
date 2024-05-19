import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../../res/colors";
import CoinsItem from "./CoinsItem";
import CoinsSearch from "./CoinsSearch";

const CoinsScreen = (props) => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [allCoins, setAllCoins] = useState([]);

    useEffect(() => {
        const getCoins = async () => {
            let response = await fetch('https://api.coinlore.net/api/tickers/')
            let responseJson = await response.json();
            setLoading(false);
            setCoins(responseJson.data);
            setAllCoins(responseJson.data);
        };

        getCoins();
    }, []);

    const handlePress = (coin) => {
        props.navigation.navigate('CoinDetail', { coin });
    };

    const handleSearch = (query) => {
        const coinsFiltered = allCoins.filter((coin) => {
            return coin.name.toLowerCase().includes(query.toLowerCase()) || 
                   coin.symbol.toLowerCase().includes(query.toLowerCase());
        });

        setCoins(coinsFiltered);
    };

    return (
        <View style={styles.container}>

        <CoinsSearch onChange={handleSearch} />

            { loading ? 
                <ActivityIndicator 
                    style={styles.loading}
                    color="gray" 
                    size="large" 
                /> : null }
                
            <FlatList 
                data={coins} 
                renderItem={({ item }) => 
                    <CoinsItem 
                        item={item} 
                        onPress={() => handlePress(item)} 
                    />
                } 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.charade,
    },
    titleText: {
        color: 'white',
        textAlign: 'center'
    },
    btn: {
        padding: 8,
        backgroundColor: 'blue',
        borderRadius: 8,
        margin: 16
    },
    btnText: {
        color: 'white',
        textAlign: 'center'
    },
    loader: {
        marginTop: 60
    }
});

export default CoinsScreen;