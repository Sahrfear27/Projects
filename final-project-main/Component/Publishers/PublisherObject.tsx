import { Alert, Text, View, TouchableOpacity } from "react-native";
import libraryServices from "../../Apis/Services/library.services";
import { useNavigation } from "@react-navigation/native";
import { PublisherType } from "../../Types/types";
import GlobalContex from "../../Contex/Contex";
import React, { useContext } from "react";
import publisherStyle from "./Styles";

type Props = {
  data: PublisherType;
  index: number;
};

export default function PublisherObject({ data, index }: Props) {
  const { publishers, setPublisher } = useContext(GlobalContex);
  const navigation = useNavigation<any>();

  const goToEdit = () => {
    navigation.navigate("Edit", data);
  };

  const confirm = async () => {
    try {
      const response = await libraryServices.deletePublisher(data.id!);
      if (response.status == 200) {
        const updatedPublisher = publishers.filter(
          (publisher) => publisher.id !== data.id
        );
        setPublisher(updatedPublisher);
      }
    } catch (error) {
      Alert.alert("Fail to Delete");
    }
  };

  const handleDelete = async () => {
    try {
      Alert.alert("Warning!", "Do you want to delete this Publisher?", [
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
      <View style={publisherStyle.row}>
        <View style={publisherStyle.details}>
          <Text
            style={{
              color: "#1c1917",
              fontSize: 20,
              fontWeight: "bold",
              fontFamily: "Times New Roman",
            }}
          >
            Name: {data.name}
          </Text>
          <Text
            style={{
              color: "#1c1917",
              fontSize: 17,
              fontFamily: "Trebuchet MS",
              fontWeight: "300",
            }}
          >
            Email: {data.email}
          </Text>
          <Text
            style={{
              color: "#1c1917",
              fontSize: 15,
              fontFamily: "Trebuchet MS",
              fontWeight: "300",
            }}
          >
            Address: {data.address}
          </Text>
          <Text
            style={{
              color: "#1c1917",
              fontSize: 15,
              fontFamily: "Trebuchet MS",
              fontWeight: "300",
              letterSpacing: 2,
            }}
          >
            Phone: {data.phone}
          </Text>
        </View>

        <View>
          <TouchableOpacity
            style={[publisherStyle.button, publisherStyle.editButton]}
            onPress={goToEdit}
          >
            <Text style={publisherStyle.buttonText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[publisherStyle.button, publisherStyle.deleteButton]}
            onPress={handleDelete}
          >
            <Text style={publisherStyle.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
