import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import { sendOtp, activate } from "../../services/AuthAPIService";
import Toast from "react-native-toast-message";

import { getToken } from "../../utils/AuthStorage";

export default function ActivateAccount({ route, navigation }) {
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");

    const { email } = route.params;

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

    const handleSendOTP = async () => {
        setLoading(true);
        try {
            const data = await sendOtp(email);

            if (data.success) {
                showToast("success", "Success", data.message);
                setOtpSent(true);
            } else {
                showToast("error", "Error", data.message);
                console.log(data.message);
            }
        } catch (error) {
            showToast("error", "Error", "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmOTP = async () => {
        setLoading(true);
        try {
            const token = await getToken();
            console.log(token);
            if (token) {
                const data = await activate(token, otp);

                if (data.success) {
                    showToast("success", "Success", data.message);
                    navigation.goBack();
                } else {
                    showToast("error", "Error", data.message);
                }
            }
        } catch (error) {
            showToast("error", "Error", "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Activate Account Page</Text>

            <TextInput style={styles.input} placeholder="Email" value={email} editable={false} />

            {otpSent && (
                <TextInput
                    style={styles.input}
                    placeholder="Enter OTP"
                    value={otp}
                    onChangeText={setOtp}
                    keyboardType="numeric"
                    maxLength={6}
                />
            )}

            {loading ? (
                <ActivityIndicator size="large" color="#6dcf5b" style={{ marginBottom: 15 }} />
            ) : (
                <>
                    {otpSent ? (
                        <TouchableOpacity style={styles.button} onPress={handleConfirmOTP}>
                            <Text style={styles.buttonText}>Confirm</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.button} onPress={handleSendOTP}>
                            <Text style={styles.buttonText}>Send OTP</Text>
                        </TouchableOpacity>
                    )}
                </>
            )}

            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
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
    title: {
        fontSize: 32,
        marginBottom: 20,
    },
    input: {
        width: "100%",
        height: 40,
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    button: {
        width: "50%",
        height: 40,
        backgroundColor: "#6dcf5b",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
});
