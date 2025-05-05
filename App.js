import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import UpdateScreen from "./screens/UpdateScreen";
import AllTransactions from "./screens/AllTransactions";
import AddScreen from "./screens/AddScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const globalScreenOptions = {
    headerStyle: { backgroundColor: "#DDD5F1" },
    headerTitleStyle: { color: "#000000" },
    headerTintColor: "black",
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
      
        screenOptions={globalScreenOptions}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />

        <Stack.Screen name="Update" component={UpdateScreen} />
        <Stack.Screen name="AllTransactions" component={AllTransactions} />
        <Stack.Screen name="Add" component={AddScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
