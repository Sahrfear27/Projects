import { useNavigation } from "@react-navigation/native";
import GlobalContex from "../../Helpers/Contex/Contex";
import { AuthorType } from "../../Types/types";
import AuthorObjects from "./AuthorObjects";
import authorStyle from "./Styles";
import React, { useContext } from "react";
import {
  FlatList,
  ImageBackground,
  Pressable,
  SafeAreaView,
  Text,
} from "react-native";

const image = require("../../assets/author.jpg");

export default function AuthorList() {
  // const { authors } = useContext(GlobalContex);
  const { state } = useContext(GlobalContex);
  const navigation = useNavigation<any>();
  const goToAddAuthor = () => {
    navigation.navigate("addAuthor");
  };
  return (
    <SafeAreaView style={authorStyle.container}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={authorStyle.imgBackground}
      />

      <Pressable style={authorStyle.addAuthor} onPress={goToAddAuthor}>
        <Text style={authorStyle.buttonText}>Add New Author</Text>
      </Pressable>
      <FlatList
        data={state.authors}
        renderItem={({ item, index }) => (
          <AuthorObjects data={item} index={index} />
        )}
        keyExtractor={(author: AuthorType, index) =>
          author.id ? author.id : index.toString()
        }
      />
    </SafeAreaView>
  );
}
