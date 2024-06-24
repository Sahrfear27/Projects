export  interface LogInUser{
    username: string;
    password: string;
  };

  export  interface UserDetails {
    id:string,
    username:string,
    playType:string,
    accessToken:string
  }

  export interface searchResponse{
    isFirst: boolean,
    isLoading: boolean,
    isError: boolean,
    playList: musicDataBase[],
  }
  export interface musicDataBase{
    id: string
    urlPath: string
    title: string,
    releaseDate:string
  }


  export interface PlayListDataBase {
    id: string
    userId: string
    songId: string
    orderId: number
    title: string
    urlPath: string
  }

  // http://localhost:9000/music?search=q=Bird

  // http://localhost:3000/api/music?search=Bird