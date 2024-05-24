import { useNavigation } from "@react-navigation/native";
import GlobalContex from "../../Contex/Contex";
const image = require("../../assets/members.jpg");
import React, { useContext } from "react";
import MemberObjects from "./MemberObject";
import memberStyle from "./Styles";
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  Text,
  TouchableHighlight,
} from "react-native";

export default function MemberList() {
  const navigation = useNavigation<any>();
  const { members, setMember } = useContext(GlobalContex);
  const handleAdd = () => {
    navigation.navigate("addMember");
  };
  return (
    <SafeAreaView style={memberStyle.container}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={memberStyle.imgBackground}
      />
      <TouchableHighlight style={memberStyle.addMember} onPress={handleAdd}>
        <Text style={memberStyle.buttonText}>Add Member</Text>
      </TouchableHighlight>
      <FlatList
        data={members}
        renderItem={({ item, index }) => (
          <MemberObjects data={item} index={index} />
        )}
        keyExtractor={(data, index) => (data.id ? data.id : index.toString())}
      />
    </SafeAreaView>
  );
}
