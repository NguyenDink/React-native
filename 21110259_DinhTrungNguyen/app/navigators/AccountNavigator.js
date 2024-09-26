import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChangePasswordScreen from "../screens/account/ChangePasswordScreen";
import PersonalInfoScreen from "../screens/account/PersonalInfoScreen";
import ActivateAccount from "../screens/account/ActivateAccount";

const Stack = createStackNavigator();

export default function AccountNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ChangePassword"
                component={ChangePasswordScreen}
                options={{ headerShown: true, headerTitle: "Đổi mật khẩu", headerTitleAlign: "center" }}
            />
            <Stack.Screen
                name="PersonalInfo"
                component={PersonalInfoScreen}
                options={{ headerShown: true, headerTitle: "Thông tin tài khoản", headerTitleAlign: "center" }}
            />
            <Stack.Screen name="ActivateAccount" component={ActivateAccount} />
        </Stack.Navigator>
    );
}
