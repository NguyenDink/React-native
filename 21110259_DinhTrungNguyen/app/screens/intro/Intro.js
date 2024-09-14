import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { getToken } from "../../utils/AuthStorage";
import { introspect } from "../../services/AuthAPIService";

// Import hình ảnh từ thư mục cục bộ
import logo from "../../assets/logo.png";

export default function Intro({ navigation }) {
    useEffect(() => {
        const checkToken = async () => {
            const token = await getToken();
            if (token) {
                const data = await introspect(token);

                if (data.success) {
                    navigation.replace("Home");
                    return;
                }
            }
            navigation.replace("Start");
        };

        const timer = setTimeout(() => {
            checkToken();
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.image} />
            <Text style={styles.textName}>qnspJob</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 10,
        marginBottom: 20,
    },
    textName: {
        fontSize: 24,
    },
});
