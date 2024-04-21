

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
const getTotalSong = (token: string) => {

  return http.get("/api/music",
    {
      headers:{
        "Authorization":`Bearer ${token}`
      }
    }
  )
}



// Add to playlist
const addToPlayList = (song:string, token:string, userId:string)=>{
  return http.post(`/api/playlist/${userId}`,{song},
    {
      headers:{
        "Authorization": `Bearer ${token}`
      }
    }
  )
}


// Fetch User Play List
const getPlaylist =(token:string)=>{
  return http.get(`/api/playlist`,
    {
      headers:{
        "Authorization":`Bearer ${token}`
      }
    }
  )
}

// Add playList In sessionStorage and Server: Having Error
const addPlayListToStorage = (token: string, songId: string) => {
  return http.post(
    `/api/playlist/add`,
    {
      songId: songId,
    },
    {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }
  );
};


// Remove from session storage and server
const removeFromServers =(token:string, songId:string)=>{
  return http.post(
    `api/playlist/remove`,
    {
      songId:songId,
    },
    {
      headers:{
        "Authorization":`Bearer ${token}`
      }
    }

  )
}
export default {
  signIn,
  getSong,
  getTotalSong,
  addToPlayList,
  getPlaylist,
  addPlayListToStorage,
  removeFromServers
}


