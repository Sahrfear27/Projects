import "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

export default function Tests() {
  const [selectedLanguage, setSelectedLanguage] = useState("Java");
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello</Text>
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
        style={{ width: "100%" }}
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
        <Picker.Item label="Python" value="py" />
        <Picker.Item label="C" value="c#" />
        <Picker.Item label="Golan" value="Go" />
        <Picker.Item label="C++" value="c++" />
        <Picker.Item label="R" value="R" />
        <Picker.Item label="Html" value="html" />
        <Picker.Item label="TypeScript" value="typescript" />
        <Picker.Item label="Css" value="css" />
        <Picker.Item label="Ruby" value="ruby" />
        <Picker.Item label="Kotlin" value="kotlin" />
      </Picker>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
