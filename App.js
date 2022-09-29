import { StatusBar } from 'react-native';
import React from 'react';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import Home from './src/Screens/Home';
import Details from './src/Screens/Details';


export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <PaperProvider>
      <NavigationContainer>
        <StatusBar barStyle='light-content' />
        <Stack.Navigator initialRouteName='Home' screenOptions={{
          headerStyle: {
            backgroundColor: '#121212'
          },
          headerTintColor: '#fff',
          headerShown: true
        }}>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Details' component={Details} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}