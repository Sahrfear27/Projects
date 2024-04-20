

import http from "../axios";
import { LogInUser } from "../../types/types";
// import { checkRequest } from "../axios";
// Sign In
const signIn = (user: LogInUser) => {
  return http.post('/api/auth/login', user);
}

// Get song by title
const getSong = (query: string) => {
  const  path = query?`/api/music?search=${query}`:"/music"


  return http.get(path)
}

// Get allSong
const getAllSong = (token: string) => {

  return http.get("/api/music",
    {
      headers:{
        "Authorization":`Bearer ${token}`
      }
    }
  )
}


const addToPlayList = (song:string, token:string, userId:string)=>{
  return http.post(`/api/playlist/${userId}`,{song},
    {
      headers:{
        "Authorization": `Bearer ${token}`
      }
    }
  )
}
export default {
  signIn,
  getSong,
  getAllSong,
  addToPlayList
}


