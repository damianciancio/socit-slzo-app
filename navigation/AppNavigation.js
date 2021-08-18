import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';

import LoginScreen from '../screens/LoginScreen';
import StatusScreen from '../screens/StatusScreen';


const AppNavigator = createStackNavigator({
    Status: StatusScreen
});

const AuthNavigator = createStackNavigator({
    Login: LoginScreen
});

const MainNavigator = createSwitchNavigator({
    Auth: AuthNavigator,
    App: AppNavigator
});

export default createAppContainer(MainNavigator);