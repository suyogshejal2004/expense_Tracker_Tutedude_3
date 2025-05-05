import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function AddScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");

  const handleAddTransaction = async () => {
    if (!title || !amount) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert("Error", "Please enter a valid amount");
      return;
    }

    const newTransaction = {
      id: Date.now().toString(),
      title,
      amount: parsedAmount,
      type,
      createdAt: new Date(),
    };

    try {
      // Load current user to get email
      const storedUser = await AsyncStorage.getItem("currentUser");
      const user = storedUser ? JSON.parse(storedUser) : null;
      if (!user || !user.email) {
        Alert.alert("Error", "User not logged in");
        return;
      }

      // Use user-specific transaction key
      const transactionKey = `transactions_${user.email}`;
      const storedTransactions = await AsyncStorage.getItem(transactionKey);
      const transactions = storedTransactions
        ? JSON.parse(storedTransactions)
        : [];
      transactions.push(newTransaction);
      await AsyncStorage.setItem(transactionKey, JSON.stringify(transactions));

      Alert.alert("Success", `Added ${type}: $${parsedAmount.toFixed(2)}`);
      setTitle("");
      setAmount("");
      setType("income");
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Error", "Failed to save transaction");
      console.error("Add transaction error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Transaction</Text>

      <TextInput
        placeholder="Title"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        placeholder="Amount"
        style={styles.input}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <View style={styles.typeSelector}>
        <TouchableOpacity
          style={[styles.typeButton, type === "income" && styles.selectedType]}
          onPress={() => setType("income")}
        >
          <Text
            style={[styles.typeText, type === "income" && styles.selectedText]}
          >
            Income
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.typeButton, type === "expense" && styles.selectedType]}
          onPress={() => setType("expense")}
        >
          <Text
            style={[styles.typeText, type === "expense" && styles.selectedText]}
          >
            Expense
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleAddTransaction}
      >
        <Text style={styles.saveButtonText}>Save Transaction</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  typeSelector: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  typeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
  },
  selectedType: {
    backgroundColor: "#69a1b1",
  },
  typeText: {
    fontSize: 16,
    color: "#000",
  },
  selectedText: {
    color: "#fff",
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddScreen;
