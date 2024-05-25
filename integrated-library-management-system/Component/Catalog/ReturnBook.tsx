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

  // const handleReturn = async () => {
  //   try {
  //     // Increase the available copies
  //     const updatedCatalog = { ...data };
  //     updatedCatalog.availableCopies += 1;

  //     // Update the catalog in the server
  //     const response = await libraryServices.updateCatalog(
  //       updatedCatalog.id,
  //       updatedCatalog
  //     );

  //     if (response.status === 200) {
  //       const newCatalogs = state.catalog?.map((preCatalog) =>
  //         preCatalog.id === updatedCatalog.id ? updatedCatalog : preCatalog
  //       );

  //       dispatch({ type: "catalog", payload: { catalog: newCatalogs } });

  //       // Update the return date of the transactions
  //       const transactionIndex = state.transaction!.findIndex(
  //         (transaction) =>
  //           transaction.bookId === data.bookId &&
  //           transaction.returnedDate === null
  //       );

  //       if (transactionIndex !== -1) {
  //         const updatedTransactions = [...state.transaction!];
  //         updatedTransactions[transactionIndex] = {
  //           ...updatedTransactions[transactionIndex],
  //           returnedDate: new Date().toString(),
  //         };

  //         const transactionResponse = await libraryServices.updateTransaction(
  //           updatedTransactions[transactionIndex].id!,
  //           updatedTransactions[transactionIndex]
  //         );

  //         if (transactionResponse.status === 200) {
  //           dispatch({
  //             type: "transactions",
  //             payload: { transaction: updatedTransactions },
  //           });
  //           Alert.alert("Return Successful");
  //         } else {
  //           console.error("Failed to update transaction:", transactionResponse);
  //           Alert.alert("Failed to update transaction");
  //         }
  //       } else {
  //         console.error(
  //           "Transaction not found for the given bookId and returnedDate null"
  //         );
  //         Alert.alert("Transaction not found");
  //       }
  //     } else {
  //       console.error("Failed to update catalog:", response);
  //       Alert.alert("Failed to update catalog");
  //     }
  //   } catch (error) {
  //     console.error("Error occurred during handleReturn:", error);
  //     Alert.alert("Error Occur");
  //   }
  // };
  const handleReturn = async () => {
    try {
      // Increase the available copies
      const updatedCatalog = { ...data };
      updatedCatalog.availableCopies += 1;

      // Log the catalog update attempt
      console.log("Attempting to update catalog with ID:", updatedCatalog.id);
      console.log("Updated Catalog Data:", updatedCatalog);

      // Update the catalog on the server
      const response = await libraryServices.updateCatalog(
        updatedCatalog.id,
        updatedCatalog
      );

      if (response.status === 200) {
        const newCatalogs = state.catalog?.map((preCatalog) =>
          preCatalog.id === updatedCatalog.id ? updatedCatalog : preCatalog
        );

        dispatch({ type: "catalog", payload: { catalog: newCatalogs } });

        // Find the transaction to update
        const transactionIndex = state.transaction!.findIndex(
          (transaction) =>
            transaction.bookId === data.bookId &&
            transaction.returnedDate === null
        );

        if (transactionIndex !== -1) {
          const updatedTransactions = [...state.transaction!];
          updatedTransactions[transactionIndex] = {
            ...updatedTransactions[transactionIndex],
            returnedDate: new Date().toISOString(),
          };

          const transactionId = updatedTransactions[transactionIndex].id;

          // Check if transaction ID is defined
          if (!transactionId) {
            console.error(
              "Transaction ID is undefined. Transaction data:",
              updatedTransactions[transactionIndex]
            );
            Alert.alert("Error: Transaction ID is undefined");
            return;
          }

          // Log the transaction update attempt
          console.log(
            "Attempting to update transaction with ID:",
            transactionId
          );
          console.log(
            "Updated Transaction Data:",
            updatedTransactions[transactionIndex]
          );

          const transactionResponse = await libraryServices.updateTransaction(
            transactionId,
            updatedTransactions[transactionIndex]
          );

          if (transactionResponse.status === 200) {
            dispatch({
              type: "transactions",
              payload: { transaction: updatedTransactions },
            });
            Alert.alert("Return Successful");
          } else {
            console.error("Failed to update transaction:", transactionResponse);
            Alert.alert("Failed to update transaction");
          }
        } else {
          console.error(
            "Transaction not found for the given bookId and returnedDate null"
          );
          Alert.alert("Transaction not found");
        }
      } else {
        console.error("Failed to update catalog:", response);
        Alert.alert("Failed to update catalog");
      }
    } catch (error: any) {
      // Type assertion for error
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
        Alert.alert(
          `Error: ${error.response.status} - ${
            error.response.data.message || "Request failed"
          }`
        );
      } else if (error.request) {
        console.error("Error request data:", error.request);
        Alert.alert("Error: No response received from server");
      } else {
        console.error("Error message:", error.message);
        Alert.alert("Error: Unable to send request");
      }
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
