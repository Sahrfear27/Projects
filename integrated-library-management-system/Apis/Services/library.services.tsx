import {
  BookType,
  AuthorType,
  PublisherType,
  MemberType,
  CatalogType,
  TransactionType,
  UserType,
} from "../../Types/types";
import http from "../axios";

// SignIn to the account
const signIn = (email: string) => {
  return http.get(`/users?email=${email}`);
};

// Get Old User
const getUser = () => {
  return http.get("/users");
};
// Sign up to create an account
const signUpUser = (user: UserType) => {
  return http.post("/users", user);
};
// Get book from the server
const getAllBooks = () => {
  return http.get("/books");
};

// Add new Book
const addNewBook = (newbook: BookType) => {
  return http.post(`/books`, newbook);
};

// Update Book
const updateBook = (id: string, newBook: BookType) => {
  return http.put(`/books/${id}`, newBook);
};

// Delete a book
const deleteBook = (id: string) => {
  return http.delete(`/books/${id}`);
};

// Get author in the Book
const getAuthorById = (BookId: string) => {
  return http.get(`/books/${BookId}`);
};

// Get authors
const getAuthors = () => {
  return http.get("/authors");
};

// Add New Authors
const addAuthor = (newAuthor: AuthorType) => {
  return http.post("/authors", newAuthor);
};

// Update Author
const updateAuthor = (id: string, newAuthor: AuthorType) => {
  return http.put(`/authors/${id}`, newAuthor);
};

// Delete Author
const deleteAuthor = (id: string) => {
  return http.delete(`/authors/${id}`);
};

// Add authors to book
// const addAuthorToBook = (bookId: string, authorId: string) => {
//   return http.put(`/books/${bookId}/authors`, { authorId });
// };

// Get all publishers
const getPublishers = () => {
  return http.get(`/publishers`);
};

// Add Publishers
const addPublishers = (newPublisher: PublisherType) => {
  return http.post(`/publishers`, newPublisher);
};

// Update Publisher
const updatePublisher = (id: string, newPublisher: PublisherType) => {
  return http.put(`/publishers/${id}`, newPublisher);
};

// Delete Author
const deletePublisher = (id: string) => {
  return http.delete(`/publishers/${id}`);
};

// Get all members
const getMembers = () => {
  return http.get("/members");
};

// Add New Members
const addMembers = (newMember: MemberType) => {
  return http.post(`/members`, newMember);
};

// Update Member
const updateMember = (id: string, newMember: MemberType) => {
  return http.put(`/members/${id}`, newMember);
};

// Delete Member
const deleteMember = (id: string) => {
  return http.delete(`/members/${id}`);
};

// Get catalog
const getCatalog = () => {
  return http.get("/catalogs");
};

// Update Catalog
const updateCatalog = (id: string, newCatalog: CatalogType) => {
  return http.put(`/catalogs/${id}`, newCatalog);
};

// Get Transactions
const getTransactions = () => {
  return http.get(`/transactions`);
};

// Send a new transaction
const borrowTransaction = (newTransaction: TransactionType) => {
  return http.post("/transactions", newTransaction);
};

const updateTransaction = (id: string, updatedTransaction: TransactionType) => {
  return http.put(`/transactions/${id}`, updatedTransaction);
};
export default {
  signIn,
  getUser,
  signUpUser,
  getAllBooks,
  addNewBook,
  updateBook,
  deleteBook,
  getAuthors,
  addAuthor,
  updateAuthor,
  deleteAuthor,
  getAuthorById,
  getPublishers,
  addPublishers,
  updatePublisher,
  deletePublisher,
  getMembers,
  addMembers,
  updateMember,
  deleteMember,
  getCatalog,
  updateCatalog,
  getTransactions,
  borrowTransaction,
  updateTransaction,
};
