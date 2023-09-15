import { Stack } from 'expo-router';
import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';
import Index from './index';

const Layout = () => {
    return (
            <Stack screenOptions={{headerShown: false}}>
                <Stack.Screen name="(rootpages)"/>
            </Stack>
    )
}

export default Layout;