import { CatalogType, MemberType, TransactionType } from "../../Types/types";
import libraryServices from "../../Apis/Services/library.services";
import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import GlobalContex from "../../Helpers/Contex/Contex";
import borrowStyle from "./Styles";
import { useNavigation } from "@react-navigation/native";

/*
1. Display all members using picker
2. Decrease available copies
3. If available copies is 0: Set status to Unavailable
4. Store the data, update transaction in context 
*/
type Props = {
  route: any;
};
export default function BorrowBook({ route }: Props) {
  const { state, dispatch } = useContext(GlobalContex);
  const bookCatalog: CatalogType = route.params;
  const navigation = useNavigation<any>();

  const [displayMember, setDisplayMember] = useState<MemberType[]>([]);
  const [selectedMember, setSelectedMember] = useState<string>("");

  useEffect(() => {
    setDisplayMember(state.members || []);
    if (state.members && state.members.length > 0) {
      setSelectedMember(state.members[0].id || "");
    }
  }, [state.members]);

  const handleBorrow = async () => {
    try {
      const newCatalog = { ...bookCatalog };

      // Check if the user has already borrowed the book
      const previousTransaction = state.transactions?.find(
        (existingTransactions) =>
          existingTransactions.memberId === selectedMember &&
          existingTransactions.bookId === newCatalog.bookId &&
          existingTransactions.returnedDate === null
      );

      if (previousTransaction) {
        return Alert.alert("You have already borrowed this book");
      }
      if (newCatalog.availableCopies === 0) {
        return Alert.alert("Sorry. Cannot Borrow!");
      }

      newCatalog.availableCopies -= 1;

      const catalogResponse = await libraryServices.updateCatalog(
        newCatalog.id,
        newCatalog
      );
      if (catalogResponse.status === 200) {
        const updatedCatalog = state.catalog?.map((catalog) =>
          catalog.id === newCatalog.id ? newCatalog : catalog
        );
        dispatch({ type: "catalog", payload: { catalog: updatedCatalog } });

        // Create the new transaction
        const newTransaction: TransactionType = {
          memberId: selectedMember,
          bookId: newCatalog.bookId,
          borrowedDate: new Date().toString(),
          returnedDate: null,
        };

        const transactionResponse = await libraryServices.borrowTransaction(
          newTransaction
        );

        if (transactionResponse.status === 201) {
          const updatedTransactions = [
            ...(state.transactions || []),
            newTransaction,
          ];

          dispatch({
            type: "transactions",
            payload: { transactions: updatedTransactions },
          });
          Alert.alert("Borrow Successful");
          navigation.goBack();
        } else {
          Alert.alert("Fail to Borrow");
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
        {displayMember.map((member, index) => (
          <Picker.Item
            key={index}
            label={`${member.firstname} ${member.lastname}`}
            value={member.id}
          />
        ))}
      </Picker>
      <Button title="Borrow" onPress={handleBorrow} />
    </View>
  );
}
