import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Login from './pages/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Platos from './pages/Platos';
import Detalle from './pages/Detalle';
import MisPlatos from './pages/MisPlatos';
import { ContextProvider } from './helpers/contextState';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ContextProvider>
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Login} />
            <Stack.Screen name="Platos" component={Platos} />
            <Stack.Screen name="Detalle" component={Detalle} />
            <Stack.Screen name="MisPlatos" component={MisPlatos} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </ContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20
  },
});
