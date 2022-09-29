import React, { memo, useState } from 'react';
import { TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Text } from 'react-native-paper';
import { Style } from './Style';

const ItemCard = ({ item }) => {
    const navigation = useNavigation();

    return (
        <View style={Style.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Details', {
                item,
                source: item.source
            })}>
                <Text variant='titleMedium'>{item.title}</Text>
                <Text variant='bodySmall' style={{ marginTop: 3 }}>{item.publishedAt ? item.publishedAt : 'undefined'}</Text>
            </TouchableOpacity >
            <Card.Cover
                loadingIndicatorSource={() => (
                    <ActivityIndicator
                        animating={true}
                        color='#fff' />
                )}
                style={Style.image} source={{ uri: item.urlToImage }} />
            <Text variant='bodyMedium' numberOfLines={3}>{item.description}</Text>
        </View >
    )
};

export default memo(ItemCard);