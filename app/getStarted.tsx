import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";

export default function getStarted() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In Page</Text>
      <Text>Please choose an option:</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Sign In"
          onPress={() => {
            router.push("/signin");
          }}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Sign Up"
          onPress={() => {
            router.push("/signup");
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
  },
  buttonContainer: {
    width: "60%",
    marginVertical: 10,
  },
});
