import { FlatList, ImageBackground, SafeAreaView } from "react-native";
const image = require("../../assets/catalog.jpg");
import GlobalContex from "../../Contex/Contex";
import CatalogObject from "./CatalogObject";
import React, { useContext } from "react";
import borrowStyle from "./Styles";

export default function BooksCatalog() {
  const { catalog } = useContext(GlobalContex);

  return (
    <SafeAreaView style={borrowStyle.container}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={borrowStyle.imgBackground}
      />
      <FlatList
        data={catalog}
        renderItem={({ item, index }) => (
          <CatalogObject data={item} index={index} />
        )}
        keyExtractor={(data, index) => (data.id ? data.id : index.toString())}
      />
    </SafeAreaView>
  );
}
