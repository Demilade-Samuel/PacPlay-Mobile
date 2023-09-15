import { Stack } from 'expo-router';

const Layout = () => {
    return (
    <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="privacy"/>
        <Stack.Screen name="help"/>
        <Stack.Screen name="terms"/>
    </Stack>
    )
}

export default Layout;