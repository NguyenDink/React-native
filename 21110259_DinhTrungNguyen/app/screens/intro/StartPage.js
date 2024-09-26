import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function StartPage({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>
                Chào mừng đến với <Text style={[styles.welcome, styles.title]}> qnspJob!</Text>
            </Text>

            {/* Điều hướng tới Login thông qua AuthNavigator */}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Auth", { screen: "Login" })}>
                <Text style={styles.buttonText}>Đăng nhập</Text>
            </TouchableOpacity>

            {/* Điều hướng tới Register thông qua AuthNavigator */}
            <TouchableOpacity
                style={[styles.button, styles.registerButton]}
                onPress={() => navigation.navigate("Auth", { screen: "Register" })}
            >
                <Text style={styles.buttonText}>Đăng ký tài khoản</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        backgroundColor: "#f0f0f0",
    },
    welcome: {
        fontSize: 24,
        marginBottom: 40,
        textAlign: "center",
        fontWeight: "bold",
    },
    title: {
        color: "#6dcf5b",
    },
    button: {
        backgroundColor: "#6dcf5b",
        borderRadius: 50,
        paddingVertical: 15,
        paddingHorizontal: 25,
        marginVertical: 10,
        width: "80%",
        alignItems: "center",
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "bold",
    },
    registerButton: {
        backgroundColor: "#509b43",
    },
});
