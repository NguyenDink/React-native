import React, { useState } from "react";
import { forgotPassword, validateOtp } from "../../services/AuthAPIService";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ActivityIndicator } from "react-native";
import icmail from "../../assets/envelope-regular-24.png";
import Toast from "react-native-toast-message";

export default function ForgotPassWordPage({ navigation }) {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    const showToast = (type, text1, text2) => {
        Toast.show({
            type: type,
            text1: text1,
            text2: text2,
            position: "top",
            visibilityTime: 3000,
            text1Style: { fontSize: 16, fontWeight: "bold" },
            text2Style: { fontSize: 12 },
        });
    };

    const handleResetPassword = async () => {
        setLoading(true);
        const emailRegex =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email.trim() === "") {
            setEmailError("Email không được để trống");
        } else if (!emailRegex.test(email.toLowerCase())) {
            setEmailError("Email không đúng định dạng");
        } else {
            setEmailError("");
        }
        try {
            const data = await forgotPassword(email);

            if (data.success) {
                showToast("success", "Thành công", data.message);
                setOtpSent(true);
            } else {
                showToast("error", "Lỗi", data.message);
            }
        } catch (error) {
            showToast("error", "Lỗi", "Có lỗi xảy ra. Xin hãy thử lại.");
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmOTP = async () => {
        setLoading(true);
        try {
            const data = await validateOtp(email, otp);

            if (data.success) {
                showToast("success", "Thành công", data.message);
                navigation.navigate("ResetPassWord", { email: email });
            } else {
                showToast("error", "Lỗi", data.message);
            }
        } catch (error) {
            showToast("error", "Lỗi", "Có lỗi xảy ra. Xin hãy thử lại.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Quên mật khẩu</Text>
                <Text style={styles.description}>
                    Vui lòng nhập email đăng ký của bạn. Chúng tôi sẽ gửi hướng dẫn đổi mật khẩu tới email này.
                </Text>
                <View style={[styles.inputContainer, emailError ? styles.inputError : null]}>
                    <Image source={icmail} style={[styles.icon, styles.iconFaded]} />
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập email"
                        placeholderTextColor="#a0a0a0"
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text);
                            setEmailError("");
                        }}
                        editable={!otpSent}
                    />
                </View>
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                {otpSent && (
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập mã OTP được gửi đến email của bạn."
                            value={otp}
                            onChangeText={setOtp}
                            keyboardType="numeric"
                        />
                    </View>
                )}
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" style={{ marginBottom: 15, alignItems: "center" }} />
            ) : (
                <>
                    {otpSent ? (
                        <TouchableOpacity style={styles.button} onPress={handleConfirmOTP}>
                            <Text style={styles.buttonText}>Xác nhận</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                            <Text style={styles.buttonText}>Tạo lại mật khẩu</Text>
                        </TouchableOpacity>
                    )}
                </>
            )}
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
    errorText: {
        color: "red",
        marginBottom: 16,
        fontSize: 14,
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
