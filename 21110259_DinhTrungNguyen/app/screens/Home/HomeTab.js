import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeTab({ navigation }) {
    const [search, setSearch] = useState("");
    const [filteredJobs, setFilteredJobs] = useState(jobList);

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

    useEffect(() => {
        // Filter job list based on search query
        if (search === "") {
            setFilteredJobs(jobList);
        } else {
            const lowercasedSearch = search.toLowerCase();
            const filtered = jobList.filter(
                (job) =>
                    job.title.toLowerCase().includes(lowercasedSearch) ||
                    job.company.toLowerCase().includes(lowercasedSearch)
            );
            setFilteredJobs(filtered);
        }
    }, [search]);

    const renderJobItem = ({ item }) => (
        <TouchableOpacity
            className="flex-row bg-white p-4 rounded-lg mb-4 shadow-sm"
            onPress={() => navigation.navigate("JobDetail")}
        >
            <Image source={{ uri: item.logo }} className="w-16 h-16 rounded-lg mr-4" />

            <View className="flex-1">
                <Text className="text-lg font-bold text-gray-900 mb-1">{item.title}</Text>
                <Text className="text-sm text-gray-600 mb-2">{item.company}</Text>

                <View className="flex-row space-x-2 mb-2">
                    <Text className="text-sm text-gray-700 bg-gray-100 py-1 px-2 rounded-md">{item.address}</Text>
                    <Text className="text-sm text-gray-700 bg-gray-100 py-1 px-2 rounded-md">{item.experience}</Text>
                </View>

                <View className="flex-row space-x-2 mb-2">
                    <Text className="text-sm text-[#509b43] bg-[#e8f5e9] py-1 px-2 rounded-md">{item.salary}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View className="flex-1 bg-gray-100 pt-3">
            {/* Search bar */}
            <View className="flex-row items-center bg-white rounded-lg py-3 px-4 mx-3 mt-8 mb-4 shadow-sm">
                <Ionicons name="search" size={24} color="#888" className="mr-3" />
                <TextInput
                    className="flex-1 text-base text-gray-700"
                    placeholder="Tìm kiếm công việc"
                    value={search}
                    onChangeText={(text) => setSearch(text)}
                />
            </View>

            {/* Job list */}
            <FlatList
                data={filteredJobs}
                renderItem={renderJobItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingHorizontal: 12 }}
            />
        </View>
    );
}
