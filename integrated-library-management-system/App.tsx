import TransactionScreens from "./Component/Transactions/TransactionScreens";
import PublisherScreen from "./Component/Publishers/PublisherScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import libraryServices from "./Apis/Services/library.services";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import MemberScreens from "./Component/Members/MemberScreens";
import CatalogScreen from "./Component/Catalog/CatalogScreen";
import AuthorScreen from "./Component/Authors/AuthorScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MainPage from "./Component/Books/BookScreens";
import UserLogin from "./Component/Users/Login";
import { Alert, View } from "react-native";
import { useEffect, useState } from "react";
import GlobalContex from "./Contex/Contex";
import "react-native-gesture-handler";
import styles from "./Styles/styles";
import {
  BookType,
  AuthorType,
  PublisherType,
  MemberType,
  CatalogType,
  TransactionType,
} from "./Types/types";

const { Navigator, Screen } = createDrawerNavigator();

export default function App() {
  const [state, setState] = useState<BookType[]>([]);
  const [authors, setAuthor] = useState<AuthorType[]>([]);
  const [publishers, setPublisher] = useState<PublisherType[]>([]);
  const [members, setMember] = useState<MemberType[]>([]);
  const [catalog, setCatalog] = useState<CatalogType[]>([]);
  const [transaction, setTransaction] = useState<TransactionType[]>([]);
  const [logIn, setLogIn] = useState(false);

  // Load All books from the server
  async function loadBooks() {
    try {
      const response = await libraryServices.getAllBooks();
      if (response.status == 200) {
        setState(response.data);
      }
      const userEmail = await AsyncStorage.getItem("email");
      if (userEmail) {
        const obj = JSON.parse(userEmail);
        setLogIn(obj.logIn);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Load Authors
  async function loadAuthors() {
    try {
      const response = await libraryServices.getAuthors();
      if (response.status == 200) {
        setAuthor(response.data);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Fail To Load");
    }
  }

  // Load Publishers
  async function loadPublishers() {
    try {
      const response = await libraryServices.getPublishers();
      if (response.status == 200) {
        setPublisher(response.data);
      }
    } catch (error) {
      return Alert.alert("Fail to load data");
    }
  }

  // Load Members
  async function loadMembers() {
    try {
      const response = await libraryServices.getMembers();
      if (response.status == 200) {
        // console.log(response.data);
        setMember(response.data);
      }
    } catch (error) {
      Alert.alert("Fail to load data");
    }
  }

  // Load Catalog
  async function loadCatalog() {
    try {
      const respone = await libraryServices.getCatalog();
      if (respone.status == 200) {
        // console.log(respone.data);
        setCatalog(respone.data);
      }
    } catch (error) {
      Alert.alert("Fail to Load data");
    }
  }

  // Load Transactions
  async function loadTransactions() {
    try {
      const response = await libraryServices.getTransactions();
      if (response.status == 200) {
        setTransaction(response.data);
      }
    } catch (error) {
      Alert.alert("Fail to load data");
    }
  }
  useEffect(() => {
    loadBooks();
    loadAuthors();
    loadPublishers();
    loadMembers();
    loadCatalog();
    loadTransactions();
  }, []);

  if (!logIn) {
    return <UserLogin setLogIn={setLogIn} />;
  }
  return (
    <GlobalContex.Provider
      value={{
        state,
        setState,
        logIn,
        setLogIn,
        authors,
        setAuthor,
        publishers,
        setPublisher,
        members,
        setMember,
        catalog,
        setCatalog,
        transaction,
        setTransaction,
      }}
    >
      <View style={styles.container}>
        <NavigationContainer>
          <Navigator
            initialRouteName="books"
            screenOptions={{
              drawerStyle: {
                backgroundColor: "#c6cbef",
              },
              drawerActiveTintColor: "#ffffff",
              drawerInactiveTintColor: "#000000",
              drawerActiveBackgroundColor: "#0284c7",
            }}
          >
            <Screen
              name="Books"
              component={MainPage}
              options={{
                drawerIcon: ({ color }) => (
                  <MaterialCommunityIcons name="home" color={color} size={25} />
                ),
              }}
            />
            <Screen
              name="Authors"
              component={AuthorScreen}
              options={{
                drawerIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="account-multiple"
                    color={color}
                    size={26}
                  />
                ),
              }}
            />
            <Screen
              name="Publishers"
              component={PublisherScreen}
              options={{
                drawerIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="book-open-page-variant"
                    color={color}
                    size={26}
                  />
                ),
              }}
            />
            <Screen
              name="Catalog"
              component={CatalogScreen}
              options={{
                drawerIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="book-plus"
                    color={color}
                    size={26}
                  />
                ),
              }}
            />
            <Screen
              name="Members"
              component={MemberScreens}
              options={{
                drawerIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="account-group"
                    color={color}
                    size={26}
                  />
                ),
              }}
            />
            <Screen
              name="Transactions"
              component={TransactionScreens}
              options={{
                drawerIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="wallet"
                    color={color}
                    size={26}
                  />
                ),
              }}
            />
          </Navigator>
        </NavigationContainer>
      </View>
    </GlobalContex.Provider>
  );
}
