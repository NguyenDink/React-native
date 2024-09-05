import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function MoreInfoPage({ route, navigation }) {
    const { email, fullName, password } = route.params;
    const [gender, setGender] = useState("Nam");
    const [dob, setDob] = useState(new Date());
    const [phoneNumber, setPhoneNumber] = useState("");
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleUpdate = () => {
        if (!gender || !dob || !phoneNumber) {
            Alert.alert("Error", "Vui lòng điền đầy đủ thông tin");
            return;
        }

        if (isNaN(phoneNumber)) {
            Alert.alert("Error", "Số điện thoại không đúng");
            return;
        }

        navigation.navigate("Home", {
            email,
            password,
            fullName,
            gender,
            dob: dob.toDateString(),
            phoneNumber,
        });
    };

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || dob;
        setShowDatePicker(false);
        setDob(currentDate);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Thông Tin Cá Nhân</Text>

            <Text style={styles.label}>Giới tính</Text>
            <View style={styles.radioGroup}>
                <TouchableOpacity style={styles.radioButton} onPress={() => setGender("Nam")}>
                    <View style={[styles.radioCircle, gender === "Nam" && styles.selectedRadio]} />
                    <Text style={styles.radioText}>Nam</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.radioButton} onPress={() => setGender("Nữ")}>
                    <View style={[styles.radioCircle, gender === "Nữ" && styles.selectedRadio]} />
                    <Text style={styles.radioText}>Nữ</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.label}>Ngày sinh</Text>
            <TextInput
                style={styles.input}
                value={dob.toDateString()}
                onFocus={() => setShowDatePicker(true)}
                showSoftInputOnFocus={false}
                placeholder="Chọn ngày sinh"
                placeholderTextColor="#a0a0a0"
            />
            {showDatePicker && <DateTimePicker value={dob} mode="date" display="default" onChange={onChangeDate} />}

            <TextInput
                style={styles.input}
                placeholder="Số điện thoại"
                keyboardType="numeric"
                placeholderTextColor="#a0a0a0"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
            />

            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Cập nhật</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#509b43",
        marginBottom: 20,
        textAlign: "center",
    },
    label: {
        fontSize: 18,
        color: "#333",
        marginBottom: 10,
    },
    input: {
        height: 45,
        borderColor: "#509b43",
        borderWidth: 2,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 15,
        backgroundColor: "#ffffff",
    },
    radioGroup: {
        flexDirection: "row",
        marginBottom: 20,
    },
    radioButton: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 20,
    },
    radioCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#6dcf5b",
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    selectedRadio: {
        backgroundColor: "#509b43",
    },
    radioText: {
        fontSize: 16,
        color: "#333",
    },
    button: {
        backgroundColor: "#509b43",
        borderRadius: 5,
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: "center",
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "bold",
    },
});
