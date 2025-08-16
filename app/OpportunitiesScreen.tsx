import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

interface Opportunity {
    id: string;
    name: string;
    description: string;
    location: string;
    category: string;
    communitySupport: number;
    opportunityStatus: "مناسبة" | "تم الاستثمار" ;
    requiredInvestment: number;
    expectedROI: number;
    startDate: string;
    endDate: string;
    businessModel: string;
    riskLevel: "منخفض" | "متوسط" | "عالي" | "مرتفع";
    irr: number;
    npv: number;
    cumulativeProfitRate: number;
    isInvested?: boolean;
    investedAmount?: number;
    investmentDate?: string;
    currentValue?: number;
    actualROI?: number;
    portfolioPercentage?: number;
}

export default function OpportunitiesScreen() {
    const router = useRouter();
    const [selectedFilter, setSelectedFilter] = useState<string>("الكل");
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
    const [isUpgradeModalVisible, setIsUpgradeModalVisible] = useState(false);

    const categoryImages: { [key: string]: any } = {
        "مقاهي ومشروبات": require("../assets/images/coffe.png"),
        "منتجات عسلية": require("../assets/images/honey.png"),
        "مطاعم وأغذية": require("../assets/images/res.png"),
        "زراعة ومنتجات طبيعية": require("../assets/images/farm.png"),
        "حرف يدوية وتراثية": require("../assets/images/handicraft.png"),
        "سياحة وضيافة": require("../assets/images/hospi.png"),
        "صناعات غذائية محلية": require("../assets/images/original.png"),
        "خدمات نقل وتوصيل": require("../assets/images/transport.png"),
    };

    const filters = [
        "الكل", 
        "مقاهي ومشروبات", 
        "منتجات عسلية", 
        "مطاعم وأغذية", 
        "زراعة ومنتجات طبيعية", 
        "حرف يدوية وتراثية", 
        "سياحة وضيافة", 
        "صناعات غذائية محلية", 
        "خدمات نقل وتوصيل",
    ];

    // Invested opportunity
    const investedOpportunity: Opportunity = {
        id: "inv1",
        name: "لمسة تراث",
        description: "ورشة لإنتاج الحرف اليدوية والمنتجات التراثية العسيرية مع التركيز على الحرف النسائية التقليدية والتسويق الإلكتروني",
        location: "رجال ألمع",
        category: "حرف يدوية وتراثية",
        communitySupport: 95,
        opportunityStatus: "تم الاستثمار",
        requiredInvestment: 60000,
        expectedROI: 30,
        startDate: "2024-03-15",
        endDate: "2025-03-15",
        businessModel: "C2C",
        riskLevel: "منخفض",
        irr: 35.2,
        npv: 42000,
        cumulativeProfitRate: 89,
        isInvested: true,
        investedAmount: 30000,
        investmentDate: "2024-03-20",
        currentValue: 36500,
        actualROI: 21.7,
        portfolioPercentage: 100,
    };

    // Available opportunities with suitability scores
    const availableOpportunities: Opportunity[] = [
        {
            id: "1",
            name: "قطرات الجنوب",
            description: "مشروع مقهى متخصص في تقديم القهوة العربية الأصيلة والمشروبات الساخنة والباردة مع توفير بيئة مريحة للعملاء في قلب مدينة أبها",
            location: "أبها",
            category: "مقاهي ومشروبات",
            communitySupport: 85,
            opportunityStatus: "مناسبة",
            requiredInvestment: 150000,
            expectedROI: 18,
            startDate: "2025-03-01",
            endDate: "2028-03-01",
            businessModel: "B2C",
            riskLevel: "متوسط",
            irr: 22.5,
            npv: 45000,
            cumulativeProfitRate: 65,
        },
        {
            id: "2",
            name: "عسل الجبال",
            description: "إنتاج وتسويق العسل الطبيعي من جبال عسير مع التركيز على الجودة العالية والتعبئة العصرية للوصول للأسواق المحلية والإقليمية",
            location: "النماص",
            category: "منتجات عسلية",
            communitySupport: 92,
            opportunityStatus: "مناسبة",
            requiredInvestment: 80000,
            expectedROI: 25,
            startDate: "2025-02-15",
            endDate: "2027-02-15",
            businessModel: "مبيعات مباشرة",
            riskLevel: "منخفض",
            irr: 28.3,
            npv: 65000,
            cumulativeProfitRate: 78,
        },
        {
            id: "3",
            name: "ذوق الجنوب",
            description: "مطعم يقدم الأطباق الشعبية الأصيلة من منطقة عسير مع لمسة عصرية في التقديم والديكور لجذب السياح والسكان المحليين",
            location: "خميس مشيط",
            category: "مطاعم وأغذية",
            communitySupport: 78,
            opportunityStatus: "مناسبة",
            requiredInvestment: 200000,
            expectedROI: 20,
            startDate: "2025-04-01",
            endDate: "2030-04-01",
            businessModel: "B2C",
            riskLevel: "متوسط",
            irr: 24.1,
            npv: 85000,
            cumulativeProfitRate: 72,
        },
        {
            id: "4",
            name: "ثمار طريب",
            description: "زراعة وإنتاج الفواكه والخضروات الطبيعية في منطقة طريب مع التركيز على الزراعة العضوية والتسويق للمتاجر الكبرى",
            location: "طريب",
            category: "زراعة ومنتجات طبيعية",
            communitySupport: 88,
            opportunityStatus: "مناسبة",
            requiredInvestment: 120000,
            expectedROI: 22,
            startDate: "2025-05-01",
            endDate: "2028-05-01",
            businessModel: "B2B",
            riskLevel: "متوسط",
            irr: 26.7,
            npv: 72000,
            cumulativeProfitRate: 81,
        },
        {
            id: "5",
            name: "رحلات الجنوب",
            description: "شركة سياحية متخصصة في تنظيم الرحلات السياحية في منطقة عسير مع التركيز على السياحة البيئية والتراثية",
            location: "تثليث",
            category: "سياحة وضيافة",
            communitySupport: 73,
            opportunityStatus: "مناسبة",
            requiredInvestment: 180000,
            expectedROI: 16,
            startDate: "2025-06-01",
            endDate: "2029-06-01",
            businessModel: "B2C",
            riskLevel: "عالي",
            irr: 19.8,
            npv: 38000,
            cumulativeProfitRate: 58,
        },
        {
            id: "6",
            name: "نقاء الجنوب",
            description: "مصنع لإنتاج المواد الغذائية المحلية والمحفوظات التراثية مع التركيز على التعبئة والتغليف الحديث للتصدير",
            location: "محايل عسير",
            category: "صناعات غذائية محلية",
            communitySupport: 81,
            opportunityStatus: "مناسبة",
            requiredInvestment: 250000,
            expectedROI: 24,
            startDate: "2024-12-01",
            endDate: "2027-12-01",
            businessModel: "B2B",
            riskLevel: "متوسط",
            irr: 27.9,
            npv: 95000,
            cumulativeProfitRate: 76,
        },
        {
            id: "7",
            name: "أجرة النماص",
            description: "خدمة نقل وتوصيل محلية في النماص والمناطق المجاورة مع التركيز على النقل السياحي وتوصيل البضائع للمتاجر",
            location: "النماص",
            category: "خدمات نقل وتوصيل",
            communitySupport: 69,
            opportunityStatus: "مناسبة",
            requiredInvestment: 90000,
            expectedROI: 15,
            startDate: "2025-02-01",
            endDate: "2027-02-01",
            businessModel: "مبيعات مباشرة",
            riskLevel: "متوسط",
            irr: 18.5,
            npv: 28000,
            cumulativeProfitRate: 52,
        }
    ];

    const filteredAvailableOpportunities = selectedFilter === "الكل" 
        ? availableOpportunities 
        : availableOpportunities.filter(opp => opp.category === selectedFilter);



    const getStatusColor = (status: string) => {
        switch (status) {
            case "مناسبة": return "#3b82f6"; // Blue for suitable
            case "تم الاستثمار": return "#16a34a"; // Green for invested
            case "مكتملة": return "#64748b";
            case "قريباً": return "#f59e0b";
            case "مغلقة": return "#dc2626";
            default: return "#64748b";
        }
    };

    const getRiskColor = (riskLevel: string) => {
        switch (riskLevel) {
            case "منخفض": return "#16a34a";
            case "متوسط": return "#f59e0b";
            case "عالي": 
            case "مرتفع": return "#dc2626";
            default: return "#64748b";
        }
    };

    const getSuitabilityColor = (score: number) => {
        if (score >= 80) return "#16a34a"; // Green - Highly suitable
        if (score >= 60) return "#f59e0b"; // Orange - Moderately suitable
        return "#64748b"; // Gray - Less suitable
    };

    const getSuitabilityText = (score: number) => {
        if (score >= 80) return "مناسب جداً";
        if (score >= 60) return "مناسب";
        return "أقل مناسبة";
    };

    const getCategoryImage = (category: string) => {
        return categoryImages[category];
    };

    const formatCurrency = (amount: number) => {
        return (amount / 1000).toFixed(0) + " ألف ر.س";
    };

    const handleOpportunityPress = (opportunity: Opportunity) => {
        router.push({
            pathname: '/OpportunityDetailsScreen',
            params: { opportunityData: JSON.stringify(opportunity) }
        });
    };

    const renderInvestedOpportunity = (item: Opportunity) => {
        return (
            <TouchableOpacity 
                style={styles.opportunityCard}
                onPress={() => handleOpportunityPress(item)}
                activeOpacity={0.8}
            >
                <View style={styles.imageContainer}>
                    <Image 
                        source={getCategoryImage(item.category)}
                        style={styles.categoryImage}
                        resizeMode="cover"
                    />
                    <View style={styles.imageOverlay}>
                        <View style={styles.cardHeader}>
                            <View style={styles.investedBadge}>
                                <MaterialIcons name="account-balance-wallet" size={16} color="#ffffff" />
                                <Text style={styles.investedBadgeText}>تم الاستثمار</Text>
                            </View>
                        </View>
                        
                        <View style={styles.titleSection}>
                            <Text style={styles.opportunityTitle}>{item.name}</Text>
                            <View style={styles.locationContainer}>
                                <MaterialIcons name="place" size={14} color="#ffffff" />
                                <Text style={styles.locationText}>{item.location}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.cardContent}>
                    <View style={styles.metricsContainer}>
                        <View style={styles.primaryMetric}>
                            <Text style={styles.primaryMetricValue}>{item.expectedROI}%</Text>
                            <Text style={styles.primaryMetricLabel}>العائد المتوقع</Text>
                        </View>
                        
                        <View style={styles.secondaryMetrics}>
                            <View style={styles.metricItem}>
                                <Text style={styles.metricValue}>{item.communitySupport}%</Text>
                                <Text style={styles.metricLabel}>دعم المجتمع</Text>
                            </View>
                            <View style={styles.metricItem}>
                                <Text style={[styles.metricValue, { color: getRiskColor(item.riskLevel) }]}>
                                    {item.riskLevel}
                                </Text>
                                <Text style={styles.metricLabel}>المخاطر</Text>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity 
                        style={styles.actionButton}
                        onPress={() => handleOpportunityPress(item)}
                    >
                        <Text style={styles.actionButtonText}>عرض تفاصيل الاستثمار</Text>
                        <MaterialIcons name="trending-up" size={18} color="#ffffff" />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    };

    const renderAvailableOpportunity = ({ item }: { item: Opportunity }) => {
        return (
            <TouchableOpacity 
                style={styles.opportunityCard}
                onPress={() => handleOpportunityPress(item)}
                activeOpacity={0.8}
            >
                <View style={styles.imageContainer}>
                    <Image 
                        source={getCategoryImage(item.category)}
                        style={styles.categoryImage}
                        resizeMode="cover"
                    />
                    <View style={styles.imageOverlay}>
                        <View style={styles.cardHeader}>
                            <View style={styles.suitableBadge}>
                                <MaterialIcons name="verified" size={16} color="#ffffff" />
                                <Text style={styles.suitableBadgeText}>مناسبة</Text>
                            </View>
                        </View>
                        
                        <View style={styles.titleSection}>
                            <Text style={styles.opportunityTitle}>{item.name}</Text>
                            <View style={styles.locationContainer}>
                                <MaterialIcons name="place" size={14} color="#ffffff" />
                                <Text style={styles.locationText}>{item.location}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.cardContent}>
                    <View style={styles.metricsContainer}>
                        <View style={styles.primaryMetric}>
                            <Text style={styles.primaryMetricValue}>{item.expectedROI}%</Text>
                            <Text style={styles.primaryMetricLabel}>العائد المتوقع</Text>
                        </View>
                        
                        <View style={styles.secondaryMetrics}>
                            <View style={styles.metricItem}>
                                <Text style={styles.metricValue}>{item.communitySupport}%</Text>
                                <Text style={styles.metricLabel}>دعم المجتمع</Text>
                            </View>
                            <View style={styles.metricItem}>
                                <Text style={[styles.metricValue, { color: getRiskColor(item.riskLevel) }]}>
                                    {item.riskLevel}
                                </Text>
                                <Text style={styles.metricLabel}>المخاطر</Text>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity 
                        style={styles.actionButton}
                        onPress={() => handleOpportunityPress(item)}
                    >
                        <Text style={styles.actionButtonText}>عرض التفاصيل</Text>
                        <MaterialIcons name="arrow-back" size={18} color="#ffffff" />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <View style={styles.header}>
                    <View style={styles.leftIcons}>
                        <TouchableOpacity 
                            style={styles.filterButton}
                            onPress={() => setIsFilterModalVisible(true)}
                        >
                            <MaterialIcons name="filter-list" size={24} color="#1e293b" />
                        </TouchableOpacity>
                        
                      
                    </View>
                    
                    <View style={styles.headerRight}>
                        <Text style={styles.headerTitle}>الفرص الاستثمارية</Text>
                    </View>
                </View>
            </View>

            {/* Filter Modal */}
            <Modal
                visible={isFilterModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsFilterModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>فلترة حسب الفئة</Text>
                            <TouchableOpacity 
                                onPress={() => setIsFilterModalVisible(false)}
                                style={styles.closeButton}
                            >
                                <MaterialIcons name="close" size={24} color="#64748b" />
                            </TouchableOpacity>
                        </View>
                        
                        <ScrollView style={styles.categoriesList}>
                            {filters.map((filter, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.categoryItem,
                                        selectedFilter === filter && styles.selectedCategoryItem
                                    ]}
                                    onPress={() => {
                                        setSelectedFilter(filter);
                                        setIsFilterModalVisible(false);
                                    }}
                                >
                                    <Text style={[
                                        styles.categoryText,
                                        selectedFilter === filter && styles.selectedCategoryText
                                    ]}>
                                        {filter}
                                    </Text>
                                    {selectedFilter === filter && (
                                        <MaterialIcons name="check" size={20} color="#16a34a" />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            {/* Current Filter Display */}
            {selectedFilter !== "الكل" && (
                <View style={styles.currentFilterContainer}>
                    <View style={styles.currentFilter}>
                        <Text style={styles.currentFilterText}>{selectedFilter}</Text>
                        <TouchableOpacity 
                            onPress={() => setSelectedFilter("الكل")}
                            style={styles.clearFilterButton}
                        >
                            <MaterialIcons name="close" size={16} color="#64748b" />
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* Main Content */}
            <ScrollView 
                style={styles.mainScrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.mainContent}
            >
                {/* My Investments Section */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>استثماراتي</Text>
                        <View style={styles.sectionBadge}>
                            <Text style={styles.sectionBadgeText}>1</Text>
                        </View>
                    </View>
                    
                    {renderInvestedOpportunity(investedOpportunity)}
                </View>

                {/* Available Opportunities Section */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>الفرص المتاحة</Text>
                        <View style={[styles.sectionBadge, { backgroundColor: "#dbeafe", borderColor: "#3b82f6" }]}>
                            <Text style={[styles.sectionBadgeText, { color: "#3b82f6" }]}>
                                {filteredAvailableOpportunities.length}
                            </Text>
                        </View>
                    </View>
                    
                    {filteredAvailableOpportunities.map((opportunity, index) => (
                        <View key={opportunity.id} style={{ marginBottom: index === filteredAvailableOpportunities.length - 1 ? 0 : 16 }}>
                            {renderAvailableOpportunity({ item: opportunity })}
                        </View>
                    ))}
                    
                    {filteredAvailableOpportunities.length === 0 && (
                        <View style={styles.emptyState}>
                            <MaterialIcons name="search" size={64} color="#cbd5e1" />
                            <Text style={styles.emptyStateTitle}>لا توجد فرص متاحة</Text>
                            <Text style={styles.emptyStateDescription}>
                                جرب تغيير الفلتر أو تحقق لاحقاً من الفرص الجديدة
                            </Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8fafc",
    },
    headerContainer: {
        backgroundColor: "#ffffff",
        paddingTop: 50,
        paddingBottom: 20,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 24,
    },
    leftIcons: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    headerRight: {
        flex: 1,
        alignItems: "flex-end",
    },
    headerTitle: {
        fontSize: 22,
        fontFamily: "Almarai-Bold",
        color: "#1e293b",
        textAlign: "right",
        lineHeight: 30
    },
    filterButton: {
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 22,
        backgroundColor: "#f1f5f9",
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    upgradeButton: {
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 22,
        backgroundColor: "#fef3c7",
        borderWidth: 1,
        borderColor: "#f59e0b",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "flex-end",
    },
    modalContent: {
        backgroundColor: "#ffffff",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingTop: 20,
        paddingBottom: 40,
        maxHeight: "70%",
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 24,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#e2e8f0",
    },
    modalTitle: {
        fontSize: 18,
        fontFamily: "Almarai-Bold",
        color: "#1e293b",
        textAlign: "center"
    },
    closeButton: {
        width: 32,
        height: 32,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 16,
        backgroundColor: "#f8fafc",
    },
    categoriesList: {
        paddingHorizontal: 24,
        paddingTop: 16,
    },
    categoryItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginBottom: 8,
        backgroundColor: "#f8fafc",
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    selectedCategoryItem: {
        backgroundColor: "#f0fdf4",
        borderColor: "#16a34a",
    },
    categoryText: {
        fontSize: 16,
        fontFamily: "Almarai-Medium",
        color: "#1e293b",
        textAlign: "right",
        flex: 1,
    },
    selectedCategoryText: {
        color: "#16a34a",
        fontFamily: "Almarai-Bold",
    },
    currentFilterContainer: {
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    currentFilter: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f0fdf4",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        alignSelf: "flex-start",
        borderWidth: 1,
        borderColor: "#16a34a",
    },
    currentFilterText: {
        fontSize: 14,
        fontFamily: "Almarai-Medium",
        color: "#16a34a",
        marginRight: 8,
    },
    clearFilterButton: {
        padding: 2,
    },
    mainScrollView: {
        flex: 1,
    },
    mainContent: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        paddingBottom: 100,
    },
    sectionContainer: {
        marginBottom: 32,
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        paddingHorizontal: 4,
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: "Almarai-Bold",
        color: "#1e293b",
        marginRight: 8,
        flex: 1,
        textAlign: "right",
        lineHeight: 30
    },
    sectionBadge: {
        backgroundColor: "#f0fdf4",
        borderWidth: 1,
        borderColor: "#16a34a",
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
        minWidth: 28,
        alignItems: "center",
    },
    sectionBadgeText: {
        fontSize: 12,
        fontFamily: "Almarai-Bold",
        color: "#16a34a",
    },
    opportunityCard: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 6,
        marginBottom: 16,
    },
    imageContainer: {
        position: "relative",
        height: 220,
        width: "100%",
    },
    categoryImage: {
        width: "100%",
        height: "100%",
    },
    imageOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        justifyContent: "space-between",
        padding: 16,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 8,
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 12,
        fontFamily: "Almarai-Bold",
        color: "#ffffff",
    },
    // Enhanced invested badge style
    investedBadge: {
        backgroundColor: "rgba(22, 163, 74, 0.95)", // Semi-transparent green
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        shadowColor: "#16a34a",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.3)",
    },
    investedBadgeText: {
        fontSize: 13,
        fontFamily: "Almarai-Bold",
        color: "#ffffff",
        letterSpacing: 0.3,
    },
    // Enhanced suitable badge style
    suitableBadge: {
        backgroundColor: "rgba(59, 130, 246, 0.95)", // Semi-transparent blue
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        shadowColor: "#3b82f6",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.3)",
    },
    suitableBadgeText: {
        fontSize: 13,
        fontFamily: "Almarai-Bold",
        color: "#ffffff",
        letterSpacing: 0.3,
    },
    titleSection: {
        alignItems: "flex-end",
    },
    opportunityTitle: {
        fontSize: 20,
        fontFamily: "Almarai-Bold",
        color: "#ffffff",
        textAlign: "right",
        marginBottom: 8,
        lineHeight: 25
    },
    locationContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    locationText: {
        fontSize: 14,
        fontFamily: "Almarai-Medium",
        color: "#ffffff",
    },
    cardContent: {
        padding: 16,
    },
    investmentSummary: {
        backgroundColor: "#f0fdf4",
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#bbf7d0",
    },
    investmentRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    investmentLabel: {
        fontSize: 14,
        fontFamily: "Almarai-Medium",
        color: "#15803d",
        textAlign: "right",
        flex: 1,
    },
    investmentValue: {
        fontSize: 16,
        fontFamily: "Almarai-Bold",
        color: "#1e293b",
    },
    metricsContainer: {
        flexDirection: "row",
        marginBottom: 16,
        gap: 12,
    },
    primaryMetric: {
        backgroundColor: "#f0fdf4",
        padding: 12,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        borderWidth: 1,
        borderColor: "#bbf7d0",
    },
    primaryMetricValue: {
        fontSize: 24,
        fontFamily: "Almarai-Bold",
        color: "#16a34a",
        marginBottom: 4,
    },
    primaryMetricLabel: {
        fontSize: 12,
        fontFamily: "Almarai-Medium",
        color: "#15803d",
        textAlign: "center",
    },
    secondaryMetrics: {
        flex: 1,
        gap: 8,
    },
    metricItem: {
        backgroundColor: "#f8fafc",
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    metricValue: {
        fontSize: 16,
        fontFamily: "Almarai-Bold",
        color: "#1e293b",
        marginBottom: 2,
    },
    metricLabel: {
        fontSize: 10,
        fontFamily: "Almarai-Regular",
        color: "#64748b",
        textAlign: "center",
        lineHeight: 20
    },
    actionButton: {
        backgroundColor: "#16a34a",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 14,
        borderRadius: 12,
        gap: 8,
    },
    actionButtonText: {
        fontSize: 16,
        fontFamily: "Almarai-Bold",
        color: "#ffffff",
        lineHeight: 20
    },
    emptyState: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    emptyStateTitle: {
        fontSize: 18,
        fontFamily: "Almarai-Bold",
        color: "#64748b",
        textAlign: "center",
        marginTop: 16,
        marginBottom: 8,
    },
    emptyStateDescription: {
        fontSize: 14,
        fontFamily: "Almarai-Regular",
        color: "#94a3b8",
        textAlign: "center",
        lineHeight: 20,
    },
});