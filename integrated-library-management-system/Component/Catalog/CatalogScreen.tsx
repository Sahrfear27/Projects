import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";

import BooksCatalog from "./CatalogList";
import BorrowBook from "./BorrowBook";
import ReturnBook from "./ReturnBook";

const { Navigator, Screen } = createNativeStackNavigator();

export default function CatalogScreen() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name="borrowList"
        component={BooksCatalog}
        options={{ headerShown: false }}
      />
      <Screen
        name="Borrow"
        component={BorrowBook}
        options={{ headerShown: true }}
      />
      <Screen
        name="Return Book"
        component={ReturnBook}
        options={{ headerShown: true }}
      />
    </Navigator>
  );
}
