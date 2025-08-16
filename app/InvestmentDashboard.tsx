import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Project {
  id: string; 
  name: string;
  userPercentage: number; 
  description: string;
  totalFunding: number;
  currentFunding: number;
  monthlyReturn: number;
  riskLevel: "منخفض المخاطر" | "متوسط المخاطر" | "عالي المخاطر";
  location: string;
  startDate: string;
  totalEarned: number; 
}

interface RecentActivity {
  amount: number;
  date: string;
  source: string;
}

interface ServiceButton {
  id: 'fukka' | 'fukka_five' | 'fukka_ten';
  title: string;
  example: string;
  enabled: boolean;
}

export default function InvestmentDashboard() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceButton | null>(null);
  
  const [serviceButtons, setServiceButtons] = useState<ServiceButton[]>([
    {
      id: 'fukka_ten',
      title: 'فكّة عشر',
      example: 'مثال: عند شراء بـ 47.25 ريال، سيتم تقريبه لـ 50 ريال واستثمار 2.75 ريال',
      enabled: false
    },
    {
      id: 'fukka_five',
      title: 'فكّة خمس',
      example: 'مثال: عند شراء بـ 23.50 ريال، سيتم تقريبه لـ 25 ريال واستثمار 1.50 ريال',
      enabled: false
    },
    {
      id: 'fukka',
      title: 'فكّة',
      example: 'مثال: عند شراء بـ 15.75 ريال، سيتم سحب 0.25 ريال كفكة للاستثمار',
      enabled: true
    }
  ]);

  const RiyalIcon = ({
    size = 16,
    color,
    style = {},
  }: {
    size?: number;
    color: string;
    style?: any;
  }) => (
    <Image
      source={require("@/assets/images/riyal.png")}
      style={[
        {
          width: size,
          height: size,
          resizeMode: "contain",
          tintColor: color,
        },
        style,
      ]}
    />
  );

  const currentBalance = 9.50;
  const totalTransactions = 45;
  const supportedProjects: Project[] = [
    {
      id: "1",
      name: "مقهى الأصالة",
      userPercentage: 2.5,
      description:
        "مقهى تراثي يقدم القهوة العربية الأصيلة والحلويات التقليدية في قلب أبها التاريخية",
      totalFunding: 50000,
      currentFunding: 35000,
      monthlyReturn: 750,
      riskLevel: "منخفض المخاطر",
      location: "أبها، منطقة عسير",
      startDate: "يناير 2024",
      totalEarned: 45.25
    },
    {
      id: "2",
      name: "مزرعة الورود",
      userPercentage: 1.8,
      description:
        "مزرعة عضوية لإنتاج الورود الطبيعية وماء الورد بأعلى معايير الجودة في مرتفعات عسير",
      totalFunding: 80000,
      currentFunding: 60000,
      monthlyReturn: 1200,
      riskLevel: "متوسط المخاطر",
      location: "خميس مشيط، منطقة عسير",
      startDate: "مارس 2024",
      totalEarned: 32.80
    },
    {
      id: "3",
      name: "عربة الطعام المتنقلة",
      userPercentage: 3.2,
      description:
        "عربة طعام متخصصة في تقديم الأكلات الشعبية العسيرية والمأكولات الجبلية التراثية",
      totalFunding: 30000,
      currentFunding: 25000,
      monthlyReturn: 900,
      riskLevel: "عالي المخاطر",
      location: "النماص، منطقة عسير",
      startDate: "فبراير 2024",
      totalEarned: 49.40
    },
  ];

  const impact = {
    cafes: 2,
    farms: 1,
    foodTrucks: 1,
  };

  const recentActivities: RecentActivity[] = [
    { amount: 0.55, date: "اليوم", source: "عملية شراء" },
    { amount: 1.25, date: "أمس", source: "عملية شراء" },
    { amount: 0.75, date: "منذ يومين", source: "عملية شراء" },
    { amount: 2.1, date: "منذ 3 أيام", source: "عملية شراء" },
    { amount: 0.95, date: "منذ 4 أيام", source: "عملية شراء" },
  ];

  const expectedReturn = 8.5;

  const toggleProjectExpansion = (projectId: string) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  const handleServicePress = (service: ServiceButton) => {
    setSelectedService(service);
    setShowServiceModal(true);
  };

  const handleEnableService = (serviceId: string) => {
    setServiceButtons(prev => prev.map(service => ({
      ...service,
      enabled: service.id === serviceId
    })));
    setShowServiceModal(false);
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "منخفض المخاطر":
        return "#10b981";
      case "متوسط المخاطر":
        return "#f59e0b";
      case "عالي المخاطر":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Current Balance Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialIcons
            name="account-balance-wallet"
            size={24}
            color="#01a736"
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitleRight}>الرصيد الحالي</Text>
          </View>
        </View>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceAmount}>{currentBalance.toFixed(2)}</Text>
          <RiyalIcon size={28} color="#01a736" style={styles.riyalIcon} />
        </View>
        
        {/* Service Buttons */}
        <View style={styles.serviceButtonsContainer}>
          {serviceButtons.map((service, index) => (
            <TouchableOpacity
              key={service.id}
              style={[
                styles.serviceButton,
                service.enabled ? styles.serviceButtonEnabled : styles.serviceButtonDisabled,
                index === 0 && styles.serviceButtonFirst,
                index === serviceButtons.length - 1 && styles.serviceButtonLast
              ]}
              onPress={() => handleServicePress(service)}
            >
              <Text style={[
                styles.serviceButtonText,
                service.enabled ? styles.serviceButtonTextEnabled : styles.serviceButtonTextDisabled
              ]}>
                {service.title}
              </Text>
              {service.enabled && (
                <View style={styles.enabledIndicator}>
                  <MaterialIcons name="check-circle" size={16} color="#01a736" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>


      {/* Service Modal */}
      <Modal
        visible={showServiceModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowServiceModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {selectedService && (
              <>
                <View style={styles.modalHeader}>
                  <TouchableOpacity
                    onPress={() => setShowServiceModal(false)}
                    style={styles.modalCloseButton}
                  >
                    <MaterialIcons name="close" size={24} color="#6b7280" />
                  </TouchableOpacity>
                  <Text style={styles.modalTitle}>{selectedService.title}</Text>
                </View>
                
                <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
                  <View style={styles.modalSection}>
                   
                  </View>
                  
                  <View style={styles.modalSection}>
                    <View style={styles.exampleContainer}>
                      <Text style={styles.modalExample}>{selectedService.example}</Text>
                    </View>
                  </View>
                  
                  {selectedService.enabled ? (
                    <View style={styles.enabledBadge}>
                      <MaterialIcons name="check-circle" size={20} color="#01a736" />
                      <Text style={styles.enabledText}>هذه الخدمة مُفعلة حالياً</Text>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={styles.enableButton}
                      onPress={() => handleEnableService(selectedService.id)}
                    >
                      <Text style={styles.enableButtonText}>تفعيل هذه الخدمة</Text>
                      <MaterialIcons name="arrow-forward" size={20} color="#ffffff" />
                    </TouchableOpacity>
                  )}
                </ScrollView>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Supported Projects Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialIcons name="business-center" size={24} color="#8b5cf6" />
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitleRight}>المشاريع المدعومة</Text>
          </View>
        </View>
        {supportedProjects.map((project, index) => (
          <View key={project.id}>
            <View style={styles.projectItem}>
              <View style={styles.projectInfo}>
                <Text style={styles.projectName}>{project.name}</Text>
                <Text style={styles.projectPercentage}>
                  نسبة مساهمتك: {project.userPercentage}%
                </Text>
              </View>
              <TouchableOpacity
                style={styles.learnMoreButton}
                onPress={() => toggleProjectExpansion(project.id)}
              >
                <Text style={styles.learnMoreText}>اعرف أكثر</Text>
                <MaterialIcons
                  name={
                    expandedProject === project.id
                      ? "keyboard-arrow-up"
                      : "arrow-forward-ios"
                  }
                  size={14}
                  color="#01a736"
                />
              </TouchableOpacity>
            </View>

            {expandedProject === project.id && (
              <View style={styles.expandedContent}>
                <Text style={styles.projectDescription}>
                  {project.description}
                </Text>

                {/* Total Earnings */}
                <View style={styles.earningsCard}>
                  <View style={styles.earningsContent}>
                    <Text style={styles.earningsLabel}>إجمالي العائد المحقق</Text>
                    <View style={styles.earningsValueContainer}>
                      <Text style={styles.earningsValue}>{project.totalEarned.toFixed(2)}</Text>
                      <RiyalIcon size={18} color="#01a736" style={styles.earningsRiyal} />
                    </View>
                  </View>
                </View>

                {/* Basic Details */}
                <View style={styles.projectDetailsGrid}>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailValue}>{project.location}</Text>
                    <MaterialIcons name="location-on" size={16} color="#6b7280" />
                  </View>

                  <View style={styles.detailItem}>
                    <Text style={styles.detailValue}>{project.startDate}</Text>
                    <MaterialIcons name="calendar-today" size={16} color="#6b7280" />
                  </View>

                  <View style={styles.detailItem}>
                    <Text style={[styles.detailValue, { color: getRiskColor(project.riskLevel) }]}>
                      {project.riskLevel}
                    </Text>
                    <MaterialIcons name="security" size={16} color={getRiskColor(project.riskLevel)} />
                  </View>
                </View>
              </View>
            )}

            {index < supportedProjects.length - 1 && (
              <View style={styles.projectSeparator} />
            )}
          </View>
        ))}
      </View>

      {/* Impact Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialIcons name="trending-up" size={24} color="#f59e0b" />
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitleRight}>تأثيرك</Text>
          </View>
        </View>
        <Text style={styles.impactText}>فكتك ساهمت في دعم:</Text>
        <View style={styles.impactGrid}>
          <View style={styles.impactItem}>
            <MaterialIcons name="local-cafe" size={20} color="#8b4513" />
            <Text style={styles.impactNumber}>{impact.cafes}</Text>
            <Text style={styles.impactLabel}>مقاهي</Text>
          </View>
          <View style={styles.impactItem}>
            <MaterialIcons name="agriculture" size={20} color="#22c55e" />
            <Text style={styles.impactNumber}>{impact.farms}</Text>
            <Text style={styles.impactLabel}>مزرعة</Text>
          </View>
          <View style={styles.impactItem}>
            <MaterialIcons name="local-shipping" size={20} color="#f97316" />
            <Text style={styles.impactNumber}>{impact.foodTrucks}</Text>
            <Text style={styles.impactLabel}>فود ترك</Text>
          </View>
        </View>
      </View>

      {/* Recent Activity Card */}
      <View style={[styles.card]}>
        <View style={styles.cardHeader}>
          <MaterialIcons name="history" size={24} color="#6366f1" />
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitleRight}>النشاط الأخير</Text>
          </View>
        </View>
        {recentActivities.map((activity, index) => (
          <View key={index} style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <MaterialIcons name="add" size={16} color="#01a736" />
            </View>
            <View style={styles.activityDetails}>
              <View style={styles.activityAmountContainer}>
                <Text style={styles.activityAmount}>
                  أُضيفت {activity.amount.toFixed(2)}
                </Text>
                <RiyalIcon
                  size={14}
                  color="#1f2937"
                  style={styles.smallRiyalIcon}
                />
              </View>
            </View>
            <Text style={styles.activityDate}>{activity.date}</Text>
          </View>
        ))}
      </View>


      {/* AI Prediction Card */}
      <View style={[styles.card,styles.lastCard]}>
        <View style={styles.cardHeader}>
          <RiyalIcon size={24} color="#01a736" />
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitleRight}>توقعات الفكّة الشهرية</Text>
          </View>
        </View>
        
        <Text style={styles.cardSubtitle}>
          بناءًا على معدل عمليات شرائك الحالية
        </Text>

        {/* AI Prediction Container */}
        <View style={styles.aiPredictionContainer}>
          {/* Predicted Fukka Amount */}
          <View style={styles.predictedBalanceContainer}>
            <View style={styles.predictedBalanceRow}>
              <Text style={styles.predictedAmount}>18.35</Text>
              <RiyalIcon size={24} color="#01a736" style={styles.riyalIcon} />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  lastCard: {
    marginBottom: 120,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  cardTitleRight: {
    fontSize: 15,
    fontFamily: "Almarai-Bold",
    color: "#1f2937",
    textAlign: "right",
    lineHeight: 30,
  },
  cardSubtitle: {
    fontSize: 14,
    fontFamily: "Almarai-Regular",
    color: "#6b7280",
    textAlign: "right",
    lineHeight: 20,
    marginBottom: 16,
    marginTop: 4,
  },
  balanceContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 32,
    fontFamily: "Almarai-ExtraBold",
    color: "#01a736",
    textAlign: "center",
  },
  riyalIcon: {
    marginRight: 8,
  },
  // Service Buttons Styles
  serviceButtonsContainer: {
    flexDirection: "row",
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    padding: 4,
    marginTop: 8,
  },
  serviceButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginHorizontal: 2,
  },
  serviceButtonFirst: {
    marginLeft: 0,
  },
  serviceButtonLast: {
    marginRight: 0,
  },
  serviceButtonEnabled: {
    backgroundColor: "#ffffff",
    shadowColor: "#01a736",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  serviceButtonDisabled: {
    backgroundColor: "transparent",
  },
  serviceButtonText: {
    fontSize: 13,
    fontFamily: "Almarai-Bold",
    textAlign: "center",
    fontWeight: "normal",
  },
  serviceButtonTextEnabled: {
    color: "#01a736",
    fontFamily: "Almarai-Bold",
  },
  serviceButtonTextDisabled: {
    color: "#9ca3af",
    fontFamily: "Almarai-Bold",
  },
  enabledIndicator: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 2,
  },
  aiPredictionContainer: {
    backgroundColor: "#f0fdf4",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#bbf7d0",
    alignItems: "center", 
    justifyContent: "center", 
  },
  predictedBalanceContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    alignSelf: "center",
  },
  predictedBalanceRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    alignSelf: "center",
  },
  predictedAmount: {
    fontSize: 32,
    fontFamily: "Almarai-ExtraBold",
    color: "#01a736",
    textAlign: "center",
  },
  aiPredictionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 16,
  },
  aiPredictionTitle: {
    fontSize: 16,
    fontFamily: "Almarai-Bold",
    color: "#01a736",
    textAlign: "right",
    marginRight: 8,
  },
  changeIndicator: {
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: "#f0fdf4",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  changeAmount: {
    fontSize: 14,
    fontFamily: "Almarai-Bold",
    color: "#01a736",
    marginHorizontal: 4,
  },
  confidenceText: {
    fontSize: 12,
    fontFamily: "Almarai-Medium",
    color: "#6b7280",
    textAlign: "center",
  },
  breakdownContainer: {
    marginBottom: 20,
  },
  breakdownTitle: {
    fontSize: 14,
    fontFamily: "Almarai-Bold",
    color: "#374151",
    textAlign: "right",
    marginBottom: 12,
  },
  breakdownItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  breakdownIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  breakdownDetails: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 12,
  },
  breakdownLabel: {
    fontSize: 13,
    fontFamily: "Almarai-Medium",
    color: "#374151",
    textAlign: "right",
  },
  breakdownAmountContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  breakdownAmount: {
    fontSize: 13,
    fontFamily: "Almarai-Bold",
    color: "#1f2937",
  },
  tinyRiyalIcon: {
    marginRight: 4,
  },
  aiInsightContainer: {
    backgroundColor: "#fffbeb",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#fed7aa",
  },
  aiInsightHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 8,
  },
  aiInsightTitle: {
    fontSize: 14,
    fontFamily: "Almarai-Bold",
    color: "#d97706",
    textAlign: "right",
    marginRight: 6,
  },
  aiInsightText: {
    fontSize: 13,
    fontFamily: "Almarai-Regular",
    color: "#92400e",
    textAlign: "right",
    lineHeight: 20,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 0,
    width: "100%",
    maxWidth: 400,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  modalCloseButton: {
    padding: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "Almarai-Bold",
    color: "#1f2937",
    textAlign: "right",
    flex: 1,
    marginRight: 16,
    lineHeight: 40
  },
  modalContent: {
    paddingHorizontal: 20,
  },
  modalSection: {
    marginBottom: 24,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontFamily: "Almarai-Bold",
    color: "#1f2937",
    textAlign: "right",
    lineHeight: 40
  },
  modalDescription: {
    fontSize: 14,
    fontFamily: "Almarai-Regular",
    color: "#4b5563",
    textAlign: "right",
    lineHeight: 22,
  },
  exampleContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fef3c7",
    padding: 16,
    borderRadius: 12,
  },
  modalExample: {
    fontSize: 14,
    fontFamily: "Almarai-Regular",
    color: "#92400e",
    textAlign: "right",
    lineHeight: 20,
    flex: 1,
    marginRight: 8,
  },
  enabledBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0fdf4",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  enabledText: {
    fontSize: 16,
    fontFamily: "Almarai-Medium",
    color: "#01a736",
    marginRight: 8,
  },
  enableButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#01a736",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  enableButtonText: {
    fontSize: 16,
    fontFamily: "Almarai-Bold",
    color: "#ffffff",
    marginLeft: 8,
  },
  // New Earnings Card Styles
  earningsCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0fdf4",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#bbf7d0",
  },
  earningsContent: {
    flex: 1,
    marginRight: 12,
    alignItems: "flex-end",
  },
  earningsLabel: {
    fontSize: 14,
    fontFamily: "Almarai-Medium",
    color: "#166534",
    textAlign: "right",
    marginBottom: 4,
  },
  earningsValueContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  earningsValue: {
    fontSize: 24,
    fontFamily: "Almarai-Bold",
    color: "#01a736",
  },
  earningsRiyal: {
    marginRight: 6,
  },
  monthlyReturnContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 4,
  },
  smallRiyalIcon: {
    marginRight: 4,
  },
  fundingAmountContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  fundingTotalContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  activityAmountContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginBottom: 2,
  },
  statisticNumber: {
    fontSize: 28,
    fontFamily: "Almarai-Bold",
    color: "#3b82f6",
    textAlign: "center",
    marginBottom: 4,
  },
  projectItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  projectInfo: {
    flex: 1,
    paddingHorizontal: 8,
  },
  projectName: {
    fontSize: 16,
    fontFamily: "Almarai-Medium",
    color: "#1f2937",
    textAlign: "right",
    marginBottom: 4,
  },
  projectPercentage: {
    fontSize: 12,
    fontFamily: "Almarai-Regular",
    color: "#6b7280",
    textAlign: "right",
  },
  learnMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: "#f0fdf4",
  },
  learnMoreText: {
    fontSize: 12,
    fontFamily: "Almarai-Medium",
    color: "#01a736",
    marginLeft: 4,
  },
  projectSeparator: {
    height: 1,
    backgroundColor: "#f1f5f9",
    marginVertical: 8,
  },
  expandedContent: {
    paddingTop: 16,
    paddingBottom: 8,
  },
  projectDescription: {
    fontSize: 14,
    fontFamily: "Almarai-Regular",
    color: "#374151",
    textAlign: "right",
    lineHeight: 22,
    marginBottom: 16,
  },
  projectDetailsGrid: {
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    marginBottom: 8,
    lineHeight: 30,
  },
  detailLabel: {
    fontSize: 13,
    fontFamily: "Almarai-Medium",
    color: "#6b7280",
    marginLeft: 8,
    flex: 1,
    textAlign: "right",
    marginRight: 10,
  },
  detailValue: {
    fontSize: 13,
    fontFamily: "Almarai-Bold",
    color: "#1f2937",
    lineHeight: 35,
    textAlign: "right",
    marginRight: 10
  },
  fundingProgress: {
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    padding: 16,
  },
  fundingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  fundingTitle: {
    fontSize: 14,
    fontFamily: "Almarai-Medium",
    color: "#374151",
  },
  fundingPercentage: {
    fontSize: 14,
    fontFamily: "Almarai-Bold",
    color: "#01a736",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#e5e7eb",
    borderRadius: 4,
    marginBottom: 8,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#01a736",
    borderRadius: 4,
  },
  fundingAmounts: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    lineHeight: 35,
  },
  fundingAmount: {
    fontSize: 13,
    fontFamily: "Almarai-Bold",
    color: "#1f2937",
  },
  fundingTotal: {
    fontSize: 13,
    fontFamily: "Almarai-Regular",
    color: "#6b7280",
    lineHeight: 35,
  },
  impactText: {
    fontSize: 16,
    fontFamily: "Almarai-Medium",
    color: "#374151",
    textAlign: "right",
    marginBottom: 16,
  },
  impactGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  impactItem: {
    alignItems: "center",
    flex: 1,
  },
  impactNumber: {
    fontSize: 24,
    fontFamily: "Almarai-Bold",
    color: "#1f2937",
    marginTop: 8,
    marginBottom: 4,
  },
  impactLabel: {
    fontSize: 12,
    fontFamily: "Almarai-Regular",
    color: "#6b7280",
    lineHeight: 20,
  },
  angelInvestorCard: {
    backgroundColor: "#01a736",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#01a736",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  angelInvestorContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  angelInvestorText: {
    flex: 1,
    marginHorizontal: 16,
  },
  angelInvestorTitle: {
    fontSize: 18,
    fontFamily: "Almarai-Bold",
    color: "#ffffff",
    textAlign: "right",
    marginBottom: 4,
  },
  angelInvestorSubtitle: {
    fontSize: 14,
    fontFamily: "Almarai-Regular",
    color: "#ffffff",
    opacity: 0.9,
    textAlign: "right",
  },
  activityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f0fdf4",
    alignItems: "center",
    justifyContent: "center",
  },
  activityDetails: {
    flex: 1,
    paddingHorizontal: 12,
  },
  activityAmount: {
    fontSize: 14,
    fontFamily: "Almarai-Medium",
    color: "#1f2937",
    textAlign: "right",
  },
  activitySource: {
    fontSize: 12,
    fontFamily: "Almarai-Regular",
    color: "#6b7280",
    textAlign: "right",
  },
  activityDate: {
    fontSize: 12,
    fontFamily: "Almarai-Regular",
    color: "#9ca3af",
  },
  returnPercentage: {
    fontSize: 28,
    fontFamily: "Almarai-Bold",
    color: "#10b981",
    textAlign: "center",
    marginBottom: 4,
  },
  returnSubtitle: {
    fontSize: 14,
    fontFamily: "Almarai-Regular",
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 16,
    marginTop: 4,
  },
  disclaimer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    padding: 12,
    borderRadius: 8,
  },
  disclaimerTextRight: {
    fontSize: 12,
    fontFamily: "Almarai-Regular",
    color: "#6b7280",
    textAlign: "right",
    flex: 1,
  },
});