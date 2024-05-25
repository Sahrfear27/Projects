import { Alert, Text, TouchableOpacity, View } from "react-native";
import libraryServices from "../../Apis/Services/library.services";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { MemberType } from "../../Types/types";
import GlobalContex from "../../Helpers/Contex/Contex";
import React, { useContext } from "react";
import memberStyle from "./Styles";

type Props = {
  data: MemberType;
  index: number;
};
export default function MemberObjects({ data, index }: Props) {
  // const { members, setMember } = useContext(GlobalContex);
  const { state, dispatch } = useContext(GlobalContex);
  const navigation = useNavigation<any>();

  const goToEdit = () => {
    navigation.navigate("edit", data);
  };

  const confirm = async () => {
    try {
      const response = await libraryServices.deleteMember(data.id!);

      if (response.status == 200) {
        const newMembers = state.members!.filter(
          (members) => members.id !== data.id
        );
        // setMember(newMembers);
        dispatch({ type: "members", payload: { members: newMembers } });
        Alert.alert("Delete Successful");
      }
    } catch (error) {
      Alert.alert("Fail to Delete");
    }
  };
  const handleDelete = () => {
    try {
      Alert.alert("Warning!", "Do you want to delete this Member?", [
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
      Alert.alert("Fail to delete");
    }
  };
  return (
    <View
      style={{
        backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#f0f9ff",
        borderBottomWidth: 5,
        borderBottomColor: "#FFFFFF",
      }}
    >
      <View style={memberStyle.row}>
        <View style={memberStyle.details}>
          <Text
            style={{
              color: "#1c1917",
              fontSize: 25,
              fontWeight: "bold",
              fontFamily: "Times New Roman",
            }}
          >
            Name: {data.firstname} {data.lastname}
          </Text>

          <Text
            style={{
              color: "#1c1917",
              fontSize: 20,
              fontFamily: "Trebuchet MS",
              fontWeight: "light",
            }}
          >
            Email: {data.email}
          </Text>
          <Text
            style={{
              color: "#1c1917",
              fontSize: 15,
              fontFamily: "Trebuchet MS",
              fontWeight: "light",
              letterSpacing: 2,
            }}
          >
            Address: {data.address}
          </Text>
          <Text
            style={{
              color: "#1c1917",
              fontSize: 15,
              fontFamily: "Trebuchet MS",
              fontWeight: "light",
              letterSpacing: 2,
            }}
          >
            Phone: {data.phone}
          </Text>
          <Text
            style={{
              color: "#1c1917",
              fontSize: 15,
              fontFamily: "Trebuchet MS",
              fontWeight: "light",
              letterSpacing: 2,
            }}
          >
            ID: {data.residentID}
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={goToEdit}>
            <MaterialIcons name="edit" size={26} color="#0e7490" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDelete}>
            <MaterialIcons name="delete" size={26} color="#a3a3a3" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
