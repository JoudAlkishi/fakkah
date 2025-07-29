import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
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

export default function SignUpPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState("");
  const [formData, setFormData] = useState({
    nationalId: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    walletType: "Apple Pay",
    // Angel investor specific fields
    budget: "",
    interestField: "",
    riskLevel: "",
    expectedROI: "",
  });

  const [showInterestDropdown, setShowInterestDropdown] = useState(false);
  const [showRiskDropdown, setShowRiskDropdown] = useState(false);

  const interestOptions = [
    { label: "التكنولوجيا", value: "technology" },
    { label: "التجارة الإلكترونية", value: "ecommerce" },
    { label: "الصحة", value: "healthcare" },
    { label: "التعليم", value: "education" },
    { label: "الطاقة المتجددة", value: "renewable_energy" },
    { label: "العقارات", value: "real_estate" },
    { label: "الخدمات المالية", value: "fintech" },
    { label: "السياحة", value: "tourism" },
  ];

  const riskOptions = [
    { label: "منخفض", value: "low" },
    { label: "متوسط", value: "medium" },
    { label: "عالي", value: "high" },
  ];

  // Animation references
  const logoAnim = useRef(new Animated.Value(0)).current;
  const contentAnim = useRef(new Animated.Value(50)).current;
  const iconsAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animationSequence = Animated.sequence([
      Animated.timing(logoAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(contentAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(iconsAnim, {
        toValue: 1,
        duration: 700,
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

  const handleNext = () => {
    if (currentStep === 1 && !userType) {
      Alert.alert("تنبيه", "يرجى اختيار نوع المستخدم");
      return;
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = () => {
    let requiredFields = [
      "nationalId",
      "name",
      "email",
      "phone",
      "password",
      "confirmPassword",
      "birthDate",
    ];

    // Conditionally add angel investor specific fields if userType is 'angel'
    if (userType === "angel") {
      requiredFields = [
        ...requiredFields,
        "budget",
        "interestField",
        "riskLevel",
        "expectedROI",
      ];
    }

    const missingFields = requiredFields.filter(
      (field) => !formData[field as keyof typeof formData]
    );
    
    if (missingFields.length > 0) {
      Alert.alert(
        "تنبيه",
        `يرجى ملء جميع الحقول المطلوبة: ${missingFields
          .map((field) => {
            // Map field names to Arabic for better user experience
            switch (field) {
              case "nationalId":
                return "الهوية الوطنية";
              case "name":
                return "الاسم الكامل";
              case "email":
                return "البريد الإلكتروني";
              case "phone":
                return "رقم الجوال";
              case "password":
                return "كلمة المرور";
              case "confirmPassword":
                return "تأكيد كلمة المرور";
              case "birthDate":
                return "تاريخ الميلاد";
              case "budget":
                return "الميزانية";
              case "interestField":
                return "مجال الاهتمام";
              case "riskLevel":
                return "مستوى المخاطرة";
              case "expectedROI":
                return "العائد المتوقع";
              default:
                return field;
            }
          })
          .join(", ")}`
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert("تنبيه", "كلمة المرور وتأكيد كلمة المرور غير متطابقين");
      return;
    }

    Alert.alert("نجح التسجيل", "تم إنشاء الحساب بنجاح", [
      { text: "موافق", onPress: () => router.push("/Home") },
    ]);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderUserTypeSelection = () => (
    <Animated.View
      style={[styles.stepContent, { transform: [{ translateY: contentAnim }] }]}
    >
      <Text style={styles.stepTitle}>اختر نوع الحساب</Text>
      <Text style={styles.stepSubtitle}>حدد نوع حسابك للمتابعة</Text>

      <TouchableOpacity
        style={[
          styles.userTypeCard,
          userType === "beneficiary" && styles.selectedCard,
        ]}
        onPress={() => setUserType("beneficiary")}
      >
        <MaterialIcons
          name="person"
          size={40}
          color={userType === "beneficiary" ? "#01a736" : "#001a6e"}
        />
        <Text
          style={[
            styles.cardTitle,
            userType === "beneficiary" && styles.selectedCardText,
          ]}
        >
          مستفيد
        </Text>
        <Text
          style={[
            styles.cardDescription,
            userType === "beneficiary" && styles.selectedCardText,
          ]}
        >
          للمستخدمين الذين يبحثون عن فرص استثمارية
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.userTypeCard,
          userType === "angel" && styles.selectedCard,
        ]}
        onPress={() => setUserType("angel")}
      >
        <FontAwesome5
          name="user-tie"
          size={35}
          color={userType === "angel" ? "#01a736" : "#001a6e"}
        />
        <Text
          style={[
            styles.cardTitle,
            userType === "angel" && styles.selectedCardText,
          ]}
        >
          مستثمر ملائكي
        </Text>
        <Text
          style={[
            styles.cardDescription,
            userType === "angel" && styles.selectedCardText,
          ]}
        >
          للمستثمرين الذين يقدمون التمويل للمشاريع
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderBasicInfo = () => (
    <Animated.View
      style={[styles.stepContent, { transform: [{ translateY: contentAnim }] }]}
    >
      <Text style={styles.stepTitle}>المعلومات الأساسية</Text>

      <View style={styles.inputContainer}>
        <MaterialIcons
          name="credit-card"
          size={20}
          color="#001a6e"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.textInput}
          placeholder="الهوية الوطنية"
          placeholderTextColor="#999"
          value={formData.nationalId}
          onChangeText={(text) =>
            setFormData({ ...formData, nationalId: text })
          }
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons
          name="person"
          size={20}
          color="#001a6e"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.textInput}
          placeholder="الاسم الكامل"
          placeholderTextColor="#999"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons
          name="email"
          size={20}
          color="#001a6e"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.textInput}
          placeholder="البريد الإلكتروني"
          placeholderTextColor="#999"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons
          name="phone"
          size={20}
          color="#001a6e"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.textInput}
          placeholder="رقم الجوال"
          placeholderTextColor="#999"
          value={formData.phone}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons
          name="lock"
          size={20}
          color="#001a6e"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.textInput}
          placeholder="كلمة المرور"
          placeholderTextColor="#999"
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          secureTextEntry
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons
          name="lock-outline"
          size={20}
          color="#001a6e"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.textInput}
          placeholder="تأكيد كلمة المرور"
          placeholderTextColor="#999"
          value={formData.confirmPassword}
          onChangeText={(text) =>
            setFormData({ ...formData, confirmPassword: text })
          }
          secureTextEntry
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons
          name="cake"
          size={20}
          color="#001a6e"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.textInput}
          placeholder="تاريخ الميلاد (يوم/شهر/سنة)"
          placeholderTextColor="#999"
          value={formData.birthDate}
          onChangeText={(text) => setFormData({ ...formData, birthDate: text })}
        />
      </View>

      <View style={styles.walletContainer}>
        <Text style={styles.walletLabel}>نوع المحفظة</Text>
        <View style={styles.walletOption}>
          <MaterialIcons name="payment" size={24} color="#001a6e" />
          <Text style={styles.walletText}>Apple Pay</Text>
          <MaterialIcons name="check-circle" size={20} color="#01a736" />
        </View>
      </View>
    </Animated.View>
  );

  const renderAngelInvestorPreferences = () => (
    <Animated.View
      style={[styles.stepContent, { transform: [{ translateY: contentAnim }] }]}
    >
      <Text style={styles.stepTitle}>تفضيلات الاستثمار</Text>
      <Text style={styles.stepSubtitle}>حدد تفضيلاتك الاستثمارية</Text>

      <View style={styles.inputContainer}>
        <MaterialIcons
          name="attach-money"
          size={20}
          color="#001a6e"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.textInput}
          placeholder="الميزانية (ريال سعودي)"
          placeholderTextColor="#999"
          value={formData.budget}
          onChangeText={(text) => setFormData({ ...formData, budget: text })}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.dropdownContainer}>
        <MaterialIcons
          name="business"
          size={20}
          color="#001a6e"
          style={styles.inputIcon}
        />
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setShowInterestDropdown(!showInterestDropdown)}
        >
          <Text
            style={[
              styles.dropdownText,
              !formData.interestField && styles.placeholderText,
            ]}
          >
            {formData.interestField
              ? interestOptions.find(
                  (opt) => opt.value === formData.interestField
                )?.label
              : "اختر مجال الاهتمام"}
          </Text>
          <Ionicons
            name={showInterestDropdown ? "chevron-up" : "chevron-down"}
            size={20}
            color="#001a6e"
          />
        </TouchableOpacity>
        {showInterestDropdown && (
          <View style={styles.dropdownOptions}>
            {interestOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.dropdownOption}
                onPress={() => {
                  setFormData({ ...formData, interestField: option.value });
                  setShowInterestDropdown(false);
                }}
              >
                <Text style={styles.dropdownOptionText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View style={styles.dropdownContainer}>
        <MaterialIcons
          name="trending-up"
          size={20}
          color="#001a6e"
          style={styles.inputIcon}
        />
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setShowRiskDropdown(!showRiskDropdown)}
        >
          <Text
            style={[
              styles.dropdownText,
              !formData.riskLevel && styles.placeholderText,
            ]}
          >
            {formData.riskLevel
              ? riskOptions.find((opt) => opt.value === formData.riskLevel)
                  ?.label
              : "اختر مستوى المخاطرة"}
          </Text>
          <Ionicons
            name={showRiskDropdown ? "chevron-up" : "chevron-down"}
            size={20}
            color="#001a6e"
          />
        </TouchableOpacity>
        {showRiskDropdown && (
          <View style={styles.dropdownOptions}>
            {riskOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.dropdownOption}
                onPress={() => {
                  setFormData({ ...formData, riskLevel: option.value });
                  setShowRiskDropdown(false);
                }}
              >
                <Text style={styles.dropdownOptionText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons
          name="show-chart"
          size={20}
          color="#001a6e"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.textInput}
          placeholder="العائد المتوقع على الاستثمار (%)"
          placeholderTextColor="#999"
          value={formData.expectedROI}
          onChangeText={(text) =>
            setFormData({ ...formData, expectedROI: text })
          }
          keyboardType="numeric"
        />
      </View>
    </Animated.View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderUserTypeSelection();
      case 2:
        return renderBasicInfo();
      case 3:
        return userType === "angel" ? renderAngelInvestorPreferences() : null;
      default:
        return renderUserTypeSelection();
    }
  };

  const totalSteps = userType === "angel" ? 3 : 2;

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fefefe"
        translucent={false}
      />
      <View style={styles.background}>
        {/* Floating Icons Background */}
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
            {/* Logo Section */}
            <Animated.View
              style={[styles.logoContainer, { opacity: logoAnim }]}
            >
              <Image
                source={require("@/assets/images/Logo.png")}
                style={styles.image}
                resizeMode="contain"
              />
            </Animated.View>

            {/* Progress Indicator */}
            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>
                الخطوة {currentStep} من {totalSteps}
              </Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${(currentStep / totalSteps) * 100}%` },
                  ]}
                />
              </View>
            </View>

            {/* Main Content */}
            <View style={styles.contentContainer}>
              {renderCurrentStep()}

              {/* Navigation Buttons */}
              <View style={styles.navigationContainer}>
                {currentStep > 1 && (
                  <TouchableOpacity
                    style={styles.backButton}
                    onPress={handleBack}
                  >
                    <Ionicons name="arrow-back" size={20} color="#001a6e" />
                    <Text style={styles.backButtonText}>السابق</Text>
                  </TouchableOpacity>
                )}

                <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                  <TouchableOpacity
                    style={styles.nextButton}
                    onPress={
                      currentStep === totalSteps ? handleSubmit : handleNext
                    }
                    activeOpacity={0.8}
                  >
                    <Text style={styles.nextButtonText}>
                      {currentStep === totalSteps ? "إنشاء الحساب" : "التالي"}
                    </Text>
                    <Ionicons name="arrow-forward" size={20} color="#fefefe" />
                  </TouchableOpacity>
                </Animated.View>
              </View>

              {/* Sign In Link */}
              <Animated.View
                style={[styles.signInContainer, { opacity: iconsAnim }]}
              >
                <Text style={styles.signInText}>لديك حساب بالفعل؟ </Text>
                <TouchableOpacity onPress={() => router.push("/signin")}>
                  <Text style={styles.signInLink}>تسجيل دخول</Text>
                </TouchableOpacity>
              </Animated.View>
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
  },
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 80,
    height: 80,
  },
  progressContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  progressText: {
    fontSize: 14,
    fontFamily: "Almarai-Regular",
    color: "#666",
    marginBottom: 8,
  },
  progressBar: {
    width: "100%",
    height: 4,
    backgroundColor: "#e0e0e0",
    borderRadius: 2,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#01a736",
    borderRadius: 2,
  },
  contentContainer: {
    flex: 1,
    width: "100%",
  },
  stepContent: {
    flex: 1,
    marginBottom: 30,
  },
  stepTitle: {
    fontSize: 24,
    fontFamily: "Almarai-Bold",
    color: "#001a6e",
    textAlign: "center",
    marginBottom: 8,
  },
  stepSubtitle: {
    fontSize: 16,
    fontFamily: "Almarai-Regular",
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  userTypeCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(0, 26, 110, 0.1)",
    elevation: 2,
    shadowColor: "#001a6e",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedCard: {
    borderColor: "#01a736",
    backgroundColor: "rgba(1, 167, 54, 0.05)",
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: "Almarai-Bold",
    color: "#001a6e",
    marginTop: 12,
    marginBottom: 8,
  },
  selectedCardText: {
    color: "#01a736",
  },
  cardDescription: {
    fontSize: 14,
    fontFamily: "Almarai-Regular",
    color: "#666",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(0, 26, 110, 0.1)",
    elevation: 2,
    shadowColor: "#001a6e",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Almarai-Regular",
    color: "#333",
    paddingVertical: 15,
    textAlign: "right",
  },
  walletContainer: {
    marginTop: 10,
  },
  walletLabel: {
    fontSize: 16,
    fontFamily: "Almarai-Bold",
    color: "#001a6e",
    marginBottom: 10,
    textAlign: "right",
  },
  walletOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: "rgba(1, 167, 54, 0.3)",
  },
  walletText: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Almarai-Regular",
    color: "#333",
    marginLeft: 10,
    textAlign: "right",
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(0, 26, 110, 0.1)",
    elevation: 2,
    shadowColor: "#001a6e",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  pickerWrapper: {
    flex: 1,
  },
  picker: {
    fontSize: 16,
    fontFamily: "Almarai-Regular",
    color: "#333",
  },
  dropdownContainer: {
    marginBottom: 16,
    position: "relative",
    zIndex: 1000,
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "rgba(0, 26, 110, 0.1)",
    elevation: 2,
    shadowColor: "#001a6e",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  dropdownText: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Almarai-Regular",
    color: "#333",
    textAlign: "right",
    marginLeft: 10,
  },
  placeholderText: {
    color: "#999",
  },
  dropdownOptions: {
    backgroundColor: "#fefefe",
    borderRadius: 12,
    marginTop: 4,
    elevation: 5,
    shadowColor: "#001a6e",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "rgba(0, 26, 110, 0.1)",
    maxHeight: 200,
  },
  dropdownOption: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 26, 110, 0.05)",
  },
  dropdownOptionText: {
    fontSize: 16,
    fontFamily: "Almarai-Regular",
    color: "#333",
    textAlign: "right",
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#001a6e",
  },
  backButtonText: {
    fontSize: 16,
    fontFamily: "Almarai-Regular",
    color: "#001a6e",
    marginLeft: 8,
  },
  nextButton: {
    backgroundColor: "#01a736",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 4,
    shadowColor: "#01a736",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  nextButtonText: {
    fontSize: 16,
    fontFamily: "Almarai-Bold",
    color: "#fefefe",
    marginRight: 8,
  },
  signInContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  signInText: {
    fontSize: 14,
    fontFamily: "Almarai-Regular",
    color: "#666",
  },
  signInLink: {
    fontSize: 14,
    fontFamily: "Almarai-Bold",
    color: "#01a736",
  },
  // Floating Icons
  floatingIcon: {
    position: "absolute",
  },
  icon1: {
    top: height * 0.1,
    left: width * 0.1,
  },
  icon2: {
    top: height * 0.2,
    right: width * 0.15,
  },
  icon3: {
    bottom: height * 0.25,
    left: width * 0.08,
  },
  icon4: {
    bottom: height * 0.15,
    right: width * 0.12,
  },
});
