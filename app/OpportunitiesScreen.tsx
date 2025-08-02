import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    FlatList,
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
    communitySupport: number; // percentage
    opportunityStatus: "متاحة" | "مكتملة" | "قريباً" | "مغلقة";
    requiredInvestment: number; // in SAR
    expectedROI: number; // percentage
    startDate: string;
    endDate: string;
    businessModel: string;
    riskLevel: "منخفض" | "متوسط" | "عالي" | "مرتفع";
    irr: number; // Internal Rate of Return percentage
    npv: number; // Net Present Value in SAR
    cumulativeProfitRate: number; // percentage
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

    const opportunities: Opportunity[] = [
        {
            id: "1",
            name: "قطرات الجنوب",
            description: "مشروع مقهى متخصص في تقديم القهوة العربية الأصيلة والمشروبات الساخنة والباردة مع توفير بيئة مريحة للعملاء في قلب مدينة أبها",
            location: "أبها",
            category: "مقاهي ومشروبات",
            communitySupport: 85,
            opportunityStatus: "متاحة",
            requiredInvestment: 150000,
            expectedROI: 18,
            startDate: "2025-03-01",
            endDate: "2028-03-01",
            businessModel: "B2C",
            riskLevel: "متوسط",
            irr: 22.5,
            npv: 45000,
            cumulativeProfitRate: 65
        },
        {
            id: "2",
            name: "عسل الجبال",
            description: "إنتاج وتسويق العسل الطبيعي من جبال عسير مع التركيز على الجودة العالية والتعبئة العصرية للوصول للأسواق المحلية والإقليمية",
            location: "النماص",
            category: "منتجات عسلية",
            communitySupport: 92,
            opportunityStatus: "متاحة",
            requiredInvestment: 80000,
            expectedROI: 25,
            startDate: "2025-02-15",
            endDate: "2027-02-15",
            businessModel: "مبيعات مباشرة",
            riskLevel: "منخفض",
            irr: 28.3,
            npv: 65000,
            cumulativeProfitRate: 78
        },
        {
            id: "3",
            name: "ذوق الجنوب",
            description: "مطعم يقدم الأطباق الشعبية الأصيلة من منطقة عسير مع لمسة عصرية في التقديم والديكور لجذب السياح والسكان المحليين",
            location: "خميس مشيط",
            category: "مطاعم وأغذية",
            communitySupport: 78,
            opportunityStatus: "متاحة",
            requiredInvestment: 200000,
            expectedROI: 20,
            startDate: "2025-04-01",
            endDate: "2030-04-01",
            businessModel: "B2C",
            riskLevel: "متوسط",
            irr: 24.1,
            npv: 85000,
            cumulativeProfitRate: 72
        },
        {
            id: "4",
            name: "ثمار طريب",
            description: "زراعة وإنتاج الفواكه والخضروات الطبيعية في منطقة طريب مع التركيز على الزراعة العضوية والتسويق للمتاجر الكبرى",
            location: "طريب",
            category: "زراعة ومنتجات طبيعية",
            communitySupport: 88,
            opportunityStatus: "قريباً",
            requiredInvestment: 120000,
            expectedROI: 22,
            startDate: "2025-05-01",
            endDate: "2028-05-01",
            businessModel: "B2B",
            riskLevel: "متوسط",
            irr: 26.7,
            npv: 72000,
            cumulativeProfitRate: 81
        },
        {
            id: "5",
            name: "لمسة تراث",
            description: "ورشة لإنتاج الحرف اليدوية والمنتجات التراثية العسيرية مع التركيز على الحرف النسائية التقليدية والتسويق الإلكتروني",
            location: "رجال ألمع",
            category: "حرف يدوية وتراثية",
            communitySupport: 95,
            opportunityStatus: "متاحة",
            requiredInvestment: 60000,
            expectedROI: 30,
            startDate: "2025-03-15",
            endDate: "2026-03-15",
            businessModel: "C2C",
            riskLevel: "منخفض",
            irr: 35.2,
            npv: 42000,
            cumulativeProfitRate: 89
        },
        {
            id: "6",
            name: "رحلات الجنوب",
            description: "شركة سياحية متخصصة في تنظيم الرحلات السياحية في منطقة عسير مع التركيز على السياحة البيئية والتراثية",
            location: "تثليث",
            category: "سياحة وضيافة",
            communitySupport: 73,
            opportunityStatus: "متاحة",
            requiredInvestment: 180000,
            expectedROI: 16,
            startDate: "2025-06-01",
            endDate: "2029-06-01",
            businessModel: "B2C",
            riskLevel: "عالي",
            irr: 19.8,
            npv: 38000,
            cumulativeProfitRate: 58
        },
        {
            id: "7",
            name: "نقاء الجنوب",
            description: "مصنع لإنتاج المواد الغذائية المحلية والمحفوظات التراثية مع التركيز على التعبئة والتغليف الحديث للتصدير",
            location: "محايل عسير",
            category: "صناعات غذائية محلية",
            communitySupport: 81,
            opportunityStatus: "مكتملة",
            requiredInvestment: 250000,
            expectedROI: 24,
            startDate: "2024-12-01",
            endDate: "2027-12-01",
            businessModel: "B2B",
            riskLevel: "متوسط",
            irr: 27.9,
            npv: 95000,
            cumulativeProfitRate: 76
        },
        {
            id: "8",
            name: "أجرة النماص",
            description: "خدمة نقل وتوصيل محلية في النماص والمناطق المجاورة مع التركيز على النقل السياحي وتوصيل البضائع للمتاجر",
            location: "النماص",
            category: "خدمات نقل وتوصيل",
            communitySupport: 69,
            opportunityStatus: "متاحة",
            requiredInvestment: 90000,
            expectedROI: 15,
            startDate: "2025-02-01",
            endDate: "2027-02-01",
            businessModel: "مبيعات مباشرة",
            riskLevel: "متوسط",
            irr: 18.5,
            npv: 28000,
            cumulativeProfitRate: 52
        }
    ];

    const filteredOpportunities = selectedFilter === "الكل" 
        ? opportunities 
        : opportunities.filter(opp => opp.category === selectedFilter);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "متاحة": return "#16a34a";
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

    const renderOpportunity = ({ item }: { item: Opportunity }) => {
        return (
            <TouchableOpacity 
                style={styles.opportunityCard}
                onPress={() => handleOpportunityPress(item)}
                activeOpacity={0.8}
            >
                {/* Category Image with enhanced overlay */}
                <View style={styles.imageContainer}>
                    <Image 
                        source={getCategoryImage(item.category)}
                        style={styles.categoryImage}
                        resizeMode="cover"
                    />
                    <View style={styles.imageOverlay}>
                        <View style={styles.cardHeader}>
                            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.opportunityStatus) }]}>
                                <Text style={styles.statusText}>{item.opportunityStatus}</Text>
                            </View>
                        </View>
                        
                        {/* Title at bottom of image */}
                        <View style={styles.titleSection}>
                            <Text style={styles.opportunityTitle}>{item.name}</Text>
                            <View style={styles.locationContainer}>
                                <MaterialIcons name="place" size={14} color="#ffffff" />
                                <Text style={styles.locationText}>{item.location}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Main Content */}
                <View style={styles.cardContent}>
                    {/* Key Metrics Row with improved styling */}
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

                    {/* Action Button */}
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
            {/* Enhanced Header */}
            <View style={styles.headerContainer}>
                <View style={styles.header}>
                    <View style={styles.leftIcons}>
                        <TouchableOpacity 
                            style={styles.filterButton}
                            onPress={() => setIsFilterModalVisible(true)}
                        >
                            <MaterialIcons name="filter-list" size={24} color="#1e293b" />
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={styles.upgradeButton}
                            onPress={() => setIsUpgradeModalVisible(true)}
                        >
                            <MaterialIcons name="star" size={24} color="#f59e0b" />
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

            {/* Upgrade Modal */}
            <Modal
                visible={isUpgradeModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setIsUpgradeModalVisible(false)}
            >
                <View style={styles.upgradeModalOverlay}>
                    <View style={styles.upgradeModalContent}>
                        <View style={styles.upgradeIcon}>
                            <MaterialIcons name="star" size={48} color="#f59e0b" />
                        </View>
                        
                        <Text style={styles.upgradeTitle}>الترقية إلى مستثمر ملاك</Text>
                        <Text style={styles.upgradeDescription}>
                            انضم إلى مجتمع المستثمرين الملائكة واحصل على فرص استثمارية حصرية برؤوس أموال أكبر وعوائد أعلى
                        </Text>
                        
                        <View style={styles.upgradeFeatures}>
                            <View style={styles.featureItem}>
                                <MaterialIcons name="check-circle" size={20} color="#16a34a" />
                                <Text style={styles.featureText}>فرص استثمارية حصرية</Text>
                            </View>
                            <View style={styles.featureItem}>
                                <MaterialIcons name="check-circle" size={20} color="#16a34a" />
                                <Text style={styles.featureText}>رؤوس أموال أكبر</Text>
                            </View>
                            <View style={styles.featureItem}>
                                <MaterialIcons name="check-circle" size={20} color="#16a34a" />
                                <Text style={styles.featureText}>عوائد أعلى متوقعة</Text>
                            </View>
                          
                        </View>
                        
                        <View style={styles.upgradeButtons}>
                            <TouchableOpacity 
                                style={styles.upgradeConfirmButton}
                                onPress={() => {
                                    setIsUpgradeModalVisible(false);
                                    // Handle upgrade logic here
                                    console.log("User confirmed upgrade to angel investor");
                                }}
                            >
                                <Text style={styles.upgradeConfirmText}>نعم، أريد الترقية</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                style={styles.upgradeCancelButton}
                                onPress={() => setIsUpgradeModalVisible(false)}
                            >
                                <Text style={styles.upgradeCancelText}>ليس الآن</Text>
                            </TouchableOpacity>
                        </View>
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

            {/* Category Filters without container */}
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filtersScrollContent}
                style={styles.filtersScrollView}
            >
                {filters.map((filter, index) => (
                    <TouchableOpacity 
                        key={index}
                        style={[
                            styles.filterChip,
                            selectedFilter === filter && styles.activeFilterChip
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8fafc",
    },
    headerContainer: {
        backgroundColor: "#ffffff",
        paddingTop: 50,
        paddingBottom: 0,
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
        paddingBottom: 32,
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
    searchButton: {
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 22,
        backgroundColor: "#f1f5f9",
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    headerSpacer: {
        width: 44,
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
        textAlign:"center"
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
    upgradeModalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    upgradeModalContent: {
        backgroundColor: "#ffffff",
        borderRadius: 24,
        padding: 32,
        alignItems: "center",
        width: "100%",
        maxWidth: 400,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 8,
    },
    upgradeIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#fef3c7",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 24,
    },
    upgradeTitle: {
        fontSize: 24,
        fontFamily: "Almarai-Bold",
        color: "#1e293b",
        textAlign: "center",
        marginBottom: 16,
        lineHeight: 30
    },
    upgradeDescription: {
        fontSize: 16,
        fontFamily: "Almarai-Regular",
        color: "#64748b",
        textAlign: "center",
        lineHeight: 24,
        marginBottom: 24,
    },
    upgradeFeatures: {
        width: "100%",
        marginBottom: 32,
    },
    featureItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    featureText: {
        fontSize: 16,
        fontFamily: "Almarai-Medium",
        color: "#1e293b",
        marginRight: 12,
        textAlign: "right",
        flex: 1,
    },
    upgradeButtons: {
        width: "100%",
        gap: 12,
    },
    upgradeConfirmButton: {
        backgroundColor: "#16a34a",
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: "center",
    },
    upgradeConfirmText: {
        fontSize: 18,
        fontFamily: "Almarai-Bold",
        color: "#ffffff",
    },
    upgradeCancelButton: {
        backgroundColor: "#f8fafc",
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    upgradeCancelText: {
        fontSize: 16,
        fontFamily: "Almarai-Medium",
        color: "#64748b",
    },
    filtersScrollView: {
        display: "none", // Hide the old filter system
    },
    filtersScrollContent: {
        paddingHorizontal: 20,
        gap: 14,
        flexDirection: 'row-reverse',
        
    },
    filterChip: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 25,
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#e2e8f0",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
        minHeight: 48,
        height: 48, // Fixed height
    },
    activeFilterChip: {
        backgroundColor: "#16a34a",
        borderColor: "#16a34a",
        shadowColor: "#16a34a",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    filterContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
    },
    filterText: {
        fontSize: 14,
        fontFamily: "Almarai-Medium",
        color: "#64748b",
        textAlign: "center",
        lineHeight: 20,
        includeFontPadding: false,
        textAlignVertical: "center",
        paddingVertical: 0,
        paddingHorizontal: 4,
    },
    activeFilterText: {
        color: "#ffffff",
        fontFamily: "Almarai-Bold",
        fontSize: 14,
        lineHeight: 20,
        includeFontPadding: false,
        textAlignVertical: "center",
        paddingVertical: 0,
    },
    activeIndicator: {
        position: "absolute",
        bottom: -8,
        left: "50%",
        marginLeft: -3,
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#ffffff",
    },
    opportunitiesList: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        paddingBottom: 100,
        gap: 16,
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
    infoSection: {
        gap: 16,
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 8,
    },
    infoItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#f8fafc",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    infoLabel: {
        fontSize: 15,
        fontFamily: "Almarai-Medium",
        color: "#64748b",
        textAlign: "right",
    },
    infoValue: {
        fontSize: 16,
        fontFamily: "Almarai-Bold",
        color: "#1e293b",
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
});