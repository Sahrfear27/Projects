import axios from "axios"
import { LogInUser } from "../types/types"
// Connect API to Server
export default axios.create({
    baseURL:'http://localhost:9000',
    headers:{
        'Content-Type': 'application/json'
    }
})

// Use check request for all other request to the server

export const checkRequest = async (method:string, url:string, data:LogInUser)=>{
    const token = sessionStorage.getItem('token')
    if(!token){
        throw new Error("Token do not exist in session storage")
    }
    else{
        axios.request({
            method,
            url,
            data,
            headers:{
                Authorization:`Baerer ${token}`
            }
        }
    )
    }
}