import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";


export default function SignInPage() {
  const router = useRouter();

  const logoAnim = useRef(new Animated.Value(0)).current;

  const [otpSent, setOtpSent] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Animated.timing(logoAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
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
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <Animated.View
              style={[styles.logoContainer, { opacity: logoAnim }]}
            >
              <Image
                source={require("@/assets/images/GreenFakatk.png")}
                style={styles.image}
                resizeMode="contain"
              />
            </Animated.View>

            <View style={styles.titleContainer}>
              <Text style={styles.title}>تسجيل الدخول</Text>
              <Text style={styles.subtitle}>مرحبا هيل، عداد السيل</Text>
            </View>

            <View style={styles.formContainer}>
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
            </View>

            <View style={styles.buttonContainer}>
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
            </View>

            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>ليس لديك حساب؟ </Text>
              <TouchableOpacity onPress={() => router.push("/signup")}>
                <Text style={styles.signUpLink}>إنشاء حساب جديد</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.infoContainer}>
             
            </View>
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
    width: 95,
    height: 120,
    bottom: 130,
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: "Almarai-Bold",
    color: "#001a6e",
    textAlign: "right",
    marginBottom: 4,
    marginLeft: 130,
    bottom: 43,
    lineHeight: 50,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Almarai-Regular",
    color: "#666",
    textAlign: "right",
    bottom: 50,
    lineHeight: 20,
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
    bottom: 50,
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
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
    bottom: 60,
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
    direction: "rtl",
    marginTop: 20,
    top: 75,
  },
  signUpText: {
    fontSize: 14,
    fontFamily: "Almarai-Regular",
    color: "#666",
    top: 15,
  },
  signUpLink: {
    fontSize: 14,
    fontFamily: "Almarai-Bold",
    color: "#01a736",
    lineHeight: 50,
    top: 15,
  },
  infoContainer: {
    alignItems: "center",
    top: 77,
  },
  infoText: {
    color: "#999",
    fontSize: 14,
    fontFamily: "Almarai-Regular",
    textAlign: "center",
    lineHeight: 20,
  },
});