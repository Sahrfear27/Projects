import libraryServices from "../../Apis/Services/library.services";
import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, Text, View } from "react-native";
import { AuthorType, BookType } from "../../Types/types";
import { Picker } from "@react-native-picker/picker";
import GlobalContex from "../../Contex/Contex";

import bookListStyle from "./Styles";

type Props = {
  route: any;
};

export default function AddAuthorToBook({ route }: Props) {
  const books = route.params;
  const { authors, state, setState } = useContext(GlobalContex);

  const [displayAuthor, setDisplayAuthor] = useState<AuthorType[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<string>("");

  useEffect(() => {
    setDisplayAuthor(authors);
    if (authors.length > 0) {
      setSelectedAuthor(authors[0].id!);
    }
  }, [authors]);

  const addAuthor = async () => {
    if (!selectedAuthor) {
      return Alert.alert("Please select an author");
    }

    // Check if authorId already exist in the books state
    const existingAuthorIdInBooks = state.find((entities) =>
      entities.authorIDs?.find((ids) => ids === selectedAuthor)
    );

    if (existingAuthorIdInBooks) {
      // Check if the book id matches the book in state
      const existingBook = state.find(
        (existingBook) => existingBook.id === books.id
      );

      //Spread the selected author to the existing authorIDs in State
      if (existingBook) {
        const updatedBook: BookType = {
          ...existingBook,
          authorIDs: [...(existingBook.authorIDs || []), selectedAuthor],
        };

        try {
          const response = await libraryServices.updateBook(
            existingBook.id!,
            updatedBook
          );
          if (response.status === 200) {
            // Update the state with the new book object
            // const updatedState = state.map((book) =>
            //   book.id === updatedBook.id ? updatedBook : book
            // );
            // setState(updatedState);
            const bookIndex = state.findIndex(
              (books) => books.id === updatedBook.id
            );
            if (bookIndex !== -1) {
              state[bookIndex] = updatedBook;
            }
            setState([...state]);
            Alert.alert("Author added successfully");
          } else {
            Alert.alert("Failed to add author");
          }
        } catch (error) {
          Alert.alert("Failed to add author");
        }
      }
    } else {
      Alert.alert("Author already");
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
