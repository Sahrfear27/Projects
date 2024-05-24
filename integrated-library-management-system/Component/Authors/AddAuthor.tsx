import libraryServices from "../../Apis/Services/library.services";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Alert, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import GlobalContex from "../../Contex/Contex";
import authorStyle from "./Styles";

export default function AddAuthor() {
  const { authors, setAuthor } = useContext(GlobalContex);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const navigation = useNavigation<any>();
  const handleAdd = async () => {
    try {
      if (!(name == "" || email == "" || phone == "")) {
        const newAuthor = {
          name: name,
          email: email,
          phone: phone,
        };
        const response = await libraryServices.addAuthor(newAuthor);
        if (response.status == 201) {
          setAuthor([...authors, newAuthor]);
          Alert.alert("Added Successfully");
          setName("");
          setEmail("");
          setPhone("");
          navigation.navigate("authorList");
        }
      }
    } catch (error) {
      Alert.alert("Fail to Add");
    }
  };
  return (
    <View style={authorStyle.container}>
      <TextInput
        placeholder="Name"
        style={authorStyle.input}
        value={name}
        onChangeText={(text: string) => setName(text)}
      />
      <TextInput
        placeholder="Email"
        style={authorStyle.input}
        value={email}
        autoCapitalize="none"
        onChangeText={(text: string) => setEmail(text)}
      />
      <TextInput
        placeholder="Phone"
        style={authorStyle.input}
        value={phone}
        onChangeText={(text: string) => setPhone(text)}
      />
      <TouchableHighlight style={authorStyle.addButton} onPress={handleAdd}>
        <Text style={authorStyle.buttonText}>Add</Text>
      </TouchableHighlight>
    </View>
  );
}
