import { FlatList, ImageBackground, SafeAreaView, Text } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import GlobalContex from "../../Helpers/Contex/Contex";
import PublisherObject from "./PublisherObject";
import React, { useContext } from "react";
const image = require("../../assets/publisher.jpg");
import publisherStyle from "./Styles";

export default function PublisherList() {
  // const { publishers } = useContext(GlobalContex);
  const { state } = useContext(GlobalContex);
  const navigation = useNavigation<any>();
  const handleAdd = () => {
    navigation.navigate("New Publisher");
  };
  return (
    <SafeAreaView style={publisherStyle.container}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={publisherStyle.imgBackground}
      />
      <TouchableHighlight
        style={publisherStyle.addPublisher}
        onPress={handleAdd}
      >
        <Text style={publisherStyle.buttonText}>Add New Publisher</Text>
      </TouchableHighlight>
      <FlatList
        data={state.publishers}
        renderItem={({ item, index }) => (
          <PublisherObject data={item} index={index} />
        )}
        keyExtractor={(data, index) => (data.id ? data.id : index.toString())}
      />
    </SafeAreaView>
  );
}
