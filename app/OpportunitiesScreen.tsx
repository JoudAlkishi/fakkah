const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
        case "منخفض": return "#01a736";
        case "متوسط": return "#ffa500";
        case "عالي": 
        case "مرتفع": return "#ff4757";
        default: return "#6b7280";
    }
};import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

interface Opportunity {
id: string;
title: string;
category: string;
location: string;
communitySupport: number; // percentage
businessModel: string;
}

export default function OpportunitiesScreen() {
const router = useRouter();
const [selectedFilter, setSelectedFilter] = useState<string>("الكل");

// Updated filters to match Excel data categories
const filters = [
    "الكل", 
    "مقاهي ومشروبات", 
    "منتجات عسلية", 
    "مطاعم وأغذية", 
    "زراعة ومنتجات طبيعية", 
    "حرف يدوية وتراثية", 
    "سياحة وضيافة", 
    "صناعات غذائية محلية", 
    "خدمات نقل وتوصيل"
];

// Updated opportunities array with simplified data
const opportunities: Opportunity[] = [
    {
        id: "1",
        title: "قطرات الجنوب",
        category: "مقاهي ومشروبات",
        location: "أبها",
        communitySupport: 85,
        businessModel: "B2C",
    },
    {
        id: "2",
        title: "عسل الجبال",
        category: "منتجات عسلية",
        location: "النماص",
        communitySupport: 92,
        businessModel: "مبيعات مباشرة",
    },
    {
        id: "3",
        title: "ذوق الجنوب",
        category: "مطاعم وأغذية",
        location: "خميس مشيط",
        communitySupport: 78,
        businessModel: "B2C",
    },
    {
        id: "4",
        title: "ثمار طريب",
        category: "زراعة ومنتجات طبيعية",
        location: "طريب",
        communitySupport: 88,
        businessModel: "B2B",
    },
    {
        id: "5",
        title: "لمسة تراث",
        category: "حرف يدوية وتراثية",
        location: "رجال ألمع",
        communitySupport: 95,
        businessModel: "C2C",
    },
    {
        id: "6",
        title: "رحلات الجنوب",
        category: "سياحة وضيافة",
        location: "تثليث",
        communitySupport: 73,
        businessModel: "B2C",
    },
    {
        id: "7",
        title: "نقاء الجنوب",
        category: "صناعات غذائية محلية",
        location: "محايل عسير",
        communitySupport: 81,
        businessModel: "B2B",
    },
    {
        id: "8",
        title: "أجرة النماص",
        category: "خدمات نقل وتوصيل",
        location: "النماص",
        communitySupport: 69,
        businessModel: "مبيعات مباشرة",
    }
];

const filteredOpportunities = selectedFilter === "الكل" 
    ? opportunities 
    : opportunities.filter(opp => opp.category === selectedFilter);

const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
        case "منخفض": return "#01a736";
        case "متوسط": return "#ffa500";
        case "عالي": 
        case "مرتفع": return "#ff4757";
        default: return "#6b7280";
    }
};

const getCategoryIcon = (category: string) => {
    switch (category) {
        case "مقاهي ومشروبات": return "local-cafe";
        case "منتجات عسلية": return "nature";
        case "مطاعم وأغذية": return "restaurant";
        case "زراعة ومنتجات طبيعية": return "eco";
        case "حرف يدوية وتراثية": return "palette";
        case "سياحة وضيافة": return "hotel";
        case "صناعات غذائية محلية": return "factory";
        case "خدمات نقل وتوصيل": return "local-shipping";
        default: return "business";
    }
};

