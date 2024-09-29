import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";

import { resetPassword, sendOtp } from "../../services/AuthAPIService";

// Component for Password Field
const PasswordField = ({ placeholder, value, onChange, secureTextEntry, icon, onToggleShow, errorMessage }) => (
    <View>
        <View style={[styles.inputContainer, errorMessage ? styles.inputError : null]}>
            {icon && <Ionicons name={icon} size={24} color="#a0a0a0" style={styles.icon} />}
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                placeholderTextColor="#a0a0a0"
                value={value}
                onChangeText={onChange}
            />
            {onToggleShow && (
                <TouchableOpacity onPress={onToggleShow}>
                    <Ionicons name={secureTextEntry ? "eye-off-outline" : "eye-outline"} size={24} color="#a0a0a0" />
                </TouchableOpacity>
            )}
        </View>
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
    </View>
);

// Component for Loading Indicator
const LoadingIndicator = ({ loading }) => {
    if (!loading) return null;

    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6dcf5b" />
        </View>
    );
};

export default function ResetPassWordPage({ navigation, route }) {
    const { email } = route.params;

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [errors, setErrors] = useState({ otp: "", newPassword: "", confirmPassword: "" });

    const showToast = (type, text1, text2) => {
        Toast.show({
            type: type,
            text1: text1,
            text2: text2,
            position: "bottom",
            bottomOffset: 80,
            visibilityTime: 3000,
            text1Style: { fontSize: 16, fontWeight: "bold" },
            text2Style: { fontSize: 12 },
        });
    };

    const handleInputChange = (field, setValue) => (value) => {
        setValue(value);
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }));
        }
    };

    const handleSendOtp = async () => {
        setLoading(true);
        try {
            const data = await sendOtp(email);
            showToast(data.success ? "success" : "error", data.success ? "Success" : "Error", data.message);
        } catch (error) {
            showToast("error", "Error", "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        setErrors({ otp: "", newPassword: "", confirmPassword: "" });
        let hasError = false;

        // Validate input fields
        if (!otp) {
            setErrors((prev) => ({ ...prev, otp: "Vui lòng nhập mã xác nhận" }));
            hasError = true;
        }
        if (!newPassword) {
            setErrors((prev) => ({ ...prev, newPassword: "Vui lòng nhập mật khẩu mới" }));
            hasError = true;
        }
        if (newPassword !== confirmPassword) {
            setErrors((prev) => ({ ...prev, confirmPassword: "Mật khẩu không trùng khớp" }));
            hasError = true;
        }

        if (hasError) return;

        try {
            const data = await resetPassword(email, newPassword, otp);
            showToast(data.success ? "success" : "error", data.success ? "Success" : "Error", data.message);
            if (data.success) navigation.navigate("Login");
        } catch (error) {
            showToast("error", "Lỗi", "Đã xảy ra lỗi. Hãy thử lại.");
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <LoadingIndicator loading={loading} />
            <View>
                <Text style={styles.title}>Đặt lại mật khẩu</Text>
                <Text style={styles.description}>
                    Chúng tôi đã gửi mã xác nhận tới địa chỉ <Text style={styles.bold}>{email}</Text>. Vui lòng kiểm tra
                    hòm thư hoặc hòm thư spam để lấy mã và nhập vào bên dưới
                </Text>
                <Text>
                    Mã xác nhận <Text style={{ color: "red" }}>*</Text>
                </Text>
                <View style={[styles.inputContainer, errors.otp ? styles.inputError : null]}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập mã xác nhận"
                        value={otp}
                        onChangeText={handleInputChange("otp", setOtp)}
                        keyboardType="numeric"
                        maxLength={6}
                    />
                    <TouchableOpacity style={styles.resendButton} onPress={handleSendOtp}>
                        <Text style={styles.resendButtonText}>Gửi lại mã</Text>
                    </TouchableOpacity>
                </View>
                {errors.otp ? <Text style={styles.errorText}>{errors.otp}</Text> : null}

                <Text>
                    Mật khẩu mới <Text style={{ color: "red" }}>*</Text>
                </Text>
                <PasswordField
                    placeholder="Mật khẩu mới"
                    value={newPassword}
                    onChange={handleInputChange("newPassword", setNewPassword)}
                    secureTextEntry={!showPassword}
                    icon="lock-closed-outline"
                    onToggleShow={() => setShowPassword(!showPassword)}
                    errorMessage={errors.newPassword}
                />
                <PasswordField
                    placeholder="Nhập lại mật khẩu"
                    value={confirmPassword}
                    onChange={handleInputChange("confirmPassword", setConfirmPassword)}
                    secureTextEntry={!showConfirmPass}
                    icon="lock-closed-outline"
                    onToggleShow={() => setShowConfirmPass(!showConfirmPass)}
                    errorMessage={errors.confirmPassword}
                />
                <Text style={styles.noteText}>Mã xác nhận hết hạn sau 5 phút kể từ khi bạn nhận được mã.</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                <Text style={styles.buttonText}>Cập nhật mật khẩu</Text>
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
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: "100%",
        fontSize: 16,
    },
    resendButton: {
        backgroundColor: "#16a34a",
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginLeft: 10,
    },
    resendButtonText: {
        color: "#ffffff",
        fontSize: 14,
    },
    button: {
        backgroundColor: "#16a34a",
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
    bold: {
        fontWeight: "bold",
        color: "#16a34a",
    },
    noteText: {
        color: "#a0a0a0",
        textAlign: "center",
    },
    loadingContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
    },
    errorText: {
        color: "red",
        marginBottom: 8,
        fontSize: 14,
    },
});
