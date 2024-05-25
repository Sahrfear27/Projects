import React, { useContext, useState } from "react";
import { Alert, Button, Text, TouchableOpacity, View } from "react-native";
import { AuthorType, BookType, CatalogType } from "../../Types/types";
import GlobalContex from "../../Helpers/Contex/Contex";
import memberStyle from "../Members/Styles";
import { MaterialIcons } from "@expo/vector-icons";
import bookListStyle from "../Books/Styles";
import borrowStyle from "./Styles";
import { useNavigation } from "@react-navigation/native";
import libraryServices from "../../Apis/Services/library.services";

type Props = {
  data: CatalogType;
  index: number;
};

export default function CatalogObject({ data, index }: Props) {
  const { state } = useContext(GlobalContex);
  const navigation = useNavigation<any>();
  // Get book id from catalog and find book object
  const { bookId } = data;
  const bookName = state.books?.find((books) => books.id == bookId);

  const goToBorrow = () => {
    navigation.navigate("Borrow", data);
  };
  const handleReturn = async () => {
    navigation.navigate("Return Book", data);
  };
  return (
    <View
      style={{
        backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#f0f9ff",
        borderBottomWidth: 5,
        borderBottomColor: "#FFFFFF",
      }}
    >
      <View style={borrowStyle.row}>
        <View style={borrowStyle.details}>
          <Text
            style={{
              color: "#1c1917",
              fontSize: 20,
              fontWeight: "bold",
              fontFamily: "Times New Roman",
            }}
          >
            Book Title: {bookName?.title}
          </Text>
          <Text
            style={{
              color: "#1c1917",
              fontSize: 17,
              fontFamily: "Trebuchet MS",
              fontWeight: "300",
            }}
          >
            Number of Copies: {data.numberOfCopies}
          </Text>
          <Text
            style={{
              color: "#1c1917",
              fontSize: 17,
              fontFamily: "Trebuchet MS",
              fontWeight: "300",
            }}
          >
            Available Copies: {data.availableCopies}
          </Text>
          <Text
            style={{
              color: "#1c1917",
              fontSize: 17,
              fontFamily: "Trebuchet MS",
              fontWeight: "300",
            }}
          >
            Status:
            <Text
              style={{
                color: data.availableCopies > 0 ? "green" : "red",
                fontSize: 17,
                fontFamily: "Trebuchet MS",
                fontWeight: "bold",
              }}
            >
              {" "}
              {data.availableCopies > 0 ? "Available" : "Unavailable"}
            </Text>
          </Text>
        </View>

        <View>
          <TouchableOpacity
            style={[memberStyle.button, memberStyle.editButton]}
            onPress={goToBorrow}
          >
            <Text style={memberStyle.buttonText}>Borrow</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[memberStyle.button, memberStyle.deleteButton]}
            onPress={handleReturn}
          >
            <Text style={memberStyle.buttonText}>Return</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
