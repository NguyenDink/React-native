import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import Icon from "react-native-vector-icons/Ionicons";

export default function AccountTab({ route, navigation }) {
    const [avatar, setAvatar] = useState(
        "https://yt3.googleusercontent.com/nWSdA9GftPmUUpr9p7-uRmzaBpXJPosI-m7anrP040ixXZdMScrMdyordtkR7XBDtewPancSjZo=s900-c-k-c0x00ffffff-no-rj"
    );

    const selectImage = () => {
        const options = {
            mediaType: "photo",
            maxWidth: 300,
            maxHeight: 300,
            quality: 1,
        };

        launchImageLibrary(options, (response) => {
            if (response.assets && response.assets.length > 0) {
                const selectedImage = response.assets[0].uri;
                setAvatar(selectedImage);
            }
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.topBackground} />

            <View style={styles.profileSection}>
                <View style={styles.avatarContainer}>
                    <Image source={{ uri: avatar }} style={styles.avatar} />
                    <TouchableOpacity style={styles.editIcon} onPress={selectImage}>
                        <Icon name="camera-outline" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
                <View style={styles.profileDetails}>
                    <Text style={styles.username}>Đinh Trung Nguyên</Text>
                    <Text style={styles.email}>email@example.com</Text>
                    <Text style={styles.isActive}>Chưa xác thực</Text>
                </View>
            </View>

            <View style={styles.optionsSection}>
                <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("PersonalInfo")}>
                    <Text style={styles.optionText}>Thông tin cá nhân</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("ChangePassword")}>
                    <Text style={styles.optionText}>Đổi mật khẩu</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.option, { marginBottom: 0 }]}
                    onPress={() => navigation.navigate("Logout")}
                >
                    <Text style={[styles.optionText, { color: "#d9534f" }]}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f4f4",
    },
    topBackground: {
        backgroundColor: "#5fa75f",
        height: 140,
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: -1,
    },
    profileSection: {
        flexDirection: "row",
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        marginHorizontal: 20,
        marginTop: 80,
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 2 },
    },
    avatarContainer: {
        position: "relative",
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 50,
        borderColor: "#6dcf5b",
        borderWidth: 2,
        marginRight: 20,
    },
    editIcon: {
        position: "absolute",
        right: 0,
        bottom: 0,
        backgroundColor: "#777",
        borderRadius: 50,
        padding: 5,
        borderColor: "#fff",
        borderWidth: 2,
    },
    profileDetails: {
        flex: 1,
    },
    username: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },
    email: {
        fontSize: 14,
        color: "#777",
    },
    isActive: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#777",
        marginBottom: 5,
        marginTop: 5,
        marginLeft: 15,
    },
    optionsSection: {
        paddingHorizontal: 20,
        marginTop: 40,
    },
    option: {
        backgroundColor: "#fff",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 15,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    optionText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#333",
    },
});
