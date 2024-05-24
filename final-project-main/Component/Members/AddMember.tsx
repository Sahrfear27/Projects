import { Alert, Text, TextInput, TouchableHighlight, View } from "react-native";
import libraryServices from "../../Apis/Services/library.services";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import GlobalContex from "../../Contex/Contex";
import memberStyle from "./Styles";

export default function AddMember() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [residentId, setResidentId] = useState("");
  const { members, setMember } = useContext(GlobalContex);
  const navigation = useNavigation<any>();
  const handleAdd = async () => {
    if (
      !(
        firstName == "" ||
        lastName == "" ||
        email == "" ||
        phone == "" ||
        residentId == ""
      )
    ) {
      const newMember = {
        firstname: firstName,
        lastname: lastName,
        email: email,
        phone: phone,
        residentID: residentId,
        address: address,
      };
      try {
        const response = await libraryServices.addMembers(newMember);
        if (response.status == 201) {
          setMember([...members, newMember]);
          setAddress("");
          setEmail("");
          setFirstName("");
          setLastName("");
          setResidentId("");
          setPhone("");
          Alert.alert("Added Successfully");
          navigation.navigate("members");
        }
      } catch (error) {
        Alert.alert("Fail to add");
      }
    } else {
      Alert.alert("Please enter input");
    }
  };
  return (
    <View style={memberStyle.container}>
      <Text style={memberStyle.headerText}>Add New Member</Text>
      <TextInput
        placeholder="first name"
        value={firstName}
        onChangeText={(text: string) => setFirstName(text)}
        style={memberStyle.input}
      />
      <TextInput
        placeholder="last name"
        value={lastName}
        onChangeText={(text: string) => setLastName(text)}
        style={memberStyle.input}
      />
      <TextInput
        placeholder="email"
        value={email}
        onChangeText={(text: string) => setEmail(text)}
        style={memberStyle.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="phone"
        value={phone}
        onChangeText={(text: string) => setPhone(text)}
        style={memberStyle.input}
      />
      <TextInput
        placeholder="address"
        value={address}
        onChangeText={(text: string) => setAddress(text)}
        style={memberStyle.input}
      />
      <TextInput
        placeholder="Id"
        value={residentId}
        onChangeText={(text: string) => setResidentId(text)}
        style={memberStyle.input}
      />
      <TouchableHighlight style={memberStyle.addButton} onPress={handleAdd}>
        <Text style={memberStyle.buttonText}>Add</Text>
      </TouchableHighlight>
    </View>
  );
}
