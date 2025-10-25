import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Character } from '@/types/api';
import { Text, View } from 'react-native';
import ListScreen from '@/screens/ListScreen';
import DetailsScreen from '@/screens/DetailsScreen';

export type RootStackParamList = {
  List: undefined;
  Details: { character: Character };
};

const Stack = createStackNavigator<RootStackParamList>();
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="List" component={ListScreen} options={{ title: 'Characters' }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={({ route }) => ({ title: route.params.character.name })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


