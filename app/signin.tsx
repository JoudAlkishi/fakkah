import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function SignInPage() {
  const router = useRouter();

  const logoAnim = useRef(new Animated.Value(0)).current;
  const scanLineAnim = useRef(new Animated.Value(-60)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [showFaceId, setShowFaceId] = useState(false);
  const [scanStatus, setScanStatus] = useState("scanning"); 

  useEffect(() => {

    Animated.timing(logoAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();


    const timer = setTimeout(() => {
      setShowFaceId(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showFaceId) {
      startFaceIdAnimation();
    }
  }, [showFaceId]);

  const startFaceIdAnimation = () => {
    setScanStatus("scanning");


    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

   
    const scanAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, {
          toValue: 60,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scanLineAnim, {
          toValue: -60,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
      { iterations: 1 }
    );

    scanAnimation.start(() => {
     
      setScanStatus("success");

      setTimeout(() => {
        setShowFaceId(false);
        router.push("/Home");
      }, 500);
    });
  };

  const handleSignIn = () => {
   
    if (!showFaceId) {
      setShowFaceId(true);
    }
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fefefe"
        translucent={false}
      />
      <View style={styles.background}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <Animated.View
              style={[styles.logoContainer, { opacity: logoAnim }]}
            >
              <TouchableOpacity onPress={handleSignIn} activeOpacity={0.8}>
                <Image
                  source={require("@/assets/images/GreenFakatk.png")}
                  style={styles.image}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </ScrollView>
      </View>

      {/* Face ID Modal */}
      <Modal visible={showFaceId} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.modalContent, { opacity: fadeAnim }]}>
            <View style={styles.faceIdContainer}>
              <View style={styles.faceIdWrapper}>
                {/* Face ID Icon - Apple Style */}
                <View style={styles.faceIdIcon}>
                  {/* Corner brackets */}
                  <View style={[styles.bracket, styles.topLeftBracket]} />
                  <View style={[styles.bracket, styles.topRightBracket]} />
                  <View style={[styles.bracket, styles.bottomLeftBracket]} />
                  <View style={[styles.bracket, styles.bottomRightBracket]} />

                  {/* Simple face elements */}
                  <View style={styles.faceElements}>
                    {/* Eyes */}
                    <View style={styles.eyesRow}>
                      <View style={styles.eye} />
                      <View style={styles.eye} />
                    </View>

                    {/* Mouth */}
                    <View style={styles.mouth} />
                  </View>

                  {/* Scanning line animation */}
                  {scanStatus === "scanning" && (
                    <Animated.View
                      style={[
                        styles.scanLine,
                        {
                          transform: [{ translateY: scanLineAnim }],
                        },
                      ]}
                    />
                  )}
                </View>
              </View>

              {/* Status indicator */}
              {scanStatus === "success" && (
                <View style={styles.successIndicator}>
                  <Ionicons
                    name="checkmark-circle"
                    size={100}
                    color="#30d158"
                  />
                </View>
              )}
            </View>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#fefefe",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    bottom: 300

  },
  image: {
    width: 120,
    height: 150,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    alignItems: "center",
    justifyContent: "center",
    width: screenWidth,
    height: screenHeight * 0.5,
  },
  faceIdContainer: {
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  faceIdWrapper: {
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  faceIdIcon: {
    width: 120,
    height: 120,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  bracket: {
    position: "absolute",
    borderColor: "#ffffff",
    borderWidth: 3,
  },
  topLeftBracket: {
    top: 0,
    left: 0,
    width: 30,
    height: 30,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 12,
  },
  topRightBracket: {
    top: 0,
    right: 0,
    width: 30,
    height: 30,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 12,
  },
  bottomLeftBracket: {
    bottom: 0,
    left: 0,
    width: 30,
    height: 30,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 12,
  },
  bottomRightBracket: {
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 12,
  },
  faceElements: {
    alignItems: "center",
    justifyContent: "center",
  },
  eyesRow: {
    flexDirection: "row",
    marginBottom: 15,
  },
  eye: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ffffff",
    marginHorizontal: 15,
  },
  mouth: {
    width: 30,
    height: 15,
    borderBottomWidth: 3,
    borderBottomColor: "#ffffff",
    borderRadius: 15,
  },
  scanLine: {
    position: "absolute",
    width: 140,
    height: 2,
    backgroundColor: "#30d158",
    opacity: 0.8,
    shadowColor: "#30d158",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  successIndicator: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});
