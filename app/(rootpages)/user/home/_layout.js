import { Stack } from 'expo-router';

const Layout = () => {
    return (
    <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="creategame"/>
        <Stack.Screen name="joingame"/>
    </Stack>
    )
}

export default Layout;