import { Stack } from 'expo-router';

const Layout = () => {
    return (
    <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="creategame"/>
        <Stack.Screen name="joingame"/>
        <Stack.Screen name="waitingroom"/>
        <Stack.Screen name="waitingroom2"/>
        <Stack.Screen name="decisionroom"/>
        <Stack.Screen name="decisionroom2"/>
        <Stack.Screen name="notifications"/>
    </Stack>
    )
}

export default Layout;