import { TouchableHighlight } from "react-native-gesture-handler";
import libraryServices from "../../Apis/Services/library.services";
import { Alert, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PublisherType } from "../../Types/types";
import React, { useContext, useState } from "react";
import GlobalContex from "../../Helpers/Contex/Contex";
import publisherStyle from "./Styles";

type Props = {
  route: any;
};
export default function EditPublisher({ route }: Props) {
  const data = route.params;
  const navigation = useNavigation<any>();
  const { state, dispatch } = useContext(GlobalContex);
  const [newPublisher, setNewPublisher] = useState<PublisherType>(data);
  const handleUpdate = async () => {
    try {
      const response = await libraryServices.updatePublisher(
        newPublisher.id!,
        newPublisher
      );
      if (response.status == 200) {
        const publlisherIndex = state.publishers?.findIndex(
          (publishers) => publishers.id == newPublisher.id
        );
        if (publlisherIndex !== -1) {
          const updatedPublishers = state.publishers?.map(
            (prevPublishers, index) =>
              index === publlisherIndex ? newPublisher : prevPublishers
          );
          dispatch({
            type: "publishers",
            payload: { publishers: updatedPublishers },
          });
        }

        Alert.alert("Updated Successifully");
        navigation.navigate("publisherList");
      }
    } catch (error) {
      Alert.alert("Fail to update");
    }
  };
  return (
    <View style={publisherStyle.container}>
      <TextInput
        placeholder="Name"
        style={publisherStyle.input}
        value={newPublisher.name}
        onChangeText={(text: string) =>
          setNewPublisher({ ...newPublisher, name: text })
        }
      />
      <TextInput
        placeholder="Email"
        style={publisherStyle.input}
        value={newPublisher.email}
        onChangeText={(text: string) =>
          setNewPublisher({ ...newPublisher, email: text })
        }
      />
      <TextInput
        placeholder="Phone"
        style={publisherStyle.input}
        value={newPublisher.phone}
        onChangeText={(text: string) =>
          setNewPublisher({ ...newPublisher, phone: text })
        }
      />
      <TextInput
        placeholder="Address"
        style={publisherStyle.input}
        value={newPublisher.address}
        onChangeText={(text: string) =>
          setNewPublisher({ ...newPublisher, address: text })
        }
      />

      <TouchableHighlight
        style={publisherStyle.addButton}
        onPress={handleUpdate}
      >
        <Text style={publisherStyle.buttonText}>Update</Text>
      </TouchableHighlight>
    </View>
  );
}
