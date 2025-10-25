import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Character } from '@/types/api';
import { Text, View } from 'react-native';

export type RootStackParamList = {
  List: undefined;
  Details: { character: Character };
};

const Stack = createStackNavigator<RootStackParamList>();

const ListScreen: React.FC = () => (
  <View>
    <Text>List Screen</Text>
  </View>
);

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="List" component={ListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


