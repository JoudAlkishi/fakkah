import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import InvestmentDashboard from "./InvestmentDashboard";
import OpportunitiesScreen from "./OpportunitiesScreen";
import ProfileScreen from "./ProfileScreen";

type TabId = "opportunities" | "investments" | "profile";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("investments");

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
  };

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "صباح الخير";
    if (hour < 18) return "مساء الخير";
    return "مساء الخير";
  };

  const renderContent = () => {
    switch (activeTab) {
      case "investments":
        return (
          <View style={styles.container}>
            <View style={styles.welcomeHeader}>
              <View style={styles.welcomeContent}>
                <View style={styles.welcomeRow}>
                  <TouchableOpacity style={styles.notificationIcon}>
                    <MaterialIcons
                      name="notifications-none"
                      size={20}
                      color="#6b7280"
                    />
                    <View style={styles.notificationDot} />
                  </TouchableOpacity>
                  <Text style={styles.welcomeText}>{getWelcomeMessage()}</Text>
                </View>
                <Text style={styles.userName}>عبدالكريم الشهري</Text>
              </View>
            </View>

            {/* Dashboard Content */}
            <InvestmentDashboard />
          </View>
        );

      case "opportunities":
        return <OpportunitiesScreen />;

      case "profile":
        return <ProfileScreen />;

      default:
        return null;
    }
  };

  return (
    <View style={styles.mainContainer}>
      {/* Content */}
      {renderContent()}

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        {/* Opportunities Tab */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleTabChange("opportunities")}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.iconContainer,
              activeTab === "opportunities" && styles.activeIconContainer,
            ]}
          >
            <MaterialIcons
              name="business"
              size={24}
              color={activeTab === "opportunities" ? "#ffffff" : "#6b7280"}
            />
          </View>
          <Text
            style={[
              styles.navText,
              activeTab === "opportunities" && styles.activeNavText,
            ]}
          >
            الفرص
          </Text>
        </TouchableOpacity>

        {/* Investments Tab */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleTabChange("investments")}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.iconContainer,
              activeTab === "investments" && styles.activeIconContainer,
            ]}
          >
            <MaterialIcons
              name="trending-up"
              size={24}
              color={activeTab === "investments" ? "#ffffff" : "#6b7280"}
            />
          </View>
          <Text
            style={[
              styles.navText,
              activeTab === "investments" && styles.activeNavText,
            ]}
          >
            استثماراتي
          </Text>
        </TouchableOpacity>

        {/* Profile Tab */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleTabChange("profile")}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.iconContainer,
              activeTab === "profile" && styles.activeIconContainer,
            ]}
          >
            <MaterialIcons
              name="person"
              size={24}
              color={activeTab === "profile" ? "#ffffff" : "#6b7280"}
            />
          </View>
          <Text
            style={[
              styles.navText,
              activeTab === "profile" && styles.activeNavText,
            ]}
          >
            حسابي الشخصي
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  welcomeHeader: {
    backgroundColor: "#ffffff",
    paddingTop: 25,
    paddingBottom: 40,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  welcomeContent: {
    alignItems: "flex-end",
  },
  welcomeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 8,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f8fafc",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  notificationDot: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ff4757",
  },
  welcomeText: {
    fontSize: 20,
    fontFamily: Platform.select({
      ios: "Almarai",
      android: "almarai_regular",
      default: "sans-serif"
    }),
    fontWeight: "400",
    color: "#6b7280",
    textAlign: "right",
    lineHeight: 25,
  },
  userName: {
    fontSize: 30,
    fontFamily: Platform.select({
      ios: "Almarai",
      android: "almarai_bold",
      default: "sans-serif"
    }),
    fontWeight: "700",
    color: "#001a6e",
    textAlign: "right",
    lineHeight: 50,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 70,
  },
  contentText: {
    fontSize: 18,
    fontFamily: Platform.select({
      ios: "Almarai-Medium",
      android: "Almarai-Medium",
      default: "System"
    }),
    fontWeight: Platform.OS === 'web' ? '500' : 'normal',
    color: "#374151",
    textAlign: "center",
  },
  // Bottom Navigation
  bottomNavigation: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
    flexDirection: "row",
    paddingTop: 8,
    paddingBottom: 20,
    paddingHorizontal: 24,
    elevation: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    alignItems: "center",
    justifyContent: "space-around",
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    paddingHorizontal: 12,
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    marginBottom: 4,
    backgroundColor: "#f8fafc",
  },
  activeIconContainer: {
    backgroundColor: "#01a736",
    elevation: 4,
    shadowColor: "#01a736",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  navText: {
    fontSize: 11,
    fontFamily: Platform.select({
      ios: "Almarai", 
      android: "almarai_medium", 
      default: "sans-serif"
    }),
    fontWeight: "500", 
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 20,
  },
  activeNavText: {
    color: "#01a736",
    fontFamily: Platform.select({
      ios: "Almarai",
      android: "almarai_medium",
      default: "sans-serif"
    }),
    fontWeight: "600",
  },
});