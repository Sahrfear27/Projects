import {
  AuthorType,
  BookType,
  CatalogType,
  MemberType,
  PublisherType,
  TransactionType,
} from "../../Types/types";

// Initial State
export const INITIAL_STATE = {
  books: [],
  authors: [],
  publishers: [],
  members: [],
  catalog: [],
  transaction: [],
  logIn: false,
};

// State Type
export type StateType = {
  books?: BookType[];
  authors?: AuthorType[];
  publishers?: PublisherType[];
  members?: MemberType[];
  catalog?: CatalogType[];
  transaction?: TransactionType[];
  logIn?: boolean;
};

// Action Type
export type ActionType = {
  type: string;
  payload: Partial<StateType>;
};

// Reducer Function
export function reducer(state: StateType, action: ActionType) {
  const { type, payload } = action;
  switch (type) {
    case "books":
      return { ...state, books: payload.books ?? state.books };
    case "add-book":
      return {
        ...state,
        books: [...(state.books ?? []), ...(payload.books ?? [])],
      };
    case "authors":
      return { ...state, authors: payload.authors ?? state.authors };
    case "add-author":
      return {
        ...state,
        authors: [
          ...(state.authors ? state.authors : []),
          ...(payload.authors ? payload.authors : []),
        ],
      };
    case "publishers":
      return { ...state, publishers: payload.publishers ?? state.publishers };
    case "add-publisher":
      return {
        ...state,
        publishers: [
          ...(state.publishers ? state.publishers : []),
          ...(payload.publishers ? payload.publishers : []),
        ],
      };
    case "members":
      return { ...state, members: payload.members ?? state.members };
    case "add-member":
      return {
        ...state,
        members: [...(state.members ?? []), ...(payload.members ?? [])],
      };
    case "catalog":
      return { ...state, catalog: payload.catalog ?? state.catalog };

    case "transaction":
      return {
        ...state,
        transaction: payload.transaction ?? state.transaction,
      };
    case "add-transaction":
      return {
        ...state,
        transaction: [
          ...(state.transaction ? state.transaction : []),
          ...(payload.transaction ? payload.transaction : []),
        ],
      };
    case "logIn":
      return { ...state, logIn: payload.logIn ?? state.logIn };
    default:
      return state;
  }
}
