import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get('window');

interface Opportunity {
    id: string;
    title: string;
    description: string;
    minimumInvestment: string;
    expectedReturn: string;
    duration: string;
    riskLevel: "منخفض" | "متوسط" | "عالي" | "مرتفع";
    category: string;
    funded: number;
    target: number;
    location: string;
}

export default function OpportunityDetailsScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    
    // Parse the opportunity data from params
    const opportunity: Opportunity = JSON.parse(params.opportunityData as string);
    
    const [activeTab, setActiveTab] = useState<'overview' | 'financials' | 'documents'>('overview');
    
    const fundedPercentage = (opportunity.funded / opportunity.target) * 100;
    
    const getRiskColor = (riskLevel: string) => {
        switch (riskLevel) {
            case "منخفض": return "#01a736";
            case "متوسط": return "#ffa500";
            case "عالي": 
            case "مرتفع": return "#ff4757";
            default: return "#6b7280";
        }
    };

    const formatCurrency = (amount: number) => {
        return (amount / 1000).toFixed(0) + " ألف ر.س";
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <View style={styles.tabContent}>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>نبذة عن المشروع</Text>
                            <Text style={styles.descriptionText}>{opportunity.description}</Text>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>معلومات الاستثمار</Text>
                            <View style={styles.infoGrid}>
                                <View style={styles.infoItem}>
                                    <MaterialIcons name="location-on" size={20} color="#01a736" />
                                    <View style={styles.infoContent}>
                                        <Text style={styles.infoLabel}>الموقع</Text>
                                        <Text style={styles.infoValue}>{opportunity.location}</Text>
                                    </View>
                                </View>
                                <View style={styles.infoItem}>
                                    <MaterialIcons name="category" size={20} color="#01a736" />
                                    <View style={styles.infoContent}>
                                        <Text style={styles.infoLabel}>القطاع</Text>
                                        <Text style={styles.infoValue}>{opportunity.category}</Text>
                                    </View>
                                </View>
                                <View style={styles.infoItem}>
                                    <MaterialIcons name="schedule" size={20} color="#01a736" />
                                    <View style={styles.infoContent}>
                                        <Text style={styles.infoLabel}>مدة الاستثمار</Text>
                                        <Text style={styles.infoValue}>{opportunity.duration}</Text>
                                    </View>
                                </View>
                                <View style={styles.infoItem}>
                                    <MaterialIcons name="security" size={20} color={getRiskColor(opportunity.riskLevel)} />
                                    <View style={styles.infoContent}>
                                        <Text style={styles.infoLabel}>مستوى المخاطر</Text>
                                        <Text style={[styles.infoValue, { color: getRiskColor(opportunity.riskLevel) }]}>
                                            {opportunity.riskLevel}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>المخاطر والفرص</Text>
                            <View style={styles.riskOpportunityContainer}>
                                <View style={styles.riskSection}>
                                    <Text style={styles.riskTitle}>المخاطر</Text>
                                    <Text style={styles.riskText}>• تقلبات السوق المحلي</Text>
                                    <Text style={styles.riskText}>• المنافسة في القطاع</Text>
                                    <Text style={styles.riskText}>• التغيرات التنظيمية</Text>
                                </View>
                                <View style={styles.opportunitySection}>
                                    <Text style={styles.opportunityTitle}>الفرص</Text>
                                    <Text style={styles.opportunityText}>• نمو السوق المحلي</Text>
                                    <Text style={styles.opportunityText}>• دعم الرؤية 2030</Text>
                                    <Text style={styles.opportunityText}>• زيادة الطلب المحلي</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                );
            case 'financials':
                return (
                    <View style={styles.tabContent}>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>التفاصيل المالية</Text>
                            <View style={styles.financialGrid}>
                                <View style={styles.financialCard}>
                                    <Text style={styles.financialValue}>{formatCurrency(opportunity.target)}</Text>
                                    <Text style={styles.financialLabel}>إجمالي التمويل المطلوب</Text>
                                </View>
                                <View style={styles.financialCard}>
                                    <Text style={styles.financialValue}>{formatCurrency(opportunity.funded)}</Text>
                                    <Text style={styles.financialLabel}>المبلغ المجمع حتى الآن</Text>
                                </View>
                                <View style={styles.financialCard}>
                                    <Text style={styles.financialValue}>{opportunity.expectedReturn}</Text>
                                    <Text style={styles.financialLabel}>العائد المتوقع سنوياً</Text>
                                </View>
                                <View style={styles.financialCard}>
                                    <Text style={styles.financialValue}>{opportunity.minimumInvestment} ر.س</Text>
                                    <Text style={styles.financialLabel}>الحد الأدنى للاستثمار</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>التوزيع المالي المتوقع</Text>
                            <View style={styles.distributionContainer}>
                                <View style={styles.distributionItem}>
                                    <View style={[styles.distributionBar, { width: '70%', backgroundColor: '#01a736' }]} />
                                    <Text style={styles.distributionLabel}>التشغيل (70%)</Text>
                                </View>
                                <View style={styles.distributionItem}>
                                    <View style={[styles.distributionBar, { width: '20%', backgroundColor: '#ffa500' }]} />
                                    <Text style={styles.distributionLabel}>التسويق (20%)</Text>
                                </View>
                                <View style={styles.distributionItem}>
                                    <View style={[styles.distributionBar, { width: '10%', backgroundColor: '#6b7280' }]} />
                                    <Text style={styles.distributionLabel}>الإدارة (10%)</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                );
            case 'documents':
                return (
                    <View style={styles.tabContent}>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>الوثائق والمستندات</Text>
                            <View style={styles.documentsList}>
                                <TouchableOpacity style={styles.documentItem}>
                                    <MaterialIcons name="description" size={24} color="#01a736" />
                                    <View style={styles.documentContent}>
                                        <Text style={styles.documentTitle}>خطة العمل</Text>
                                        <Text style={styles.documentSize}>PDF - 2.5 MB</Text>
                                    </View>
                                    <MaterialIcons name="download" size={20} color="#6b7280" />
                                </TouchableOpacity>
                                
                                <TouchableOpacity style={styles.documentItem}>
                                    <MaterialIcons name="assessment" size={24} color="#01a736" />
                                    <View style={styles.documentContent}>
                                        <Text style={styles.documentTitle}>التقرير المالي</Text>
                                        <Text style={styles.documentSize}>PDF - 1.8 MB</Text>
                                    </View>
                                    <MaterialIcons name="download" size={20} color="#6b7280" />
                                </TouchableOpacity>
                                
                                <TouchableOpacity style={styles.documentItem}>
                                    <MaterialIcons name="gavel" size={24} color="#01a736" />
                                    <View style={styles.documentContent}>
                                        <Text style={styles.documentTitle}>الوثائق القانونية</Text>
                                        <Text style={styles.documentSize}>PDF - 3.2 MB</Text>
                                    </View>
                                    <MaterialIcons name="download" size={20} color="#6b7280" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>شهادات ومعايير الجودة</Text>
                            <View style={styles.certificatesList}>
                                <View style={styles.certificateItem}>
                                    <MaterialIcons name="verified" size={20} color="#01a736" />
                                    <Text style={styles.certificateText}>شهادة مطابقة الجودة السعودية</Text>
                                </View>
                                <View style={styles.certificateItem}>
                                    <MaterialIcons name="verified" size={20} color="#01a736" />
                                    <Text style={styles.certificateText}>ترخيص وزارة التجارة</Text>
                                </View>
                                <View style={styles.certificateItem}>
                                    <MaterialIcons name="verified" size={20} color="#01a736" />
                                    <Text style={styles.certificateText}>شهادة ISO 9001</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <MaterialIcons name="arrow-forward" size={24} color="#001a6e" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>تفاصيل الفرصة</Text>
                <TouchableOpacity style={styles.favoriteButton}>
                    <MaterialIcons name="favorite-border" size={24} color="#001a6e" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Hero Section */}
                <View style={styles.heroSection}>
                    <View style={styles.heroBackground}>
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusText}>مطروحة</Text>
                            <MaterialIcons name="refresh" size={12} color="#ffffff" />
                        </View>
                    </View>
                    <View style={styles.heroContent}>
                        <Text style={styles.heroTitle}>{opportunity.title}</Text>
                        <Text style={styles.opportunityLocation}>{opportunity.location} • {opportunity.category}</Text>
                    </View>
                </View>

                {/* Progress and Stats */}
                <View style={styles.progressSection}>
                    <View style={styles.progressContainer}>
                        <View style={styles.progressHeader}>
                            <Text style={styles.progressTitle}>تقدم التمويل</Text>
                            <Text style={styles.progressPercentage}>{fundedPercentage.toFixed(1)}%</Text>
                        </View>
                        <View style={styles.progressBar}>
                            <View style={[styles.progressFill, { width: `${fundedPercentage}%` }]} />
                        </View>
                        <View style={styles.progressLabels}>
                            <Text style={styles.fundedAmount}>{formatCurrency(opportunity.funded)} مجمع</Text>
                            <Text style={styles.targetAmount}>{formatCurrency(opportunity.target)} الهدف</Text>
                        </View>
                    </View>

                    <View style={styles.quickStats}>
                        <View style={styles.quickStatItem}>
                            <Text style={styles.quickStatValue}>{opportunity.expectedReturn}</Text>
                            <Text style={styles.quickStatLabel}>العائد المتوقع</Text>
                        </View>
                        <View style={styles.quickStatItem}>
                            <Text style={styles.quickStatValue}>{opportunity.duration}</Text>
                            <Text style={styles.quickStatLabel}>مدة الاستثمار</Text>
                        </View>
                        <View style={styles.quickStatItem}>
                            <Text style={[styles.quickStatValue, { color: getRiskColor(opportunity.riskLevel) }]}>
                                {opportunity.riskLevel}
                            </Text>
                            <Text style={styles.quickStatLabel}>مستوى المخاطر</Text>
                        </View>
                    </View>
                </View>

                {/* Tabs */}
                <View style={styles.tabsContainer}>
                    <TouchableOpacity 
                        style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
                        onPress={() => setActiveTab('overview')}
                    >
                        <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>
                            نظرة عامة
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.tab, activeTab === 'financials' && styles.activeTab]}
                        onPress={() => setActiveTab('financials')}
                    >
                        <Text style={[styles.tabText, activeTab === 'financials' && styles.activeTabText]}>
                            التفاصيل المالية
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.tab, activeTab === 'documents' && styles.activeTab]}
                        onPress={() => setActiveTab('documents')}
                    >
                        <Text style={[styles.tabText, activeTab === 'documents' && styles.activeTabText]}>
                            الوثائق
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Tab Content */}
                {renderTabContent()}
            </ScrollView>

            {/* Investment Actions */}
            <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.shareButton}>
                    <MaterialIcons name="share" size={20} color="#001a6e" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.investButton}>
                    <Text style={styles.investButtonText}>استثمر الآن</Text>
                    <Text style={styles.investButtonSubtext}>من {opportunity.minimumInvestment} ر.س</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f7fa",
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
        fontSize: 18,
        fontFamily: "Almarai-Bold",
        color: "#001a6e",
    },
    favoriteButton: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        backgroundColor: "#f8fafc",
    },
    scrollView: {
        flex: 1,
    },
    heroSection: {
        height: 200,
        position: "relative",
    },
    heroBackground: {
        flex: 1,
        backgroundColor: "#667eea",
        padding: 20,
    },
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 4,
        alignSelf: "flex-start",
    },
    statusText: {
        fontSize: 12,
        fontFamily: "Almarai-Medium",
        color: "#ffffff",
    },
    heroContent: {
        position: "absolute",
        bottom: 20,
        right: 20,
        left: 20,
    },
    heroTitle: {
        fontSize: 24,
        fontFamily: "Almarai-Bold",
        color: "#ffffff",
        textAlign: "right",
        marginBottom: 8,
    },
    opportunityLocation: {
        fontSize: 16,
        fontFamily: "Almarai-Regular",
        color: "rgba(255, 255, 255, 0.9)",
        textAlign: "right",
    },
    progressSection: {
        backgroundColor: "#ffffff",
        margin: 20,
        borderRadius: 16,
        padding: 20,
        elevation: 2,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    progressContainer: {
        marginBottom: 20,
    },
    progressHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    progressTitle: {
        fontSize: 16,
        fontFamily: "Almarai-Bold",
        color: "#1a202c",
    },
    progressPercentage: {
        fontSize: 18,
        fontFamily: "Almarai-Bold",
        color: "#01a736",
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
    progressLabels: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    fundedAmount: {
        fontSize: 14,
        fontFamily: "Almarai-Medium",
        color: "#01a736",
    },
    targetAmount: {
        fontSize: 14,
        fontFamily: "Almarai-Medium",
        color: "#6b7280",
    },
    quickStats: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: "#f1f5f9",
    },
    quickStatItem: {
        alignItems: "center",
        flex: 1,
    },
    quickStatValue: {
        fontSize: 16,
        fontFamily: "Almarai-Bold",
        color: "#1a202c",
        marginBottom: 4,
    },
    quickStatLabel: {
        fontSize: 12,
        fontFamily: "Almarai-Regular",
        color: "#6b7280",
        textAlign: "center",
    },
    tabsContainer: {
        flexDirection: "row",
        backgroundColor: "#ffffff",
        marginHorizontal: 20,
        borderRadius: 12,
        padding: 4,
        marginBottom: 20,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: "center",
        borderRadius: 8,
    },
    activeTab: {
        backgroundColor: "#01a736",
    },
    tabText: {
        fontSize: 14,
        fontFamily: "Almarai-Medium",
        color: "#6b7280",
    },
    activeTabText: {
        color: "#ffffff",
    },
    tabContent: {
        paddingHorizontal: 20,
        paddingBottom: 120,
    },
    section: {
        backgroundColor: "#ffffff",
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        elevation: 1,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: "Almarai-Bold",
        color: "#1a202c",
        textAlign: "right",
        marginBottom: 16,
    },
    descriptionText: {
        fontSize: 16,
        fontFamily: "Almarai-Regular",
        color: "#4a5568",
        textAlign: "right",
        lineHeight: 24,
    },
    infoGrid: {
        gap: 16,
    },
    infoItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    infoContent: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 12,
        fontFamily: "Almarai-Regular",
        color: "#6b7280",
        textAlign: "right",
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 16,
        fontFamily: "Almarai-Medium",
        color: "#1a202c",
        textAlign: "right",
    },
    riskOpportunityContainer: {
        flexDirection: "row",
        gap: 16,
    },
    riskSection: {
        flex: 1,
        backgroundColor: "#fef2f2",
        padding: 16,
        borderRadius: 12,
    },
    riskTitle: {
        fontSize: 14,
        fontFamily: "Almarai-Bold",
        color: "#dc2626",
        textAlign: "right",
        marginBottom: 8,
    },
    riskText: {
        fontSize: 12,
        fontFamily: "Almarai-Regular",
        color: "#dc2626",
        textAlign: "right",
        marginBottom: 4,
    },
    opportunitySection: {
        flex: 1,
        backgroundColor: "#f0fdf4",
        padding: 16,
        borderRadius: 12,
    },
    opportunityTitle: {
        fontSize: 14,
        fontFamily: "Almarai-Bold",
        color: "#01a736",
        textAlign: "right",
        marginBottom: 8,
    },
    opportunityText: {
        fontSize: 12,
        fontFamily: "Almarai-Regular",
        color: "#01a736",
        textAlign: "right",
        marginBottom: 4,
    },
    financialGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
    },
    financialCard: {
        backgroundColor: "#f8fafc",
        padding: 16,
        borderRadius: 12,
        width: (width - 72) / 2,
        alignItems: "center",
    },
    financialValue: {
        fontSize: 18,
        fontFamily: "Almarai-Bold",
        color: "#01a736",
        marginBottom: 8,
    },
    financialLabel: {
        fontSize: 12,
        fontFamily: "Almarai-Regular",
        color: "#6b7280",
        textAlign: "center",
    },
    distributionContainer: {
        gap: 12,
    },
    distributionItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    distributionBar: {
        height: 8,
        borderRadius: 4,
    },
    distributionLabel: {
        fontSize: 14,
        fontFamily: "Almarai-Medium",
        color: "#4a5568",
    },
    documentsList: {
        gap: 12,
    },
    documentItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f8fafc",
        padding: 16,
        borderRadius: 12,
        gap: 12,
    },
    documentContent: {
        flex: 1,
    },
    documentTitle: {
        fontSize: 16,
        fontFamily: "Almarai-Medium",
        color: "#1a202c",
        textAlign: "right",
        marginBottom: 4,
    },
    documentSize: {
        fontSize: 12,
        fontFamily: "Almarai-Regular",
        color: "#6b7280",
        textAlign: "right",
    },
    certificatesList: {
        gap: 12,
    },
    certificateItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    certificateText: {
        fontSize: 14,
        fontFamily: "Almarai-Medium",
        color: "#4a5568",
        textAlign: "right",
    },
    actionsContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#ffffff",
        flexDirection: "row",
        padding: 20,
        gap: 12,
        borderTopWidth: 1,
        borderTopColor: "#f1f5f9",
    },
    shareButton: {
        width: 50,
        height: 50,
        backgroundColor: "#f8fafc",
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    investButton: {
        flex: 1,
        backgroundColor: "#01a736",
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
    },
    investButtonText: {
        fontSize: 16,
        fontFamily: "Almarai-Bold",
        color: "#ffffff",
    },
    investButtonSubtext: {
        fontSize: 12,
        fontFamily: "Almarai-Regular",
        color: "rgba(255, 255, 255, 0.8)",
        marginTop: 2,
    },
});