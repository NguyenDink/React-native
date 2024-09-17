import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, Image, View, Switch } from "react-native";
import { register } from "../../services/AuthAPIService";
import logo from "../../assets/logo.png";
import Icon from "react-native-vector-icons/Ionicons";

export default function RegisterPage({ navigation }) {
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const handleRegister = async () => {
        if (!email || !password || !confirmPassword) {
            Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Lỗi", "Mật khẩu không trùng khớp");
            return;
        }

        if (!isChecked) {
            Alert.alert("Lỗi", "Vui lòng đồng ý với điều khoản dịch vụ và chính sách bảo mật để tiếp tục.");
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
        <View style={styles.container}>
            <Image source={logo} style={styles.image} />
            <Text style={styles.description}>Chào mừng bạn đến với JOB PORTAL</Text>

            <Text style={styles.title}>Đăng ký tài khoản</Text>

            <View style={styles.inputContainer}>
                <Icon name="person-outline" size={24} color="#a0a0a0" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Họ và tên"
                    placeholderTextColor="#a0a0a0"
                    value={fullName}
                    onChangeText={setFullName}
                />
            </View>

            <View style={styles.inputContainer}>
                <Icon name="mail-outline" size={24} color="#a0a0a0" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#a0a0a0"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            <View style={styles.inputContainer}>
                <Icon name="lock-closed-outline" size={24} color="#a0a0a0" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Mật khẩu"
                    secureTextEntry={!showPassword}
                    placeholderTextColor="#a0a0a0"
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Icon
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={24}
                        color="#a0a0a0"
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <Icon name="lock-closed-outline" size={24} color="#a0a0a0" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Nhập lại mật khẩu"
                    secureTextEntry={!showConfirmPass}
                    placeholderTextColor="#a0a0a0"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPass(!showConfirmPass)}>
                    <Icon
                        name={showConfirmPass ? "eye-off-outline" : "eye-outline"}
                        size={24}
                        color="#a0a0a0"
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.switchContainer}>
                <Switch
                    value={isChecked}
                    onValueChange={setIsChecked}
                    trackColor={{ false: "#a0a0a0", true: "#509b43" }}
                    thumbColor="#ffffff"
                />
                <Text style={styles.switchText}>
                    Tôi đã đọc và đồng ý với <Text style={styles.switchTextLink}>điều khoản dịch vụ</Text> và{" "}
                    <Text style={styles.switchTextLink}>chính sách bảo mật</Text> của qnspJob.
                </Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Đăng ký</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.footer} onPress={() => navigation.navigate("Login")}>
                <Text style={styles.text}>
                    Bạn đã có tài khoản? <Text style={styles.link}>Đăng nhập ngay</Text>
                </Text>
            </TouchableOpacity>

            <View style={styles.hr} />

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Home");
                }}
            >
                <Text className="text-sm font-bold text-[#509b43] mb-5">Trải nghiệm không cần đăng nhập</Text>
            </TouchableOpacity>
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
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: "100%",
        fontSize: 16,
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
        marginBottom: 16,
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
    link: {
        color: "#509b43",
        textAlign: "right",
        fontSize: 14,
        fontWeight: "bold",
    },
    footer: {
        alignItems: "center",
        marginBottom: 10,
        marginVertical: 10,
    },
    hr: {
        width: "80%",
        height: 1,
        backgroundColor: "#ccc",
        marginBottom: 10,
    },
});
