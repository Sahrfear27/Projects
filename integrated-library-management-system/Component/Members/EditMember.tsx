import { Alert, Text, TextInput, TouchableHighlight, View } from "react-native";
import libraryServices from "../../Apis/Services/library.services";
import React, { useContext, useState } from "react";
import { MemberType } from "../../Types/types";
import GlobalContex from "../../Contex/Contex";
import memberStyle from "./Styles";

type Props = {
  route: any;
};
export default function EditMember({ route }: Props) {
  const data: MemberType = route.params;
  const { members, setMember } = useContext(GlobalContex);
  const [newMember, setNewMember] = useState(data);

  const handleUpdate = async () => {
    try {
      const response = await libraryServices.updateMember(
        newMember.id!,
        newMember
      );
      if (response.status == 200) {
        const memberIndex = members.findIndex(
          (member) => member.id === newMember.id
        );
        if (memberIndex !== -1) {
          members[memberIndex] = newMember;
        }
        setMember([...members]);
        Alert.alert("Updated Successfully");
      }
    } catch (error) {
      Alert.alert("Updated Successfully");
    }
  };
  return (
    <View style={memberStyle.container}>
      <Text style={memberStyle.headerText}>Edit Author</Text>
      <TextInput
        placeholder="first name"
        style={memberStyle.input}
        value={newMember.firstname}
        onChangeText={(text: string) =>
          setNewMember({ ...newMember, firstname: text })
        }
      />
      <TextInput
        placeholder="last name"
        style={memberStyle.input}
        value={newMember.lastname}
        onChangeText={(text: string) =>
          setNewMember({ ...newMember, lastname: text })
        }
      />
      <TextInput
        placeholder="Email"
        style={memberStyle.input}
        value={newMember.email}
        onChangeText={(text: string) =>
          setNewMember({ ...newMember, email: text })
        }
      />
      <TextInput
        placeholder="Address"
        style={memberStyle.input}
        value={newMember.address}
        onChangeText={(text: string) =>
          setNewMember({ ...newMember, address: text })
        }
      />
      <TextInput
        placeholder="Phone"
        style={memberStyle.input}
        value={newMember.phone}
        onChangeText={(text: string) =>
          setNewMember({ ...newMember, phone: text })
        }
      />
      <TextInput
        placeholder="residentID"
        style={memberStyle.input}
        value={newMember.residentID}
        onChangeText={(text: string) =>
          setNewMember({ ...newMember, residentID: text })
        }
      />

      <TouchableHighlight style={memberStyle.addButton} onPress={handleUpdate}>
        <Text style={memberStyle.buttonText}>Update</Text>
      </TouchableHighlight>
    </View>
  );
}
