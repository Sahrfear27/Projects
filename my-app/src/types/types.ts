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

  export interface Response {
    id: string
    userId: string
    songId: string
    orderId: number
    title: string
    urlPath: string
  }

  export interface searchResponse{
    isFirst: boolean,
    isLoading: boolean,
    isError: boolean,
    playList: Response[],
  }