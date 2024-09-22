import React, { useState } from "react";
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { sendOtp } from "../../services/AuthAPIService";

export default function ForgotPassWordPage({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [otpSent, setOtpSent] = useState(false);

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
            setLoading(false);
        } else if (!emailRegex.test(email.toLowerCase())) {
            setEmailError("Email không đúng định dạng");
            setLoading(false);
        } else {
            setEmailError("");

            try {
                const data = await sendOtp(email);

                if (data.success) {
                    showToast("success", "Success", data.message);
                    navigation.navigate("ResetPassWord", { email: email });
                    setOtpSent(true);
                } else {
                    if (data.statusCode === 404) {
                        setEmailError("Email này chưa được sử dụng, bạn hãy đăng ký tài khoản để tham gia");
                    } else {
                        setEmailError(data.message);
                    }
                }
            } catch (error) {
                Alert.alert("error", "Error", "An error occurred. Please try again.");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <View className="flex-1 bg-white px-5 justify-between">
            <View>
                <Text className="text-2xl font-bold text-gray-800 mt-10 mb-8">Quên mật khẩu</Text>
                <Text className="text-base text-gray-800 mb-5">
                    Vui lòng nhập email đăng ký của bạn. Chúng tôi sẽ gửi hướng dẫn đổi mật khẩu tới email này.
                </Text>
                <View
                    className={`flex-row items-center w-full h-12 rounded-lg mb-2 px-4 ${
                        emailError ? "border border-red-500" : "bg-gray-100"
                    }`}
                >
                    <TextInput
                        className="flex-1 h-full text-base text-gray-700"
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
                {emailError ? <Text className="text-red-500 text-sm mb-4">{emailError}</Text> : null}
            </View>

            <View>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <TouchableOpacity
                        className="bg-green-600 w-full rounded-lg py-3 px-5"
                        onPress={handleResetPassword}
                    >
                        <Text className="text-white text-center text-lg">Tạo lại mật khẩu</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}
