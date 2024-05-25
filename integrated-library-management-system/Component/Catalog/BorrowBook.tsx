// import { CatalogType, MemberType, TransactionType } from "../../Types/types";
// import libraryServices from "../../Apis/Services/library.services";
// import React, { useContext, useEffect, useState } from "react";
// import { Alert, Button, View } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import GlobalContex from "../../Helpers/Contex/Contex";
// import borrowStyle from "./Styles";
// import { useNavigation } from "@react-navigation/native";

// /*
// 1. Display all members using picker
// 2. Decrease available copies
// 3. If available copies is 0: Set status to Unavailabe
// 4. Store the data , update transaction in contex
// */
// type Props = {
//   route: any;
// };
// export default function BorrowBook({ route }: Props) {
//   // const { catalog, setCatalog, transaction, members, setTransaction } =
//   //   useContext(GlobalContex);
//   const { state, dispatch } = useContext(GlobalContex);
//   const bookCatalog: CatalogType = route.params;
//   const navigation = useNavigation<any>();

//   // State for members to borrow book
//   const [displayMember, setDisplayMember] = useState<MemberType[]>([]);
//   const [selectedMember, setSelectedMember] = useState<string>("");

//   useEffect(() => {
//     setDisplayMember(state.members!);
//     if (state.members!.length > 0) {
//       setSelectedMember(state.members![0].id!);
//     }
//   }, [state.members]);

//   const handleBorrow = async () => {
//     try {
//       const newCatalog = { ...bookCatalog };

//       // Check if the user has already borrowed the book
//       const previousTransaction = state.transaction!.find(
//         (existingTransactions) =>
//           existingTransactions.memberId === selectedMember &&
//           existingTransactions.bookId === newCatalog.bookId &&
//           existingTransactions.returnedDate === null
//       );

//       if (previousTransaction) {
//         return Alert.alert("You have already borrowed this book");
//       }
//       if (newCatalog.availableCopies == 0) {
//         return Alert.alert("Sorry. Cannot Borrow!");
//       }

//       newCatalog.availableCopies -= 1;

//       const response = await libraryServices.updateCatalog(
//         newCatalog.id,
//         newCatalog
//       );
//       if (response.status == 200) {
//         const catalogIndex = state.catalog!.findIndex(
//           (catalogs) => catalogs.id === newCatalog.id
//         );
//         if (catalogIndex) {
//           // catalog[catalogIndex] = newCatalog;
//           const catalogs = state.catalog?.map((preCatalog, index) =>
//             index == catalogIndex ? newCatalog : preCatalog
//           );
//           dispatch({ type: "catalog", payload: { catalog: catalogs } });
//         }
//         // setCatalog([...catalog]);

//         // Update transactionState
//         const newTransaction: TransactionType = {
//           memberId: selectedMember,
//           bookId: newCatalog.bookId,
//           borrowedDate: new Date().toString(),
//           returnedDate: null,
//         };
//         // setTransaction([...transaction, newTransaction]);
//         dispatch({
//           type: "add-publisher",
//           payload: { transaction: [newTransaction] },
//         });
//         const response = await libraryServices.borrowTransaction(
//           newTransaction
//         );
//         if (response.status == 201) {
//           Alert.alert("Borrow Successful");
//           navigation.goBack();
//         }
//       }
//     } catch (error) {
//       Alert.alert("Error Occur");
//     }
//   };
//   return (
//     <View style={borrowStyle.container}>
//       <Picker
//         selectedValue={selectedMember}
//         onValueChange={(itemValue) => setSelectedMember(itemValue)}
//         style={{ width: "100%" }}
//       >
//         {displayMember.map((members, index) => (
//           <Picker.Item
//             key={index}
//             label={`${members.firstname} ${members.lastname}`}
//             value={members.id}
//           />
//         ))}
//       </Picker>
//       <Button title="Borrow" onPress={handleBorrow} />
//     </View>
//   );
// }

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
      const previousTransaction = state.transaction?.find(
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
          borrowedDate: new Date().toISOString(),
          returnedDate: null,
        };

        // Update the state before making the API call
        const updatedTransactions = [
          ...(state.transaction || []),
          newTransaction,
        ];
        dispatch({
          type: "transaction",
          payload: { transaction: updatedTransactions },
        });

        const transactionResponse = await libraryServices.borrowTransaction(
          newTransaction
        );
        if (transactionResponse.status === 201) {
          Alert.alert("Borrow Successful");
          navigation.goBack();
        } else {
          Alert.alert("Failed to register borrow transaction");
        }
      } else {
        Alert.alert("Failed to update catalog");
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
