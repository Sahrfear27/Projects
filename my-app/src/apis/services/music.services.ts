import http from "axios"
import User from "../../types/types"

// Sign In
const signIn =(user:User)=>{
    return http.post('/api/auth/login',user)
}


export default {
    signIn
}
