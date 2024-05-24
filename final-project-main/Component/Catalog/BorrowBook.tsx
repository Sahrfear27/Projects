import { CatalogType, MemberType, TransactionType } from "../../Types/types";
import libraryServices from "../../Apis/Services/library.services";
import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import GlobalContex from "../../Contex/Contex";
import borrowStyle from "./Styles";
import { useNavigation } from "@react-navigation/native";

/*
1. Display all members using picker
2. Decrease available copies
3. If available copies is 0: Set status to Unavailabe
4. Store the data , update transaction in contex 
*/
type Props = {
  route: any;
};
export default function BorrowBook({ route }: Props) {
  const { catalog, setCatalog, transaction, members, setTransaction } =
    useContext(GlobalContex);

  const bookCatalog: CatalogType = route.params;
  const navigation = useNavigation<any>();

  // State for members to borrow book
  const [displayMember, setDisplayMember] = useState<MemberType[]>([]);
  const [selectedMember, setSelectedMember] = useState<string>("");

  useEffect(() => {
    setDisplayMember(members);
    if (members.length > 0) {
      setSelectedMember(members[0].id!);
    }
  }, [members]);

  const handleBorrow = async () => {
    try {
      const newCatalog = { ...bookCatalog };

      // Check if the user has already borrowed the book
      const previousTransaction = transaction.find(
        (existingTransactions) =>
          existingTransactions.memberId === selectedMember &&
          existingTransactions.bookId === newCatalog.bookId &&
          existingTransactions.returnedDate === null
      );

      if (previousTransaction) {
        return Alert.alert("You have already borrowed this book");
      }
      if (newCatalog.availableCopies == 0) {
        return Alert.alert("Sorry. Cannot Borrow!");
      }

      newCatalog.availableCopies -= 1;

      const response = await libraryServices.updateCatalog(
        newCatalog.id,
        newCatalog
      );
      if (response.status == 200) {
        const catalogIndex = catalog.findIndex(
          (catalogs) => catalogs.id === newCatalog.id
        );
        if (catalogIndex) {
          catalog[catalogIndex] = newCatalog;
        }
        setCatalog([...catalog]);

        // Update transactionState
        const newTransaction: TransactionType = {
          memberId: selectedMember,
          bookId: newCatalog.bookId,
          borrowedDate: new Date().toString(),
          returnedDate: null,
        };
        setTransaction([...transaction, newTransaction]);
        const response = await libraryServices.borrowTransaction(
          newTransaction
        );
        if (response.status == 201) {
          Alert.alert("Borrow Successful");
          navigation.goBack();
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
      <Button title="Borrow" onPress={handleBorrow} />
    </View>
  );
}
