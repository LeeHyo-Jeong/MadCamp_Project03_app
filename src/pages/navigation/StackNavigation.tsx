import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/NavigationTypes';

const StackNavigation = () => {
    const Stack = createStackNavigator<RootStackParamList>();
}