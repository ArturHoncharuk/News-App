import { useRoute } from '@react-navigation/native';
import { Text, Card } from 'react-native-paper';
import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import SafeAreaLayout from '../Layouts/SafeAreaLayout';


const Details = () => {
  const route = useRoute()
  const { title, description, publishedAt, url, urlToImage, content, author } = route.params.item;
  const date = new Date(publishedAt).toLocaleDateString('en-GB')
  const handleRedirectPress = async () => {
    await Linking.openURL(url)
  }

  return (
    <SafeAreaLayout>
      <ScrollView style={s.container}>
        <Text style={s.text} variant='titleLarge'>{title}</Text>
        <Text style={s.text} variant='bodyMedium'>{description}</Text>
        <Text style={s.text} variant='titleSmall'>{route.params.source.name} - {author ? author : 'undefined'}</Text>
        <Text style={s.text} variant='bodySmall'>{date}</Text>
        <Card.Cover
          source={{ uri: urlToImage }}
          style={s.image}
        />
        <Text style={s.text} variant='bodyLarge'>{content}</Text>
        <TouchableOpacity style={s.button} onPress={handleRedirectPress}>
          <Text style={s.text}>View resource</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaLayout>
  )
}

const s = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
  },
  text: {
    color: '#fff',
    marginVertical: 8
  },
  image: {
    marginVertical: 2,
    borderRadius: 4
  },
  button: {
    color: '#fff',
    borderWidth: 1,
    width: 120,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 64
  }
})

export default Details