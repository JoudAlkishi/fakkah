import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface TermsConditionsScreenProps {
    navigation: {
        goBack: () => void;
    };
}

export default function TermsConditionsScreen({ navigation }: TermsConditionsScreenProps) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={navigation.goBack}
                >
                    <MaterialIcons name="arrow-back" size={20} color="#001a6e" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>الشروط والأحكام</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView 
                style={styles.content} 
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>مقدمة</Text>
                    <Text style={styles.sectionText}>
                        مرحباً بك في تطبيق الاستثمار الذكي. من خلال استخدام هذا التطبيق، فإنك توافق على الالتزام بهذه الشروط والأحكام. يرجى قراءة هذه الشروط بعناية قبل البدء في استخدام الخدمة.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>خدمة الاستثمار</Text>
                    <Text style={styles.sectionText}>
                        يقوم التطبيق بجمع الفكة (المبالغ المتبقية) من مشترياتك وتحويلها إلى استثمارات مالية. يتم استثمار هذه المبالغ في صناديق استثمارية متنوعة وفقاً لملفك الاستثماري المختار.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>آلية العمل</Text>
                    <View style={styles.bulletPoints}>
                        <Text style={styles.bulletPoint}>• يتم تقريب مشترياتك إلى أقرب ريال</Text>
                        <Text style={styles.bulletPoint}>• الفرق يتم إضافته إلى محفظتك الاستثمارية</Text>
                        <Text style={styles.bulletPoint}>• يتم استثمار المبلغ تلقائياً في المشاريع الناشئة في منطقة عسير</Text>
                        <Text style={styles.bulletPoint}>• يمكنك متابعة أداء استثماراتك عبر صفحة "استثماراتي"</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>المخاطر</Text>
                    <Text style={styles.sectionText}>
                        الاستثمار ينطوي على مخاطر، وقد تنخفض قيمة استثماراتك أو ترتفع. الأداء السابق لا يضمن النتائج المستقبلية. يُنصح بالاستثمار فقط في حدود قدرتك على تحمل الخسائر.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>الخصوصية وحماية البيانات</Text>
                    <Text style={styles.sectionText}>
                        نحن ملتزمون بحماية خصوصيتك. يتم تشفير جميع معاملاتك ومعلوماتك الشخصية. لن نشارك بياناتك مع أطراف ثالثة دون موافقتك الصريحة، باستثناء ما يتطلبه القانون.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>الامتثال التنظيمي</Text>
                    <Text style={styles.sectionText}>
                        التطبيق مرخص ومنظم من قبل هيئة السوق المالية السعودية. نلتزم بجميع اللوائح والقوانين المحلية المتعلقة بالخدمات المالية والاستثمارية.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>إدارة الحساب</Text>
                    <Text style={styles.sectionText}>
                        يمكنك إيقاف أو تعديل خدمة جمع الفكة في أي وقت من خلال إعدادات التطبيق. كما يمكنك سحب استثماراتك وفقاً للشروط والأحكام المحددة لكل صندوق استثماري.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>المسؤولية</Text>
                    <Text style={styles.sectionText}>
                        نحن نبذل قصارى جهدنا لضمان دقة المعلومات وسلامة النظام، لكننا لا نتحمل مسؤولية أي خسائر قد تنجم عن أخطاء تقنية أو تقلبات السوق خارجة عن سيطرتنا.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>تحديث الشروط</Text>
                    <Text style={styles.sectionText}>
                        نحتفظ بالحق في تحديث هذه الشروط والأحكام من وقت لآخر. سيتم إشعارك بأي تغييرات مهمة من خلال التطبيق أو البريد الإلكتروني المسجل لديك.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>التواصل</Text>
                    <Text style={styles.sectionText}>
                        إذا كان لديك أي استفسارات حول هذه الشروط والأحكام، يرجى التواصل معنا عبر خدمة العملاء في التطبيق أو البريد الإلكتروني: support@Fakatak.sa
                    </Text>
                </View>

                <View style={styles.lastUpdated}>
                    <Text style={styles.lastUpdatedText}>
                        آخر تحديث: أغسطس 2025
                    </Text>
                </View>

                {/* Extra space to ensure scrolling to bottom */}
                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8fafc",
    },
    header: {
        backgroundColor: "#ffffff",
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 50,
        paddingBottom: 8,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#f1f5f9",
    },
    headerTitle: {
        fontSize: 16,
        fontFamily: "Almarai-Bold",
        color: "#001a6e",
        textAlign: "center",
        flex: 1,
        marginHorizontal: 10,
    },
    backButton: {
        width: 32,
        height: 32,
        alignItems: "center",
        justifyContent: "center",
    },
    placeholder: {
        width: 32,
    },
    content: {
        flex: 1,
    },
    contentContainer: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingBottom: 60,
    },
    section: {
        backgroundColor: "#ffffff",
        borderRadius: 12,
        padding: 20,
        marginTop: 16,
        elevation: 1,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: "Almarai-Bold",
        color: "#001a6e",
        marginBottom: 12,
        textAlign: "right",
    },
    sectionText: {
        fontSize: 16,
        fontFamily: "Almarai-Regular",
        color: "#374151",
        lineHeight: 24,
        textAlign: "right",
    },
    bulletPoints: {
        paddingRight: 8,
    },
    bulletPoint: {
        fontSize: 16,
        fontFamily: "Almarai-Regular",
        color: "#374151",
        lineHeight: 24,
        textAlign: "right",
        marginBottom: 8,
    },
    lastUpdated: { 
        alignItems: "center",
        paddingVertical: 24,
        marginTop: 16,
    },
    lastUpdatedText: {
        fontSize: 14,
        fontFamily: "Almarai-Regular",
        color: "#6b7280",
        textAlign: "center",
    },
});