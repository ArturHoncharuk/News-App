import React, { memo, useState } from 'react';
import { TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Text } from 'react-native-paper';
import { Style } from './Style';

const ItemCard = ({ item }) => {
    const navigation = useNavigation();
    const date = new Date(item.publishedAt).toLocaleDateString('en-GB')
    return (
        <View style={Style.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Details', {
                item,
                source: item.source
            })}>
                <Text variant='titleMedium'>{item.title}</Text>
                <Text variant='bodySmall' style={{ marginTop: 3 }}>{date ? date : 'undefined'}</Text>
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