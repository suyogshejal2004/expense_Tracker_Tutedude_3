import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({ fullName: "User", email: "" });
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  // Load user and transactions
  const loadData = async () => {
    try {
      // Load user
      const storedUser = await AsyncStorage.getItem("currentUser");
      const user = storedUser
        ? JSON.parse(storedUser)
        : { fullName: "User", email: "" };
      setUserData(user);

      // Load user-specific transactions
      const transactionKey = `transactions_${user.email}`;
      const storedTransactions = await AsyncStorage.getItem(transactionKey);
      const transactions = storedTransactions
        ? JSON.parse(storedTransactions)
        : [];
      setTransactions(transactions);
      calculateTotals(transactions);
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  };

  useEffect(() => {
    loadData();

    // Refresh data when screen is focused
    const unsubscribe = navigation.addListener("focus", loadData);
    return unsubscribe;
  }, [navigation]);

  const calculateTotals = (data) => {
    let incomeTotal = 0;
    let expenseTotal = 0;
    data.forEach((item) => {
      if (item.type === "income") incomeTotal += item.amount;
      else if (item.type === "expense") expenseTotal += item.amount;
    });
    setIncome(incomeTotal);
    setExpense(expenseTotal);
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("currentUser");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.transactionItem}>
      <View style={styles.iconBox}>
        <MaterialIcons name="attach-money" size={24} color="#fff" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>
          {moment(item.createdAt).format("DD/MM/YYYY")}
        </Text>
      </View>
      <Text
        style={[
          styles.amount,
          { color: item.type === "income" ? "green" : "red" },
        ]}
      >
        ${item.amount.toFixed(2)}
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Update", { transaction: item })}
      >
        <MaterialIcons name="edit" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.username}>{userData.fullName}</Text>
        <TouchableOpacity onPress={logout}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Balance */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>
          ${(income - expense).toFixed(2)}
        </Text>

        <View style={styles.incomeExpenseContainer}>
          <View style={styles.box}>
            <Ionicons name="arrow-down" size={16} color="green" />
            <Text style={styles.label}>Income</Text>
            <Text style={styles.amount}>${income.toFixed(2)}</Text>
          </View>
          <View style={styles.box}>
            <Ionicons name="arrow-up" size={16} color="red" />
            <Text style={styles.label}>Expense</Text>
            <Text style={styles.amount}>${expense.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      {/* Recent Transactions */}
      <View style={styles.transactionHeader}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("AllTransactions")}
        >
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons name="home" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Add")}>
          <Ionicons name="add-circle" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("AllTransactions")}
        >
          <Ionicons name="document-text" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#d6c3db",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  username: {
    fontSize: 18,
    fontWeight: "600",
  },
  logout: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  balanceCard: {
    marginTop: 20,
    backgroundColor: "#000",
    borderRadius: 12,
    padding: 20,
  },
  balanceLabel: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  balanceAmount: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  incomeExpenseContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    backgroundColor: "#d6c3db",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  box: {
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    marginTop: 4,
    color: "#333",
  },
  amount: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 2,
  },
  transactionHeader: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  seeAll: {
    color: "green",
    fontWeight: "600",
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  iconBox: {
    backgroundColor: "#69a1b1",
    padding: 10,
    borderRadius: 50,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  date: {
    fontSize: 12,
    color: "#666",
  },
  bottomNav: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
});

export default HomeScreen;
