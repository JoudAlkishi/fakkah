import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
    Dimensions,
    Image,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get('window');

interface Opportunity {
    id: string;
    name: string;
    description: string;
    location: string;
    category: string;
    communitySupport: number;
    opportunityStatus: "مناسبة" | "تم الاستثمار" | "قريباً" | "مغلقة";
    requiredInvestment: number;
    expectedROI: number;
    startDate: string;
    endDate: string;
    businessModel: string;
    riskLevel: "منخفض" | "متوسط" | "عالي" | "مرتفع";
    irr: number;
    npv: number;
    cumulativeProfitRate: number;
}

const RiyalIcon = ({ size = 24 }: { size?: number }) => (
    <Image 
        source={require('@/assets/images/riyal.png')} 
        style={{
            width: size,
            height: size,
            resizeMode: 'contain',
            tintColor: '#01a736', 
        }}
    />
);

export default function OpportunityDetailsScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    
    // Add error handling for JSON parsing
    let opportunity: Opportunity;
    try {
        opportunity = JSON.parse(params.opportunityData as string);
    } catch (error) {
        console.error('Error parsing opportunity data:', error);
        router.back();
        return null;
    }

    // Category images mapping (same as OpportunitiesScreen)
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

    const getCategoryImage = (category: string) => {
        return categoryImages[category];
    };
    
    const getStatusColor = (status: string) => {
        switch (status) {
            case "مناسبة": return "#3b82f6";
            case "تم الاستثمار": return "#16a34a";
            case "قريباً": return "#f59e0b";
            case "مغلقة": return "#ef4444";
            default: return "#6b7280";
        }
    };
    
    const getRiskColor = (riskLevel: string) => {
        switch (riskLevel) {
            case "منخفض": return "#01a736";
            case "متوسط": return "#f59e0b";
            case "عالي": 
            case "مرتفع": return "#ef4444";
            default: return "#6b7280";
        }
    };

    const formatCurrency = (amount: number) => {
        if (amount >= 1000000) {
            return (amount / 1000000).toFixed(1) + " مليون ر.س";
        } else if (amount >= 1000) {
            return (amount / 1000).toFixed(0) + " ألف ر.س";
        }
        return amount.toLocaleString() + " ر.س";
    };

    const calculateDuration = () => {
        try {
            const start = new Date(opportunity.startDate);
            const end = new Date(opportunity.endDate);
            
            if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                return "غير محدد";
            }
            
            const diffTime = Math.abs(end.getTime() - start.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            const years = Math.floor(diffDays / 365);
            const months = Math.floor((diffDays % 365) / 30);
            
            if (years > 0) {
                return `${years} سنة${months > 0 ? ` و ${months} شهر` : ''}`;
            }
            return `${months} شهر`;
        } catch (error) {
            return "غير محدد";
        }
    };

    const handleBackPress = () => {
        try {
            router.back();
        } catch (error) {
            router.push('/opportunities' as any);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar 
                barStyle="light-content" 
                backgroundColor="#001a6e" 
                translucent={false}
            />
            
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={handleBackPress}
                    activeOpacity={0.7}
                >
                    <MaterialIcons name="arrow-back" size={24} color="#001a6e" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>تفاصيل الفرصة</Text>
                <View style={styles.spacer} />
            </View>

            <ScrollView 
                style={styles.scrollView} 
                showsVerticalScrollIndicator={false}
                bounces={true}
            >
                {/* Hero Section with Image */}
                <View style={styles.heroSection}>
                    <View style={styles.imageContainer}>
                        <Image 
                            source={getCategoryImage(opportunity.category)}
                            style={styles.categoryImage}
                            resizeMode="cover"
                        />
                        <View style={styles.imageOverlay}>
                            <View style={styles.statusContainer}>
                                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(opportunity.opportunityStatus) }]}>
                                    <MaterialIcons 
                                        name={opportunity.opportunityStatus === "مناسبة" ? "verified" : opportunity.opportunityStatus === "تم الاستثمار" ? "account-balance-wallet" : "info"} 
                                        size={16} 
                                        color="#ffffff" 
                                    />
                                    <Text style={styles.statusText}>{opportunity.opportunityStatus}</Text>
                                </View>
                            </View>
                            <View style={styles.heroTextContent}>
                                <Text style={styles.heroTitle}>{opportunity.name}</Text>
                                <View style={styles.heroLocationContainer}>
                                    <MaterialIcons name="location-on" size={16} color="rgba(255, 255, 255, 0.8)" />
                                    <Text style={styles.heroSubtitle}>{opportunity.location} • {opportunity.category}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Metrics Section */}
                <View style={styles.metricsSection}>
                    <View style={styles.mainMetrics}>
                        <View style={styles.primaryMetricCard}>
                            <View style={styles.metricIconContainer}>
                                <MaterialIcons name="trending-up" size={24} color="#01a736" />
                            </View>
                            <Text style={styles.primaryMetricValue}>{opportunity.expectedROI}%</Text>
                            <Text style={styles.primaryMetricLabel}>العائد المتوقع</Text>
                        </View>
                    </View>

                    <View style={styles.secondaryMetrics}>
                        <View style={styles.secondaryMetricItem}>
                            <View style={styles.secondaryMetricCard}>
                                <MaterialIcons name="analytics" size={20} color="#01a736" />
                                <Text style={styles.secondaryMetricValue}>{opportunity.irr}%</Text>
                                <Text style={styles.secondaryMetricLabel}>العائد الداخلي</Text>
                            </View>
                        </View>
                        <View style={styles.secondaryMetricItem}>
                            <View style={styles.secondaryMetricCard}>
                                <MaterialIcons name="security" size={20} color={getRiskColor(opportunity.riskLevel)} />
                                <Text style={[styles.secondaryMetricValue, { color: getRiskColor(opportunity.riskLevel) }]}>
                                    {opportunity.riskLevel}
                                </Text>
                                <Text style={styles.secondaryMetricLabel}>المخاطر</Text>
                            </View>
                        </View>
                        <View style={styles.secondaryMetricItem}>
                            <View style={styles.secondaryMetricCard}>
                                <MaterialIcons name="schedule" size={20} color="#01a736" />
                                <Text style={styles.secondaryMetricValue}>{calculateDuration()}</Text>
                                <Text style={styles.secondaryMetricLabel}>المدة</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Content Sections */}
                <View style={styles.tabContent}>
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <MaterialIcons name="description" size={24} color="#01a736" />
                            <Text style={styles.sectionTitle}>نبذة عن المشروع</Text>
                        </View>
                        <Text style={styles.descriptionText}>{opportunity.description}</Text>
                    </View>

                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <MaterialIcons name="info" size={24} color="#01a736" />
                            <Text style={styles.sectionTitle}>معلومات أساسية</Text>
                        </View>
                        <View style={styles.infoGrid}>
                            <View style={styles.infoCard}>
                                <View style={styles.infoIconContainer}>
                                    <MaterialIcons name="location-on" size={20} color="#01a736" />
                                </View>
                                <View style={styles.infoContent}>
                                    <Text style={styles.infoLabel}>الموقع</Text>
                                    <Text style={styles.infoValue}>{opportunity.location}</Text>
                                </View>
                            </View>
                            <View style={styles.infoCard}>
                                <View style={styles.infoIconContainer}>
                                    <MaterialIcons name="category" size={20} color="#01a736" />
                                </View>
                                <View style={styles.infoContent}>
                                    <Text style={styles.infoLabel}>القطاع</Text>
                                    <Text style={styles.infoValue}>{opportunity.category}</Text>
                                </View>
                            </View>
                            <View style={styles.infoCard}>
                                <View style={styles.infoIconContainer}>
                                    <MaterialIcons name="business-center" size={20} color="#01a736" />
                                </View>
                                <View style={styles.infoContent}>
                                    <Text style={styles.infoLabel}>نموذج العمل</Text>
                                    <Text style={styles.infoValue}>{opportunity.businessModel}</Text>
                                </View>
                            </View>
                            <View style={styles.infoCard}>
                                <View style={styles.infoIconContainer}>
                                    <MaterialIcons name="schedule" size={20} color="#01a736" />
                                </View>
                                <View style={styles.infoContent}>
                                    <Text style={styles.infoLabel}>مدة الاستثمار</Text>
                                    <Text style={styles.infoValue}>{calculateDuration()}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Community Support Section */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <MaterialIcons name="people" size={24} color="#01a736" />
                            <Text style={styles.sectionTitle}>دعم المجتمع</Text>
                        </View>
                        <View style={styles.communitySection}>
                            <View style={styles.communityHeader}>
                                <View style={styles.communityPercentageContainer}>
                                    <Text style={styles.communityPercentage}>{opportunity.communitySupport}%</Text>
                                </View>
                                <Text style={styles.communityDescription}>من المجتمع يدعم هذا المشروع</Text>
                            </View>
                            <View style={styles.progressBarContainer}>
                                <View style={styles.progressBar}>
                                    <View style={[styles.progressFill, { width: `${Math.min(opportunity.communitySupport, 100)}%` }]} />
                                </View>
                            </View>
                        </View>
                    </View>
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
    header: {
        backgroundColor: "#ffffff",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: Platform.OS === 'ios' ? 50 : 20,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#f1f5f9",
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 4,
    },
    backButton: {
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 22,
        backgroundColor: "#f8fafc",
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    spacer: {
        width: 44,
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: "Almarai-Bold",
        color: "#001a6e",
        textAlign: "center",
        lineHeight: 28
    },
    scrollView: {
        flex: 1,
    },
    heroSection: {
        position: 'relative',
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 24,
        overflow: 'hidden',
        height: 220,
    },
    imageContainer: {
        position: "relative",
        height: "100%",
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
        padding: 24,
    },
    statusContainer: {
        alignItems: "flex-start",
        zIndex: 1,
    },
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        gap: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.3)",
    },
    statusText: {
        fontSize: 13,
        fontFamily: "Almarai-Bold",
        color: "#ffffff",
    },
    heroTextContent: {
        alignItems: "flex-end",
        zIndex: 1,
    },
    heroTitle: {
        fontSize: 26,
        fontFamily: "Almarai-Bold",
        color: "#ffffff",
        textAlign: "right",
        marginBottom: 8,
        lineHeight: 32,
    },
    heroLocationContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: 4,
    },
    heroSubtitle: {
        fontSize: 15,
        fontFamily: "Almarai-Medium",
        color: "rgba(255, 255, 255, 0.9)",
        textAlign: "right",
    },
    metricsSection: {
        backgroundColor: "#ffffff",
        margin: 16,
        borderRadius: 20,
        padding: 24,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 6,
    },
    mainMetrics: {
        marginBottom: 20,
        alignItems: "center",
    },
    primaryMetricCard: {
        backgroundColor: "#f0fdf4",
        padding: 20,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#bbf7d0",
        width: "100%",
        maxWidth: 180,
    },
    metricIconContainer: {
        backgroundColor: "#dcfce7",
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
    },
    primaryMetricValue: {
        fontSize: 28,
        fontFamily: "Almarai-Bold",
        color: "#01a736",
        marginBottom: 6,
    },
    primaryMetricLabel: {
        fontSize: 13,
        fontFamily: "Almarai-Medium",
        color: "#01a736",
        textAlign: "center",
    },
    secondaryMetrics: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 24,
        borderTopWidth: 1,
        borderTopColor: "#f1f5f9",
        gap: 12,
    },
    secondaryMetricItem: {
        flex: 1,
    },
    secondaryMetricCard: {
        backgroundColor: "#f8fafc",
        borderRadius: 16,
        padding: 16,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    secondaryMetricValue: {
        fontSize: 18,
        fontFamily: "Almarai-Bold",
        color: "#1f2937",
        marginBottom: 4,
        marginTop: 8,
    },
    secondaryMetricLabel: {
        fontSize: 12,
        fontFamily: "Almarai-Medium",
        color: "#6b7280",
        textAlign: "center",
    },
    tabContent: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    section: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        padding: 24,
        marginBottom: 16,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
        elevation: 4,
    },
    sectionHeader: {
        flexDirection: "row-reverse",
        alignItems: "center",
        marginBottom: 20,
        gap: 12,
    },
    sectionTitle: {
        fontSize: 19,
        fontFamily: "Almarai-Bold",
        color: "#001a6e",
        textAlign: "right",
        lineHeight: 30
    },
    descriptionText: {
        fontSize: 16,
        fontFamily: "Almarai-Regular",
        color: "#4b5563",
        textAlign: "right",
        lineHeight: 26,
    },
    infoGrid: {
        gap: 16,
    },
    infoCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f8fafc",
        padding: 18,
        borderRadius: 16,
        gap: 16,
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    infoIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#ecfdf5",
        alignItems: "center",
        justifyContent: "center",
    },
    infoContent: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 13,
        fontFamily: "Almarai-Medium",
        color: "#6b7280",
        textAlign: "right",
        marginBottom: 4,
        lineHeight: 20
    },
    infoValue: {
        fontSize: 15,
        fontFamily: "Almarai-Bold",
        color: "#001a6e",
        textAlign: "right",
        lineHeight: 25
    },
    communitySection: {
        gap: 16,
    },
    communityHeader: {
        flexDirection: "row-reverse", 
        justifyContent: "space-between",
        alignItems: "center",
    },
    communityPercentageContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    communityPercentage: {
        fontSize: 32,
        fontFamily: "Almarai-Bold",
        color: "#01a736",
    },
    communityDescription: {
        fontSize: 15,
        fontFamily: "Almarai-Medium",
        color: "#4b5563",
        flex: 1,
        textAlign: "right",
        marginRight: 12,
    },
    progressBarContainer: {
        gap: 8,
    },
    progressBar: {
        height: 12,
        backgroundColor: "#f1f5f9",
        borderRadius: 6,
        overflow: "hidden",
        flexDirection: "row-reverse",
    },
    progressFill: {
        height: "100%",
        backgroundColor: "#01a736",
        borderRadius: 6,
        alignSelf: "flex-end",
    },
});