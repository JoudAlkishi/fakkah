import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function WelcomePage() {
  const router = useRouter();

  // Animation references
  const logoAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(50)).current;
  const subtitleAnim = useRef(new Animated.Value(50)).current;
  const buttonAnim = useRef(new Animated.Value(50)).current;
  const iconsAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Sequential animations
    const animationSequence = Animated.sequence([
      // Logo fade in
      Animated.timing(logoAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      // Title slide up
      Animated.timing(titleAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      // Subtitle slide up
      Animated.timing(subtitleAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      // Icons fade in
      Animated.timing(iconsAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      // Button slide up
      Animated.timing(buttonAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]);

    // Pulse animation for button
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    animationSequence.start();
    pulseLoop.start();

    return () => {
      pulseLoop.stop();
    };
  }, []);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <ImageBackground
        source={require("@/assets/images/StartBg.png")}
        style={styles.background}
        resizeMode="cover"
      >
        {/* Gradient Overlay */}
        <View style={styles.gradientOverlay} />

        {/* Floating Icons Background */}
        <Animated.View
          style={[styles.floatingIcon, styles.icon1, { opacity: iconsAnim }]}
        >
          <MaterialIcons
            name="trending-up"
            size={30}
            color="rgba(1, 167, 54, 0.3)"
          />
        </Animated.View>
        <Animated.View
          style={[styles.floatingIcon, styles.icon2, { opacity: iconsAnim }]}
        >
          <FontAwesome5 name="coins" size={25} color="rgba(1, 167, 54, 0.3)" />
        </Animated.View>
        <Animated.View
          style={[styles.floatingIcon, styles.icon3, { opacity: iconsAnim }]}
        >
          <MaterialIcons
            name="analytics"
            size={28}
            color="rgba(1, 167, 54, 0.3)"
          />
        </Animated.View>
        <Animated.View
          style={[styles.floatingIcon, styles.icon4, { opacity: iconsAnim }]}
        >
          <FontAwesome5
            name="chart-line"
            size={24}
            color="rgba(1, 167, 54, 0.3)"
          />
        </Animated.View>

        <View style={styles.container}>
          {/* Logo Section */}
          <Animated.View style={[styles.logoContainer, { opacity: logoAnim }]}>
            <Image
              source={require("@/assets/images/Logo.png")}
              style={styles.image}
              resizeMode="contain"
            />
          </Animated.View>

          {/* Main Content */}
          <View style={styles.contentContainer}>
            {/* <Animated.View
              style={[
                styles.textContainer,
                {
                  transform: [{ translateY: titleAnim }],
                },
              ]}
            >
              <Text style={styles.title}>استثمر بذكاء</Text>
            </Animated.View> */}

            <Animated.View
              style={[
                styles.subtitleContainer,
                {
                  transform: [{ translateY: subtitleAnim }],
                },
              ]}
            >
              <Text style={styles.subtitle}>
                ابدأ رحلتك الاستثمارية مع أفضل الأدوات والتحليلات
              </Text>
            </Animated.View>

            {/* Features Icons */}
            <Animated.View
              style={[styles.featuresContainer, { opacity: iconsAnim }]}
            >
              <View style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <MaterialIcons name="security" size={24} color="#01a736" />
                </View>
                <Text style={styles.featureText}>آمان</Text>
              </View>
              <View style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <MaterialIcons name="speed" size={24} color="#01a736" />
                </View>
                <Text style={styles.featureText}>سرعة</Text>
              </View>
              <View style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <FontAwesome5 name="chart-bar" size={24} color="#01a736" />
                </View>
                <Text style={styles.featureText}>تحليل</Text>
              </View>
            </Animated.View>

            {/* Start Button */}
            <Animated.View
              style={[
                styles.buttonContainer,
                {
                  transform: [{ translateY: buttonAnim }, { scale: pulseAnim }],
                },
              ]}
            >
              <TouchableOpacity
                style={styles.startButton}
                onPress={() => router.push("/getStarted")}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>ابدأ الآن</Text>
                <Ionicons
                  name="arrow-forward"
                  size={24}
                  color="#fefefe"
                  style={styles.buttonIcon}
                />
              </TouchableOpacity>
            </Animated.View>

            {/* Additional Info */}
            <Animated.View
              style={[styles.infoContainer, { opacity: iconsAnim }]}
            >
              <Text style={styles.infoText}>
                انضم إلى أكثر من 10,000 مستثمر
              </Text>
            </Animated.View>
          </View>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: "rgba(0, 26, 110, 0.7)",
    backgroundColor: "rgba(0, 26, 110, 0.5)",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 100,
  },
  image: {
    width: 150,
    height: 150,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 40,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontFamily: "Almarai-Bold",
    color: "#fefefe",
    textAlign: "center",
    marginBottom: 8,
    textShadowColor: "rgba(0, 26, 110, 0.8)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitleContainer: {
    alignItems: "center",
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Almarai-Regular",
    color: "#fefefe",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 8,
    opacity: 0.9,
  },
  featuresContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  featureItem: {
    alignItems: "center",
  },
  featureIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(254, 254, 254, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 2,
    borderColor: "rgba(1, 167, 54, 0.5)",
    elevation: 4,
    shadowColor: "#01a736",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  featureText: {
    color: "#fefefe",
    fontSize: 14,
    fontFamily: "Almarai-Bold",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
    top: 30
  },
  startButton: {
    backgroundColor: "#01a736",
    paddingHorizontal: 50,
    paddingVertical: 18,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    shadowColor: "#01a736",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    minWidth: 200,
    borderWidth: 2,
    borderColor: "rgba(254, 254, 254, 0.2)",
  },
  buttonText: {
    color: "#fefefe",
    fontSize: 18,
    fontFamily: "Almarai-Bold",
    marginRight: 10,
  },
  buttonIcon: {
    marginLeft: 5,
  },
  infoContainer: {
    alignItems: "center",
  },
  infoText: {
    color: "#fefefe",
    fontSize: 14,
    fontFamily: "Almarai-Bold",
    textAlign: "center",
    opacity: 0.8,
    top: 25
  },
  // Floating Icons
  floatingIcon: {
    position: "absolute",
  },
  icon1: {
    top: height * 0.15,
    left: width * 0.1,
  },
  icon2: {
    top: height * 0.25,
    right: width * 0.15,
  },
  icon3: {
    bottom: height * 0.35,
    left: width * 0.08,
  },
  icon4: {
    bottom: height * 0.25,
    right: width * 0.12,
  },
});
