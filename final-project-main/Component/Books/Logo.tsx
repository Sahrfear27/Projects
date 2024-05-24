import React from "react";
import { Image, View } from "react-native";

export default function Logo() {
  return (
    <Image
      source={require("../../Images/books.jpg")}
      style={{ width: 70, height: 70, borderRadius: 50 }}
    />
  );
}
