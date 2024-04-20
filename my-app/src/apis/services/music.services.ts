// import http from "../axios"
// import { LogInUser } from "../../types/types"
// import { SongResponse } from "../../types/types"
// import { checkRequest } from "../axios"
// // Sign In
// const signIn =(user:LogInUser)=>{
//     return http.post('/api/auth/login',user)
// }

// // const getSong = ()=>{
// //     const token = sessionStorage.getItem('token')
// //    if(token){
// //     return http.get('api/music?')
// //    }
// // }


// const getSong = (method:string, url:string, data:LogInUser)=>{
//     return checkRequest(method,url,data)
// }


// export default {
//     signIn,
//     getSong
// }


import http from "../axios";
import { LogInUser } from "../../types/types";

// Sign In
const signIn = (user: LogInUser) => {
  return http.post('/api/auth/login', user);
}

// Get songs
const getSong = (query: string) => {
  return http.get(`/api/music?${query}`);
}

export default {
  signIn,
  getSong
}


