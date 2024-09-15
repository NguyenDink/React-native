import React, { useState } from "react";
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeTab({ navigation }) {
    const [search, setSearch] = useState("");

    const jobList = [
        {
            id: "1",
            logo: "https://bcassetcdn.com/public/blog/wp-content/uploads/2021/10/07203359/australia-tech-map-by-jimjemr-brandcrowd.png",
            title: "Software Engineer",
            company: "Tech Company",
            salary: "20-30 triệu VND",
            address: "Hồ Chí Minh",
            experience: "2 năm",
        },
        {
            id: "2",
            logo: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/corporate-company-logo-design-template-2402e0689677112e3b2b6e0f399d7dc3_screen.jpg?ts=1561532453",
            title: "Marketing Specialist",
            company: "Creative Agency",
            salary: "10-15 triệu VND",
            address: "Hà Nội",
            experience: "1 năm",
        },
        {
            id: "3",
            logo: "https://cdn.shopify.com/shopifycloud/hatchful_web_two/bundles/7e55eb3d6a1a096058955ae7d64ee9d5.png",
            title: "UI/UX Designer",
            company: "Design Studio",
            salary: "15-25 triệu VND",
            address: "Đà Nẵng",
            experience: "2 năm",
        },
        {
            id: "4",
            logo: "https://dynamic.brandcrowd.com/asset/logo/aa3b9817-26ca-40d0-8c59-b4a8d149bda2/logo-search-grid-2x?logoTemplateVersion=1&v=638550553385470000",
            title: "Sales Manager",
            company: "Retail Corp",
            salary: "20-35 triệu VND",
            address: "Hồ Chí Minh",
            experience: "3 năm",
        },
        {
            id: "5",
            logo: "https://marketplace.canva.com/EAE0rNNM2Fg/1/0/1600w/canva-letter-c-trade-marketing-logo-design-template-r9VFYrbB35Y.jpg",
            title: "HR Specialist",
            company: "Global Enterprise",
            salary: "12-18 triệu VND",
            address: "Hà Nội",
            experience: "2 năm",
        },
    ];

    const renderJobItem = ({ item }) => (
        <TouchableOpacity style={styles.jobCard} onPress={() => navigation.navigate("JobDetail")}>
            <Image source={{ uri: item.logo }} style={styles.logo} />

            <View style={styles.jobDetails}>
                <Text style={styles.jobTitle}>{item.title}</Text>
                <Text style={styles.company}>{item.company}</Text>

                <View style={styles.infoContainer}>
                    <Text style={styles.info}>{item.address}</Text>
                    <Text style={styles.info}>{item.experience}</Text>
                </View>

                <Text style={styles.salary}>{item.salary}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={24} color="#888" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm kiếm công việc"
                    value={search}
                    onChangeText={(text) => setSearch(text)}
                />
            </View>

            <FlatList
                data={jobList}
                renderItem={renderJobItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f1f4f9",
        paddingTop: 10,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderRadius: 10,
        marginTop: 30,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginHorizontal: 10,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: "#333",
    },
    listContainer: {
        paddingHorizontal: 10,
    },
    jobCard: {
        flexDirection: "row",
        backgroundColor: "#ffffff",
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    logo: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 15,
    },
    jobDetails: {
        flex: 1,
    },
    jobTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },
    company: {
        fontSize: 14,
        color: "#888",
        marginBottom: 5,
    },
    infoContainer: {
        flexDirection: "row",
        marginBottom: 10,
    },
    info: {
        fontSize: 14,
        color: "#666",
        backgroundColor: "#f0f0f0",
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginRight: 8,
        borderRadius: 6,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 1,
    },
    salary: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#509b43",
        backgroundColor: "#e8f5e9",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 1,
        marginTop: 5,
    },
});
