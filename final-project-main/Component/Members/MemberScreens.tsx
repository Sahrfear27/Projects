import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MemberList from "./MemberList";
import AddMember from "./AddMember";
import EditMember from "./EditMember";
import React from "react";

const { Navigator, Screen } = createNativeStackNavigator();

export default function MemberScreens() {
  return (
    <Navigator screenOptions={{ headerShown: true }}>
      <Screen
        name="members"
        component={MemberList}
        options={{ headerShown: false }}
      />
      <Screen
        name="addMember"
        component={AddMember}
        options={{ headerShown: true }}
      />
      <Screen
        name="edit"
        component={EditMember}
        options={{ headerShown: true }}
      />
    </Navigator>
  );
}
