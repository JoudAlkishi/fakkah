import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Dimensions,
    Image,
    Modal,
    ScrollView,
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
    opportunityStatus: "متاحة" | "مكتملة" | "قريباً" | "مغلقة";
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
        // Provide fallback data or navigate back
        router.back();
        return null;
    }
    
    const [activeTab, setActiveTab] = useState<'overview' | 'financials' | 'analysis' | 'documents'>('overview');
    const [isUpgradeModalVisible, setIsUpgradeModalVisible] = useState(false);
    
    const getStatusColor = (status: string) => {
        switch (status) {
            case "متاحة": return "#01a736";
            case "مكتملة": return "#6b7280";
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

    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return dateString; // Return original if invalid
            }
            
            const day = date.getDate();
            const year = date.getFullYear();
            
            const arabicMonths = [
                'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
                'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
            ];
            
            const month = arabicMonths[date.getMonth()];
            
            return `${day} ${month}، ${year}`;
        } catch (error) {
            return dateString;
        }
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
                            <Text style={styles.sectionTitle}>معلومات أساسية</Text>
                            <View style={styles.infoGrid}>
                                <View style={styles.infoCard}>
                                    <MaterialIcons name="location-on" size={20} color="#01a736" />
                                    <View style={styles.infoContent}>
                                        <Text style={styles.infoLabel}>الموقع</Text>
                                        <Text style={styles.infoValue}>{opportunity.location}</Text>
                                    </View>
                                </View>
                                <View style={styles.infoCard}>
                                    <MaterialIcons name="category" size={20} color="#01a736" />
                                    <View style={styles.infoContent}>
                                        <Text style={styles.infoLabel}>القطاع</Text>
                                        <Text style={styles.infoValue}>{opportunity.category}</Text>
                                    </View>
                                </View>
                                <View style={styles.infoCard}>
                                    <MaterialIcons name="business-center" size={20} color="#01a736" />
                                    <View style={styles.infoContent}>
                                        <Text style={styles.infoLabel}>نموذج العمل</Text>
                                        <Text style={styles.infoValue}>{opportunity.businessModel}</Text>
                                    </View>
                                </View>
                                <View style={styles.infoCard}>
                                    <MaterialIcons name="schedule" size={20} color="#01a736" />
                                    <View style={styles.infoContent}>
                                        <Text style={styles.infoLabel}>مدة الاستثمار</Text>
                                        <Text style={styles.infoValue}>{calculateDuration()}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>دعم المجتمع</Text>
                            <View style={styles.communitySection}>
                                <View style={styles.communityHeader}>
                                    <Text style={styles.communityPercentage}>{opportunity.communitySupport}%</Text>
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
                );
            case 'financials':
                return (
                    <View style={styles.tabContent}>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>المؤشرات المالية</Text>
                            <View style={styles.financialGrid}>
                                <View style={styles.financialCard}>
                                    <RiyalIcon size={24} />
                                    <View style={styles.financialContent}>
                                        <Text style={styles.financialLabel}>الاستثمار المطلوب</Text>
                                        <View style={styles.financialValueContainer}>
                                            <Text style={styles.financialValue}>{opportunity.requiredInvestment.toLocaleString()}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.financialCard}>
                                    <MaterialIcons name="trending-up" size={24} color="#01a736" />
                                    <View style={styles.financialContent}>
                                        <Text style={styles.financialLabel}>العائد المتوقع سنوياً</Text>
                                        <Text style={styles.financialValue}>{opportunity.expectedROI}%</Text>
                                    </View>
                                </View>
                                <View style={styles.financialCard}>
                                    <MaterialIcons name="assessment" size={24} color="#01a736" />
                                    <View style={styles.financialContent}>
                                        <Text style={styles.financialLabel}>معدل العائد الداخلي</Text>
                                        <Text style={styles.financialValue}>{opportunity.irr}%</Text>
                                    </View>
                                </View>
                                <View style={styles.financialCard}>
                                    <RiyalIcon size={24} />
                                    <View style={styles.financialContent}>
                                        <Text style={styles.financialLabel}>صافي القيمة الحالية</Text>
                                        <View style={styles.financialValueContainer}>
                                            <Text style={styles.financialValue}>{opportunity.npv.toLocaleString()}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>الربحية المتوقعة</Text>
                            
                            <View style={styles.profitRateDisplayCard}>
                                <View style={styles.profitRateContentRTL}>
                                    <View style={styles.profitCircleContainer}>
                                        <View style={styles.profitCircle}>
                                            <Text style={styles.profitPercentage}>{opportunity.cumulativeProfitRate}%</Text>
                                        </View>
                                    </View>
                                    <View style={styles.profitInfoRTL}>
                                        <Text style={styles.profitMainTitle}>معدل الربح التراكمي</Text>
                                        <View style={styles.profitProgressWrapper}>
                                            <View style={styles.profitProgressBar}>
                                                <View style={[styles.profitProgressFill, { 
                                                    width: `${Math.min(opportunity.cumulativeProfitRate, 100)}%` 
                                                }]} />
                                            </View>
                                            <Text style={styles.profitProgressText}>
                                                {Math.min(opportunity.cumulativeProfitRate, 100)}% مكتمل
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.profitBreakdownContainer}>
                                <Text style={styles.breakdownTitle}>تفصيل الأرباح</Text>
                                
                                <View style={styles.profitBreakdownCard}>
                                    <View style={styles.breakdownRowRTL}>
                                        <View style={styles.breakdownIconContainer}>
                                            <MaterialIcons name="trending-up" size={18} color="#01a736" />
                                        </View>
                                        <View style={styles.breakdownContentRTL}>
                                            <Text style={styles.breakdownLabel}>إجمالي الربح المتوقع</Text>
                                            <View style={styles.breakdownValueRow}>
                                                <Text style={styles.breakdownValue}>
                                                    {(opportunity.requiredInvestment * (opportunity.cumulativeProfitRate / 100)).toLocaleString()}
                                                </Text>
                                                <RiyalIcon size={14} />
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.profitBreakdownCard}>
                                    <View style={styles.breakdownRowRTL}>
                                        <View style={styles.breakdownIconContainer}>
                                            <MaterialIcons name="account-balance-wallet" size={18} color="#01a736" />
                                        </View>
                                        <View style={styles.breakdownContentRTL}>
                                            <Text style={styles.breakdownLabel}>العائد الإجمالي</Text>
                                            <View style={styles.breakdownValueRow}>
                                                <Text style={styles.breakdownValue}>
                                                    {(opportunity.requiredInvestment + (opportunity.requiredInvestment * (opportunity.cumulativeProfitRate / 100))).toLocaleString()}
                                                </Text>
                                                <RiyalIcon size={14} />
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.profitBreakdownCard}>
                                    <View style={styles.breakdownRowRTL}>
                                        <View style={styles.breakdownIconContainer}>
                                            <MaterialIcons name="money" size={18} color="#01a736" />
                                        </View>
                                        <View style={styles.breakdownContentRTL}>
                                            <Text style={styles.breakdownLabel}>الاستثمار الأولي</Text>
                                            <View style={styles.breakdownValueRow}>
                                                <Text style={styles.breakdownValue}>
                                                    {opportunity.requiredInvestment.toLocaleString()}
                                                </Text>
                                                <RiyalIcon size={14} />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                );
            case 'analysis':
                return (
                    <View style={styles.tabContent}>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>تحليل المخاطر</Text>
                            <View style={styles.riskAnalysisCard}>
                                <View style={styles.riskLevelHeader}>
                                    <Text style={styles.riskLevelTitle}>مستوى المخاطر الإجمالي</Text>
                                    <View style={[styles.riskBadge, { backgroundColor: getRiskColor(opportunity.riskLevel) }]}>
                                        <Text style={styles.riskBadgeText}>{opportunity.riskLevel}</Text>
                                    </View>
                                </View>
                                
                                <View style={styles.riskBreakdownContainer}>
                                    <View style={styles.riskFactorRow}>
                                        <View style={styles.riskFactorInfo}>
                                            <Text style={styles.riskFactorLabel}>مخاطر السوق</Text>
                                            <Text style={styles.riskFactorDescription}>تقلبات الأسعار والطلب</Text>
                                        </View>
                                        <View style={styles.riskIndicatorContainer}>
                                            <View style={[styles.riskIndicator, { backgroundColor: '#f59e0b' }]} />
                                            <Text style={styles.riskIndicatorText}>متوسط</Text>
                                        </View>
                                    </View>
                                    
                                    <View style={styles.riskFactorRow}>
                                        <View style={styles.riskFactorInfo}>
                                            <Text style={styles.riskFactorLabel}>مخاطر التشغيل</Text>
                                            <Text style={styles.riskFactorDescription}>إدارة العمليات والموارد</Text>
                                        </View>
                                        <View style={styles.riskIndicatorContainer}>
                                            <View style={[styles.riskIndicator, { backgroundColor: '#01a736' }]} />
                                            <Text style={styles.riskIndicatorText}>منخفض</Text>
                                        </View>
                                    </View>
                                    
                                    <View style={styles.riskFactorRow}>
                                        <View style={styles.riskFactorInfo}>
                                            <Text style={styles.riskFactorLabel}>مخاطر التمويل</Text>
                                            <Text style={styles.riskFactorDescription}>توفر السيولة والتمويل</Text>
                                        </View>
                                        <View style={styles.riskIndicatorContainer}>
                                            <View style={[styles.riskIndicator, { backgroundColor: '#01a736' }]} />
                                            <Text style={styles.riskIndicatorText}>منخفض</Text>
                                        </View>
                                    </View>
                                    
                                    <View style={styles.riskFactorRow}>
                                        <View style={styles.riskFactorInfo}>
                                            <Text style={styles.riskFactorLabel}>المخاطر التنظيمية</Text>
                                            <Text style={styles.riskFactorDescription}>التغييرات القانونية والتنظيمية</Text>
                                        </View>
                                        <View style={styles.riskIndicatorContainer}>
                                            <View style={[styles.riskIndicator, { backgroundColor: getRiskColor(opportunity.riskLevel) }]} />
                                            <Text style={styles.riskIndicatorText}>{opportunity.riskLevel}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>تحليل الأداء</Text>
                            
                            <View style={styles.performanceMetricsContainer}>
                                <View style={styles.performanceMetricCard}>
                                    <View style={styles.performanceMetricHeader}>
                                        <MaterialIcons name="trending-up" size={24} color="#01a736" />
                                        <Text style={styles.performanceMetricTitle}>معدل العائد الداخلي</Text>
                                    </View>
                                    <Text style={styles.performanceMetricValue}>{opportunity.irr}%</Text>
                                    <View style={styles.performanceBarContainer}>
                                        <View style={styles.performanceBar}>
                                            <View style={[styles.performanceBarFill, { 
                                                width: `${Math.min((opportunity.irr / 30) * 100, 100)}%`,
                                                backgroundColor: opportunity.irr > 15 ? '#01a736' : opportunity.irr > 10 ? '#f59e0b' : '#ef4444'
                                            }]} />
                                        </View>
                                        <Text style={styles.performanceBarLabel}>
                                            {opportunity.irr > 15 ? 'ممتاز' : opportunity.irr > 10 ? 'جيد' : 'مقبول'}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.performanceMetricCard}>
                                    <View style={styles.performanceMetricHeader}>
                                        <MaterialIcons name="account-balance-wallet" size={24} color="#01a736" />
                                        <Text style={styles.performanceMetricTitle}>صافي القيمة الحالية</Text>
                                    </View>
                                    <View style={styles.npvValueContainer}>
                                        <Text style={styles.performanceMetricValue}>
                                            {(opportunity.npv / 1000).toFixed(0)} ألف
                                        </Text>
                                        <RiyalIcon size={18} />
                                    </View>
                                    <View style={styles.npvStatusContainer}>
                                        <MaterialIcons 
                                            name={opportunity.npv > 0 ? "check-circle" : "error"} 
                                            size={16} 
                                            color={opportunity.npv > 0 ? "#01a736" : "#ef4444"} 
                                        />
                                        <Text style={[styles.npvStatusText, {
                                            color: opportunity.npv > 0 ? "#01a736" : "#ef4444"
                                        }]}>
                                            {opportunity.npv > 0 ? 'استثمار مربح' : 'يحتاج مراجعة'}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>تحليل التوقعات</Text>
                            
                            <View style={styles.scenarioContainer}>
                                <Text style={styles.scenarioTitle}>سيناريوهات العائد المتوقع</Text>
                                
                                <View style={styles.scenarioCard}>
                                    <View style={styles.scenarioHeader}>
                                        <MaterialIcons name="trending-up" size={20} color="#01a736" />
                                        <Text style={styles.scenarioLabel}>السيناريو المتفائل</Text>
                                        <Text style={styles.scenarioPercentage}>+25%</Text>
                                    </View>
                                    <Text style={styles.scenarioValue}>
                                        {Math.round(opportunity.expectedROI * 1.25)}% عائد سنوي
                                    </Text>
                                    <Text style={styles.scenarioDescription}>
                                        في حالة تحقق أفضل التوقعات السوقية
                                    </Text>
                                </View>

                                <View style={styles.scenarioCard}>
                                    <View style={styles.scenarioHeader}>
                                        <MaterialIcons name="remove" size={20} color="#f59e0b" />
                                        <Text style={styles.scenarioLabel}>السيناريو المتوقع</Text>
                                        <Text style={styles.scenarioPercentage}>العادي</Text>
                                    </View>
                                    <Text style={styles.scenarioValue}>
                                        {opportunity.expectedROI}% عائد سنوي
                                    </Text>
                                    <Text style={styles.scenarioDescription}>
                                        الأداء المتوقع في الظروف العادية
                                    </Text>
                                </View>

                                <View style={styles.scenarioCard}>
                                    <View style={styles.scenarioHeader}>
                                        <MaterialIcons name="trending-down" size={20} color="#ef4444" />
                                        <Text style={styles.scenarioLabel}>السيناريو المتحفظ</Text>
                                        <Text style={styles.scenarioPercentage}>-20%</Text>
                                    </View>
                                    <Text style={styles.scenarioValue}>
                                        {Math.round(opportunity.expectedROI * 0.8)}% عائد سنوي
                                    </Text>
                                    <Text style={styles.scenarioDescription}>
                                        في حالة التحديات السوقية
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                );
            case 'documents':
                return (
                    <View style={styles.tabContent}>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>الوثائق المطلوبة</Text>
                            <View style={styles.documentsList}>
                                <TouchableOpacity style={styles.documentCard}>
                                    <MaterialIcons name="download" size={20} color="#01a736" />
                                    <Text style={styles.documentTitle}>خطة العمل</Text>
                                    <MaterialIcons name="description" size={24} color="#01a736" />
                                </TouchableOpacity>
                                
                                <TouchableOpacity style={styles.documentCard}>
                                    <MaterialIcons name="download" size={20} color="#01a736" />
                                    <Text style={styles.documentTitle}>التقرير المالي</Text>
                                    <MaterialIcons name="assessment" size={24} color="#01a736" />
                                </TouchableOpacity>
                                
                                <TouchableOpacity style={styles.documentCard}>
                                    <MaterialIcons name="download" size={20} color="#01a736" />
                                    <Text style={styles.documentTitle}>الوثائق القانونية</Text>
                                    <MaterialIcons name="gavel" size={24} color="#01a736" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>معلومات التواصل</Text>
                            <View style={styles.contactContainer}>
                                <View style={styles.contactCard}>
                                    <MaterialIcons name="email" size={20} color="#01a736" />
                                    <Text style={styles.contactText}>البريد الإلكتروني</Text>
                                </View>
                                <View style={styles.contactCard}>
                                    <MaterialIcons name="phone" size={20} color="#01a736" />
                                    <Text style={styles.contactText}>رقم الهاتف</Text>
                                </View>
                                <View style={styles.contactCard}>
                                    <MaterialIcons name="business" size={20} color="#01a736" />
                                    <Text style={styles.contactText}>{opportunity.location}</Text>
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
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <MaterialIcons name="arrow-back" size={24} color="#001a6e" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>تفاصيل الفرصة</Text>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.heroSection}>
                    <View style={styles.statusContainer}>
                        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(opportunity.opportunityStatus) }]}>
                            <MaterialIcons 
                                name={opportunity.opportunityStatus === "متاحة" ? "check-circle" : "info"} 
                                size={16} 
                                color="#ffffff" 
                            />
                            <Text style={styles.statusText}>{opportunity.opportunityStatus}</Text>
                        </View>
                    </View>
                    <View style={styles.heroTextContent}>
                        <Text style={styles.heroTitle}>{opportunity.name}</Text>
                        <Text style={styles.heroSubtitle}>{opportunity.location} • {opportunity.category}</Text>
                    </View>
                </View>

                <View style={styles.metricsSection}>
                    <View style={styles.mainMetrics}>
                        <View style={styles.primaryMetricCard}>
                            <Text style={styles.primaryMetricValue}>{opportunity.expectedROI}%</Text>
                            <Text style={styles.primaryMetricLabel}>العائد المتوقع سنوياً</Text>
                        </View>
                        <View style={styles.primaryMetricCard}>
                            <View style={styles.primaryMetricValueContainer}>
                                <RiyalIcon size={20} />
                                <Text style={styles.primaryMetricValue}>
                                    {(opportunity.requiredInvestment / 1000).toFixed(0)} ألف
                                </Text>
                            </View>
                            <Text style={styles.primaryMetricLabel}>الاستثمار المطلوب</Text>
                        </View>
                    </View>

                    <View style={styles.secondaryMetrics}>
                        <View style={styles.secondaryMetricItem}>
                            <Text style={styles.secondaryMetricValue}>{opportunity.irr}%</Text>
                            <Text style={styles.secondaryMetricLabel}>IRR</Text>
                        </View>
                        <View style={styles.secondaryMetricItem}>
                            <Text style={[styles.secondaryMetricValue, { color: getRiskColor(opportunity.riskLevel) }]}>
                                {opportunity.riskLevel}
                            </Text>
                            <Text style={styles.secondaryMetricLabel}>المخاطر</Text>
                        </View>
                        <View style={styles.secondaryMetricItem}>
                            <Text style={styles.secondaryMetricValue}>{calculateDuration()}</Text>
                            <Text style={styles.secondaryMetricLabel}>المدة</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.tabsContainer}>
                    {(['overview', 'financials', 'analysis', 'documents'] as const).map((tab) => (
                        <TouchableOpacity 
                            key={tab}
                            style={[styles.tab, activeTab === tab && styles.activeTab]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                                {tab === 'overview' ? 'نظرة عامة' : 
                                 tab === 'financials' ? 'المالية' :
                                 tab === 'analysis' ? 'التحليل' : 'الوثائق'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {renderTabContent()}
            </ScrollView>

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
                                <MaterialIcons name="check-circle" size={20} color="#01a736" />
                                <Text style={styles.featureText}>فرص استثمارية حصرية</Text>
                            </View>
                            <View style={styles.featureItem}>
                                <MaterialIcons name="check-circle" size={20} color="#01a736" />
                                <Text style={styles.featureText}>رؤوس أموال أكبر</Text>
                            </View>
                            <View style={styles.featureItem}>
                                <MaterialIcons name="check-circle" size={20} color="#01a736" />
                                <Text style={styles.featureText}>عوائد أعلى متوقعة</Text>
                            </View>
                        </View>
                        
                        <View style={styles.upgradeButtons}>
                            <TouchableOpacity 
                                style={styles.upgradeConfirmButton}
                                onPress={() => {
                                    setIsUpgradeModalVisible(false);
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

            <View style={styles.actionsContainer}>
                <TouchableOpacity 
                    style={[
                        styles.investButton,
                        opportunity.opportunityStatus !== "متاحة" && styles.disabledButton
                    ]}
                    disabled={opportunity.opportunityStatus !== "متاحة"}
                    onPress={() => {
                        if (opportunity.opportunityStatus === "متاحة") {
                            setIsUpgradeModalVisible(true);
                        }
                    }}
                >
                    <Text style={[
                        styles.investButtonText,
                        opportunity.opportunityStatus !== "متاحة" && styles.disabledButtonText
                    ]}>
                        {opportunity.opportunityStatus === "متاحة" ? "استثمر الآن" : opportunity.opportunityStatus}
                    </Text>
                </TouchableOpacity>
            </View>
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
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 20,
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
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    headerTitle: {
        fontSize: 25,
        fontFamily: "Almarai-Bold",
        color: "#001a6e",
        textAlign: "right",
        lineHeight: 40
    },
    scrollView: {
        flex: 1,
    },
    heroSection: {
        backgroundColor: "#001a6e",
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 20,
        padding: 20,
        minHeight: 160,
        justifyContent: "space-between",
    },
    statusContainer: {
        alignItems: "flex-start",
    },
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        gap: 4,
    },
    statusText: {
        fontSize: 12,
        fontFamily: "Almarai-Bold",
        color: "#ffffff",
    },
    heroTextContent: {
        alignItems: "flex-end",
        marginTop: 12,
    },
    heroTitle: {
        fontSize: 24,
        fontFamily: "Almarai-Bold",
        color: "#ffffff",
        textAlign: "right",
        marginBottom: 4,
    },
    heroSubtitle: {
        fontSize: 14,
        fontFamily: "Almarai-Medium",
        color: "rgba(255, 255, 255, 0.9)",
        textAlign: "right",
    },
    metricsSection: {
        backgroundColor: "#ffffff",
        margin: 16,
        borderRadius: 16,
        padding: 20,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 4,
    },
    mainMetrics: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 20,
    },
    primaryMetricCard: {
        flex: 1,
        backgroundColor: "#f0fdf4",
        padding: 16,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#bbf7d0",
    },
    primaryMetricValue: {
        fontSize: 20,
        fontFamily: "Almarai-Bold",
        color: "#01a736",
        marginLeft: 4,
    },
    primaryMetricValueContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 4,
    },
    primaryMetricLabel: {
        fontSize: 12,
        fontFamily: "Almarai-Medium",
        color: "#01a736",
        textAlign: "center",
    },
    secondaryMetrics: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: "#f1f5f9",
    },
    secondaryMetricItem: {
        alignItems: "center",
        flex: 1,
    },
    secondaryMetricValue: {
        fontSize: 14,
        fontFamily: "Almarai-Bold",
        color: "#1f2937",
        marginBottom: 2,
    },
    secondaryMetricLabel: {
        fontSize: 11,
        fontFamily: "Almarai-Medium",
        color: "#6b7280",
        textAlign: "center",
    },
    tabsContainer: {
        flexDirection: "row-reverse", 
        backgroundColor: "#ffffff",
        marginHorizontal: 16,
        borderRadius: 12,
        padding: 4,
        marginBottom: 16,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 2,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: "center",
        borderRadius: 8,
    },
    activeTab: {
        backgroundColor: "#001a6e",
    },
    tabText: {
        fontSize: 13,
        fontFamily: "Almarai-Medium",
        color: "#6b7280",
    },
    activeTabText: {
        color: "#ffffff",
        fontFamily: "Almarai-Bold",
    },
    tabContent: {
        paddingHorizontal: 16,
        paddingBottom: 100,
    },
    section: {
        backgroundColor: "#ffffff",
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: "Almarai-Bold",
        color: "#001a6e",
        textAlign: "right",
        marginBottom: 16,
    },
    descriptionText: {
        fontSize: 15,
        fontFamily: "Almarai-Regular",
        color: "#4b5563",
        textAlign: "right",
        lineHeight: 24,
    },
    infoGrid: {
        gap: 12,
    },
    infoCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f8fafc",
        padding: 14,
        borderRadius: 12,
        gap: 12,
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    infoContent: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 12,
        fontFamily: "Almarai-Medium",
        color: "#6b7280",
        textAlign: "right",
        marginBottom: 2,
    },
    infoValue: {
        fontSize: 14,
        fontFamily: "Almarai-Bold",
        color: "#001a6e",
        textAlign: "right",
    },
    communitySection: {
        gap: 12,
    },
    communityHeader: {
        flexDirection: "row-reverse", 
        justifyContent: "space-between",
        alignItems: "center",
    },
    communityPercentage: {
        fontSize: 28,
        fontFamily: "Almarai-Bold",
        color: "#01a736",
    },
    communityDescription: {
        fontSize: 14,
        fontFamily: "Almarai-Medium",
        color: "#4b5563",
        flex: 1,
        textAlign: "right",
        marginRight: 10,
    },
    progressBarContainer: {
        gap: 6,
    },
    progressBar: {
        height: 8,
        backgroundColor: "#f1f5f9",
        borderRadius: 4,
        overflow: "hidden",
        flexDirection: "row-reverse", 
    },
    progressFill: {
        height: "100%",
        backgroundColor: "#01a736",
        borderRadius: 4,
        alignSelf: "flex-end",
    },
    financialGrid: {
        gap: 12,
    },
    financialCard: {
        backgroundColor: "#f8fafc",
        padding: 16,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        width: "100%",
    },
    financialValue: {
        fontSize: 16,
        fontFamily: "Almarai-Bold",
        color: "#01a736",
        textAlign: "right",
    },
    financialLabel: {
        fontSize: 11,
        fontFamily: "Almarai-Medium",
        color: "#6b7280",
        textAlign: "right",
        lineHeight: 14,
        marginBottom: 4,
    },
    financialContent: {
        flex: 1,
        alignItems: "flex-end",
    },
    financialValueContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    profitRateDisplayCard: {
        backgroundColor: "#ffffff",
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 3,
    },
    profitRateContentRTL: {
        flexDirection: "row-reverse",
        alignItems: "center",
        gap: 16,
    },
    profitCircleContainer: {
        alignItems: "center",
    },
    profitCircle: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: "#01a736",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#01a736",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 8,
    },
    profitPercentage: {
        fontSize: 22,
        fontFamily: "Almarai-Bold",
        color: "#ffffff",
    },
    profitInfoRTL: {
        flex: 1,
        alignItems: "flex-end",
    },
    profitMainTitle: {
        fontSize: 18,
        fontFamily: "Almarai-Bold",
        color: "#001a6e",
        textAlign: "right",
        marginBottom: 15,
        lineHeight: 30
    },
    profitProgressWrapper: {
        width: "100%",
        gap: 6,
    },
    profitProgressBar: {
        height: 8,
        backgroundColor: "#f1f5f9",
        borderRadius: 4,
        overflow: "hidden",
        direction: "rtl",
    },
    profitProgressFill: {
        height: "100%",
        backgroundColor: "#01a736",
        borderRadius: 4,
        alignSelf: "flex-end",
    },
    profitProgressText: {
        fontSize: 11,
        fontFamily: "Almarai-Medium",
        color: "#01a736",
        textAlign: "right",
    },
    profitBreakdownContainer: {
        gap: 12,
    },
    breakdownTitle: {
        fontSize: 16,
        fontFamily: "Almarai-Bold",
        color: "#001a6e",
        textAlign: "right",
        marginBottom: 8,
        lineHeight: 30
    },
    profitBreakdownCard: {
        backgroundColor: "#f8fafc",
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    breakdownRowRTL: {
        flexDirection: "row-reverse",
        alignItems: "center",
        gap: 12,
    },
    breakdownIconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#f0fdf4",
        alignItems: "center",
        justifyContent: "center",
    },
    breakdownContentRTL: {
        flex: 1,
        alignItems: "flex-end",
    },
    breakdownLabel: {
        fontSize: 13,
        fontFamily: "Almarai-Medium",
        color: "#6b7280",
        textAlign: "right",
        marginBottom: 6,
    },
    breakdownValueRow: {
        flexDirection: "row-reverse",
        alignItems: "center",
        gap: 6,
    },
    breakdownValue: {
        fontSize: 16,
        fontFamily: "Almarai-Bold",
        color: "#001a6e",
        textAlign: "right",
    },
    riskAnalysisCard: {
        backgroundColor: "#f8fafc",
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    riskLevelHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    riskLevelTitle: {
        fontSize: 16,
        fontFamily: "Almarai-Bold",
        color: "#001a6e",
    },
    riskBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    riskBadgeText: {
        fontSize: 12,
        fontFamily: "Almarai-Bold",
        color: "#ffffff",
    },
    riskBreakdownContainer: {
        marginTop: 16,
        gap: 12,
    },
    riskFactorRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#f8fafc",
        padding: 14,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    riskFactorInfo: {
        flex: 1,
        alignItems: "flex-end",
    },
    riskFactorLabel: {
        fontSize: 14,
        fontFamily: "Almarai-Bold",
        color: "#001a6e",
        textAlign: "right",
        marginBottom: 2,
    },
    riskFactorDescription: {
        fontSize: 12,
        fontFamily: "Almarai-Regular",
        color: "#6b7280",
        textAlign: "right",
    },
    riskIndicatorContainer: {
        alignItems: "center",
        gap: 4,
    },
    riskIndicator: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    riskIndicatorText: {
        fontSize: 11,
        fontFamily: "Almarai-Medium",
        color: "#4b5563",
    },
    performanceMetricsContainer: {
        gap: 16,
    },
    performanceMetricCard: {
        backgroundColor: "#f8fafc",
        padding: 18,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    performanceMetricHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 12,
    },
    performanceMetricTitle: {
        fontSize: 14,
        fontFamily: "Almarai-Bold",
        color: "#001a6e",
        flex: 1,
        textAlign: "right",
    },
    performanceMetricValue: {
        fontSize: 24,
        fontFamily: "Almarai-Bold",
        color: "#01a736",
        textAlign: "right",
        marginBottom: 8,
    },
    npvValueContainer: {
        flexDirection: "row-reverse",
        alignItems: "center",
        gap: 6,
        justifyContent: "flex-end",
        marginBottom: 8,
    },
    npvStatusContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        justifyContent: "flex-end",
    },
    npvStatusText: {
        fontSize: 12,
        fontFamily: "Almarai-Medium",
    },
    performanceBarContainer: {
        gap: 6,
    },
    performanceBar: {
        height: 6,
        backgroundColor: "#e5e7eb",
        borderRadius: 3,
        overflow: "hidden",
        direction: "rtl",
    },
    performanceBarFill: {
        height: "100%",
        borderRadius: 3,
        alignSelf: "flex-end",
    },
    performanceBarLabel: {
        fontSize: 11,
        fontFamily: "Almarai-Medium",
        color: "#6b7280",
        textAlign: "right",
    },
    scenarioContainer: {
        gap: 12,
    },
    scenarioTitle: {
        fontSize: 16,
        fontFamily: "Almarai-Bold",
        color: "#001a6e",
        textAlign: "right",
        marginBottom: 12,
    },
    scenarioCard: {
        backgroundColor: "#ffffff",
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 4,
        elevation: 2,
    },
    scenarioHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    scenarioLabel: {
        fontSize: 14,
        fontFamily: "Almarai-Bold",
        color: "#001a6e",
        flex: 1,
        textAlign: "right",
        marginHorizontal: 8,
    },
    scenarioPercentage: {
        fontSize: 12,
        fontFamily: "Almarai-Bold",
        color: "#6b7280",
    },
    scenarioValue: {
        fontSize: 16,
        fontFamily: "Almarai-Bold",
        color: "#01a736",
        textAlign: "right",
        marginBottom: 4,
    },
    scenarioDescription: {
        fontSize: 12,
        fontFamily: "Almarai-Regular",
        color: "#6b7280",
        textAlign: "right",
        lineHeight: 16,
    },
    documentsList: {
        gap: 12,
    },
    documentCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f8fafc",
        padding: 16,
        borderRadius: 12,
        gap: 12,
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    documentTitle: {
        fontSize: 14,
        fontFamily: "Almarai-Bold",
        color: "#001a6e",
        textAlign: "right",
        flex: 1,
    },
    contactContainer: {
        gap: 10,
    },
    contactCard: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        backgroundColor: "#f8fafc",
        padding: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    contactText: {
        fontSize: 13,
        fontFamily: "Almarai-Medium",
        color: "#4b5563",
        flex: 1,
        textAlign: "right",
    },
    actionsContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#ffffff",
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: "#f1f5f9",
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 6,
    },
    investButton: {
        flex: 1,
        backgroundColor: "#01a736",
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 14,
        shadowColor: "#01a736",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
    },
    disabledButton: {
        backgroundColor: "#9ca3af",
        shadowOpacity: 0,
    },
    investButtonText: {
        fontSize: 16,
        fontFamily: "Almarai-Bold",
        color: "#ffffff",
    },
    disabledButtonText: {
        color: "#ffffff",
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
        color: "#001a6e",
        textAlign: "center",
        marginBottom: 16,
        lineHeight: 30
    },
    upgradeDescription: {
        fontSize: 16,
        fontFamily: "Almarai-Regular",
        color: "#4b5563",
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
        color: "#001a6e",
        marginRight: 12,
        textAlign: "right",
        flex: 1,
    },
    upgradeButtons: {
        width: "100%",
        gap: 12,
    },
    upgradeConfirmButton: {
        backgroundColor: "#01a736",
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
        color: "#6b7280",
    },
});