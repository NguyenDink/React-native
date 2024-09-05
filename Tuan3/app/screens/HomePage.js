import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomePage({ route, navigation }) {
    const { fullName, email, gender, dob, phoneNumber } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>IJ FIT UTE</Text>
            <Text style={styles.info}>Người dùng: {fullName}</Text>
            <Text style={styles.info}>Email: {email}</Text>
            <Text style={styles.info}>Giới tính: {gender}</Text>
            <Text style={styles.info}>Ngày sinh: {dob}</Text>
            <Text style={styles.info}>Số điện thoại: {phoneNumber}</Text>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Start")}>
                <Text style={styles.buttonText}>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#eafaf1",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#6dcf5b",
        marginBottom: 30,
        textAlign: "center",
    },
    info: {
        fontSize: 18,
        color: "#333",
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#509b43",
        borderRadius: 5,
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: "center",
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "bold",
    },
});
