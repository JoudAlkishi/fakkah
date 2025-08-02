import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
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

export default function SignUpPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [wantsAngelInvestor, setWantsAngelInvestor] = useState("");
  const [isVerifyingId, setIsVerifyingId] = useState(false);
  const [idVerificationStatus, setIdVerificationStatus] = useState(""); // "verified", "failed", ""
  const [showCardDropdown, setShowCardDropdown] = useState(false);
  const [cardLinked, setCardLinked] = useState(false);

  const [formData, setFormData] = useState({
    nationalId: "",
    birthDate: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    walletType: "بطاقة ائتمانية",
    cardNumber: "",
    cardName: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
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

  const logoAnim = useRef(new Animated.Value(0)).current;
  const contentAnim = useRef(new Animated.Value(50)).current;
  const iconsAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animationSequence = Animated.sequence([
      Animated.timing(logoAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(contentAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(iconsAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]);

    animationSequence.start();
  }, []);

  // Simulate National ID verification using SAMA Yaqeen service
  const verifyNationalId = async () => {
    if (!formData.nationalId || !formData.birthDate) {
      Alert.alert("تنبيه", "يرجى إدخال رقم الهوية الوطنية وتاريخ الميلاد");
      return;
    }

    setIsVerifyingId(true);
    setIdVerificationStatus("");

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Prototype logic: Check if ID follows Saudi National ID format
    // Real Saudi National ID: 10 digits, starts with 1 or 2
    const isValidFormat = /^[12]\d{9}$/.test(formData.nationalId);

    // For prototype: some IDs will be "verified", others "failed"
    const mockVerifiedIds = ["1234567890", "2123456789", "1987654321"];
    const isVerified =
      isValidFormat &&
      (mockVerifiedIds.includes(formData.nationalId) || Math.random() > 0.3);

    if (isVerified) {
      setIdVerificationStatus("verified");
      Alert.alert(
        "تم التحقق بنجاح",
        "تم التحقق من الهوية الوطنية بنجاح عبر خدمة يقين",
        [{ text: "موافق" }]
      );
    } else {
      setIdVerificationStatus("failed");
      Alert.alert(
        "فشل التحقق",
        "لم يتم التحقق من الهوية الوطنية. يرجى التأكد من صحة البيانات",
        [{ text: "موافق" }]
      );
    }

    setIsVerifyingId(false);
  };

  const handleCardLinking = () => {
    const requiredCardFields = [
      "cardNumber",
      "cardName",
      "expiryMonth",
      "expiryYear",
      "cvv",
    ];
    const missingFields = requiredCardFields.filter(
      (field) => !formData[field as keyof typeof formData]
    );

    if (missingFields.length > 0) {
      Alert.alert("تنبيه", "يرجى ملء جميع بيانات البطاقة");
      return;
    }

    setTimeout(() => {
      setCardLinked(true);
      setShowCardDropdown(false);
      Alert.alert(
        "تم ربط البطاقة",
        "تم ربط البطاقة الائتمانية بنجاح. تم خصم 0 ريال سعودي للتحقق من الحساب",
        [{ text: "موافق" }]
      );
    }, 1000);
  };

  const handleNext = () => {
    // Check if National ID is verified before proceeding from step 1
    if (currentStep === 1 && idVerificationStatus !== "verified") {
      Alert.alert("تنبيه", "يرجى التحقق من صحة الهوية الوطنية أولاً");
      return;
    }

    if (currentStep === 2 && !wantsAngelInvestor) {
      Alert.alert("تنبيه", "يرجى اختيار إجابة للسؤال");
      return;
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = () => {
    let requiredFields = [
      "nationalId",
      "birthDate",
      "name",
      "email",
      "phone",
      "password",
      "confirmPassword",
    ];

    if (wantsAngelInvestor === "yes") {
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
            switch (field) {
              case "nationalId":
                return "الهوية الوطنية";
              case "birthDate":
                return "تاريخ الميلاد";
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

    if (idVerificationStatus !== "verified") {
      Alert.alert("تنبيه", "يرجى التحقق من صحة الهوية الوطنية أولاً");
      return;
    }

    if (!cardLinked) {
      Alert.alert("تنبيه", "يرجى ربط البطاقة الائتمانية أولاً");
      return;
    }

    Alert.alert("نجح التسجيل", "تم إنشاء الحساب بنجاح", [
      { text: "موافق", onPress: () => router.push("/Home") },
    ]);
  };

  const handleAngelInvestorChoice = (choice: "yes" | "no") => {
    setWantsAngelInvestor(choice);
    if (choice === "no") {
      Alert.alert("نجح التسجيل", "تم إنشاء الحساب بنجاح", [
        { text: "موافق", onPress: () => router.push("/Home") },
      ]);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderIdVerificationStatus = () => {
    if (isVerifyingId) {
      return (
        <View style={styles.verificationContainer}>
          <ActivityIndicator size="small" color="#001a6e" />
          <Text style={styles.verificationText}>
            جاري التحقق من الهوية عبر خدمة يقين...
          </Text>
        </View>
      );
    }

    if (idVerificationStatus === "verified") {
      return (
        <View style={[styles.verificationContainer, styles.verifiedContainer]}>
          <MaterialIcons name="verified" size={20} color="#01a736" />
          <Text style={styles.verifiedText}>تم التحقق من الهوية بنجاح</Text>
        </View>
      );
    }

    if (idVerificationStatus === "failed") {
      return (
        <View style={[styles.verificationContainer, styles.failedContainer]}>
          <MaterialIcons name="error" size={20} color="#d32f2f" />
          <Text style={styles.failedText}>فشل التحقق من الهوية</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={verifyNationalId}
          >
            <Text style={styles.retryButtonText}>إعادة المحاولة</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  };

  const renderBasicInfo = () => (
    <Animated.View
      style={[styles.stepContent, { transform: [{ translateY: contentAnim }] }]}
    >
      <Text style={styles.stepTitle}>المعلومات الأساسية</Text>
      <Text style={styles.stepSubtitle}>أدخل معلوماتك الشخصية</Text>

      {/* National ID Input */}
      <View style={styles.inputContainer}>
        <MaterialIcons
          name="credit-card"
          size={20}
          color="#001a6e"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.textInput}
          placeholder="رقم الهوية الوطنية (10 أرقام)"
          placeholderTextColor="#999"
          value={formData.nationalId}
          onChangeText={(text) => {
            setFormData({ ...formData, nationalId: text });
            setIdVerificationStatus(""); // Reset verification status
          }}
          keyboardType="numeric"
          maxLength={10}
        />
        {idVerificationStatus === "verified" && (
          <MaterialIcons name="check-circle" size={20} color="#01a736" />
        )}
      </View>

      {/* Birth Date Input */}
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
          onChangeText={(text) => {
            setFormData({ ...formData, birthDate: text });
            setIdVerificationStatus(""); // Reset verification status
          }}
        />
        {idVerificationStatus === "verified" && (
          <MaterialIcons name="check-circle" size={20} color="#01a736" />
        )}
      </View>

     
      <Text style={styles.yaqeenInfo}>
        يتم التحقق من بياناتك بشكل آمن من خلال خدمة يقين التابعة لمركز المعلومات
        الوطني، لضمان حماية حسابك والامتثال للوائح السعودية
      </Text>


      <TouchableOpacity
        style={[
          styles.verifyButton,
          idVerificationStatus === "verified" && styles.verifiedButton,
        ]}
        onPress={verifyNationalId}
        disabled={isVerifyingId || idVerificationStatus === "verified"}
      >
        {isVerifyingId ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <>
            <Text style={styles.verifyButtonText}>
              {idVerificationStatus === "verified" ? "تم التحقق" : "تحقق الآن"}
            </Text>
            {idVerificationStatus === "verified" && (
              <MaterialIcons
                name="check"
                size={20}
                color="#fff"
                style={{ marginLeft: 8 }}
              />
            )}
          </>
        )}
      </TouchableOpacity>

      {renderIdVerificationStatus()}


      {idVerificationStatus === "verified" && (
        <>
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
              onChangeText={(text) =>
                setFormData({ ...formData, password: text })
              }
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

         
          <View style={styles.walletContainer}>
            <Text style={styles.walletLabel}>طريقة الدفع</Text>
            <TouchableOpacity
              style={[styles.walletOption, cardLinked && styles.linkedWallet]}
              onPress={() => setShowCardDropdown(!showCardDropdown)}
            >
              <MaterialIcons name="credit-card" size={24} color="#001a6e" />
              <Text style={styles.walletText}>بطاقة ائتمانية</Text>
              {cardLinked ? (
                <View style={styles.linkedIndicator}>
                  <MaterialIcons
                    name="check-circle"
                    size={20}
                    color="#01a736"
                  />
                  <Text style={styles.linkedText}>مربوطة</Text>
                </View>
              ) : (
                <View style={styles.dropdownIndicator}>
                  <Text style={styles.linkText}>اضغط لإدخال البيانات</Text>
                  <Ionicons
                    name={showCardDropdown ? "chevron-up" : "chevron-down"}
                    size={20}
                    color="#001a6e"
                  />
                </View>
              )}
            </TouchableOpacity>

          
            {showCardDropdown && !cardLinked && (
              <View style={styles.cardDropdown}>
            
                <View style={styles.cardLogos}>
                  <Text style={styles.acceptedCardsText}>
                    البطاقات المقبولة:
                  </Text>
                  <View style={styles.logoRow}>
                    <Text style={styles.cardLogo}>💳 VISA</Text>
                    <Text style={styles.cardLogo}>💳 MasterCard</Text>
                    <Text style={styles.cardLogo}>💳 AMEX</Text>
                    <Text style={styles.cardLogo}>💳 مدى</Text>
                  </View>
                </View>

                <View style={styles.cardInputContainer}>
                  <TextInput
                    style={styles.cardInput}
                    placeholder="رقم البطاقة (0000 0000 0000 0000)"
                    placeholderTextColor="#999"
                    value={formData.cardNumber}
                    onChangeText={(text) =>
                      setFormData({ ...formData, cardNumber: text })
                    }
                    keyboardType="numeric"
                    maxLength={19}
                  />
                </View>

                <View style={styles.cardInputContainer}>
                  <TextInput
                    style={styles.cardInput}
                    placeholder="الاسم على البطاقة"
                    placeholderTextColor="#999"
                    value={formData.cardName}
                    onChangeText={(text) =>
                      setFormData({ ...formData, cardName: text })
                    }
                  />
                </View>

                <View style={styles.cardRowInputs}>
                  <View
                    style={[
                      styles.cardInputContainer,
                      { flex: 1, marginRight: 10 },
                    ]}
                  >
                    <TextInput
                      style={styles.cardInput}
                      placeholder="السنة"
                      placeholderTextColor="#999"
                      value={formData.expiryYear}
                      onChangeText={(text) =>
                        setFormData({ ...formData, expiryYear: text })
                      }
                      keyboardType="numeric"
                      maxLength={2}
                    />
                  </View>
                  <View
                    style={[
                      styles.cardInputContainer,
                      { flex: 1, marginRight: 10 },
                    ]}
                  >
                    <TextInput
                      style={styles.cardInput}
                      placeholder="الشهر"
                      placeholderTextColor="#999"
                      value={formData.expiryMonth}
                      onChangeText={(text) =>
                        setFormData({ ...formData, expiryMonth: text })
                      }
                      keyboardType="numeric"
                      maxLength={2}
                    />
                  </View>
                  <View style={[styles.cardInputContainer, { flex: 1 }]}>
                    <TextInput
                      style={styles.cardInput}
                      placeholder="CVV"
                      placeholderTextColor="#999"
                      value={formData.cvv}
                      onChangeText={(text) =>
                        setFormData({ ...formData, cvv: text })
                      }
                      keyboardType="numeric"
                      maxLength={3}
                      secureTextEntry
                    />
                  </View>
                </View>

                <Text style={styles.cardNote}>
                  ملاحظة: سيتم سحب مبلغ 0 ريال للتأكد من صلاحية البطاقة ومن ثم
                  إعادة المبلغ بشكل تلقائي.
                </Text>

                <TouchableOpacity
                  style={styles.linkCardButton}
                  onPress={handleCardLinking}
                >
                  <Text style={styles.linkCardButtonText}>ربط البطاقة</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </>
      )}
    </Animated.View>
  );

  const renderAngelInvestorQuestion = () => (
    <Animated.View
      style={[styles.stepContent, { transform: [{ translateY: contentAnim }] }]}
    >
      <Text style={styles.stepTitle}>نوع الحساب</Text>
      <Text style={styles.stepSubtitle}>هل تريد التسجيل كمستثمر ملائكي؟</Text>

      <TouchableOpacity
        style={[
          styles.choiceCard,
          wantsAngelInvestor === "yes" && styles.selectedCard,
        ]}
        onPress={() => handleAngelInvestorChoice("yes")}
      >
        <FontAwesome5
          name="user-tie"
          size={35}
          color={wantsAngelInvestor === "yes" ? "#01a736" : "#001a6e"}
        />
        <Text
          style={[
            styles.cardTitle,
            wantsAngelInvestor === "yes" && styles.selectedCardText,
          ]}
        >
          نعم
        </Text>
        <Text
          style={[
            styles.cardDescription,
            wantsAngelInvestor === "yes" && styles.selectedCardText,
          ]}
        >
          أريد أن أكون مستثمر ملائكي وأقدم التمويل للمشاريع
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.choiceCard,
          wantsAngelInvestor === "no" && styles.selectedCard,
        ]}
        onPress={() => handleAngelInvestorChoice("no")}
      >
        <MaterialIcons
          name="person"
          size={40}
          color={wantsAngelInvestor === "no" ? "#01a736" : "#001a6e"}
        />
        <Text
          style={[
            styles.cardTitle,
            wantsAngelInvestor === "no" && styles.selectedCardText,
          ]}
        >
          لا
        </Text>
        <Text
          style={[
            styles.cardDescription,
            wantsAngelInvestor === "no" && styles.selectedCardText,
          ]}
        >
          أريد حساب عادي للبحث عن فرص الاستثمار
        </Text>
      </TouchableOpacity>
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
          <ScrollView
            style={styles.dropdownOptions}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={true}
          >
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
          </ScrollView>
        )}
      </View>

      <View style={styles.dropdownContainer}>
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
          <ScrollView
            style={styles.dropdownOptions}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={true}
          >
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
          </ScrollView>
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
        return renderBasicInfo();
      case 2:
        return renderAngelInvestorQuestion();
      case 3:
        return wantsAngelInvestor === "yes"
          ? renderAngelInvestorPreferences()
          : null;
      default:
        return renderBasicInfo();
    }
  };

  const getTotalSteps = () => {
    return wantsAngelInvestor === "yes" ? 3 : 2;
  };

  const shouldShowNextButton = () => {
    return !(currentStep === 2 && wantsAngelInvestor === "no");
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

            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>
                الخطوة {currentStep} من {getTotalSteps()}
              </Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${(currentStep / getTotalSteps()) * 100}%` },
                  ]}
                />
              </View>
            </View>

            <View style={styles.contentContainer}>
              {renderCurrentStep()}

              {shouldShowNextButton() && (
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
                        currentStep === getTotalSteps()
                          ? handleSubmit
                          : handleNext
                      }
                      activeOpacity={0.8}
                    >
                      <Text style={styles.nextButtonText}>
                        {currentStep === getTotalSteps()
                          ? "إنشاء الحساب"
                          : "التالي"}
                      </Text>
                      <Ionicons
                        name="arrow-forward"
                        size={20}
                        color="#fefefe"
                      />
                    </TouchableOpacity>
                  </Animated.View>
                </View>
              )}

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
    lineHeight: 20,
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
    marginBottom: -6,
    lineHeight: 40,
  },
  stepSubtitle: {
    fontSize: 16,
    fontFamily: "Almarai-Regular",
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 25,
  },
  choiceCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 16,
    padding: 18,
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
    lineHeight: 25,
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
  // Yaqeen Service Info
  yaqeenInfo: {
    fontSize: 12,
    fontFamily: "Almarai-Regular",
    color: "#666",
    textAlign: "right",
    lineHeight: 18,
    marginBottom: 16,
    paddingHorizontal: 5,
  },

  verifyButton: {
    backgroundColor: "#001a6e",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#001a6e",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  verifiedButton: {
    backgroundColor: "#01a736",
  },
  verifyButtonText: {
    fontSize: 16,
    fontFamily: "Almarai-Bold",
    color: "#fff",
    lineHeight: 23,
  },

  verificationContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f8ff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(0, 26, 110, 0.2)",
  },
  verifiedContainer: {
    backgroundColor: "rgba(1, 167, 54, 0.1)",
    borderColor: "rgba(1, 167, 54, 0.3)",
  },
  failedContainer: {
    backgroundColor: "rgba(211, 47, 47, 0.1)",
    borderColor: "rgba(211, 47, 47, 0.3)",
  },
  verificationText: {
    fontSize: 14,
    fontFamily: "Almarai-Regular",
    color: "#001a6e",
    marginLeft: 8,
    textAlign: "right",
    flex: 1,
    lineHeight: 20,
  },
  verifiedText: {
    fontSize: 14,
    fontFamily: "Almarai-Bold",
    color: "#01a736",
    marginLeft: 8,
    textAlign: "right",
    flex: 1,
    lineHeight: 20,
  },
  failedText: {
    fontSize: 14,
    fontFamily: "Almarai-Regular",
    color: "#d32f2f",
    marginLeft: 8,
    marginRight: 6,
    textAlign: "right",
    flex: 1,
    lineHeight: 20,
  },
  retryButton: {
    backgroundColor: "#d32f2f",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  retryButtonText: {
    fontSize: 12,
    fontFamily: "Almarai-Bold",
    color: "#fff",
  },
  // Wallet Styles
  walletContainer: {
    marginTop: 10,
  },
  walletLabel: {
    fontSize: 16,
    fontFamily: "Almarai-Bold",
    color: "#001a6e",
    marginBottom: 10,
    textAlign: "right",
    lineHeight: 25,
  },
  walletOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: "rgba(0, 26, 110, 0.1)",
  },
  linkedWallet: {
    borderColor: "rgba(1, 167, 54, 0.3)",
    backgroundColor: "rgba(1, 167, 54, 0.05)",
  },
  walletText: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Almarai-Regular",
    color: "#333",
    marginLeft: 10,
    textAlign: "right",
  },
  linkedIndicator: {
    flexDirection: "row",
    alignItems: "center",
  },
  linkedText: {
    fontSize: 14,
    fontFamily: "Almarai-Bold",
    color: "#01a736",
    marginLeft: 5,
  },
  dropdownIndicator: {
    flexDirection: "row",
    alignItems: "center",
  },
  linkText: {
    fontSize: 14,
    fontFamily: "Almarai-Regular",
    color: "#001a6e",
    marginLeft: 8,
    lineHeight: 20,
  },
  
  cardDropdown: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginTop: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 26, 110, 0.1)",
    elevation: 3,
    shadowColor: "#001a6e",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardLogos: {
    marginBottom: 20,
  },
  acceptedCardsText: {
    fontSize: 14,
    fontFamily: "Almarai-Bold",
    color: "#001a6e",
    marginBottom: 8,
    textAlign: "right",
  },
  logoRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  cardLogo: {
    fontSize: 12,
    fontFamily: "Almarai-Regular",
    color: "#666",
  },
  cardInputContainer: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 26, 110, 0.1)",
  },
  cardInput: {
    fontSize: 16,
    fontFamily: "Almarai-Regular",
    color: "#333",
    paddingVertical: 15,
    paddingHorizontal: 15,
    textAlign: "right",
  },
  cardRowInputs: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardNote: {
    fontSize: 12,
    fontFamily: "Almarai-Regular",
    color: "#666",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 15,
    backgroundColor: "#fff8e1",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ffcc02",
  },
  linkCardButton: {
    backgroundColor: "#01a736",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#01a736",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  linkCardButtonText: {
    fontSize: 16,
    fontFamily: "Almarai-Bold",
    color: "#fff",
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
    lineHeight: 20,
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
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 26, 110, 0.05)",
  },
  dropdownOptionText: {
    fontSize: 16,
    fontFamily: "Almarai-Regular",
    color: "#333",
    textAlign: "right",
    lineHeight: 30,
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
    lineHeight: 20,
  },
  nextButton: {
    backgroundColor: "#01a736",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 10,
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
    lineHeight: 29,
  },
  signInContainer: {
    direction: "rtl",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  signInText: {
    fontSize: 14,
    fontFamily: "Almarai-Regular",
    color: "#666",
    lineHeight: 20,
  },
  signInLink: {
    fontSize: 14,
    fontFamily: "Almarai-Bold",
    color: "#01a736",
    lineHeight: 20,
  },
});