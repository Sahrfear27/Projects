import libraryServices from "../../Apis/Services/library.services";
import React, { useContext, useEffect, useState } from "react";
import { CatalogType, MemberType } from "../../Types/types";
import { Alert, Button, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import GlobalContex from "../../Helpers/Contex/Contex";
import borrowStyle from "./Styles";

type Props = {
  route: any;
};

export default function ReturnBook({ route }: Props) {
  const data: CatalogType = route.params;
  const { state, dispatch } = useContext(GlobalContex);
  const [displayMember, setDisplayMember] = useState<MemberType[]>([]);
  const [selectedMember, setSelectedMember] = useState<string>("");

  useEffect(() => {
    setDisplayMember(state.members || []);
    if (state.members && state.members.length > 0) {
      setSelectedMember(state.members[0].id || "");
    }
  }, [state.members]);

  const handleReturn = async () => {
    try {
      // Find the transaction to update
      const transactionIndex = state.transactions!.findIndex(
        (transaction) =>
          transaction.bookId === data.bookId &&
          transaction.returnedDate === null
      );

      if (transactionIndex !== -1) {
        const transactionToUpdate = {
          ...state.transactions![transactionIndex],
        };
        const transactionId = transactionToUpdate.id;
        // Check if transaction ID is defined
        if (!transactionId) {
          console.error(
            "Transaction ID is undefined. Transaction data:",
            transactionToUpdate
          );
          Alert.alert("Error: Transaction ID is undefined");
          return;
        }

        // Update the returnedDate field
        transactionToUpdate.returnedDate = new Date().toString();

        const transactionResponse = await libraryServices.updateTransaction(
          transactionId,
          transactionToUpdate
        );

        if (transactionResponse.status === 200) {
          // Update the transaction state
          const updatedTransactions = [...state.transactions!];
          updatedTransactions[transactionIndex] = transactionToUpdate;

          dispatch({
            type: "transactions",
            payload: { transactions: updatedTransactions },
          });

          // Increase the available copies
          const updatedCatalog = { ...data };
          updatedCatalog.availableCopies += 1;

          // Update the catalog on the server
          const catalogResponse = await libraryServices.updateCatalog(
            updatedCatalog.id,
            updatedCatalog
          );

          if (catalogResponse.status === 200) {
            const newCatalogs = state.catalog?.map((preCatalog) =>
              preCatalog.id === updatedCatalog.id ? updatedCatalog : preCatalog
            );

            dispatch({ type: "catalog", payload: { catalog: newCatalogs } });

            Alert.alert("Return Successful");
          } else {
            console.error("Failed to update catalog:", catalogResponse);
          }
        } else {
          console.error("Failed to update transaction:", transactionResponse);
        }
      } else {
        Alert.alert("Transaction not found");
      }
    } catch (error: any) {
      Alert.alert("Error: Unable to send request");
    }
  };

  return (
    <View style={borrowStyle.container}>
      <Picker
        selectedValue={selectedMember}
        onValueChange={(itemValue) => setSelectedMember(itemValue)}
        style={{ width: "100%" }}
      >
        {displayMember.map((members, index) => (
          <Picker.Item
            key={index}
            label={`${members.firstname} ${members.lastname}`}
            value={members.id}
          />
        ))}
      </Picker>
      <Button title="Return" onPress={handleReturn} />
    </View>
  );
}
