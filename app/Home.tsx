import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Image,
    RefreshControl,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width, height } = Dimensions.get("window");

interface BaseOpportunity {
  id: number;
  title: string;
  category: string;
  location: string;
  description: string;
  image: any;
}

interface AngelOpportunity extends BaseOpportunity {
  fundingGoal: string;
  currentFunding: string;
  progress: number;
  totalSupport: number;
  opportunityStatus: "New" | "Active" | "Closing Soon" | "Funded";
  requiredBudget: string;
  expectedROI: string;
  duration: string;
  businessModel: "B2B" | "B2C" | "B2B2C" | "Marketplace" | "SaaS";
  riskLevel: "منخفض" | "متوسط" | "عالي";
}

type UserType = "normal" | "angel";

export default function HomePage() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [userType, setUserType] = useState<UserType>("angel");
  const [autoInvest, setAutoInvest] = useState(false);
  const [activeTab, setActiveTab] = useState("investments");

  // Animation references
  const headerAnim = useRef(new Animated.Value(0)).current;
  const contentAnim = useRef(new Animated.Value(50)).current;
  const navAnimations = useRef([
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1)
  ]).current;

  // Normal user change collection
  const [changeBalance, setChangeBalance] = useState(47.50);
  const investmentThreshold = 50.00;

  // Sample opportunities data - SMEs in Aseer region only
  const [opportunities, setOpportunities] = useState<AngelOpportunity[]>([
    {
      id: 1,
      title: "مصنع العسل الطبيعي",
      category: "الصناعات الغذائية",
      location: "أبها",
      description: "مصنع متخصص في إنتاج وتعبئة العسل الطبيعي من مناحل منطقة عسير مع التركيز على الجودة والتسويق الرقمي",
      fundingGoal: "150,000",
      currentFunding: "95,000",
      progress: 63,
      totalSupport: 12,
      opportunityStatus: "Active",
      requiredBudget: "15,000",
      expectedROI: "18-25%",
      duration: "12-18 شهر",
      businessModel: "B2C",
      riskLevel: "منخفض",
      image: require("@/assets/images/Logo.png"),
    },
    {
      id: 2,
      title: "ورشة الحرف اليدوية التراثية",
      category: "الحرف والصناعات التقليدية",
      location: "خميس مشيط",
      description: "ورشة لإنتاج الحرف اليدوية التراثية العسيرية وتطوير منتجات حديثة مستوحاة من التراث المحلي",
      fundingGoal: "85,000",
      currentFunding: "52,000",
      progress: 61,
      totalSupport: 8,
      opportunityStatus: "Active",
      requiredBudget: "8,000",
      expectedROI: "15-22%",
      duration: "10-15 شهر",
      businessModel: "B2C",
      riskLevel: "متوسط",
      image: require("@/assets/images/Logo.png"),
    },
    {
      id: 3,
      title: "مزرعة الورود والنباتات العطرية",
      category: "الزراعة والبستنة",
      location: "النماص",
      description: "مزرعة متخصصة في زراعة الورود والنباتات العطرية واستخراج الزيوت الطبيعية للاستخدام في صناعة العطور والمنتجات التجميلية",
      fundingGoal: "120,000",
      currentFunding: "72,000",
      progress: 60,
      totalSupport: 15,
      opportunityStatus: "Closing Soon",
      requiredBudget: "12,000",
      expectedROI: "20-28%",
      duration: "18-24 شهر",
      businessModel: "B2B",
      riskLevel: "متوسط",
      image: require("@/assets/images/Logo.png"),
    },
    {
      id: 4,
      title: "محل القهوة العسيرية المختصة",
      category: "خدمات الضيافة",
      location: "بيشة",
      description: "محل قهوة متخصص في تحميص وتقديم القهوة العسيرية التراثية مع إضافة لمسات عصرية وخدمات التوصيل المحلي",
      fundingGoal: "95,000",
      currentFunding: "38,000",
      progress: 40,
      totalSupport: 6,
      opportunityStatus: "New",
      requiredBudget: "10,000",
      expectedROI: "22-30%",
      duration: "8-12 شهر",
      businessModel: "B2C",
      riskLevel: "متوسط",
      image: require("@/assets/images/Logo.png"),
    },
    {
      id: 5,
      title: "مشغل الخياطة والتطريز النسائي",
      category: "الخدمات المهنية",
      location: "محايل عسير",
      description: "مشغل نسائي متخصص في الخياطة والتطريز التراثي العسيري مع خدمات التفصيل الحديث والتدريب المهني للنساء",
      fundingGoal: "75,000",
      currentFunding: "75,000",
      progress: 100,
      totalSupport: 20,
      opportunityStatus: "Funded",
      requiredBudget: "7,500",
      expectedROI: "16-24%",
      duration: "6-12 شهر",
      businessModel: "B2C",
      riskLevel: "منخفض",
      image: require("@/assets/images/Logo.png"),
    },
  ]);

  useEffect(() => {
    const animationSequence = Animated.stagger(200, [
      Animated.timing(headerAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(contentAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]);

    animationSequence.start();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New": return "#2196F3";
      case "Active": return "#01a736";
      case "Closing Soon": return "#ff9800";
      case "Funded": return "#4CAF50";
      default: return "#666";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "New": return "جديد";
      case "Active": return "نشط";
      case "Closing Soon": return "ينتهي قريباً";
      case "Funded": return "مُمول";
      default: return status;
    }
  };

  // Enhanced tab change handler with animation
  const handleTabChange = (tab: string, index: number) => {
    if (tab === activeTab) return;
    
    // Animate button press
    Animated.sequence([
      Animated.timing(navAnimations[index], {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(navAnimations[index], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      })
    ]).start();

    setActiveTab(tab);
  };

  const renderHeader = () => (
    <Animated.View 
      style={[
        styles.header,
        { 
          opacity: headerAnim,
          transform: [{ translateY: headerAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [-50, 0]
          })}]
        }
      ]}
    >
      <View style={styles.headerContent}>
        <TouchableOpacity style={styles.profileButton}>
          <MaterialIcons name="person" size={24} color="#001a6e" />
        </TouchableOpacity>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>مرحباً بك</Text>
          <Text style={styles.userName}>
            {userType === "angel" ? "أحمد محمد" : "سارة أحمد"}
          </Text>
          <Text style={styles.userTypeLabel}>
            {userType === "angel" ? "مستثمر ملاك" : "مستخدم عادي"}
          </Text>
        </View>
      </View>
    </Animated.View>
  );

  const renderChangeTracker = () => {
    if (userType !== "normal") return null;
    
    const progressPercentage = (changeBalance / investmentThreshold) * 100;
    const canInvest = changeBalance >= investmentThreshold;

    return (
      <Animated.View 
        style={[
          styles.changeContainer,
          { transform: [{ translateY: contentAnim }] }
        ]}
      >
        <View style={styles.changeCard}>
          <View style={styles.changeHeader}>
            <View style={styles.autoInvestContainer}>
              <Switch
                value={autoInvest}
                onValueChange={setAutoInvest}
                trackColor={{ false: "#e0e0e0", true: "#01a736" }}
                thumbColor={autoInvest ? "#fefefe" : "#666"}
              />
              <Text style={styles.autoInvestLabel}>استثمار تلقائي</Text>
            </View>
            <Text style={styles.changeTitle}>رصيد الفكة</Text>
          </View>
          
          <Text style={styles.changeBalance}>{changeBalance.toFixed(2)} ر.س</Text>
          <Text style={styles.thresholdText}>
            الحد الأدنى للاستثمار: {investmentThreshold.toFixed(2)} ر.س
          </Text>
          
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>{progressPercentage.toFixed(0)}%</Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${Math.min(progressPercentage, 100)}%` }
                ]} 
              />
            </View>
          </View>
          
          {canInvest && (
            <View style={styles.readyToInvestBadge}>
              <Text style={styles.readyToInvestText}>جاهز للاستثمار!</Text>
              <MaterialIcons name="check-circle" size={16} color="#01a736" />
            </View>
          )}
        </View>
      </Animated.View>
    );
  };

  const renderOpportunities = () => (
    <Animated.View 
      style={[
        styles.opportunitiesContainer,
        { transform: [{ translateY: contentAnim }] }
      ]}
    >
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>فرص الاستثمار في المشاريع الصغيرة والمتوسطة</Text>
        <Text style={styles.sectionSubtitle}>منطقة عسير</Text>
      </View>
      
      {opportunities.map((opportunity) => (
        <TouchableOpacity key={opportunity.id} style={styles.opportunityCard}>
          <Image source={opportunity.image} style={styles.opportunityImage} />
          
          <View style={styles.opportunityContent}>
            <View style={styles.opportunityHeader}>
              {userType === "angel" && (
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(opportunity.opportunityStatus) }]}>
                  <Text style={styles.statusText}>{getStatusText(opportunity.opportunityStatus)}</Text>
                </View>
              )}
              <Text style={styles.opportunityTitle}>{opportunity.title}</Text>
            </View>
            
            <Text style={styles.opportunityCategory}>{opportunity.category}</Text>
            <View style={styles.locationContainer}>
              <Text style={styles.locationText}>{opportunity.location} - منطقة عسير</Text>
              <MaterialIcons name="location-on" size={16} color="#666" />
            </View>
            
            <Text style={styles.descriptionText} numberOfLines={2}>
              {opportunity.description}
            </Text>
            
            {userType === "angel" ? (
              <View style={styles.angelDetails}>
                <View style={styles.smeLabel}>
                  <Text style={styles.smeLabelText}>مشروع صغير ومتوسط</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Text style={styles.detailValue}>{opportunity.fundingGoal} ر.س</Text>
                  <Text style={styles.detailLabel}>الهدف:</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailValue}>{opportunity.expectedROI}</Text>
                  <Text style={styles.detailLabel}>العائد المتوقع:</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailValue}>{opportunity.duration}</Text>
                  <Text style={styles.detailLabel}>المدة:</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailValue}>{opportunity.businessModel}</Text>
                  <Text style={styles.detailLabel}>نموذج العمل:</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailValue}>{opportunity.requiredBudget} ر.س</Text>
                  <Text style={styles.detailLabel}>الحد الأدنى:</Text>
                </View>
                
                <View style={styles.progressContainer}>
                  <Text style={styles.progressText}>{opportunity.progress}%</Text>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { width: `${opportunity.progress}%` }
                      ]} 
                    />
                  </View>
                </View>
                
                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.followButton}>
                    <Text style={styles.followButtonText}>متابعة</Text>
                    <MaterialIcons name="bookmark-border" size={20} color="#001a6e" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.investButton}>
                    <Text style={styles.investButtonText}>استثمر الآن</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.normalUserActions}>
                {changeBalance >= investmentThreshold && (
                  <TouchableOpacity 
                    style={[
                      styles.selectButton, 
                      { backgroundColor: autoInvest ? "rgba(1, 167, 54, 0.1)" : "#01a736" }
                    ]}
                  >
                    <Text style={[
                      styles.selectButtonText,
                      { color: autoInvest ? "#01a736" : "#fefefe" }
                    ]}>
                      {autoInvest ? "مُختار للاستثمار التلقائي" : "اختر للاستثمار"}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </Animated.View>
  );

  const renderBottomNavigation = () => (
    <View style={styles.bottomNavigation}>
      {/* Opportunities Tab */}
      <Animated.View style={{ transform: [{ scale: navAnimations[0] }] }}>
        <TouchableOpacity 
          style={[
            styles.navItem, 
            activeTab === "opportunities" && styles.activeNavItem
          ]}
          onPress={() => handleTabChange("opportunities", 0)}
          activeOpacity={0.8}
        >
          <View style={[
            styles.iconContainer,
            activeTab === "opportunities" && styles.activeIconContainer
          ]}>
            <MaterialIcons 
              name="business" 
              size={22} 
              color={activeTab === "opportunities" ? "#01a736" : "#8e8e93"} 
            />
            {activeTab === "opportunities" && <View style={styles.activeIndicator} />}
          </View>
          <Text style={[
            styles.navText, 
            activeTab === "opportunities" && styles.activeNavText
          ]}>
            الفرص
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Central Investments Tab */}
      <Animated.View style={{ transform: [{ scale: navAnimations[1] }] }}>
        <TouchableOpacity 
          style={[
            styles.navItem, 
            styles.centralNavItem,
            activeTab === "investments" && styles.activeCentralNavItem
          ]}
          onPress={() => handleTabChange("investments", 1)}
          activeOpacity={0.8}
        >
          <View style={styles.centralIconContainer}>
            <MaterialIcons 
              name="trending-up" 
              size={26} 
              color="#fefefe"
            />
          </View>
          <Text style={styles.centralNavText}>
            استثماراتك
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Profile Tab */}
      <Animated.View style={{ transform: [{ scale: navAnimations[2] }] }}>
        <TouchableOpacity 
          style={[
            styles.navItem, 
            activeTab === "profile" && styles.activeNavItem
          ]}
          onPress={() => handleTabChange("profile", 2)}
          activeOpacity={0.8}
        >
          <View style={[
            styles.iconContainer,
            activeTab === "profile" && styles.activeIconContainer
          ]}>
            <MaterialIcons 
              name="person" 
              size={22} 
              color={activeTab === "profile" ? "#01a736" : "#8e8e93"} 
            />
            {activeTab === "profile" && <View style={styles.activeIndicator} />}
          </View>
          <Text style={[
            styles.navText, 
            activeTab === "profile" && styles.activeNavText
          ]}>
            الحساب الشخصي
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fefefe"
        translucent={false}
      />
      <View style={styles.container}>
        {renderHeader()}
        
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.scrollContent}
        >
          {renderChangeTracker()}
          {renderOpportunities()}
          
          <View style={styles.bottomSpacing} />
        </ScrollView>

        {renderBottomNavigation()}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#fefefe",
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 26, 110, 0.1)",
    elevation: 2,
    shadowColor: "#001a6e",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerContent: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
  },
  welcomeSection: {
    flex: 1,
    alignItems: "flex-end",
  },
  welcomeText: {
    fontSize: 16,
    fontFamily: "Almarai-Regular",
    color: "#666",
    textAlign: "right",
  },
  userName: {
    fontSize: 24,
    fontFamily: "Almarai-Bold",
    color: "#001a6e",
    marginTop: 2,
    textAlign: "right",
  },
  userTypeLabel: {
    fontSize: 12,
    fontFamily: "Almarai-Regular",
    color: "#01a736",
    marginTop: 2,
    textAlign: "right",
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(1, 167, 54, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Space for bottom navigation
  },
  changeContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  changeCard: {
    backgroundColor: "#fefefe",
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: "#001a6e",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(0, 26, 110, 0.1)",
  },
  changeHeader: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  changeTitle: {
    fontSize: 18,
    fontFamily: "Almarai-Bold",
    color: "#001a6e",
    textAlign: "right",
  },
  autoInvestContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  autoInvestLabel: {
    fontSize: 12,
    fontFamily: "Almarai-Regular",
    color: "#666",
    marginLeft: 8,
    textAlign: "right",
  },
  changeBalance: {
    fontSize: 32,
    fontFamily: "Almarai-Bold",
    color: "#01a736",
    textAlign: "center",
    marginBottom: 8,
  },
  thresholdText: {
    fontSize: 14,
    fontFamily: "Almarai-Regular",
    color: "#666",
    textAlign: "center",
    marginBottom: 16,
  },
  progressContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginBottom: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginLeft: 12,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#01a736",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontFamily: "Almarai-Bold",
    color: "#01a736",
    minWidth: 40,
    textAlign: "right",
  },
  readyToInvestBadge: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(1, 167, 54, 0.1)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  readyToInvestText: {
    fontSize: 14,
    fontFamily: "Almarai-Bold",
    color: "#01a736",
    marginRight: 4,
    textAlign: "right",
  },
  opportunitiesContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Almarai-Bold",
    color: "#001a6e",
    textAlign: "right",
  },
  sectionHeader: {
    marginBottom: 20,
    alignItems: "flex-end",
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: "Almarai-Regular",
    color: "#01a736",
    textAlign: "right",
    marginTop: 4,
  },
  opportunityCard: {
    backgroundColor: "#fefefe",
    borderRadius: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: "#001a6e",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(0, 26, 110, 0.1)",
    overflow: "hidden",
  },
  opportunityImage: {
    width: "100%",
    height: 150,
    backgroundColor: "rgba(0, 26, 110, 0.1)",
  },
  opportunityContent: {
    padding: 16,
  },
  opportunityHeader: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  opportunityTitle: {
    fontSize: 18,
    fontFamily: "Almarai-Bold",
    color: "#001a6e",
    flex: 1,
    textAlign: "right",
    marginLeft: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontFamily: "Almarai-Bold",
    color: "#fefefe",
    textAlign: "center",
  },
  opportunityCategory: {
    fontSize: 14,
    fontFamily: "Almarai-Regular",
    color: "#666",
    marginBottom: 8,
    textAlign: "right",
  },
  locationContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginBottom: 12,
    justifyContent: "flex-end",
  },
  locationText: {
    fontSize: 14,
    fontFamily: "Almarai-Regular",
    color: "#666",
    marginLeft: 4,
    textAlign: "right",
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: "Almarai-Regular",
    color: "#333",
    textAlign: "right",
    lineHeight: 20,
    marginBottom: 16,
  },
  angelDetails: {
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 26, 110, 0.1)",
    paddingTop: 16,
  },
  detailRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 12,
    fontFamily: "Almarai-Regular",
    color: "#666",
    textAlign: "right",
  },
  detailValue: {
    fontSize: 12,
    fontFamily: "Almarai-Bold",
    color: "#333",
    textAlign: "right",
  },
  actionButtons: {
    flexDirection: "row-reverse",
    marginTop: 16,
  },
  investButton: {
    flex: 1,
    backgroundColor: "#01a736",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 8,
  },
  investButtonText: {
    fontSize: 14,
    fontFamily: "Almarai-Bold",
    color: "#fefefe",
    textAlign: "center",
  },
  followButton: {
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: "rgba(0, 26, 110, 0.1)",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  followButtonText: {
    fontSize: 14,
    fontFamily: "Almarai-Regular",
    color: "#001a6e",
    marginRight: 4,
    textAlign: "center",
  },
  normalUserActions: {
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 26, 110, 0.1)",
    paddingTop: 16,
  },
  selectButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  selectButtonText: {
    fontSize: 14,
    fontFamily: "Almarai-Bold",
    textAlign: "center",
  },
  bottomSpacing: {
    height: 20,
  },
  // Enhanced Bottom Navigation Styles
  bottomNavigation: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fefefe",
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 26, 110, 0.08)",
    flexDirection: "row",
    paddingTop: 12,
    paddingBottom: 28,
    paddingHorizontal: 16,
    elevation: 12,
    shadowColor: "#001a6e",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    alignItems: "flex-end",
    justifyContent: "space-around",
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    minHeight: 60,
    minWidth: 80,
  },
  centralNavItem: {
    backgroundColor: "#01a736",
    marginHorizontal: 8,
    minWidth: 100,
    elevation: 8,
    shadowColor: "#01a736",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    borderRadius: 28,
    transform: [{ translateY: -12 }],
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  activeCentralNavItem: {
    backgroundColor: "#00922e",
    elevation: 8,
    shadowOpacity: 0.4,
  },
  activeNavItem: {
    backgroundColor: "rgba(1, 167, 54, 0.08)",
    transform: [{ scale: 1.02 }],
  },
  iconContainer: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    marginBottom: 6,
    position: "relative",
  },
  activeIconContainer: {
    backgroundColor: "rgba(1, 167, 54, 0.15)",
  },
  centralIconContainer: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginBottom: 6,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  activeIndicator: {
    position: "absolute",
    bottom: -2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#01a736",
  },
  navText: {
    fontSize: 11,
    fontFamily: "Almarai-Regular",
    color: "#8e8e93",
    textAlign: "center",
    lineHeight: 14,
    marginTop: 2,
  },
  centralNavText: {
    color: "#fefefe",
    fontFamily: "Almarai-Bold",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 16,
    marginTop: 2,
  },
  activeNavText: {
    color: "#01a736",
    fontFamily: "Almarai-Bold",
  },
  // SME Label styles
  smeLabel: {
    alignSelf: "flex-end",
    backgroundColor: "rgba(255, 152, 0, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  smeLabelText: {
    fontSize: 10,
    fontFamily: "Almarai-Bold",
    color: "#ff9800",
    textAlign: "center",
  },
});