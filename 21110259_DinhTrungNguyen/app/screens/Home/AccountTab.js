import React, { useCallback, useState } from "react";
import { Alert, ActivityIndicator, Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";

import { logout } from "../../services/AuthAPIService";
import { myInfo } from "../../services/UsersAPIService";
import { getToken, deleteToken } from "../../utils/AuthStorage";

export default function AccountTab({ navigation }) {
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState(null);
    const [avatar, setAvatar] = useState(
        "https://yt3.googleusercontent.com/nWSdA9GftPmUUpr9p7-uRmzaBpXJPosI-m7anrP040ixXZdMScrMdyordtkR7XBDtewPancSjZo=s900-c-k-c0x00ffffff-no-rj"
    );

    const fetchUserInfo = useCallback(async () => {
        try {
            setLoading(true);
            const token = await getToken();
            if (token) {
                const data = await myInfo(token);
                if (data.success) {
                    setUserInfo(data.result);
                } else {
                    Alert.alert("Lỗi", data.message);
                }
            }
        } catch (error) {
            Alert.alert("Lỗi", "Không tìm thấy thông tin người dùng.");
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchUserInfo();
        }, [fetchUserInfo])
    );

    const handleLogout = async () => {
        try {
            const token = await getToken();
            if (token) {
                const data = await logout(token);
                if (data.success) {
                    navigation.navigate("Start"); // Quay lại trang bắt đầu
                    Alert.alert("Thành công", data.message);
                    deleteToken();
                }
            }
        } catch (error) {
            Alert.alert("Đăng xuất không thành công", "Có lỗi xảy ra. Xin hãy thử lại.");
        }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#6dcf5b" />
            </View>
        );
    }

    return (
        <View className="flex-1 bg-gray-100">
            {/* Top Background */}
            <View className="bg-[#5fa75f] h-36 w-full absolute top-0 left-0 right-0 z-[-1]" />

            {/* Profile Section */}
            {userInfo ? (
                <>
                    <View className="flex-row bg-white rounded-lg p-5 mx-5 mt-20" style={styles.shadowStyle}>
                        <View className="relative">
                            <Image
                                source={{ uri: avatar }}
                                className="w-24 h-24 rounded-full border-2 border-[#6dcf5b] mr-5"
                            />
                            <TouchableOpacity
                                className="absolute right-3 bottom-0 bg-gray-600 rounded-full p-1 border-2 border-white"
                                // onPress={selectImage}
                            >
                                <Ionicons name="camera-outline" size={20} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        <View className="flex-1">
                            <Text className="text-lg font-bold text-gray-800 mb-1">{userInfo.fullName}</Text>
                            <Text className="text-sm text-gray-600" numberOfLines={1} ellipsizeMode="tail">
                                {userInfo.email}
                            </Text>
                            {userInfo.active ? (
                                <View className="flex-row items-center mt-2">
                                    <Octicons
                                        name="shield-check"
                                        size={20}
                                        color="#6dcf5b"
                                        style={{ marginRight: 4 }}
                                    />
                                    <Text className="text-sm font-bold text-gray-600">Tài khoản đã xác thực</Text>
                                </View>
                            ) : (
                                <TouchableOpacity
                                    // Điều hướng tới ActivateAccount qua AccountNavigator
                                    onPress={() =>
                                        navigation.navigate("Account", {
                                            screen: "ActivateAccount",
                                            params: { email: userInfo.email },
                                        })
                                    }
                                >
                                    <View className="flex-row items-center mt-2">
                                        <Octicons name="shield-x" size={20} color="red" style={{ marginRight: 4 }} />
                                        <Text className="text-sm font-bold text-gray-600">Tài khoản chưa xác thực</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                    {/* Options Section */}
                    <View className="px-5 mt-10">
                        <TouchableOpacity
                            className="bg-white p-3 rounded-lg mb-4"
                            style={styles.shadowStyle}
                            // Điều hướng tới PersonalInfo qua AccountNavigator
                            onPress={() =>
                                navigation.navigate("Account", { screen: "PersonalInfo", params: { user: userInfo } })
                            }
                        >
                            <Text className="text-lg font-medium text-gray-800">Thông tin cá nhân</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="bg-white p-3 rounded-lg mb-4"
                            style={styles.shadowStyle}
                            // Điều hướng tới ChangePassword qua AccountNavigator
                            onPress={() =>
                                navigation.navigate("Account", { screen: "ChangePassword", params: { user: userInfo } })
                            }
                        >
                            <Text className="text-lg font-medium text-gray-800">Đổi mật khẩu</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="bg-white p-3 rounded-lg"
                            style={styles.shadowStyle}
                            onPress={handleLogout}
                        >
                            <Text className="text-lg font-medium text-red-600">Đăng xuất</Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                <>
                    <View className="flex-row bg-white rounded-lg p-5 mx-5 mt-20" style={styles.shadowStyle}>
                        <View className="relative mr-5">
                            <View className="w-24 h-24 rounded-full border-2 border-green-600 justify-center items-center">
                                <Ionicons name="person-outline" size={48} color="#509b43" />
                            </View>
                            <TouchableOpacity
                                className="absolute right-0 bottom-0 bg-gray-600 rounded-full p-1 border-2 border-white"
                                // onPress={selectImage}
                            >
                                <Ionicons name="camera-outline" size={20} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        <View className="flex-1 justify-center">
                            <Text className="text-lg font-bold text-gray-800 mb-3 text-center">Vui lòng đăng nhập</Text>
                            <TouchableOpacity
                                className="bg-green-600 p-3 rounded-lg justify-center items-center"
                                // Điều hướng tới Login qua AuthNavigator
                                onPress={() => {
                                    navigation.navigate("Auth", { screen: "Login" });
                                }}
                            >
                                <Text className="text-lg font-medium text-white">Đăng nhập</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    shadowStyle: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
});
