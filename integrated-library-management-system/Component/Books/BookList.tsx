import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import GlobalContex from "../../Contex/Contex";
import { BookType } from "../../Types/types";
const image = require("../../Images/library.jpg");
import BookObject from "./BookObject";
import bookListStyle from "./Styles";
import {
  Button,
  FlatList,
  ImageBackground,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";

export default function BookList() {
  const navigation = useNavigation<any>();
  const { state, setState, setLogIn } = useContext(GlobalContex);
  const [displayBooks, setDisplayBook] = useState<BookType[]>(state);

  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    setDisplayBook(state);
  }, [state]);

  const handleLogOut = () => {
    try {
      AsyncStorage.removeItem("email");
      setLogIn(false);
    } catch (error) {}
  };
  const handleSearch = (text: string) => {
    setSearchValue(text);
    const searchData = state.filter((books) => {
      return books.title.toLowerCase().startsWith(text.trim().toLowerCase());
    });
    setDisplayBook(searchData);
  };

  const goToAddBook = () => {
    navigation.navigate("addBook");
  };

  return (
    <SafeAreaView style={bookListStyle.container}>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <Button title="LogOut" onPress={handleLogOut} />
      </View>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={bookListStyle.imgBackground}
      />
      <View style={bookListStyle.inputContainer}>
        <MaterialCommunityIcons
          name="magnify"
          size={24}
          color="black"
          style={bookListStyle.searchIcon}
        />
        <TextInput
          placeholder="Search"
          onChangeText={handleSearch}
          autoCapitalize="none"
          value={searchValue}
          style={bookListStyle.input}
        />
      </View>

      <Pressable style={bookListStyle.addBookHeaderStyle} onPress={goToAddBook}>
        <Text style={bookListStyle.addBookHeader}>Add New Book</Text>
      </Pressable>
      <FlatList
        data={displayBooks}
        renderItem={({ item, index }) => (
          <BookObject data={item} index={index} />
        )}
        keyExtractor={(book: BookType, index) =>
          book.id ? book.genre : index.toString()
        }
      />
    </SafeAreaView>
  );
}
