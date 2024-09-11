import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Switch } from "react-native";
import { login } from "../../services/AuthAPIService";
import { handleLoginResponse, getToken } from "../../utils/AuthStorage";
import logo from "../../assets/logo.jpg";
import iclock from "../../assets/lock-alt-regular-24.png";
import icmail from "../../assets/envelope-regular-24.png";
import iceye from "../../assets/low-vision-regular-24.png";

export default function LoginPage({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        if (!isChecked) {
            Alert.alert("Lỗi", "Vui lòng đồng ý với điều khoản dịch vụ và chính sách bảo mật để tiếp tục.");
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
        <View style={styles.container}>
            <Image source={logo} style={styles.image} />
            <Text style={styles.description}>Chào mừng bạn đến với qnspJob</Text>

            <Text style={styles.title}>Đăng nhập</Text>

            <View style={styles.inputContainer}>
                <Image source={icmail} style={[styles.icon, styles.iconFaded]} />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#a0a0a0"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            <View style={styles.inputContainer}>
                <Image source={iclock} style={[styles.icon, styles.iconFaded]} />
                <TextInput
                    style={styles.input}
                    placeholder="Mật khẩu"
                    secureTextEntry={!showPassword}
                    placeholderTextColor="#a0a0a0"
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Image source={iceye} style={[styles.icon, styles.iconFaded]} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.forgotPasswordContainer}
                onPress={() => navigation.navigate("ForgotPassWord")}
            >
                <Text style={styles.link}>Quên mật khẩu?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Đăng nhập</Text>
            </TouchableOpacity>

            <View style={styles.switchContainer}>
                <Switch
                    value={isChecked}
                    onValueChange={setIsChecked}
                    trackColor={{ false: "#a0a0a0", true: "#509b43" }}
                    thumbColor="#ffffff"
                />
                <Text style={styles.switchText}>
                    Bằng việc đăng nhập, tôi đã đọc và đồng ý với{" "}
                    <Text style={styles.switchTextLink}>điều khoản dịch vụ</Text> và{" "}
                    <Text style={styles.switchTextLink}>chính sách bảo mật</Text> của qnspJob.
                </Text>
            </View>

            <View style={styles.footer}>
                <Text style={styles.text}>
                    Bạn chưa có tài khoản?{" "}
                    <Text style={styles.link} onPress={() => navigation.navigate("Register")}>
                        Đăng ký ngay
                    </Text>
                </Text>
            </View>

            <View style={styles.hr} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
        paddingHorizontal: 28,
        justifyContent: "space-between",
    },
    image: {
        width: 140,
        height: 140,
        borderRadius: 100,
        marginTop: 40,
    },
    description: {
        fontSize: 18,
        color: "#333",
        marginBottom: 40,
        textAlign: "center",
    },
    title: {
        fontSize: 22,
        color: "#333",
        marginBottom: 20,
        textAlign: "center",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: 50,
        borderRadius: 50,
        marginBottom: 16,
        paddingHorizontal: 15,
        backgroundColor: "#f9f9f9",
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
    forgotPasswordContainer: {
        alignSelf: "flex-end",
        marginBottom: 32,
    },
    link: {
        color: "#509b43",
        textAlign: "right",
        fontSize: 14,
        fontWeight: "bold",
    },
    button: {
        backgroundColor: "#509b43",
        width: "100%",
        borderRadius: 50,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 40,
        alignItems: "center",
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 18,
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 60,
        paddingHorizontal: 24,
    },
    switchText: {
        color: "#333",
    },
    switchTextLink: {
        color: "#509b43",
    },
    text: {
        color: "#333",
        textAlign: "center",
        fontSize: 14,
    },
    footer: {
        alignItems: "center",
        marginBottom: 20,
        marginVertical: 10,
    },
    hr: {
        width: "80%",
        height: 1,
        backgroundColor: "#ccc",
        marginBottom: 40,
    },
});
