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
  // const { transaction, setTransaction, catalog, setCatalog, members } =
  //   useContext(GlobalContex);

  const { state, dispatch } = useContext(GlobalContex);
  // State for all member to borrow the book
  const [displayMember, setDisplayMember] = useState<MemberType[]>([]);

  // Member that want to borrow the book
  const [selectedMember, setSelectedMember] = useState<string>("");
  useEffect(() => {
    setDisplayMember(state.members!);
    if (state.members!.length > 0) {
      setSelectedMember(state.members![0].id!);
    }
  }, [state.members]);

  const handleReturn = async () => {
    try {
      // Increase the available copies
      const updatedCatalog = { ...data };
      updatedCatalog.availableCopies += 1;

      // Update the catalog in the server
      const response = await libraryServices.updateCatalog(
        updatedCatalog.id,
        updatedCatalog
      );
      if (response.status === 200) {
        const catalogIndex = state.catalog!.findIndex(
          (catalogs) => catalogs.id === updatedCatalog.id
        );
        if (catalogIndex !== -1) {
          // catalog[catalogIndex] = updatedCatalog;
          const newCatalogs = state.catalog?.map((preCatalog, index) =>
            index == catalogIndex ? updatedCatalog : preCatalog
          );
          dispatch({ type: "catalog", payload: { catalog: newCatalogs } });
        }
        // setCatalog([...catalog]);

        // Update the return date of the transactions
        const transactionIndex = state.transaction!.findIndex(
          (transaction) =>
            transaction.bookId == data.bookId &&
            transaction.returnedDate === null
        );
        if (transactionIndex !== -1) {
          //find the transaction object
          const updatedTransaction = [...state.transaction!][transactionIndex];
          updatedTransaction.returnedDate = new Date().toString();

          const transactionResponse = await libraryServices.updateTransaction(
            updatedTransaction?.id!,
            updatedTransaction!
          );
          if (transactionResponse.status == 200) {
            state.transaction![transactionIndex].returnedDate ==
              new Date().toString();
          }
          // setTransaction([...transaction]);
          dispatch({
            type: "transactions",
            payload: { transaction: [...state.transaction!] },
          });
          Alert.alert("Return Successful");
        }
      }
    } catch (error) {
      Alert.alert("Error Occur");
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
