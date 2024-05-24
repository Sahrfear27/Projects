import libraryServices from "../../Apis/Services/library.services";
import React, { useContext, useEffect, useState } from "react";
import { BookType, PublisherType } from "../../Types/types";
import { Alert, Button, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import GlobalContex from "../../Contex/Contex";
import bookListStyle from "./Styles";

type Props = {
  route: any;
};
export default function AddPublisherToBook({ route }: Props) {
  const books = route.params;
  const { publishers, state, setState } = useContext(GlobalContex);

  const [displayPublisher, setDisplayPublisher] = useState<PublisherType[]>([]);
  const [selectedPublishers, setSelectedPublishers] = useState<string>("");

  useEffect(() => {
    setDisplayPublisher(publishers);
    if (displayPublisher.length > 0) {
      setSelectedPublishers(publishers[0].id!);
    }
  }, [publishers]);

  const addAuthor = async () => {
    if (!selectedPublishers) {
      return Alert.alert("Please select an author");
    }

    // Check if publisherId exist in book
    const existingPublisherId = state.find(
      (entities) => entities.publisherId === selectedPublishers
    );

    if (!existingPublisherId) {
      const existingBook = state.find(
        (existingBook) => existingBook.id === books.id
      );

      if (existingBook) {
        const updatedBook: BookType = {
          ...existingBook,
          publisherId: selectedPublishers, //return a new book with the selected publisher
        };

        try {
          const response = await libraryServices.updateBook(
            existingBook.id!,
            updatedBook
          );
          if (response.status === 200) {
            // Update the state with the new book object
            const bookIndex = state.findIndex(
              (books) => books.id === updatedBook.id
            );
            if (bookIndex !== -1) {
              state[bookIndex] = updatedBook;
            }
            setState([...state]);
            Alert.alert("Publisher added successfully");
          } else {
            Alert.alert("Failed to add author");
          }
        } catch (error) {
          Alert.alert("Failed to add author");
        }
      }
    } else {
      Alert.alert("Publisher Already Exist");
    }
  };

  return (
    <View style={bookListStyle.container}>
      <Text style={bookListStyle.headerText}>Add Publisher To Book</Text>
      <Picker
        selectedValue={selectedPublishers}
        onValueChange={(itemValue) => setSelectedPublishers(itemValue)}
        style={{ width: "100%" }}
      >
        {displayPublisher.map((author, index) => (
          <Picker.Item key={index} label={author.name} value={author.id!} />
        ))}
      </Picker>
      <Button title="Add" onPress={addAuthor} />
    </View>
  );
}
