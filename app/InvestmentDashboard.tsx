import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
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
  riskLevel: "منخفض" | "متوسط" | "عالي";
  location: string;
  startDate: string;
}

interface RecentActivity {
  amount: number;
  date: string;
  source: string;
}

export default function InvestmentDashboard() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

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

  const currentBalance = 127.45;
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
      riskLevel: "منخفض",
      location: "أبها، منطقة عسير",
      startDate: "يناير 2024",
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
      riskLevel: "متوسط",
      location: "خميس مشيط، منطقة عسير",
      startDate: "مارس 2024",
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
      riskLevel: "عالي",
      location: "النماص، منطقة عسير",
      startDate: "فبراير 2024",
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

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "منخفض":
        return "#10b981";
      case "متوسط":
        return "#f59e0b";
      case "عالي":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const getFundingPercentage = (current: number, total: number) => {
    return Math.round((current / total) * 100);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
        <Text style={styles.cardSubtitle}>المبلغ المجمع للفكات حتى الآن</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialIcons name="receipt-long" size={24} color="#3b82f6" />
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitleRight}>عدد العمليات</Text>
          </View>
        </View>
        <Text style={styles.statisticNumber}>{totalTransactions}</Text>
        <Text style={styles.cardSubtitle}>
          جمعت فكة من {totalTransactions} عملية شراء
        </Text>
      </View>

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

                <View style={styles.projectDetailsGrid}>
                  <View style={styles.detailItem}>
                    <MaterialIcons
                      name="location-on"
                      size={16}
                      color="#6b7280"
                    />
                    <Text style={styles.detailLabel}>الموقع</Text>
                    <Text style={styles.detailValue}>{project.location}</Text>
                  </View>

                  <View style={styles.detailItem}>
                    <MaterialIcons
                      name="calendar-today"
                      size={16}
                      color="#6b7280"
                    />
                    <Text style={styles.detailLabel}>تاريخ البدء</Text>
                    <Text style={styles.detailValue}>{project.startDate}</Text>
                  </View>

                  <View style={styles.detailItem}>
                    <MaterialIcons
                      name="trending-up"
                      size={16}
                      color="#6b7280"
                    />
                    <Text style={styles.detailLabel}>العائد الشهري</Text>
                    <View style={styles.monthlyReturnContainer}>
                      <Text style={styles.detailValue}>
                        {project.monthlyReturn}
                      </Text>
                      <RiyalIcon
                        size={14}
                        color="#1f2937"
                        style={styles.smallRiyalIcon}
                      />
                    </View>
                  </View>

                  <View style={styles.detailItem}>
                    <MaterialIcons
                      name="security"
                      size={16}
                      color={getRiskColor(project.riskLevel)}
                    />
                    <Text style={styles.detailLabel}>مستوى المخاطرة</Text>
                    <Text
                      style={[
                        styles.detailValue,
                        { color: getRiskColor(project.riskLevel) },
                      ]}
                    >
                      {project.riskLevel}
                    </Text>
                  </View>
                </View>

                <View style={styles.fundingProgress}>
                  <View style={styles.fundingHeader}>
                    <Text style={styles.fundingTitle}>حالة التمويل</Text>
                    <Text style={styles.fundingPercentage}>
                      {getFundingPercentage(
                        project.currentFunding,
                        project.totalFunding
                      )}
                      %
                    </Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${getFundingPercentage(
                            project.currentFunding,
                            project.totalFunding
                          )}%`,
                        },
                      ]}
                    />
                  </View>
                  <View style={styles.fundingAmounts}>
                    <View style={styles.fundingAmountContainer}>
                      <Text style={styles.fundingAmount}>
                        {project.currentFunding.toLocaleString()}
                      </Text>
                      <RiyalIcon
                        size={14}
                        color="#1f2937"
                        style={styles.smallRiyalIcon}
                      />
                    </View>
                    <View style={styles.fundingTotalContainer}>
                      <Text style={styles.fundingTotal}>
                        من {project.totalFunding.toLocaleString()}
                      </Text>
                      <RiyalIcon
                        size={14}
                        color="#6b7280"
                        style={styles.smallRiyalIcon}
                      />
                    </View>
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

      <TouchableOpacity style={styles.angelInvestorCard}>
        <View style={styles.angelInvestorContent}>
          <MaterialIcons name="stars" size={32} color="#ffffff" />
          <View style={styles.angelInvestorText}>
            <Text style={styles.angelInvestorTitle}>اصبح مستثمر جريء</Text>
            <Text style={styles.angelInvestorSubtitle}>
              استثمر في الفرص الكبيرة واحصل على عوائد أكبر
            </Text>
          </View>
          <MaterialIcons name="arrow-forward-ios" size={20} color="#ffffff" />
        </View>
      </TouchableOpacity>

      <View style={styles.card}>
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
                  أضفت {activity.amount.toFixed(2)}
                </Text>
                <RiyalIcon
                  size={14}
                  color="#1f2937"
                  style={styles.smallRiyalIcon}
                />
              </View>
              <Text style={styles.activitySource}>من {activity.source}</Text>
            </View>
            <Text style={styles.activityDate}>{activity.date}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.card, styles.lastCard]}>
        <View style={styles.cardHeader}>
          <MaterialIcons name="show-chart" size={24} color="#10b981" />
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitleRight}>نسبة العائد المتوقع</Text>
          </View>
        </View>
        <Text style={styles.returnPercentage}>{expectedReturn}%</Text>
        <Text style={styles.returnSubtitle}>التوقعات المستقبلية</Text>
        <View style={styles.disclaimer}>
          <MaterialIcons name="info-outline" size={16} color="#6b7280" />
          <View style={{ flex: 1 }}>
            <Text style={styles.disclaimerTextRight}>
              هذا تقدير وليس مضمون - قد تختلف النتائج الفعلية
            </Text>
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
    marginBottom: 16,
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
    marginBottom: 16,
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
  },
  balanceContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
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
    marginBottom: 8,
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
    marginLeft: -6,
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
    marginBottom: 8,
  },
  returnSubtitle: {
    fontSize: 14,
    fontFamily: "Almarai-Regular",
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 16,
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