const handleOpportunityPress = (opportunity: Opportunity) => {
    // Navigate to opportunity details screen using expo-router
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
            activeOpacity={0.7}
        >
            {/* Card Header */}
            <View style={styles.cardHeader}>
                <View style={styles.headerContent}>
                    {/* Category Icon */}
                    <View style={styles.categoryIconContainer}>
                        <MaterialIcons 
                            name={getCategoryIcon(item.category)} 
                            size={24} 
                            color="#01a736" 
                        />
                    </View>
                    
                    {/* Community Support Badge */}
                    <View style={styles.supportBadge}>
                        <Text style={styles.supportPercentage}>{item.communitySupport}%</Text>
                        <Text style={styles.supportLabel}>دعم المجتمع</Text>
                    </View>
                </View>
            </View>

            {/* Main Content */}
            <View style={styles.cardContent}>
                {/* Title */}
                <Text style={styles.opportunityTitle}>{item.title}</Text>
                
                {/* Info Grid */}
                <View style={styles.infoGrid}>
                    <View style={styles.infoItem}>
                        <MaterialIcons name="place" size={16} color="#6b7280" />
                        <Text style={styles.infoLabel}>الموقع</Text>
                        <Text style={styles.infoValue}>{item.location}</Text>
                    </View>
                    
                    <View style={styles.infoItem}>
                        <MaterialIcons name="category" size={16} color="#6b7280" />
                        <Text style={styles.infoLabel}>الفئة</Text>
                        <Text style={styles.infoValue}>{item.category}</Text>
                    </View>
                    
                    <View style={styles.infoItem}>
                        <MaterialIcons name="business-center" size={16} color="#6b7280" />
                        <Text style={styles.infoLabel}>نموذج العمل</Text>
                        <Text style={styles.infoValue}>{item.businessModel}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

return (
    <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
            <TouchableOpacity style={styles.searchButton}>
                <MaterialIcons name="search" size={24} color="#001a6e" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>الفرص</Text>
            <TouchableOpacity style={styles.logoContainer}>
                <MaterialIcons name="upgrade" size={20} color="#ffffff" />
                <Text style={styles.logoText}>ترقية</Text>
            </TouchableOpacity>
        </View>

        {/* Category Filters */}
        <View style={styles.categoryFilters}>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filtersScrollContent}
            >
                {filters.map((filter, index) => (
                    <TouchableOpacity 
                        key={index}
                        style={[
                            styles.filterItem,
                            selectedFilter === filter && styles.activeFilter
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
        </View>

        {/* Section Title */}
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>مطروحة الآن</Text>
            <Text style={styles.sectionSubtitle}>
                {filteredOpportunities.length} فرصة متاحة
                {selectedFilter !== "الكل" && ` في ${selectedFilter}`}
            </Text>
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
logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#001a6e",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
},
logoText: {
    fontSize: 12,
    fontFamily: "Almarai-Medium",
    color: "#ffffff",
},
categoryFilters: {
    backgroundColor: "#ffffff",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
},
filtersScrollContent: {
    paddingHorizontal: 24,
    gap: 12,
},
filterItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    minWidth: 80,
    alignItems: "center",
},
activeFilter: {
    backgroundColor: "#001a6e",
    borderColor: "#001a6e",
},
filterText: {
    fontSize: 13,
    fontFamily: "Almarai-Medium",
    color: "#6b7280",
    textAlign: "center",
},
activeFilterText: {
    color: "#ffffff",
},
sectionHeader: {
    paddingHorizontal: 24,
    paddingVertical: 16,
},
sectionTitle: {
    fontSize: 18,
    fontFamily: "Almarai-Bold",
    color: "#1a202c",
    textAlign: "right",
    marginBottom: 4,
},
sectionSubtitle: {
    fontSize: 14,
    fontFamily: "Almarai-Regular",
    color: "#6b7280",
    textAlign: "right",
},
opportunitiesList: {
    paddingHorizontal: 24,
    paddingBottom: 100,
},
opportunityCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
},
cardHeader: {
    backgroundColor: "#f8fafc",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
},
headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
},
categoryIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: "#f0fdf4",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
},
supportBadge: {
    alignItems: "center",
    backgroundColor: "#01a736",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
},
supportPercentage: {
    fontSize: 16,
    fontFamily: "Almarai-Bold",
    color: "#ffffff",
},
supportLabel: {
    fontSize: 10,
    fontFamily: "Almarai-Regular",
    color: "#ffffff",
    marginTop: 2,
},
cardContent: {
    padding: 20,
},
opportunityTitle: {
    fontSize: 18,
    fontFamily: "Almarai-Bold",
    color: "#1a202c",
    textAlign: "right",
    marginBottom: 16,
},
infoGrid: {
    gap: 12,
},
infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
},
infoLabel: {
    fontSize: 14,
    fontFamily: "Almarai-Medium",
    color: "#6b7280",
    minWidth: 60,
},
infoValue: {
    fontSize: 14,
    fontFamily: "Almarai-Bold",
    color: "#1a202c",
    flex: 1,
    textAlign: "right",
},
});