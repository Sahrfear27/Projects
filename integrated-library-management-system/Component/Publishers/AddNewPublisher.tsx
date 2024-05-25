import libraryServices from "../../Apis/Services/library.services";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Alert, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import GlobalContex from "../../Helpers/Contex/Contex";
import publisherStyle from "./Styles";

export default function AddNewPublisher() {
  const { state, dispatch } = useContext(GlobalContex);
  const navigation = useNavigation<any>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleAdd = async () => {
    try {
      if (!(name == "" || email == "" || phone == "")) {
        const newPublisher = {
          name: name,
          email: email,
          phone: phone,
          address: address,
        };
        const response = await libraryServices.addPublishers(newPublisher);
        if (response.status == 201) {
          dispatch({
            type: "add-publisher",
            payload: { publishers: [response.data] },
          });
          Alert.alert("Added Successfully");
          setName("");
          setEmail("");
          setPhone("");
          setAddress("");
          navigation.navigate("publisherList");
        }
      } else {
        Alert.alert("Please Enter Input");
      }
    } catch (error) {
      return Alert.alert("Fail to Add");
    }
  };

  return (
    <View style={publisherStyle.container}>
      <Text style={publisherStyle.headerText}>Add New Author</Text>
      <TextInput
        placeholder="Name"
        style={publisherStyle.input}
        value={name}
        onChangeText={(text: string) => setName(text)}
      />
      <TextInput
        placeholder="Email"
        style={publisherStyle.input}
        value={email}
        onChangeText={(text: string) => setEmail(text)}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Phone"
        style={publisherStyle.input}
        value={phone}
        onChangeText={(text: string) => setPhone(text)}
      />
      <TextInput
        placeholder="Address"
        style={publisherStyle.input}
        value={address}
        onChangeText={(text: string) => setAddress(text)}
      />
      <TouchableHighlight
        style={publisherStyle.addPublisher}
        onPress={handleAdd}
      >
        <Text style={publisherStyle.buttonText}>Add</Text>
      </TouchableHighlight>
    </View>
  );
}
