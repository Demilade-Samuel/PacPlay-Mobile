import { Tabs } from 'expo-router';

const RootLayout = () => {
    return(
        <Tabs>
            <Tabs.Screen name="first" options={{headerShown: false, tabBarStyle: {display: 'none'}}}/>
            <Tabs.Screen name="loginacc" options={{headerShown: false, tabBarStyle: {display: 'none'}}}/>
            <Tabs.Screen name="createacc" options={{headerShown: false, tabBarStyle: {display: 'none'}}}/>
            <Tabs.Screen name="user" options={{headerShown: false, tabBarStyle: {display: 'none'}}}/>
        </Tabs>
    )
}

export default RootLayout;