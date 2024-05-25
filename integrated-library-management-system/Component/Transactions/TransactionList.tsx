import { FlatList, ImageBackground, SafeAreaView } from "react-native";
import TransactionObject from "./TransactionObject";
import GlobalContex from "../../Helpers/Contex/Contex";
import React, { useContext } from "react";
const image = require("../../assets/transaction.jpg");
import transactionStyle from "./Styles";

export default function TransactionList() {
  const { state } = useContext(GlobalContex);
  return (
    <SafeAreaView style={transactionStyle.container}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={transactionStyle.imgBackground}
      />
      <FlatList
        data={state.transactions}
        renderItem={({ item, index }) => (
          <TransactionObject data={item} index={index} />
        )}
      />
    </SafeAreaView>
  );
}
