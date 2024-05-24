import libraryServices from "../../Apis/Services/library.services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import logInStyles from "./Styles";
import {
  Alert,
  Button,
  SafeAreaView,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import SignUp from "./SignUp";

type Props = {
  setLogIn: (logIn: boolean) => void;
};
export default function UserLogin({ setLogIn }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [signUp, setSignup] = useState(false);
  const handleLogIn = async () => {
    try {
      if (name == "" || email == "") {
        return Alert.alert("Please enter name and email");
      }
      const response = await libraryServices.signIn(email);

      if (response.status == 200 && response.data.length > 0) {
        AsyncStorage.setItem("email", JSON.stringify({ logIn: true }));
        setLogIn(true);
        setEmail("");
        setName("");
        Alert.alert("LogIn Successfully");
      } else {
        return Alert.alert("Incorrect Email");
      }
    } catch (error) {
      Alert.alert("LogIn Fail");
    }
  };
  const goToSignUp = () => {
    setSignup(true);
  };
  if (signUp) {
    return <SignUp setSignup={setSignup} />;
  }
  return (
    <SafeAreaView style={logInStyles.container}>
      <Text style={logInStyles.headerText}>Please Login</Text>

      <TextInput
        placeholder="name"
        value={name}
        onChangeText={(text: string) => setName(text)}
        style={logInStyles.input}
      />
      <TextInput
        placeholder="email"
        value={email}
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
        style={logInStyles.input}
      />
      <View style={{ flexDirection: "row", marginLeft: 10 }}>
        <Button title="New Member?" onPress={goToSignUp} />
      </View>
      <TouchableHighlight
        style={logInStyles.submitButton}
        onPress={handleLogIn}
      >
        <Text style={logInStyles.submitButtonText}>LogIn</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
}
