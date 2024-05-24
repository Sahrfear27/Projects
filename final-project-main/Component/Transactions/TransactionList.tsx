import { FlatList, ImageBackground, SafeAreaView } from "react-native";
import TransactionObject from "./TransactionObject";
import GlobalContex from "../../Contex/Contex";
import React, { useContext } from "react";
const image = require("../../assets/transaction.jpg");
import transactionStyle from "./Styles";

export default function TransactionList() {
  const { transaction } = useContext(GlobalContex);

  return (
    <SafeAreaView style={transactionStyle.container}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={transactionStyle.imgBackground}
      />
      <FlatList
        data={transaction}
        renderItem={({ item, index }) => (
          <TransactionObject data={item} index={index} />
        )}
      />
    </SafeAreaView>
  );
}
