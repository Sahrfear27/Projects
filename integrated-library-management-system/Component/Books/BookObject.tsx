import { Alert, Text, TouchableOpacity, View } from "react-native";
import libraryServices from "../../Apis/Services/library.services";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import GlobalContex from "../../Helpers/Contex/Contex";
import { BookType } from "../../Types/types";
import React, { useContext } from "react";
import bookListStyle from "./Styles";

type Props = {
  data: BookType;
  index: number;
};

export default function BookObject(props: Props) {
  // const { state, setState, authors, publishers } = useContext(GlobalContex);
  const { state, dispatch } = useContext(GlobalContex);

  const navigation = useNavigation<any>();
  const { data, index } = props;

  const goToEdit = () => {
    navigation.navigate("editBook", data);
  };

  const confirm = async () => {
    try {
      const response = await libraryServices.deleteBook(data.id!);
      if (response.status === 200) {
        const newBooks = state.books!.filter((book) => book.id !== data.id);
        // setState(newBooks);
        dispatch({ type: "books", payload: { books: newBooks } });
        return Alert.alert("Deleted");
      }
    } catch (error) {
      return Alert.alert("Failed to Delete");
    }
  };

  const deleteBook = async () => {
    try {
      Alert.alert("Warning!", "Do you want to delete this book?", [
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
      Alert.alert("Failed to delete");
    }
  };

  const authorName: string[] = [];
  const { authorIDs } = data;
  if (authorIDs) {
    for (let ids of authorIDs) {
      let author = state.authors?.find((author) => author.id === ids);
      if (author) {
        authorName.push(author.name);
      }
    }
  }

  const { publisherId } = data;
  const selectedPublisher = state.publishers?.find(
    (existingPublisher) => existingPublisher.id === publisherId
  );

  const goToAddAuthor = () => {
    navigation.navigate("addAuthorToBook", data);
  };
  const goToAddPublisher = () => {
    navigation.navigate("addPublisherToBook", data);
  };
  return (
    <View
      style={{
        backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#f0f9ff",
        borderBottomWidth: 5,
        borderBottomColor: "#FFFFFF",
      }}
    >
      <View style={bookListStyle.row}>
        <View style={bookListStyle.details}>
          <Text
            style={{
              color: "#1c1917",
              fontSize: 20,
              fontWeight: "bold",
              fontFamily: "Times New Roman",
              letterSpacing: 1,
            }}
          >
            Title: {data.title}
          </Text>
          <Text
            style={{
              color: "#1c1917",
              fontSize: 18,
              fontFamily: "Trebuchet MS",
              fontWeight: "300",
            }}
          >
            <Text style={{ fontSize: 18 }}>Genre: </Text>
            <Text style={{ fontFamily: "Lucida Sans", letterSpacing: 1.5 }}>
              {data.genre}
            </Text>
          </Text>
          <Text
            style={{
              color: "#1c1917",
              fontSize: 18,
              fontFamily: "Trebuchet MS",
              fontWeight: "300",
            }}
          >
            <Text style={{ fontSize: 18 }}>Category:</Text>
            <Text style={{ fontFamily: "Lucida Sans", letterSpacing: 1.5 }}>
              {" "}
              {data.category}
            </Text>
          </Text>
          {authorName.map((name, index) => (
            <Text
              key={index}
              style={{
                color: "#1c1917",
                fontSize: 18,
                fontFamily: "Trebuchet MS",
                fontWeight: "300",
              }}
            >
              <Text style={{ fontSize: 18 }}>Authors:</Text>
              <Text style={{ fontFamily: "Courier New", letterSpacing: 1.5 }}>
                {" "}
                {name}
              </Text>
            </Text>
          ))}
          <Text
            style={{
              color: "#1c1917",
              fontSize: 18,
              fontFamily: "Trebuchet MS",
              fontWeight: "300",
            }}
          >
            <Text style={{ fontSize: 18 }}> Publisher:</Text>
            <Text style={{ fontFamily: "Courier New", letterSpacing: 1.5 }}>
              {selectedPublisher?.name}
            </Text>
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={goToAddAuthor}
                style={[bookListStyle.button, bookListStyle.detailButton]}
              >
                <Text style={{ color: "#fff" }}>Add Author</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={goToAddPublisher}
                style={[bookListStyle.button, bookListStyle.detailButton]}
              >
                <Text style={{ color: "#fff" }}>Add Publisher</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            marginBottom: 40,
            justifyContent: "space-evenly",
            marginLeft: 6,
          }}
        >
          <TouchableOpacity onPress={goToEdit}>
            <MaterialCommunityIcons name="pencil" size={30} color="#16a34a" />
          </TouchableOpacity>
          <TouchableOpacity onPress={deleteBook}>
            <MaterialCommunityIcons name="delete" size={30} color="#a8a29e" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
