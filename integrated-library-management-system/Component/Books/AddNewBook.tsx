// import { TouchableHighlight } from "react-native-gesture-handler";
// import libraryServices from "../../Apis/Services/library.services";
// import { Alert, Text, TextInput, View } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import React, { useContext, useState } from "react";
// import GlobalContex from "../../Helpers/Contex/Contex";
// import bookListStyle from "./Styles";

// export default function AddNewBook() {
//   // const { state, setState } = useContext(GlobalContex);
//   const { state, dispatch } = useContext(GlobalContex);
//   const navigation = useNavigation<any>();

//   const [title, setTitle] = useState("");
//   const [genre, setGenre] = useState("");
//   const [category, setCategory] = useState("");

//   const handleAdd = async () => {
//     try {
//       if (!(title == "" || genre == "" || category == "")) {
//         const newBook = {
//           title: title,
//           genre: genre,
//           category: category,
//         };
//         const response = await libraryServices.addNewBook(newBook);
//         if (response.status == 201) {
//           // setState([...state, response.data]);
//           dispatch({type:"books", payload:{[...books, response.data]}})
//           setTitle("");
//           setGenre("");
//           setCategory("");
//           Alert.alert("Added Successfully");
//           navigation.navigate("bookList");
//         }
//       } else {
//         Alert.alert("Input cannot be Empty");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <View style={bookListStyle.container}>
//       <Text style={bookListStyle.headerText}>Add NewBook</Text>
//       <TextInput
//         placeholder="Title"
//         value={title}
//         onChangeText={(text: string) => setTitle(text)}
//         style={bookListStyle.input}
//       />
//       <TextInput
//         placeholder="Genre"
//         value={genre}
//         onChangeText={(text: string) => setGenre(text)}
//         style={bookListStyle.input}
//       />
//       <TextInput
//         placeholder="Category"
//         value={category}
//         onChangeText={(text: string) => setCategory(text)}
//         style={bookListStyle.input}
//       />
//       <TouchableHighlight style={bookListStyle.button} onPress={handleAdd}>
//         <Text style={bookListStyle.addBookHeader}>Add</Text>
//       </TouchableHighlight>
//     </View>
//   );
// }
import { TouchableHighlight } from "react-native-gesture-handler";
import libraryServices from "../../Apis/Services/library.services";
import { Alert, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import GlobalContex from "../../Helpers/Contex/Contex";
import bookListStyle from "./Styles";

export default function AddNewBook() {
  const { state, dispatch } = useContext(GlobalContex);
  const navigation = useNavigation<any>();

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [category, setCategory] = useState("");

  const handleAdd = async () => {
    try {
      if (!(title === "" || genre === "" || category === "")) {
        const newBook = {
          title: title,
          genre: genre,
          category: category,
        };
        const response = await libraryServices.addNewBook(newBook);
        if (response.status === 201) {
          dispatch({ type: "add-book", payload: { books: [response.data] } });
          setTitle("");
          setGenre("");
          setCategory("");
          Alert.alert("Added Successfully");
          navigation.navigate("bookList");
        }
      } else {
        Alert.alert("Input cannot be Empty");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={bookListStyle.container}>
      <Text style={bookListStyle.headerText}>Add NewBook</Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={(text: string) => setTitle(text)}
        style={bookListStyle.input}
      />
      <TextInput
        placeholder="Genre"
        value={genre}
        onChangeText={(text: string) => setGenre(text)}
        style={bookListStyle.input}
      />
      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={(text: string) => setCategory(text)}
        style={bookListStyle.input}
      />
      <TouchableHighlight style={bookListStyle.button} onPress={handleAdd}>
        <Text style={bookListStyle.addBookHeader}>Add</Text>
      </TouchableHighlight>
    </View>
  );
}
