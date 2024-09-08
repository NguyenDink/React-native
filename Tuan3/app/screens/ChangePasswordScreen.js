import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Alert, TouchableOpacity, Image } from "react-native";

export default function ChangePasswordScreen({ navigation, route }) {
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const validatePassword = (value) => {
        if (value.trim() === "") {
            setPasswordError("Vui lòng nhập mật khẩu hiện tại");
        } else {
            setPasswordError("");
        }
        setPassword(value);
    };

    const validateNewPassword = (value) => {
        if (value.trim() === "") {
            setNewPasswordError("Vui lòng nhập mật khẩu mới");
        } else {
            setNewPasswordError("");
        }
        setNewPassword(value);
    };

    const validateConfirmPassword = (value) => {
        if (value.trim() === "") {
            setConfirmPasswordError("Vui lòng nhập lại mật khẩu mới");
        } else if (newPassword !== value) {
            setConfirmPasswordError("Nhập lại mật khẩu không trùng khớp");
        } else {
            setConfirmPasswordError("");
        }
        setConfirmPassword(value);
    };

    const handleResetPassword = async () => {
        if (!passwordError && !newPasswordError && !confirmPasswordError) {
            try {
                // Xử lý logic lưu mật khẩu
            } catch (error) {
                Alert.alert("Lỗi", "Đã xảy ra lỗi. Hãy thử lại.");
            }
        } else {
            Alert.alert("Lỗi", "Vui lòng kiểm tra lại các thông tin nhập.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.text}>Email đăng nhập</Text>
                <View style={[styles.inputContainer, styles.inputDisable]}>
                    <TextInput
                        style={styles.input}
                        placeholder="abc@gmail.com"
                        placeholderTextColor="#a0a0a0"
                        editable={false}
                    />
                </View>

                <Text style={styles.text}>Mật khẩu hiện tại</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Mật khẩu hiện tại"
                        secureTextEntry={true}
                        placeholderTextColor="#a0a0a0"
                        value={password}
                        onChangeText={validatePassword}
                    />
                </View>
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

                <Text style={styles.text}>Mật khẩu mới</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Mật khẩu mới"
                        secureTextEntry={true}
                        placeholderTextColor="#a0a0a0"
                        value={newPassword}
                        onChangeText={validateNewPassword}
                    />
                </View>
                {newPasswordError ? <Text style={styles.errorText}>{newPasswordError}</Text> : null}

                <Text style={styles.text}>Nhập lại mật khẩu mới</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập lại mật khẩu mới"
                        secureTextEntry={true}
                        placeholderTextColor="#a0a0a0"
                        value={confirmPassword}
                        onChangeText={validateConfirmPassword}
                    />
                </View>
                {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonLine}>
                    <Text style={styles.buttonLineText}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                    <Text style={styles.buttonText}>Lưu</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f1f4f9",
        alignItems: "flex-start",
        justifyContent: "space-between",
    },
    form: {
        backgroundColor: "#ffffff",
        paddingHorizontal: 10,
        paddingVertical: 20,
        margin: 18,
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },
    errorText: {
        color: "red",
        marginBottom: 10,
        fontSize: 14,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: 40,
        borderRadius: 4,
        marginBottom: 10,
        paddingHorizontal: 15,
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#e2e0e0",
    },
    input: {
        flex: 1,
        height: "100%",
        fontSize: 16,
    },
    inputDisable: {
        backgroundColor: "#f1f1f1",
    },
    buttonContainer: {
        backgroundColor: "#ffffff",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 10,
        paddingVertical: 12,
    },
    button: {
        backgroundColor: "#509b43",
        borderRadius: 50,
        paddingVertical: 12,
        paddingHorizontal: 20,
        width: "49%",
        alignItems: "center",
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
    buttonLine: {
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#509b43",
        borderRadius: 50,
        paddingVertical: 12,
        paddingHorizontal: 20,
        width: "49%",
        alignItems: "center",
    },
    buttonLineText: {
        color: "#509b43",
        fontSize: 16,
        fontWeight: "bold",
    },
});
