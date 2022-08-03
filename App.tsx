import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Login from './pages/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Platos from './pages/Platos';
import UserContext, { UserInterface } from './helpers/UserContext';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState<UserInterface>({ token: null });

  return (
    <UserContext.Provider value={[user, setUser]}>
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Login} />
            <Stack.Screen name="Platos" component={Platos} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20
  },
});
