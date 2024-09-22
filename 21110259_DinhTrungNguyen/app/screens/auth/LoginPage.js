import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View, Image, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { login } from "../../services/AuthAPIService";
import { handleLoginResponse, getToken } from "../../utils/AuthStorage";
import logo from "../../assets/logo.png";

const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function LoginPage({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const validateInputs = () => {
        let valid = true;

        if (!email) {
            setEmailError("Email không được để trống");
            valid = false;
        } else if (!emailRegex.test(email.toLowerCase())) {
            setEmailError("Email không đúng định dạng");
            valid = false;
        } else {
            setEmailError("");
        }

        if (!password) {
            setPasswordError("Mật khẩu không được để trống");
            valid = false;
        } else {
            setPasswordError("");
        }

        return valid;
    };

    const handleLogin = async () => {
        if (!validateInputs()) {
            return;
        }

        try {
            const data = await login(email, password);

            if (data.success) {
                setEmail("");
                setPassword("");
                handleLoginResponse(data);
                getToken();
                navigation.navigate("Home");
            } else {
                Alert.alert("Đăng nhập không thành công", data.message);
            }
        } catch (error) {
            Alert.alert("Đăng nhập không thành công", "Đã xảy ra lỗi khi đăng nhập. Hãy thử lại.");
        }
    };

    return (
        <View className="flex-1 bg-white items-center px-7 justify-between">
            <Image source={logo} className="w-40 h-40 mt-6" />
            <Text className="text-lg text-gray-800 mb-10 text-center">Chào mừng bạn đến với JOB PORTAL</Text>

            <Text className="text-2xl text-gray-800 mb-2 text-center">Đăng nhập</Text>

            {/* Input Email */}
            <View className="w-full">
                <View
                    className={`flex-row items-center w-full h-14 rounded-full mb-1 px-4 bg-gray-100 ${
                        emailError ? "border border-red-500" : ""
                    }`}
                >
                    <Ionicons name="mail-outline" size={24} color="#a0a0a0" />
                    <TextInput
                        className="flex-1 h-full text-base text-gray-700 ml-2"
                        placeholder="Email"
                        placeholderTextColor="#a0a0a0"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                {/* Hiển thị lỗi Email */}
                {emailError ? <Text className="text-red-500 text-sm px-5">{emailError}</Text> : null}
            </View>

            {/* Input Mật khẩu */}
            <View className="w-full">
                <View
                    className={`flex-row items-center w-full h-14 rounded-full mb-1 px-4 bg-gray-100 ${
                        passwordError ? "border border-red-500" : ""
                    }`}
                >
                    <Ionicons name="lock-closed-outline" size={24} color="#a0a0a0" />
                    <TextInput
                        className="flex-1 h-full text-base text-gray-700 ml-2"
                        placeholder="Mật khẩu"
                        secureTextEntry={!showPassword}
                        placeholderTextColor="#a0a0a0"
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={24} color="#a0a0a0" />
                    </TouchableOpacity>
                </View>
                {/* Hiển thị lỗi Mật khẩu */}
                {passwordError ? <Text className="text-red-500 text-sm px-5">{passwordError}</Text> : null}
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("ForgotPassWord")} className="self-end mb-8">
                <Text className="text-green-600 font-bold">Quên mật khẩu?</Text>
            </TouchableOpacity>

            {/* Nút đăng nhập */}
            <TouchableOpacity
                className={`w-full rounded-full py-3 mb-10 items-center ${isChecked ? "bg-green-600" : "bg-gray-400"}`}
                onPress={handleLogin}
                disabled={!isChecked}
            >
                <Text className="text-white text-lg">Đăng nhập</Text>
            </TouchableOpacity>

            {/* Điều khoản */}
            <View className="flex-row items-center mb-10 px-6">
                <Switch
                    value={isChecked}
                    onValueChange={setIsChecked}
                    trackColor={{ false: "#a0a0a0", true: "#16a34a" }}
                    thumbColor="#ffffff"
                />
                <Text className="text-gray-800">
                    Bằng việc đăng nhập, tôi đã đọc và đồng ý với{" "}
                    <Text className="text-green-600">điều khoản dịch vụ</Text> và{" "}
                    <Text className="text-green-600">chính sách bảo mật</Text> của Job Portal.
                </Text>
            </View>

            {/* Điều hướng */}
            <View className="w-full">
                <View className="items-center mb-3">
                    <Text className="text-gray-800">
                        Bạn chưa có tài khoản?{" "}
                        <Text className="text-green-600 font-bold" onPress={() => navigation.navigate("Register")}>
                            Đăng ký ngay
                        </Text>
                    </Text>
                </View>

                <View className="self-center w-4/5 h-px bg-gray-300 mb-2" />

                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <Text className="self-center text-sm font-bold text-green-600 mb-5">
                        Trải nghiệm không cần đăng nhập
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
