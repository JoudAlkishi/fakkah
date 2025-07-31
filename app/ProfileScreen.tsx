import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
    const router = useRouter();
    
    const profileItems = [
        {
            icon: "person",
            title: "معلومات شخصية",
            subtitle: "تحديث بياناتك الشخصية",
        },
        {
            icon: "security",
            title: "الأمان والخصوصية",
            subtitle: "إعدادات الحماية والخصوصية",
        },
        {
            icon: "notifications",
            title: "الإشعارات",
            subtitle: "إدارة تفضيلات الإشعارات",
        },
        {
            icon: "account-balance-wallet",
            title: "المحفظة الرقمية",
            subtitle: "إدارة وسائل الدفع",
        },
        {
            icon: "help",
            title: "المساعدة والدعم",
            subtitle: "الحصول على المساعدة",
        },
        {
            icon: "settings",
            title: "الإعدادات",
            subtitle: "تخصيص تجربتك",
        },
    ];

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <MaterialIcons name="arrow-back" size={24} color="#001a6e" />
                </TouchableOpacity>
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Profile Info Card */}
                <View style={styles.profileCard}>
                    <View style={styles.avatarContainer}>
                        <MaterialIcons name="person" size={40} color="#ffffff" />
                    </View>
                    <View style={styles.profileInfo}>
                        <Text style={styles.userName}>عبدالكريم الشهري</Text>
                        <Text style={styles.userEmail}>abdulkareem@example.com</Text>
                        <Text style={styles.userPhone}>+966 50 123 4567</Text>
                    </View>
                    <TouchableOpacity style={styles.editButton}>
                        <MaterialIcons name="edit" size={20} color="#01a736" />
                    </TouchableOpacity>
                </View>

                {/* Profile Menu Items */}
                <View style={styles.menuContainer}>
                    {profileItems.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.menuItem}>
                            <View style={styles.menuItemLeft}>
                                <View style={styles.menuIconContainer}>
                                    <MaterialIcons 
                                        name={item.icon as any} 
                                        size={24} 
                                        color="#01a736" 
                                    />
                                </View>
                                <View style={styles.menuTextContainer}>
                                    <Text style={styles.menuTitle}>{item.title}</Text>
                                    <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                                </View>
                            </View>
                            <MaterialIcons name="chevron-left" size={24} color="#6b7280" />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton}>
                    <MaterialIcons name="logout" size={24} color="#ff4757" />
                    <Text style={styles.logoutText}>تسجيل الخروج</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8fafc",
    },
    header: {
        backgroundColor: "#ffffff",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 50,
        paddingBottom: 16,
        paddingHorizontal: 24,
        borderBottomWidth: 1,
        borderBottomColor: "#f1f5f9",
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        backgroundColor: "#f8fafc",
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: "Almarai-Bold",
        color: "#001a6e",
        textAlign: "center",
    },
    placeholder: {
        width: 40,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
    },
    profileCard: {
        backgroundColor: "#ffffff",
        borderRadius: 16,
        padding: 24,
        marginTop: 24,
        flexDirection: "row",
        alignItems: "center",
        elevation: 2,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    avatarContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#01a736",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 16,
    },
    profileInfo: {
        flex: 1,
        alignItems: "flex-end",
    },
    userName: {
        fontSize: 18,
        fontFamily: "Almarai-Bold",
        color: "#001a6e",
        marginBottom: 4,
        textAlign: "right",
    },
    userEmail: {
        fontSize: 14,
        fontFamily: "Almarai-Regular",
        color: "#6b7280",
        marginBottom: 2,
        textAlign: "right",
    },
    userPhone: {
        fontSize: 14,
        fontFamily: "Almarai-Regular",
        color: "#6b7280",
        textAlign: "right",
    },
    editButton: {
        width: 36,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 18,
        backgroundColor: "#f0fdf4",
        marginLeft: 12,
    },
    menuContainer: {
        backgroundColor: "#ffffff",
        borderRadius: 16,
        marginTop: 24,
        elevation: 2,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#f1f5f9",
    },
    menuItemLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    menuIconContainer: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        backgroundColor: "#f0fdf4",
        marginRight: 16,
    },
    menuTextContainer: {
        flex: 1,
        alignItems: "flex-end",
    },
    menuTitle: {
        fontSize: 16,
        fontFamily: "Almarai-Medium",
        color: "#001a6e",
        marginBottom: 2,
        textAlign: "right",
    },
    menuSubtitle: {
        fontSize: 13,
        fontFamily: "Almarai-Regular",
        color: "#6b7280",
        textAlign: "right",
    },
    logoutButton: {
        backgroundColor: "#ffffff",
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
        marginTop: 24,
        marginBottom: 40,
        elevation: 2,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    logoutText: {
        fontSize: 16,
        fontFamily: "Almarai-Medium",
        color: "#ff4757",
        marginLeft: 8,
    },
});