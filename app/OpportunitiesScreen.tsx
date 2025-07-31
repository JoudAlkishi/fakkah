import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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

export default function OpportunitiesScreen() {
    const router = useRouter();
    const [selectedFilter, setSelectedFilter] = useState<string>("الكل");

    const filters = ["الكل", "عقاري", "تقني", "تجاري", "صناعي"];

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

    const filteredOpportunities = selectedFilter === "الكل" 
        ? opportunities 
        : opportunities.filter(opp => opp.category === selectedFilter);

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

    return (
        <View style={styles.container}>
         

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
    searchButton: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        backgroundColor: "#f8fafc",
    },
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
});