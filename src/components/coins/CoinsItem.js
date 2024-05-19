import React from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import colors from '../../res/colors';

const CoinsItem = ({ item, onPress }) => {
    const getImageArrow = () => {
        if (item.percent_change_1h > 0) {
            return require('../../assets/arrow_up.png')
        } else {
            return require('../../assets/arrow_down.png')
        }
    };

    return (
        <Pressable onPress={onPress} style={styles.container}>
            
            <View style={styles.row}>
                <Text style={styles.symbolText}>{item.symbol}</Text>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.priceText}>{`$${item.price_usd}`}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.percentText}>{item.percent_change_1h}</Text>
                <Image 
                    style={styles.imageIcon}
                    source={getImageArrow()}
                />
            </View>



        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        justifyContent: 'space-between',
        borderBottomColor: colors.zircon,
        borderBottomWidth: 1,
        paddingLeft: Platform.OS == 'ios' ? 0 : 16,
        marginLeft: Platform.OS == 'ios' ? 16 : 0
    },
    row: {
        flexDirection: 'row'
    },
    symbolText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 12
    },
    nameText: {
        color: 'white',
        fontSize: 14,
        marginRight: 16
    },
    percentText: {
        color: 'white',
        fontSize: 12,
        marginRight: 8
    },
    priceText: {
        color: 'white',
        fontSize: 14
    },
    imageIcon: {
        width: 22,
        height: 22
    }
});

export default CoinsItem;