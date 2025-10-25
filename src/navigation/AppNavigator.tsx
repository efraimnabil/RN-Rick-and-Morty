import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Character } from '@/types/api';
import { Text, View } from 'react-native';
import ListScreen from '@/screens/ListScreen';
import FavoritesScreen from '@/screens/FavoritesScreen';
import DetailsScreen from '@/screens/DetailsScreen';

export type RootStackParamList = {
  MainTabs: undefined;
  Details: { character: Character };
};

export type TabParamList = {
  Characters: undefined;
  Favorites: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#667eea',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E5EA',
          paddingTop: 2,
          height: 65,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginBottom: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
        headerStyle: {
          backgroundColor: '#FFFFFF',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: '700',
        },
      }}
    >
      <Tab.Screen
        name="Characters"
        component={ListScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', height: 34 }}>
              <Text style={{ fontSize: 24 }}>👥</Text>
            </View>
          ),
          title: 'Characters',
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', height: 34 }}>
              <Text style={{ fontSize: 24 }}>❤️</Text>
            </View>
          ),
          title: 'My Favorites',
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="MainTabs" 
          component={MainTabs} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen} 
          options={({ route }) => ({ 
            title: route.params.character.name,
            headerStyle: {
              backgroundColor: '#FFFFFF',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            },
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: '700',
            },
            headerTintColor: '#667eea',
          })} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


