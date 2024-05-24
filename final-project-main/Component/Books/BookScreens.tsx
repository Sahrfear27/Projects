import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddPublisherToBook from "./AddPublisherToBook";
import AddAuthorToBook from "./AddAuthorToBook";
import AddNewBook from "./AddNewBook";
import BookList from "./BookList";
import EditBook from "./EditBook";

const { Navigator, Screen } = createNativeStackNavigator();

export default function MainPage() {
  return (
    <Navigator screenOptions={{ headerShown: true }}>
      <Screen
        name="bookList"
        component={BookList}
        options={{ headerShown: false }}
      />
      <Screen name="addBook" component={AddNewBook} />
      <Screen name="editBook" component={EditBook} />

      <Screen name="addAuthorToBook" component={AddAuthorToBook} />
      <Screen name="addPublisherToBook" component={AddPublisherToBook} />
    </Navigator>
  );
}
