import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type TabId = "opportunities" | "investments" | "profile";

// Opportunity interface for the opportunities tab
interface Opportunity {
    id: string;
    title: string;
    description: string;
    minimumInvestment: string;
    expectedReturn: string;
    duration: string;
    riskLevel: "منخفض" | "متوسط" | "عالي";
    category: string;
    funded: number;
    target: number;
}

export default function Home() {
    const [activeTab, setActiveTab] = useState<TabId>("investments");
    const [selectedFilter, setSelectedFilter] = useState<string>("الكل");

    const handleTabChange = (tab: TabId) => {
        setActiveTab(tab);
    };

    const getWelcomeMessage = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "صباح الخير";
        if (hour < 18) return "مساء الخير";
        return "مساء الخير";
    };

    // Opportunities data
    const opportunities: Opportunity[] = [
        {
            id: "1",
            title: "مشروع الرياض الذكية",
            description: "استثمار في تطوير التقنيات الذكية للمدن",
            minimumInvestment: "10,000",
            expectedReturn: "15%",
            duration: "24 شهر",
            riskLevel: "متوسط",
            category: "تقني",
            funded: 750000,
            target: 1000000,
        },
        {
            id: "2",
            title: "مجمع تجاري بجدة",
            description: "تطوير مجمع تجاري في موقع استراتيجي بجدة",
            minimumInvestment: "25,000",
            expectedReturn: "18%",
            duration: "36 شهر",
            riskLevel: "منخفض",
            category: "عقاري",
            funded: 2500000,
            target: 5000000,
        },
        {
            id: "3",
            title: "مصنع تقنية الطاقة المتجددة",
            description: "إنتاج وتطوير حلول الطاقة الشمسية",
            minimumInvestment: "50,000",
            expectedReturn: "22%",
            duration: "48 شهر",
            riskLevel: "عالي",
            category: "صناعي",
            funded: 1200000,
            target: 3000000,
        },
        {
            id: "4",
            title: "منتجع سياحي بالعلا",
            description: "تطوير منتجع سياحي فاخر في منطقة العلا",
            minimumInvestment: "30,000",
            expectedReturn: "20%",
            duration: "30 شهر",
            riskLevel: "متوسط",
            category: "تجاري",
            funded: 4000000,
            target: 8000000,
        },
    ];

    const filters = ["الكل", "عقاري", "تقني", "تجاري", "صناعي"];
    const filteredOpportunities = selectedFilter === "الكل" 
        ? opportunities 
        : opportunities.filter(opp => opp.category === selectedFilter);

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

    const getRiskColor = (riskLevel: string) => {
        switch (riskLevel) {
            case "منخفض": return "#01a736";
            case "متوسط": return "#ffa500";
            case "عالي": return "#ff4757";
            default: return "#6b7280";
        }
    };

    const renderOpportunity = ({ item }: { item: Opportunity }) => {
        const fundedPercentage = (item.funded / item.target) * 100;

        return (
            <TouchableOpacity style={styles.opportunityCard}>
                <View style={styles.cardHeader}>
                    <View style={styles.categoryBadge}>
                        <Text style={styles.categoryText}>{item.category}</Text>
                    </View>
                    <View style={[styles.riskBadge, { backgroundColor: getRiskColor(item.riskLevel) }]}>
                        <Text style={styles.riskText}>{item.riskLevel}</Text>
                    </View>
                </View>

                <Text style={styles.opportunityTitle}>{item.title}</Text>
                <Text style={styles.opportunityDescription}>{item.description}</Text>

                <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: `${fundedPercentage}%` }]} />
                    </View>
                    <Text style={styles.progressText}>
                        {fundedPercentage.toFixed(0)}% مكتمل
                    </Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{item.expectedReturn}</Text>
                        <Text style={styles.statLabel}>العائد المتوقع</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{item.duration}</Text>
                        <Text style={styles.statLabel}>المدة</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{item.minimumInvestment} ر.س</Text>
                        <Text style={styles.statLabel}>الحد الأدنى</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.investButton}>
                    <Text style={styles.investButtonText}>استثمر الآن</Text>
                    <MaterialIcons name="arrow-back" size={20} color="#ffffff" />
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };

    // Render content based on active tab
    const renderContent = () => {
        switch (activeTab) {
            case "investments":
                return (
                    <View style={styles.container}>
                        {/* Welcome Header */}
                        <View style={styles.welcomeHeader}>
                            <View style={styles.welcomeContent}>
                                <View style={styles.welcomeRow}>
                                    <TouchableOpacity style={styles.notificationIcon}>
                                        <MaterialIcons name="notifications-none" size={20} color="#6b7280" />
                                        <View style={styles.notificationDot} />
                                    </TouchableOpacity>
                                    <Text style={styles.welcomeText}>{getWelcomeMessage()}</Text>
                                </View>
                                <Text style={styles.userName}>عبدالكريم الشهري</Text>
                            </View>
                        </View>

                        {/* Content Area */}
                        <View style={styles.content}>
                            <Text style={styles.contentText}>تابع استثماراتك الحالية</Text>
                        </View>
                    </View>
                );

            case "opportunities":
                return (
                    <View style={styles.container}>
                        {/* Header */}
                        <View style={styles.header}>
                            <TouchableOpacity style={styles.searchButton}>
                                <MaterialIcons name="search" size={24} color="#001a6e" />
                            </TouchableOpacity>
                            <Text style={styles.headerTitle}>الفرص الاستثمارية</Text>
                            <View style={styles.placeholder} />
                        </View>

                        {/* Filters */}
                        <ScrollView 
                            horizontal 
                            showsHorizontalScrollIndicator={false} 
                            style={styles.filtersContainer}
                            contentContainerStyle={styles.filtersContent}
                        >
                            {filters.map((filter) => (
                                <TouchableOpacity
                                    key={filter}
                                    style={[
                                        styles.filterButton,
                                        selectedFilter === filter && styles.activeFilterButton
                                    ]}
                                    onPress={() => setSelectedFilter(filter)}
                                >
                                    <Text style={[
                                        styles.filterText,
                                        selectedFilter === filter && styles.activeFilterText
                                    ]}>
                                        {filter}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        {/* Stats Overview */}
                        <View style={styles.statsOverview}>
                            <View style={styles.overviewItem}>
                                <Text style={styles.overviewValue}>{filteredOpportunities.length}</Text>
                                <Text style={styles.overviewLabel}>فرصة متاحة</Text>
                            </View>
                            <View style={styles.overviewSeparator} />
                            <View style={styles.overviewItem}>
                                <Text style={styles.overviewValue}>
                                    {(filteredOpportunities.reduce((sum, opp) => sum + opp.target, 0) / 1000000).toFixed(1)}م
                                </Text>
                                <Text style={styles.overviewLabel}>إجمالي الاستثمارات</Text>
                            </View>
                        </View>

                        {/* Opportunities List */}
                        <FlatList
                            data={filteredOpportunities}
                            renderItem={renderOpportunity}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.opportunitiesList}
                        />
                    </View>
                );

            case "profile":
                return (
                    <View style={styles.container}>
                        {/* Header */}
                        <View style={styles.header}>
                            <View style={styles.placeholder} />
                            <Text style={styles.headerTitle}>حسابي الشخصي</Text>
                            <View style={styles.placeholder} />
                        </View>

                        <ScrollView style={styles.profileContent} showsVerticalScrollIndicator={false}>
                            {/* Profile Info Card */}
                            <View style={styles.profileCard}>
                                <View style={styles.avatarContainer}>
                                    <MaterialIcons name="person" size={40} color="#ffffff" />
                                </View>
                                <View style={styles.profileInfo}>
                                    <Text style={styles.userNameProfile}>عبدالكريم الشهري</Text>
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

            default:
                return null;
        }
    };

    return (
        <View style={styles.mainContainer}>
            {/* Content */}
            {renderContent()}

            {/* Bottom Navigation */}
            <View style={styles.bottomNavigation}>
                {/* Opportunities Tab */}
                <TouchableOpacity 
                    style={styles.navItem}
                    onPress={() => handleTabChange("opportunities")}
                    activeOpacity={0.7}
                >
                    <View style={[
                        styles.iconContainer,
                        activeTab === "opportunities" && styles.activeIconContainer
                    ]}>
                        <MaterialIcons 
                            name="business" 
                            size={24} 
                            color={activeTab === "opportunities" ? "#ffffff" : "#6b7280"} 
                        />
                    </View>
                    <Text style={[
                        styles.navText, 
                        activeTab === "opportunities" && styles.activeNavText
                    ]}>
                        الفرص
                    </Text>
                </TouchableOpacity>

                {/* Investments Tab */}
                <TouchableOpacity 
                    style={styles.navItem}
                    onPress={() => handleTabChange("investments")}
                    activeOpacity={0.7}
                >
                    <View style={[
                        styles.iconContainer,
                        activeTab === "investments" && styles.activeIconContainer
                    ]}>
                        <MaterialIcons 
                            name="trending-up" 
                            size={24} 
                            color={activeTab === "investments" ? "#ffffff" : "#6b7280"} 
                        />
                    </View>
                    <Text style={[
                        styles.navText, 
                        activeTab === "investments" && styles.activeNavText
                    ]}>
                        استثماراتي
                    </Text>
                </TouchableOpacity>

                {/* Profile Tab */}
                <TouchableOpacity 
                    style={styles.navItem}
                    onPress={() => handleTabChange("profile")}
                    activeOpacity={0.7}
                >
                    <View style={[
                        styles.iconContainer,
                        activeTab === "profile" && styles.activeIconContainer
                    ]}>
                        <MaterialIcons 
                            name="person" 
                            size={24} 
                            color={activeTab === "profile" ? "#ffffff" : "#6b7280"} 
                        />
                    </View>
                    <Text style={[
                        styles.navText, 
                        activeTab === "profile" && styles.activeNavText
                    ]}>
                        حسابي الشخصي
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#f8fafc",
    },
    container: {
        flex: 1,
        backgroundColor: "#f8fafc",
    },
    welcomeHeader: {
        backgroundColor: "#ffffff",
        paddingTop: 25,
        paddingBottom: 40,
        paddingHorizontal: 24,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
    },
    welcomeContent: {
        alignItems: "flex-end",
    },
    welcomeRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 8,
    },
    notificationIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#f8fafc",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    notificationDot: {
        position: "absolute",
        top: 6,
        right: 6,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#ff4757",
    },
    welcomeText: {
        fontSize: 20,
        fontFamily: "Almarai-Regular",
        color: "#6b7280",
        textAlign: "right",
        lineHeight: 25,
    },
    userName: {
        fontSize: 30,
        fontFamily: "Almarai-Bold",
        color: "#001a6e",
        textAlign: "right",
        lineHeight: 50,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 32,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 100, // Add padding to avoid bottom navigation
    },
    contentText: {
        fontSize: 18,
        fontFamily: "Almarai-Medium",
        color: "#374151",
        textAlign: "center",
    },
    // Header styles for opportunities and profile
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
    headerTitle: {
        fontSize: 20,
        fontFamily: "Almarai-Bold",
        color: "#001a6e",
        textAlign: "center",
    },
    searchButton: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        backgroundColor: "#f8fafc",
    },
    placeholder: {
        width: 40,
    },
    // Opportunities styles
    filtersContainer: {
        backgroundColor: "#ffffff",
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#f1f5f9",
    },
    filtersContent: {
        paddingHorizontal: 24,
        gap: 12,
    },
    filterButton: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: "#f8fafc",
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    activeFilterButton: {
        backgroundColor: "#01a736",
        borderColor: "#01a736",
    },
    filterText: {
        fontSize: 14,
        fontFamily: "Almarai-Medium",
        color: "#6b7280",
        textAlign: "center",
    },
    activeFilterText: {
        color: "#ffffff",
    },
    statsOverview: {
        backgroundColor: "#ffffff",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 20,
        marginHorizontal: 24,
        marginTop: 16,
        borderRadius: 16,
        elevation: 2,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    overviewItem: {
        alignItems: "center",
        flex: 1,
    },
    overviewValue: {
        fontSize: 24,
        fontFamily: "Almarai-Bold",
        color: "#01a736",
        marginBottom: 4,
    },
    overviewLabel: {
        fontSize: 14,
        fontFamily: "Almarai-Regular",
        color: "#6b7280",
    },
    overviewSeparator: {
        width: 1,
        height: 40,
        backgroundColor: "#e2e8f0",
    },
    opportunitiesList: {
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 100,
    },
    opportunityCard: {
        backgroundColor: "#ffffff",
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        elevation: 2,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    categoryBadge: {
        backgroundColor: "#f0fdf4",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    categoryText: {
        fontSize: 12,
        fontFamily: "Almarai-Medium",
        color: "#01a736",
    },
    riskBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    riskText: {
        fontSize: 12,
        fontFamily: "Almarai-Medium",
        color: "#ffffff",
    },
    opportunityTitle: {
        fontSize: 18,
        fontFamily: "Almarai-Bold",
        color: "#001a6e",
        marginBottom: 8,
        textAlign: "right",
    },
    opportunityDescription: {
        fontSize: 14,
        fontFamily: "Almarai-Regular",
        color: "#6b7280",
        marginBottom: 16,
        textAlign: "right",
        lineHeight: 20,
    },
    progressContainer: {
        marginBottom: 16,
    },
    progressBar: {
        height: 8,
        backgroundColor: "#f1f5f9",
        borderRadius: 4,
        marginBottom: 8,
    },
    progressFill: {
        height: "100%",
        backgroundColor: "#01a736",
        borderRadius: 4,
    },
    progressText: {
        fontSize: 12,
        fontFamily: "Almarai-Medium",
        color: "#01a736",
        textAlign: "right",
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: "#f1f5f9",
    },
    statItem: {
        alignItems: "center",
        flex: 1,
    },
    statValue: {
        fontSize: 16,
        fontFamily: "Almarai-Bold",
        color: "#001a6e",
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        fontFamily: "Almarai-Regular",
        color: "#6b7280",
        textAlign: "center",
    },
    investButton: {
        backgroundColor: "#01a736",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        borderRadius: 12,
        gap: 8,
    },
    investButtonText: {
        fontSize: 16,
        fontFamily: "Almarai-Medium",
        color: "#ffffff",
    },
    // Profile styles
    profileContent: {
        flex: 1,
        paddingHorizontal: 24,
        paddingBottom: 100,
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
    userNameProfile: {
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
    // Bottom Navigation
    bottomNavigation: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#ffffff",
        borderTopWidth: 1,
        borderTopColor: "#f1f5f9",
        flexDirection: "row",
        paddingTop: 12,
        paddingBottom: 32,
        paddingHorizontal: 24,
        elevation: 20,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: -8 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        alignItems: "center",
        justifyContent: "space-around",
    },
    navItem: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 8,
        paddingHorizontal: 20,
        flex: 1,
    },
    iconContainer: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 16,
        marginBottom: 6,
        backgroundColor: "#f8fafc",
    },
    activeIconContainer: {
        backgroundColor: "#01a736",
        elevation: 4,
        shadowColor: "#01a736",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    navText: {
        fontSize: 12,
        fontFamily: "Almarai-Medium",
        color: "#6b7280",
        textAlign: "center",
        lineHeight: 16,
    },
    activeNavText: {
        color: "#01a736",
        fontFamily: "Almarai-Medium",
    },
});