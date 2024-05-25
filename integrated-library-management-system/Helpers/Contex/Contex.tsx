import { Dispatch, createContext } from "react";
import {
  BookType,
  AuthorType,
  PublisherType,
  MemberType,
  CatalogType,
  TransactionType,
} from "../../Types/types";
import { StateType, ActionType, INITIAL_STATE } from "../Reducer/Reducer";

type ContexType = {
  state: StateType;
  dispatch: Dispatch<ActionType>;
};

const GlobalContex = createContext<ContexType>({
  state: INITIAL_STATE,
  dispatch: () => {},
});
export default GlobalContex;
// type ContexType = {
//   state: BookType[];
//   setState: (book: BookType[]) => void;
//   logIn: boolean;
//   setLogIn: (logIn: boolean) => void;
//   authors: AuthorType[];
//   setAuthor: (author: AuthorType[]) => void;
//   publishers: PublisherType[];
//   setPublisher: (publisher: PublisherType[]) => void;
//   members: MemberType[];
//   setMember: (member: MemberType[]) => void;
//   catalog: CatalogType[];
//   setCatalog: (cataLog: CatalogType[]) => void;
//   transaction: TransactionType[];
//   setTransaction: (newTransaction: TransactionType[]) => void;
// };

// const GlobalContex = createContext<ContexType>({
//   state: [],
//   setState: () => {},
//   logIn: false,
//   setLogIn: () => {},
//   authors: [],
//   setAuthor: () => {},
//   publishers: [],
//   setPublisher: () => {},
//   members: [],
//   setMember: () => {},
//   catalog: [],
//   setCatalog: () => {},
//   transaction: [],
//   setTransaction: () => {},
// });

// export default GlobalContex;
