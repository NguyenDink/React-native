import React, { useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import Icon from "react-native-vector-icons/Ionicons";
import tailwind from "../../css/tailwind";

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
        <View className="flex-1 bg-gray-100">
            {/* Background Section */}
            <View className="bg-green-600 h-36 w-full absolute top-0 left-0 right-0 z-[-1]" />

            {/* Profile Section */}
            <View className="flex-row bg-white rounded-lg p-5 mx-5 mt-20 shadow-lg">
                <View className="relative">
                    <Image source={{ uri: avatar }} className="w-24 h-24 rounded-full border-2 border-green-500 mr-5" />
                    <TouchableOpacity
                        className="absolute right-0 bottom-0 bg-gray-600 rounded-full p-1 border-2 border-white"
                        onPress={selectImage}
                    >
                        <Icon name="camera-outline" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
                <View className="flex-1">
                    <Text className="text-lg font-bold text-gray-800 mb-1">Đinh Trung Nguyên</Text>
                    <Text className="text-sm text-gray-600">email@example.com</Text>
                    <Text className="text-sm font-bold text-gray-600 mt-2 ml-3">Chưa xác thực</Text>
                </View>
            </View>

            {/* Options Section */}
            <View className="px-5 mt-10">
                <TouchableOpacity
                    className="bg-white p-4 rounded-lg mb-4 shadow-md"
                    onPress={() => navigation.navigate("PersonalInfo")}
                >
                    <Text className="text-lg font-medium text-gray-800">Thông tin cá nhân</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="bg-white p-4 rounded-lg mb-4 shadow-md"
                    onPress={() => navigation.navigate("ChangePassword")}
                >
                    <Text className="text-lg font-medium text-gray-800">Đổi mật khẩu</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="bg-white p-4 rounded-lg shadow-md"
                    onPress={() => navigation.navigate("Logout")}
                >
                    <Text className="text-lg font-medium text-red-600">Đăng xuất</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
