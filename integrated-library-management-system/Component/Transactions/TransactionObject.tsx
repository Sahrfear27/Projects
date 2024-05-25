import { TransactionType } from "../../Types/types";
import { Text, View } from "react-native";
import transactionStyle from "./Styles";
import React from "react";

type Props = {
  data: TransactionType;
  index: number;
};
export default function TransactionObject({ data, index }: Props) {
  return (
    <View
      style={{
        backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#f0f9ff",
        borderBottomWidth: 5,
        borderBottomColor: "#FFFFFF",
      }}
    >
      <View style={transactionStyle.row}>
        <View style={transactionStyle.details}>
          <Text>
            <Text
              style={{
                color: "#1c1917",
                fontSize: 20,
                fontWeight: "light",
                fontFamily: "Times New Roman",
                letterSpacing: 1.5,
              }}
            >
              BookId :
            </Text>
            <Text
              style={{
                color: "#1c1917",
                fontSize: 17,
                fontFamily: "Trebuchet MS",
                fontWeight: "300",
                letterSpacing: 2,
              }}
            >
              {" "}
              {data.bookId}
            </Text>
          </Text>
          <Text>
            <Text
              style={{
                color: "#1c1917",
                fontSize: 20,
                fontWeight: "light",
                fontFamily: "Times New Roman",
                letterSpacing: 1.5,
              }}
            >
              Id :
            </Text>
            <Text
              style={{
                color: "#1c1917",
                fontSize: 17,
                fontFamily: "Trebuchet MS",
                fontWeight: "300",
                letterSpacing: 2,
              }}
            >
              {" "}
              {data.id}
            </Text>
          </Text>
          <Text>
            <Text
              style={{
                color: "#1c1917",
                fontSize: 20,
                fontWeight: "light",
                fontFamily: "Times New Roman",
                letterSpacing: 1.5,
              }}
            >
              MemberId:
            </Text>{" "}
            <Text
              style={{
                color: "#1c1917",
                fontSize: 17,
                fontFamily: "Trebuchet MS",
                fontWeight: "300",
                letterSpacing: 2,
              }}
            >
              {data.memberId}
            </Text>
          </Text>
          <Text>
            <Text
              style={{
                color: "#1c1917",
                fontSize: 20,
                fontWeight: "light",
                fontFamily: "Times New Roman",
                letterSpacing: 1.5,
              }}
            >
              Borrow Date:
            </Text>{" "}
            <Text
              style={{
                color: "#1c1917",
                fontSize: 15,
                fontFamily: "Trebuchet MS",
                fontWeight: "300",
                letterSpacing: 2,
              }}
            >
              {data.borrowedDate}
            </Text>
          </Text>
          <Text>
            <Text
              style={{
                color: "#1c1917",
                fontSize: 20,
                fontWeight: "light",
                fontFamily: "Times New Roman",
                letterSpacing: 1.5,
              }}
            >
              Return Date:
            </Text>
            <Text
              style={{
                color: "#1c1917",
                fontSize: 15,
                fontFamily: "Trebuchet MS",
                fontWeight: "300",
                letterSpacing: 2,
              }}
            >
              {" "}
              {data.returnedDate}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
