import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TransactionList from "./TransactionList";
import React from "react";

const { Navigator, Screen } = createNativeStackNavigator();

export default function TransactionScreens() {
  return (
    <Navigator screenOptions={{ headerShown: true }}>
      <Screen
        name="transaction"
        component={TransactionList}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
}
