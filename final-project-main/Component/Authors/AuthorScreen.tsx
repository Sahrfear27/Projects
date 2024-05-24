import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddAuthor from "./AddAuthor";
import AuthorList from "./AuthorList";
import EditAuthor from "./EditAuthor";
import React from "react";

const { Navigator, Screen } = createNativeStackNavigator();
export default function AuthorScreen() {
  return (
    <Navigator screenOptions={{ headerShown: true }}>
      <Screen
        name="authorList"
        component={AuthorList}
        options={{ headerShown: false }}
      />
      <Screen
        name="addAuthor"
        component={AddAuthor}
        options={{ headerShown: true }}
      />
      <Screen
        name="editAuthor"
        component={EditAuthor}
        options={{ headerShown: true }}
      />
    </Navigator>
  );
}
