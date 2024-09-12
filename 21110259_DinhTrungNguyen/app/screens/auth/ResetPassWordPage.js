import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Alert, TouchableOpacity, Image } from "react-native";
import { resetPassword } from "../../services/AuthAPIService";
import iceye from "../../assets/low-vision-regular-24.png";
import iclock from "../../assets/lock-alt-regular-24.png";

export default function ResetPassWordPage({ navigation, route }) {
    const { email } = route.params;
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const handleResetPassword = async () => {
        if (!newPassword || !confirmPassword) {
            Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin");
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert("Lỗi", "Mật khẩu không trùng khớp");
            return;
        }
        try {
            const data = await resetPassword(email, newPassword);

            if (data.success) {
                Alert.alert("Thành công", data.message);
                navigation.navigate("Login");
            } else {
                Alert.alert("Lỗi", data.message);
            }
        } catch (error) {
            Alert.alert("Lỗi", "Đã xảy ra lỗi. Hãy thử lại.");
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Đặt lại mật khẩu</Text>
                <Text style={styles.description}>Hãy đặt mật khẩu mới cho tài khoản của bạn.</Text>
                <View style={styles.inputContainer}>
                    <Image source={iclock} style={[styles.icon, styles.iconFaded]} />
                    <TextInput
                        style={styles.input}
                        placeholder="Mật khẩu mới"
                        secureTextEntry={!showPassword}
                        placeholderTextColor="#a0a0a0"
                        value={newPassword}
                        onChangeText={setNewPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image source={iceye} style={[styles.icon, styles.iconFaded]} />
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <Image source={iclock} style={[styles.icon, styles.iconFaded]} />
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập lại mật khẩu"
                        secureTextEntry={!showConfirmPass}
                        placeholderTextColor="#a0a0a0"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <TouchableOpacity onPress={() => setShowConfirmPass(!showConfirmPass)}>
                        <Image source={iceye} style={[styles.icon, styles.iconFaded]} />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                <Text style={styles.buttonText}>Tạo lại mật khẩu</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "flex-start",
        paddingHorizontal: 20,
        justifyContent: "space-between",
    },
    title: {
        fontSize: 24,
        color: "#333",
        marginTop: 40,
        marginBottom: 30,
        fontWeight: "bold",
    },
    description: {
        fontSize: 16,
        color: "#333",
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: 50,
        borderRadius: 5,
        marginBottom: 8,
        paddingHorizontal: 15,
        backgroundColor: "#f9f9f9",
    },
    inputError: {
        borderColor: "red",
        borderWidth: 1,
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    iconFaded: {
        tintColor: "#a0a0a0",
    },
    input: {
        flex: 1,
        height: "100%",
        fontSize: 16,
    },
    button: {
        backgroundColor: "#509b43",
        width: "100%",
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginBottom: 20,
        alignItems: "center",
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 18,
    },
});
