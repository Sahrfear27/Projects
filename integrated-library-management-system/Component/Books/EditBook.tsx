import libraryServices from "../../Apis/Services/library.services";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Alert, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import GlobalContex from "../../Helpers/Contex/Contex";
import { BookType } from "../../Types/types";
import bookListStyle from "./Styles";

type Props = {
  route: any;
};
export default function EditBook({ route }: Props) {
  // const { state, setState } = useContext(GlobalContex);
  const { state, dispatch } = useContext(GlobalContex);
  const navigation = useNavigation<any>();
  const data = route.params;

  const [update, setUpdate] = useState<BookType>(data);
  const handleUpdate = async () => {
    try {
      const response = await libraryServices.updateBook(update.id!, update);
      if (response.status == 200) {
        const bookIndex = state.books?.findIndex(
          (book) => book.id === update.id
        );
        if (bookIndex !== -1 && bookIndex !== undefined) {
          // state.books![bookIndex] = update;
          const updatedBook = state.books?.map((prevBooks, index) =>
            index === bookIndex ? update : prevBooks
          );
          dispatch({ type: "books", payload: { books: updatedBook } });
          Alert.alert("Update Successful");
          navigation.navigate("bookList");
        }
        // setState([...state]);
        // dispatch({type:"books", payload:{[...state.books]}})
        navigation.navigate("bookList");
      }
    } catch (error) {
      Alert.alert("Fail To Update");
    }
  };
  return (
    <View style={bookListStyle.container}>
      <Text style={bookListStyle.headerText}>Edit Book</Text>
      <TextInput
        placeholder="Title"
        style={bookListStyle.input}
        value={update.title}
        onChangeText={(text: string) => setUpdate({ ...update, title: text })}
      />
      <TextInput
        placeholder="Genre"
        style={bookListStyle.input}
        value={update.genre}
        onChangeText={(text: string) => setUpdate({ ...update, genre: text })}
      />
      <TextInput
        placeholder="Category"
        style={bookListStyle.input}
        value={update.category}
        onChangeText={(text: string) =>
          setUpdate({ ...update, category: text })
        }
      />
      <TouchableHighlight
        style={bookListStyle.addButton}
        onPress={handleUpdate}
      >
        <Text style={bookListStyle.buttonText}>Update</Text>
      </TouchableHighlight>
    </View>
  );
}
