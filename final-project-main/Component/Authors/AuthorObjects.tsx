import { Alert, Text, View, TouchableOpacity } from "react-native";
import libraryServices from "../../Apis/Services/library.services";
import { useNavigation } from "@react-navigation/native";
import GlobalContex from "../../Contex/Contex";
import { AuthorType } from "../../Types/types";
import React, { useContext } from "react";
import authorStyle from "./Styles";

type Props = {
  data: AuthorType;
  index: number;
};

export default function AuthorObjects({ data, index }: Props) {
  const { authors, setAuthor } = useContext(GlobalContex);
  const navigation = useNavigation<any>();

  const goToEdit = () => {
    navigation.navigate("editAuthor", data);
  };

  const confirm = async () => {
    try {
      const response = await libraryServices.deleteAuthor(data.id!);
      if (response.status === 200) {
        const updatedAuthors = authors.filter(
          (author) => author.id !== data.id
        );
        setAuthor(updatedAuthors);
      }
    } catch (error) {
      Alert.alert("Fail to delete");
    }
  };

  const handleDelete = async () => {
    try {
      Alert.alert("Warning!", "Do you want to delete this Author?", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
        },
        {
          text: "Ok",
          onPress: () => confirm(),
        },
      ]);
    } catch (error) {
      Alert.alert("Fail to delete");
    }
  };

  return (
    <View
      style={{
        backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#f0f9ff",
        borderBottomWidth: 5,
        borderBottomColor: "#FFFFFF",
      }}
    >
      <View style={authorStyle.row}>
        <View style={authorStyle.details}>
          <Text
            style={{
              color: "#1c1917",
              fontSize: 25,
              fontWeight: "bold",
              fontFamily: "Times New Roman",
            }}
          >
            Name: {data.name}
          </Text>
          <Text
            style={{
              color: "#1c1917",
              fontSize: 20,
              fontFamily: "Trebuchet MS",
              fontWeight: "light",
            }}
          >
            Email: {data.email}
          </Text>
          <Text
            style={{
              color: "#1c1917",
              fontSize: 15,
              fontFamily: "Trebuchet MS",
              fontWeight: "light",
              letterSpacing: 2,
            }}
          >
            Phone: {data.phone}
          </Text>
        </View>

        <View>
          <TouchableOpacity
            style={[authorStyle.button, authorStyle.editButton]}
            onPress={goToEdit}
          >
            <Text style={authorStyle.buttonText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[authorStyle.button, authorStyle.deleteButton]}
            onPress={handleDelete}
          >
            <Text style={authorStyle.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
