import libraryServices from "../../Apis/Services/library.services";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Alert, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { AuthorType } from "../../Types/types";
import GlobalContex from "../../Helpers/Contex/Contex";
import authorStyle from "./Styles";

type Props = {
  route: any;
};
export default function EditAuthor({ route }: Props) {
  // const { authors, setAuthor } = useContext(GlobalContex);
  const { state, dispatch } = useContext(GlobalContex);
  const navigation = useNavigation<any>();
  const data = route.params;
  const [inputValue, setInputValue] = useState<AuthorType>(data);

  const handleUpdate = async () => {
    try {
      const response = await libraryServices.updateAuthor(
        inputValue.id!,
        inputValue
      );
      if (response.status == 200) {
        const authorIndex = state.authors?.findIndex(
          (author) => author.id === inputValue.id
        );
        // authors[authorIndex] = inputValue;
        if (authorIndex !== -1 && authorIndex !== undefined) {
          const updatedAuthors = state.authors?.map((prevAuthors, index) =>
            index === authorIndex ? inputValue : prevAuthors
          );
          dispatch({ type: "authors", payload: { authors: updatedAuthors } });
        }
      }
      // setAuthor([...authors]);
      Alert.alert("Update successful");
      navigation.navigate("authorList");
    } catch (error) {
      Alert.alert("Fail to Edit");
    }
  };
  return (
    <View style={authorStyle.container}>
      <Text style={authorStyle.headerText}>Edit Author</Text>
      <TextInput
        placeholder="Name"
        style={authorStyle.input}
        value={inputValue.name}
        onChangeText={(text: string) =>
          setInputValue({ ...inputValue, name: text })
        }
      />
      <TextInput
        placeholder="Email"
        style={authorStyle.input}
        value={inputValue.email}
        onChangeText={(text: string) =>
          setInputValue({ ...inputValue, email: text })
        }
      />
      <TextInput
        placeholder="Phone"
        style={authorStyle.input}
        value={inputValue.phone}
        onChangeText={(text: string) =>
          setInputValue({ ...inputValue, phone: text })
        }
      />

      <TouchableHighlight style={authorStyle.addButton} onPress={handleUpdate}>
        <Text style={authorStyle.buttonText}>Update</Text>
      </TouchableHighlight>
    </View>
  );
}
