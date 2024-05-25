import libraryServices from "../../Apis/Services/library.services";
import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, Text, View } from "react-native";
import { AuthorType, BookType } from "../../Types/types";
import { Picker } from "@react-native-picker/picker";
import GlobalContex from "../../Helpers/Contex/Contex";

import bookListStyle from "./Styles";

type Props = {
  route: any;
};
/*
1.Check if the selected author is already associated with the specific book
2. Update the book state
*/
export default function AddAuthorToBook({ route }: Props) {
  const books = route.params;
  const { state, dispatch } = useContext(GlobalContex);

  const [displayAuthor, setDisplayAuthor] = useState<AuthorType[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<string>("");

  useEffect(() => {
    setDisplayAuthor(state.authors!);
    if (state.authors!.length > 0) {
      setSelectedAuthor(state.authors![0].id!);
    }
  }, [state.authors]);

  const addAuthor = async () => {
    if (!selectedAuthor) {
      return Alert.alert("Please select an author");
    }

    // Check if book exist in state
    const existingBook = state.books!.find(
      (prevBooks) => prevBooks.id === books.id
    );
    if (existingBook) {
      const isAuthorInBook = existingBook.authorIDs?.includes(selectedAuthor);
      if (!isAuthorInBook) {
        const updatedBooks: BookType = {
          ...existingBook,
          authorIDs: [...(existingBook.authorIDs || []), selectedAuthor],
        };
        try {
          const response = await libraryServices.updateBook(
            existingBook.id!,
            updatedBooks
          );
          if (response.status == 200) {
            const newBook = state.books?.map((preBooks) =>
              preBooks.id == updatedBooks.id ? updatedBooks : preBooks
            );
            dispatch({ type: "books", payload: { books: newBook } });
            Alert.alert("Author Added Successfully");
          }
        } catch (error) {
          Alert.alert("Fail to Add");
        }
      } else {
        Alert.alert("Author Already exist");
      }
    }
  };

  return (
    <View style={bookListStyle.container}>
      <Text style={bookListStyle.headerText}>Add Author To Book</Text>
      <Picker
        selectedValue={selectedAuthor}
        onValueChange={(itemValue) => setSelectedAuthor(itemValue)}
        style={{ width: "100%" }}
      >
        {displayAuthor.map((author, index) => (
          <Picker.Item key={index} label={author.name} value={author.id!} />
        ))}
      </Picker>
      <Button title="Add" onPress={addAuthor} />
    </View>
  );
}
