import { MaterialIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type TabId = "opportunities" | "investments" | "profile";

export default function NavigationBar() {
  const [activeTab, setActiveTab] = useState<TabId>("investments");
  const navAnimations = useRef([
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1)
  ]).current;

  // Enhanced tab change handler with animation
  const handleTabChange = (tab: TabId, index: number) => {
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

  return (
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
}

const styles = StyleSheet.create({
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
});