import { Stack } from 'expo-router';

const Layout = () => {
    return (
    <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="deposit"/>
        <Stack.Screen name="withdraw"/>
        <Stack.Screen name="billpayment"/>
    </Stack>
    )
}

export default Layout;