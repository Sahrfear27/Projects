export interface Root {
    books: BookType[]
    authors: AuthorType[]
    publishers: PublisherType[]
    catalogs: CatalogType[]
    members: MemberType[]
    transactions: TransactionType[]
    users: UserType[]
  }
  
  export interface BookType {
    id?: string
    title: string
    genre: string
    category: string
    authorIDs?: string[]
    publisherId?: string
  }
  
  export interface AuthorType {
    id?: string
    name: string
    phone: string
    email: string
  }
  
  export interface PublisherType {
    id?: string
    name: string
    phone: string
    email: string
    address: string
  }
  
  export interface CatalogType {
    id: string
    bookId: string
    numberOfCopies: number
    availableCopies: number
  }
  
  export interface MemberType {
    id?: string
    residentID: string
    firstname: string
    lastname: string
    address: string
    phone: string
    email: string
  }
  
  export interface TransactionType {
    id?: string
    bookId: string
    memberId: string
    borrowedDate: string
    returnedDate: string |null
  }
  
  export interface UserType {
    id?: string
    name: string
    email: string
  }
  