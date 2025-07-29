import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function SignInPage() {
  const router = useRouter();

  // Animation refs
  const logoAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(50)).current;
  const formAnim = useRef(new Animated.Value(50)).current;
  const buttonAnim = useRef(new Animated.Value(50)).current;
  const iconsAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // States for OTP flow
  const [otpSent, setOtpSent] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const animationSequence = Animated.sequence([
      Animated.timing(logoAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(titleAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(formAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(iconsAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]);

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

  const handleButtonPress = () => {
    if (!otpSent) {
      if (!phoneNumber.trim()) {
        alert("يرجى إدخال رقم الهاتف");
        return;
      }
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setOtpSent(true);
      }, 1000);
    } else {
      if (!otpCode.trim()) {
        alert("يرجى إدخال رمز التحقق");
        return;
      }
      // Navigate to Home
      router.push("/Home");
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
        {/* Floating icons with low opacity */}
        <Animated.View
          style={[styles.floatingIcon, styles.icon1, { opacity: iconsAnim }]}
        >
          <MaterialIcons
            name="trending-up"
            size={30}
            color="rgba(0, 26, 110, 0.1)"
          />
        </Animated.View>
        <Animated.View
          style={[styles.floatingIcon, styles.icon2, { opacity: iconsAnim }]}
        >
          <FontAwesome5 name="coins" size={25} color="rgba(0, 26, 110, 0.1)" />
        </Animated.View>
        <Animated.View
          style={[styles.floatingIcon, styles.icon3, { opacity: iconsAnim }]}
        >
          <MaterialIcons
            name="analytics"
            size={28}
            color="rgba(0, 26, 110, 0.1)"
          />
        </Animated.View>
        <Animated.View
          style={[styles.floatingIcon, styles.icon4, { opacity: iconsAnim }]}
        >
          <FontAwesome5
            name="chart-line"
            size={24}
            color="rgba(0, 26, 110, 0.1)"
          />
        </Animated.View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            {/* Logo */}
            <Animated.View
              style={[styles.logoContainer, { opacity: logoAnim }]}
            >
              <Image
                source={require("@/assets/images/Logo.png")}
                style={styles.image}
                resizeMode="contain"
              />
            </Animated.View>

            {/* Title */}
            <Animated.View
              style={[
                styles.titleContainer,
                { transform: [{ translateY: titleAnim }] },
              ]}
            >
              <Text style={styles.title}>تسجيل الدخول</Text>
              <Text style={styles.subtitle}>
                مرحباً بك مرة أخرى! سجل دخولك للمتابعة
              </Text>
            </Animated.View>

            {/* Form */}
            <Animated.View
              style={[
                styles.formContainer,
                { transform: [{ translateY: formAnim }] },
              ]}
            >
              {!otpSent ? (
                <View style={styles.inputContainer}>
                  <MaterialIcons
                    name="phone"
                    size={20}
                    color="#001a6e"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder="رقم الهاتف"
                    placeholderTextColor="#999"
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    textAlign="right"
                    editable={!loading}
                  />
                </View>
              ) : (
                <View style={styles.inputContainer}>
                  <MaterialIcons
                    name="vpn-key"
                    size={20}
                    color="#001a6e"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder="رمز التحقق"
                    placeholderTextColor="#999"
                    keyboardType="number-pad"
                    value={otpCode}
                    onChangeText={setOtpCode}
                    textAlign="right"
                  />
                </View>
              )}
            </Animated.View>

            {/* Button */}
            <Animated.View
              style={[
                styles.buttonContainer,
                { transform: [{ scale: pulseAnim }] },
              ]}
            >
              <TouchableOpacity
                style={[styles.signInButton, loading && { opacity: 0.7 }]}
                onPress={handleButtonPress}
                activeOpacity={0.8}
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {loading
                    ? "جاري الإرسال..."
                    : otpSent
                    ? "دخول"
                    : "ارسال رمز التحقق"}
                </Text>
                {!loading && (
                  <Ionicons
                    name="arrow-forward"
                    size={24}
                    color="#fefefe"
                    style={styles.buttonIcon}
                  />
                )}
              </TouchableOpacity>
            </Animated.View>

            {/* Sign Up Container */}
            <Animated.View
              style={[styles.signUpContainer, { opacity: iconsAnim }]}
            >
              <Text style={styles.signUpText}>ليس لديك حساب؟ </Text>
              <TouchableOpacity onPress={() => router.push("/signup")}>
                <Text style={styles.signUpLink}>إنشاء حساب جديد</Text>
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
        </ScrollView>
      </View>
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
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  logoContainer: {
    marginBottom: 20,
  },
  image: {
    width: 120,
    height: 120,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: "Almarai-Bold",
    color: "#001a6e",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Almarai-Regular",
    color: "#666",
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    marginTop: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 26, 110, 0.1)",
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    fontFamily: "Almarai-Regular",
    color: "#333",
    textAlignVertical: "center",
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  signInButton: {
    backgroundColor: "#01a736",
    paddingVertical: 18,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    elevation: 8,
    shadowColor: "#01a736",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
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
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    direction:"rtl",
    marginTop: 20,
    marginBottom: 15,
    top: 60
  },
  signUpText: {
    fontSize: 14,
    fontFamily: "Almarai-Regular",
    color: "#666",
  },
  signUpLink: {
    fontSize: 14,
    fontFamily: "Almarai-Bold",
    color: "#01a736",
  },
  infoContainer: {
    alignItems: "center",
    top: 60
  },
  infoText: {
    color: "#999",
    fontSize: 14,
    fontFamily: "Almarai-Regular",
    textAlign: "center",
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
