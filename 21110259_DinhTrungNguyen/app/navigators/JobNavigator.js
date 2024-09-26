import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import JobDetail from "../screens/job/JobDetail";
import Search from "../screens/job/Search";
import JobList from "../screens/job/JobList";

const Stack = createStackNavigator();

export default function JobNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
            }}
        >
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen
                name="JobList"
                component={JobList}
                options={{ headerShown: true, headerTitle: "Việc làm tốt nhất" }}
            />
            <Stack.Screen name="JobDetail" component={JobDetail} />
        </Stack.Navigator>
    );
}
