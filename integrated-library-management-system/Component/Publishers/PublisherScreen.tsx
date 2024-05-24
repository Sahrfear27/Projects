import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddNewPublisher from "./AddNewPublisher";
import PublisherList from "./PublisherList";
import EditPublisher from "./EditPublisher";
import React from "react";

const { Navigator, Screen } = createNativeStackNavigator();

export default function PublisherScreen() {
  return (
    <Navigator screenOptions={{ headerShown: true }}>
      <Screen
        name="publisherList"
        component={PublisherList}
        options={{ headerShown: false }}
      />
      <Screen name="Edit" component={EditPublisher} />
      <Screen name="New Publisher" component={AddNewPublisher} />
    </Navigator>
  );
}
