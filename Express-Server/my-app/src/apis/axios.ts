import axios from "axios"
import { LogInUser } from "../types/types"
// Connect API to Server

const access_Token = sessionStorage.getItem('token')
export default axios.create({
    baseURL:'http://localhost:9000',
    headers:{
        'Content-Type': 'application/json',
        "Authorization":`Bearer ${access_Token}`
    }
})