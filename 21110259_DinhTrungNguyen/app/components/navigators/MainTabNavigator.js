import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "react-native-vector-icons";
import HomeTab from "../../screens/Home/HomeTab";
import CV_ProfileTab from "../../screens/Home/CV_ProfileTab";
import JobConnectTab from "../../screens/Home/JobConnectTab";
import NotificationTab from "../../screens/Home/NotificationTab";
import AccountTab from "../../screens/Home/AccountTab";

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    switch (route.name) {
                        case "HomeTab":
                            iconName = focused ? "home" : "home-outline";
                            break;
                        case "CV_ProfileTab":
                            iconName = focused ? "document" : "document-outline";
                            break;
                        case "JobConnectTab":
                            iconName = focused ? "chatbox-ellipses" : "chatbox-ellipses-outline";
                            break;
                        case "NotificationScreen":
                            iconName = focused ? "notifications" : "notifications-outline";
                            break;
                        case "AccountTab":
                            iconName = focused ? "person" : "person-outline";
                            break;
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "#16a34a",
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
