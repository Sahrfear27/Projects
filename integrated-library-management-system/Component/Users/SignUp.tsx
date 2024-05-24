import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import logInStyles from "./Styles";
import libraryServices from "../../Apis/Services/library.services";
import { UserType } from "../../Types/types";

type Props = {
  setSignup: (signUp: boolean) => void;
};

export default function SignUp({ setSignup }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };
  const handleSignup = async () => {
    try {
      const newUser = {
        name: name,
        email: email,
      };
      if (name.trim() === "" || email.trim() === "") {
        return Alert.alert("Please enter input");
      } else if (isValidEmail(email)) {
        return Alert.alert("Invalid Email");
      } else {
        const existingEmail = await libraryServices.getUser();

        if (existingEmail.status === 200 && existingEmail.data.length > 0) {
          const oldUser: UserType = existingEmail.data.find(
            (user: UserType) => user.email.trim() === email.trim()
          );

          if (!oldUser) {
            const newResponse = await libraryServices.signUpUser(newUser);
            if (newResponse.status === 201) {
              Alert.alert("Sign Up Successful");
              setSignup(false);
            }
          } else {
            Alert.alert("Email already exists");
          }
        }
      }
    } catch (error) {
      console.error("Sign Up Error:", error);
      Alert.alert("Fail to Sign up");
    }
  };

  return (
    <SafeAreaView style={logInStyles.container}>
      <Text style={logInStyles.headerText}>SignUp</Text>

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
      <View style={{ flexDirection: "row", marginLeft: 10 }}></View>
      <TouchableHighlight
        style={logInStyles.submitButton}
        onPress={handleSignup}
      >
        <Text style={logInStyles.submitButtonText}>Sign up</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
}
