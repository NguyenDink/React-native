import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, Image, View, Switch } from "react-native";
import { register } from "../../services/AuthAPIService";
import logo from "../../assets/logo.png";
import { Ionicons } from "@expo/vector-icons";

const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function RegisterPage({ navigation }) {
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const [emailError, setEmailError] = useState("");
    const [fullNameError, setFullNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const validateInputs = () => {
        let valid = true;

        if (!fullName) {
            setFullNameError("Họ và tên không được để trống");
            valid = false;
        } else {
            setFullNameError("");
        }

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

        if (!confirmPassword) {
            setConfirmPasswordError("Vui lòng nhập lại mật khẩu");
            valid = false;
        } else if (password !== confirmPassword) {
            setConfirmPasswordError("Mật khẩu không trùng khớp");
            valid = false;
        } else {
            setConfirmPasswordError("");
        }

        return valid;
    };

    const handleRegister = async () => {
        if (!validateInputs()) {
            return;
        }

        try {
            const data = await register(email, fullName, password);
            if (data.success) {
                Alert.alert("Đăng ký thành công", data.message);
                navigation.navigate("Login");
            } else {
                Alert.alert("Đăng ký không thành công", data.message);
            }
        } catch (error) {
            Alert.alert("Đăng ký không thành công", "Đã xảy ra lỗi khi đăng ký. Hãy thử lại.");
        }
    };

    return (
        <View className="flex-1 bg-white items-center px-7 justify-between">
            <Image source={logo} className="w-40 h-40 rounded-full mt-6" />
            <Text className="text-lg text-gray-800 mb-8 text-center">Chào mừng bạn đến với JOB PORTAL</Text>

            <Text className="text-2xl text-gray-800 mb-2 text-center">Đăng ký tài khoản</Text>

            {/* Input Họ và tên */}
            <View className="w-full">
                <View
                    className={`flex-row items-center w-full h-12 rounded-full px-4 bg-gray-100 ${
                        fullNameError ? "border-2 border-red-400" : ""
                    }`}
                >
                    <Ionicons name="person-outline" size={24} color="#a0a0a0" />
                    <TextInput
                        className="flex-1 h-full text-base text-gray-700 ml-2"
                        placeholder="Họ và tên"
                        placeholderTextColor="#a0a0a0"
                        value={fullName}
                        onChangeText={setFullName}
                    />
                </View>
                {fullNameError ? <Text className="text-red-500 text-sm">{fullNameError}</Text> : null}
            </View>

            {/* Input Email */}
            <View className="w-full">
                <View
                    className={`flex-row items-center w-full h-12 rounded-full px-4 bg-gray-100 ${
                        emailError ? "border-2 border-red-400" : ""
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
                {emailError ? <Text className="text-red-500 text-sm">{emailError}</Text> : null}
            </View>

            {/* Input Mật khẩu */}
            <View className="w-full">
                <View
                    className={`flex-row items-center w-full h-12 rounded-full px-4 bg-gray-100 ${
                        passwordError ? "border-2 border-red-400" : ""
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
                {passwordError ? <Text className="text-red-500 text-sm">{passwordError}</Text> : null}
            </View>

            {/* Input Xác nhận mật khẩu */}
            <View className="w-full">
                <View
                    className={`flex-row items-center w-full h-12 rounded-full px-4 bg-gray-100 ${
                        confirmPasswordError ? "border-2 border-red-400" : ""
                    }`}
                >
                    <Ionicons name="lock-closed-outline" size={24} color="#a0a0a0" />
                    <TextInput
                        className="flex-1 h-full text-base text-gray-700 ml-2"
                        placeholder="Nhập lại mật khẩu"
                        secureTextEntry={!showConfirmPass}
                        placeholderTextColor="#a0a0a0"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <TouchableOpacity onPress={() => setShowConfirmPass(!showConfirmPass)}>
                        <Ionicons
                            name={showConfirmPass ? "eye-off-outline" : "eye-outline"}
                            size={24}
                            color="#a0a0a0"
                        />
                    </TouchableOpacity>
                </View>
                {confirmPasswordError ? <Text className="text-red-500 text-sm">{confirmPasswordError}</Text> : null}
            </View>

            <View className="flex-row items-center mb-8 px-6">
                <Switch
                    value={isChecked}
                    onValueChange={setIsChecked}
                    trackColor={{ false: "#a0a0a0", true: "#509b43" }}
                    thumbColor="#ffffff"
                />
                <Text className="text-gray-800">
                    Tôi đã đọc và đồng ý với <Text className="text-green-600">điều khoản dịch vụ</Text> và{" "}
                    <Text className="text-green-600">chính sách bảo mật</Text> của qnspJob.
                </Text>
            </View>

            <TouchableOpacity
                className={`w-full rounded-full py-3 mb-10 items-center ${isChecked ? "bg-green-600" : "bg-gray-400"}`}
                onPress={handleRegister}
                disabled={!isChecked}
            >
                <Text className="text-white text-lg">Đăng ký</Text>
            </TouchableOpacity>

            <View className="w-full">
                <View className="items-center mb-2">
                    <Text className="text-gray-800">
                        Bạn đã có tài khoản?{" "}
                        <Text className="text-green-600 font-bold" onPress={() => navigation.navigate("Login")}>
                            Đăng nhập ngay
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
