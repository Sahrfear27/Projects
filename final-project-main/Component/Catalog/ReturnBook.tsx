import libraryServices from "../../Apis/Services/library.services";
import React, { useContext, useEffect, useState } from "react";
import { CatalogType, MemberType } from "../../Types/types";
import { Alert, Button, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import GlobalContex from "../../Contex/Contex";
import borrowStyle from "./Styles";

type Props = {
  route: any;
};
export default function ReturnBook({ route }: Props) {
  const data: CatalogType = route.params;
  const { transaction, setTransaction, catalog, setCatalog, members } =
    useContext(GlobalContex);

  // State for all member to borrow the book
  const [displayMember, setDisplayMember] = useState<MemberType[]>([]);

  // Member that want to borrow the book
  const [selectedMember, setSelectedMember] = useState<string>("");
  useEffect(() => {
    setDisplayMember(members);
    if (members.length > 0) {
      setSelectedMember(members[0].id!);
    }
  }, [members]);

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
        const catalogIndex = catalog.findIndex(
          (catalogs) => catalogs.id === updatedCatalog.id
        );
        if (catalogIndex !== -1) {
          catalog[catalogIndex] = updatedCatalog;
        }
        setCatalog([...catalog]);

        // Update the return date of the transactions
        const transactionIndex = transaction.findIndex(
          (transaction) =>
            transaction.bookId == data.bookId &&
            transaction.returnedDate === null
        );
        if (transactionIndex !== -1) {
          //find the transaction object
          const updatedTransaction = [...transaction][transactionIndex];
          updatedTransaction.returnedDate = new Date().toString();

          const transactionResponse = await libraryServices.updateTransaction(
            updatedTransaction?.id!,
            updatedTransaction!
          );
          if (transactionResponse.status == 200) {
            transaction[transactionIndex].returnedDate == new Date().toString();
          }
          setTransaction([...transaction]);
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
