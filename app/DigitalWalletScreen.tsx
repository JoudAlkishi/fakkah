import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function DigitalWalletScreen({ navigation }: any) {
    const [collectedChange] = useState(30.50);
    const [investedAmount] = useState(478.25);
    const [totalReturns] = useState(127.45);
    
    const paymentMethods = [
        {
            id: 1,
            type: "visa",
            cardNumber: "**** **** **** 4532",
            expiryDate: "12/26",
            isDefault: true,
            roundUpEnabled: true,
        },
        {
            id: 2,
            type: "mastercard",
            cardNumber: "**** **** **** 8901",
            expiryDate: "08/25",
            isDefault: false,
            roundUpEnabled: true,
        },
        {
            id: 3,
            type: "mada",
            cardNumber: "**** **** **** 2347",
            expiryDate: "03/27",
            isDefault: false,
            roundUpEnabled: false,
        },
    ];

    const recentRoundUps = [
        {
            id: 1,
            merchant: "كافيه النخيل",
            purchaseAmount: 23.75,
            roundUpAmount: 0.25,
            date: "2025-07-30",
            status: "collected"
        },
        {
            id: 2,
            merchant: "سوبر ماركت الخير",
            purchaseAmount: 87.30,
            roundUpAmount: 0.70,
            date: "2025-07-30",
            status: "collected"
        },
        {
            id: 3,
            merchant: "محطة الوقود",
            purchaseAmount: 156.85,
            roundUpAmount: 0.15,
            date: "2025-07-29",
            status: "invested"
        },
        {
            id: 4,
            merchant: "مختبرات البرج",
            purchaseAmount: 390.60,
            roundUpAmount: 0.40,
            date: "2025-07-29",
            status: "invested"
        },
    ];



    const handleWithdraw = () => {
        Alert.alert("سحب الأرباح", "اختر المبلغ المراد سحبه من الأرباح");
    };

    const handleAddCard = () => {
        Alert.alert("إضافة بطاقة", "أضف بطاقة جديدة لتجميع الفكة منها");
    };

    const toggleRoundUp = (cardId: number) => {
        const card = paymentMethods.find(method => method.id === cardId);
        if (!card) return;

        const isEnabled = card.roundUpEnabled;
        const title = isEnabled ? "إيقاف جمع الفكة" : "تفعيل جمع الفكة";
        const message = isEnabled 
            ? "هل تريد إيقاف جمع الفكة من هذه البطاقة؟" 
            : "هل تريد إعادة تفعيل جمع الفكة من هذه البطاقة؟";
        const confirmText = isEnabled ? "إيقاف" : "تفعيل";
        const successMessage = isEnabled 
            ? "تم إيقاف جمع الفكة من هذه البطاقة" 
            : "تم تفعيل جمع الفكة من هذه البطاقة";

        Alert.alert(
            title, 
            message,
            [
                {
                    text: "إلغاء",
                    style: "cancel"
                },
                {
                    text: confirmText,
                    onPress: () => {
                        // Here you would update the card's roundUpEnabled status
                        // For now, just show confirmation
                        Alert.alert("تم التحديث", successMessage);
                    }
                }
            ]
        );
    };

    const getCardIcon = (type: string) => {
        switch (type) {
            case "visa":
                return "credit-card";
            case "mastercard":
                return "credit-card";
            case "mada":
                return "account-balance-wallet";
            default:
                return "credit-card";
        }
    };

    const getCardColor = (type: string) => {
        switch (type) {
            case "visa":
                return "#1a73e8";
            case "mastercard":
                return "#eb001b";
            case "mada":
                return "#01a736";
            default:
                return "#6b7280";
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <MaterialIcons name="arrow-back" size={20} color="#001a6e" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>المحفظة الإستثمارية</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView 
                style={styles.content} 
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Change Collection Summary */}
                <View style={styles.summaryCard}>
                    <View style={styles.summaryHeader}>
                        <Text style={styles.summaryTitle}>الفكة المتجمعة</Text>
                    </View>
                    <Text style={styles.summaryAmount}>{collectedChange.toFixed(2)} ر.س</Text>
                    
               
                     
                </View>

                {/* Investment Overview */}
                <View style={styles.investmentOverview}>
                    <View style={styles.investmentItem}>
                        <Text style={styles.investmentLabel}>المبلغ المستثمر</Text>
                        <Text style={styles.investmentValue}>{investedAmount.toFixed(2)} ر.س</Text>
                    </View>
                    <View style={styles.investmentDivider} />
                    <View style={styles.investmentItem}>
                        <Text style={styles.investmentLabel}>إجمالي الأرباح</Text>
                        <Text style={[styles.investmentValue, styles.profitValue]}>+{totalReturns.toFixed(2)} ر.س</Text>
                    </View>
                </View>

                {/* Payment Methods with Round-up Settings */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <TouchableOpacity 
                            style={styles.addButton}
                            onPress={handleAddCard}
                        >
                            <MaterialIcons name="add" size={20} color="#01a736" />
                            <Text style={styles.addButtonText}>إضافة</Text>
                        </TouchableOpacity>
                        <Text style={styles.sectionTitle}>بطاقات تجميع الفكة</Text>
                    </View>

                    {paymentMethods.map((method) => (
                        <TouchableOpacity 
                            key={method.id} 
                            style={styles.paymentMethodItem}
                            onPress={() => toggleRoundUp(method.id)}
                            activeOpacity={0.7}
                        >
                            <View style={styles.cardActions}>
                                {method.isDefault && (
                                    <View style={styles.defaultBadge}>
                                        <Text style={styles.defaultBadgeText}>افتراضي</Text>
                                    </View>
                                )}
                            </View>
                            <View style={styles.paymentMethodLeft}>
                                <View style={styles.cardDetails}>
                                    <Text style={styles.cardNumber}>{method.cardNumber}</Text>
                                    <Text style={styles.cardExpiry}>انتهاء الصلاحية: {method.expiryDate}</Text>
                                    <View style={styles.roundUpStatus}>
                                        <Text style={[
                                            styles.roundUpText,
                                            { color: method.roundUpEnabled ? "#10b981" : "#ef4444" }
                                        ]}>
                                            {method.roundUpEnabled ? "تجميع الفكة مفعل" : "تجميع الفكة معطل"}
                                        </Text>
                                        <MaterialIcons 
                                            name={method.roundUpEnabled ? "check-circle" : "cancel"} 
                                            size={14} 
                                            color={method.roundUpEnabled ? "#10b981" : "#ef4444"} 
                                        />
                                    </View>
                                    <Text style={styles.tapToChangeText}>
                                        {method.roundUpEnabled ? "اضغط لإيقاف جمع الفكة" : "اضغط لإعادة تفعيل جمع الفكة"}
                                    </Text>
                                </View>
                                <View style={[
                                    styles.cardIconContainer, 
                                    { backgroundColor: getCardColor(method.type) + "20" }
                                ]}>
                                    <MaterialIcons 
                                        name={getCardIcon(method.type)} 
                                        size={24} 
                                        color={getCardColor(method.type)} 
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Recent Round-ups */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <TouchableOpacity>
                            <Text style={styles.seeAllText}>عرض الكل</Text>
                        </TouchableOpacity>
                        <Text style={styles.sectionTitle}>الفكة المتجمعة مؤخراً</Text>
                    </View>

                    {recentRoundUps.map((roundUp) => (
                        <View key={roundUp.id} style={styles.roundUpItem}>
                            <View style={styles.roundUpRight}>
                                <Text style={styles.roundUpAmount}>
                                    +{roundUp.roundUpAmount.toFixed(2)} ر.س
                                </Text>
                                <Text style={[
                                    styles.roundUpStatus,
                                    roundUp.status === "invested" ? styles.investedStatus : styles.collectedStatus
                                ]}>
                                    {roundUp.status === "invested" ? "مستثمرة" : "متجمعة"}
                                </Text>
                            </View>
                            <View style={styles.roundUpLeft}>
                                <View style={styles.roundUpDetails}>
                                    <Text style={styles.merchantName}>{roundUp.merchant}</Text>
                                    <Text style={styles.purchaseInfo}>
                                        مشتريات: {roundUp.purchaseAmount.toFixed(2)} ر.س
                                    </Text>
                                    <Text style={styles.roundUpDate}>{roundUp.date}</Text>
                                </View>
                                <View style={[
                                    styles.roundUpIconContainer,
                                    roundUp.status === "invested" ? styles.investedIcon : styles.collectedIcon
                                ]}>
                                    <MaterialIcons 
                                        name={roundUp.status === "invested" ? "trending-up" : "account-balance-wallet"} 
                                        size={20} 
                                        color={roundUp.status === "invested" ? "#3b82f6" : "#01a736"} 
                                    />
                                </View>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Investment Actions */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>إجراءات الاستثمار</Text>
                    
                    <View style={styles.quickActionsGrid}>
                        <TouchableOpacity style={styles.quickActionItem}>
                            <MaterialIcons name="pie-chart" size={24} color="#3b82f6" />
                            <Text style={styles.quickActionText}>محفظة الاستثمار</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.quickActionItem}>
                            <MaterialIcons name="history" size={24} color="#8b5cf6" />
                            <Text style={styles.quickActionText}>تاريخ الاستثمارات</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={styles.quickActionItem}
                            onPress={handleWithdraw}
                        >
                            <MaterialIcons name="account-balance" size={24} color="#10b981" />
                            <Text style={styles.quickActionText}>سحب الأرباح</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.quickActionItem}>
                            <MaterialIcons name="settings" size={24} color="#f59e0b" />
                            <Text style={styles.quickActionText}>إعدادات الاستثمار</Text>
                        </TouchableOpacity>
                    </View>
                </View>

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
    summaryCard: {
        backgroundColor: "#01a736",
        borderRadius: 20,
        padding: 24,
        marginTop: 24,
        alignItems: "center",
        elevation: 4,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
    },
    summaryHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    summaryTitle: {
        fontSize: 18,
        fontFamily: "Almarai-Bold",
        color: "#ffffff",
        marginRight: 8,
    },
    summaryAmount: {
        fontSize: 36,
        fontFamily: "Almarai-Bold",
        color: "#ffffff",
        marginBottom: 4,
    },
    summarySubtext: {
        fontSize: 14,
        fontFamily: "Almarai-Regular",
        color: "rgba(255, 255, 255, 0.8)",
        marginBottom: 20,
    },
    investButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ffffff",
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 12,
    },
    investButtonText: {
        fontSize: 16,
        fontFamily: "Almarai-Bold",
        color: "#01a736",
        marginRight: 8,
    },
    investmentOverview: {
        backgroundColor: "#ffffff",
        borderRadius: 16,
        marginTop: 16,
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        elevation: 2,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    investmentItem: {
        flex: 1,
        alignItems: "center",
    },
    investmentLabel: {
        fontSize: 14,
        fontFamily: "Almarai-Regular",
        color: "#6b7280",
        marginBottom: 4,
        textAlign: "center",
    },
    investmentValue: {
        fontSize: 20,
        fontFamily: "Almarai-Bold",
        color: "#001a6e",
        textAlign: "center",
    },
    profitValue: {
        color: "#10b981",
    },
    investmentDivider: {
        width: 1,
        height: 40,
        backgroundColor: "#e5e7eb",
        marginHorizontal: 20,
    },
    sectionContainer: {
        backgroundColor: "#ffffff",
        borderRadius: 16,
        marginTop: 24,
        padding: 20,
        elevation: 2,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: "Almarai-Bold",
        color: "#001a6e",
        textAlign: "right",
    },
    addButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: "#f0fdf4",
        borderRadius: 8,
    },
    addButtonText: {
        fontSize: 14,
        fontFamily: "Almarai-Medium",
        color: "#01a736",
        marginRight: 4,
    },
    seeAllText: {
        fontSize: 14,
        fontFamily: "Almarai-Medium",
        color: "#01a736",
    },
    paymentMethodItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#f1f5f9",
    },
    paymentMethodLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    cardIconContainer: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        marginLeft: 12,
    },
    cardDetails: {
        flex: 1,
        alignItems: "flex-end",
        marginRight: 12,
    },
    cardNumber: {
        fontSize: 16,
        fontFamily: "Almarai-Medium",
        color: "#001a6e",
        marginBottom: 2,
        textAlign: "right",
    },
    cardExpiry: {
        fontSize: 12,
        fontFamily: "Almarai-Regular",
        color: "#6b7280",
        textAlign: "right",
        marginBottom: 4,
    },
    roundUpStatus: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    roundUpText: {
        fontSize: 12,
        fontFamily: "Almarai-Medium",
        marginRight: 4,
    },
    tapToChangeText: {
        fontSize: 11,
        fontFamily: "Almarai-Regular",
        color: "#9ca3af",
        textAlign: "right",
        marginTop: 2,
    },
    cardActions: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    defaultBadge: {
        backgroundColor: "#01a736",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
    },
    defaultBadgeText: {
        fontSize: 10,
        fontFamily: "Almarai-Medium",
        color: "#ffffff",
    },
    roundUpItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#f1f5f9",
    },
    roundUpLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    roundUpIconContainer: {
        width: 36,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 18,
        marginLeft: 12,
    },
    collectedIcon: {
        backgroundColor: "#dcfce7",
    },
    investedIcon: {
        backgroundColor: "#dbeafe",
    },
    roundUpDetails: {
        flex: 1,
        alignItems: "flex-end",
        marginRight: 12,
    },
    merchantName: {
        fontSize: 14,
        fontFamily: "Almarai-Medium",
        color: "#001a6e",
        marginBottom: 2,
        textAlign: "right",
    },
    purchaseInfo: {
        fontSize: 12,
        fontFamily: "Almarai-Regular",
        color: "#6b7280",
        marginBottom: 2,
        textAlign: "right",
    },
    roundUpDate: {
        fontSize: 12,
        fontFamily: "Almarai-Regular",
        color: "#6b7280",
        textAlign: "right",
    },
    roundUpRight: {
        alignItems: "flex-end",
    },
    roundUpAmount: {
        fontSize: 14,
        fontFamily: "Almarai-Bold",
        color: "#01a736",
        marginBottom: 2,
    },
    collectedStatus: {
        color: "#01a736",
    },
    investedStatus: {
        color: "#3b82f6",
    },
    quickActionsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: 8,
    },
    quickActionItem: {
        width: "48%",
        alignItems: "center",
        paddingVertical: 16,
        backgroundColor: "#f8fafc",
        borderRadius: 12,
        marginBottom: 12,
    },
    quickActionText: {
        fontSize: 12,
        fontFamily: "Almarai-Medium",
        color: "#374151",
        marginTop: 8,
        textAlign: "center",
    },
});