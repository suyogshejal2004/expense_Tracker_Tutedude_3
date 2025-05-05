import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet , TouchableOpacity} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AllTransactions = ({ navigation }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        // Load current user to get email
        const storedUser = await AsyncStorage.getItem("currentUser");
        const user = storedUser ? JSON.parse(storedUser) : null;
        if (!user || !user.email) {
          setTransactions([]);
          return;
        }

        // Load user-specific transactions
        const transactionKey = `transactions_${user.email}`;
        const stored = await AsyncStorage.getItem(transactionKey);
        setTransactions(stored ? JSON.parse(stored) : []);
      } catch (error) {
        console.error("Load transactions error:", error);
      }
    };
    loadTransactions();
  }, []);

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
      <Text style={styles.sectionTitle}>All Transactions</Text>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f1f1f1",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
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
  amount: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default AllTransactions;
