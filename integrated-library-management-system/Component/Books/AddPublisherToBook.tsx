import libraryServices from "../../Apis/Services/library.services";
import React, { useContext, useEffect, useState } from "react";
import { BookType, PublisherType } from "../../Types/types";
import { Alert, Button, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import GlobalContex from "../../Helpers/Contex/Contex";
import bookListStyle from "./Styles";

type Props = {
  route: any;
};

export default function AddPublisherToBook({ route }: Props) {
  const books = route.params;
  const { state, dispatch } = useContext(GlobalContex);

  const [displayPublisher, setDisplayPublisher] = useState<PublisherType[]>([]);
  const [selectedPublishers, setSelectedPublishers] = useState<string>("");

  useEffect(() => {
    setDisplayPublisher(state.publishers || []);
    if (state.publishers && state.publishers.length > 0) {
      setSelectedPublishers(state.publishers[0].id || "");
    }
  }, [state.publishers]);

  const addPublisher = async () => {
    if (!selectedPublishers) {
      return Alert.alert("Please select a publisher");
    }

    // Check if the book exists
    const existingBook = state.books?.find((book) => book.id === books.id);
    if (existingBook) {
      const isPublisherInBook = existingBook.publisherId === selectedPublishers;
      if (!isPublisherInBook) {
        const updatedBook: BookType = {
          ...existingBook,
          publisherId: selectedPublishers,
        };
        try {
          const response = await libraryServices.updateBook(
            existingBook.id!,
            updatedBook
          );
          if (response.status === 200) {
            const updatedBooks = state.books?.map((book) =>
              book.id === existingBook.id ? updatedBook : book
            );
            dispatch({ type: "books", payload: { books: updatedBooks } });
            Alert.alert("Publisher added successfully");
          }
        } catch (error) {
          Alert.alert("Failed to add publisher");
        }
      } else {
        Alert.alert("Publisher already exists");
      }
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
        {displayPublisher.map((publisher, index) => (
          <Picker.Item
            key={index}
            label={publisher.name}
            value={publisher.id!}
          />
        ))}
      </Picker>
      <Button title="Add" onPress={addPublisher} />
    </View>
  );
}
