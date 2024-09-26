import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "../screens/auth/LoginPage";
import RegisterPage from "../screens/auth/RegisterPage";
import ForgotPassWordPage from "../screens/auth/ForgotPasswordPage";
import ResetPassWordPage from "../screens/auth/ResetPassWordPage";

const Stack = createStackNavigator();

export default function AuthNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Register" component={RegisterPage} />
            <Stack.Screen
                name="ForgotPassWord"
                component={ForgotPassWordPage}
                options={{ headerShown: true, headerTitle: "" }}
            />
            <Stack.Screen
                name="ResetPassWord"
                component={ResetPassWordPage}
                options={{ headerShown: true, headerTitle: "" }}
            />
        </Stack.Navigator>
    );
}
