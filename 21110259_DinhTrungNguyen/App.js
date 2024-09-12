import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "react-native-vector-icons";
import Toast from "react-native-toast-message";

import Intro from "./app/screens/intro/Intro";
import StartPage from "./app/screens/intro/StartPage";
import LoginPage from "./app/screens/auth/LoginPage";
import RegisterPage from "./app/screens/auth/RegisterPage";
import ForgotPassWordPage from "./app/screens/auth/ForgotPasswordPage";
import ResetPassWordPage from "./app/screens/auth/ResetPassWordPage";
import AccountTab from "./app/screens/Home/AccountTab";
import HomeTab from "./app/screens/Home/HomeTab";
import JobConnectTab from "./app/screens/Home/JobConnectTab";
import CV_ProfileTab from "./app/screens/Home/CV_ProfileTab";
import NotificationTab from "./app/screens/Home/NotificationTab";
import ChangePasswordScreen from "./app/screens/account/ChangePasswordScreen";
import PersonalInfoScreen from "./app/screens/account/PersonalInfoScreen";
import ActivateAccount from "./app/screens/account/ActivateAccount";

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

function AppTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "HomeTab") {
                        iconName = focused ? "home" : "home-outline";
                    } else if (route.name === "CV_ProfileTab") {
                        iconName = focused ? "document" : "document-outline";
                    } else if (route.name === "JobConnectTab") {
                        iconName = focused ? "chatbox-ellipses" : "chatbox-ellipses-outline";
                    } else if (route.name === "NotificationScreen") {
                        iconName = focused ? "notifications" : "notifications-outline";
                    } else if (route.name === "AccountTab") {
                        iconName = focused ? "person" : "person-outline";
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "#6dcf5b",
                tabBarInactiveTintColor: "gray",
            })}
        >
            <Tab.Screen name="HomeTab" component={HomeTab} options={{ tabBarLabel: "Trang chủ" }} />
            <Tab.Screen name="CV_ProfileTab" component={CV_ProfileTab} options={{ tabBarLabel: "CV & Profile" }} />
            <Tab.Screen name="JobConnectTab" component={JobConnectTab} options={{ tabBarLabel: "Job Connect" }} />
            <Tab.Screen name="NotificationScreen" component={NotificationTab} options={{ tabBarLabel: "Thông Báo" }} />
            <Tab.Screen name="AccountTab" component={AccountTab} options={{ tabBarLabel: "Tài Khoản" }} />
        </Tab.Navigator>
    );
}

export default function App() {
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
                <Stack.Screen name="Login" component={LoginPage} />
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
                <Stack.Screen name="Register" component={RegisterPage} />
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
                <Stack.Screen name="Home" component={AppTabs} />
            </Stack.Navigator>
            <Toast />
        </NavigationContainer>
    );
}
