import React from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import AccountNavigator from "./AccountNavigator";
import JobNavigator from "./JobNavigator";
import MainTabNavigator from "./MainTabNavigator";
import Intro from "../../screens/intro/Intro";
import StartPage from "../../screens/intro/StartPage";
import Toast from "react-native-toast-message";

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Intro"
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: false,
                    ...TransitionPresets.SlideFromRightIOS,
                }}
            >
                <Stack.Screen name="Intro" component={Intro} />
                <Stack.Screen name="Start" component={StartPage} />
                <Stack.Screen name="Auth" component={AuthNavigator} />
                <Stack.Screen name="Account" component={AccountNavigator} />
                <Stack.Screen name="Job" component={JobNavigator} />
                <Stack.Screen name="Home" component={MainTabNavigator} />
            </Stack.Navigator>
            <Toast />
        </NavigationContainer>
    );
}
