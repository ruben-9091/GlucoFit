import { http } from "../api-service/api-service";

export async function register (user) {
    const data = await http.post("/users", user); 
    return data; 
}; 

export async function login(user) {
    const data = await http.post("/sessions", user); 
    return data; 
}; 

export async function getProfile() {
    const data = await http.get("/users/me"); 
    return data; 
}; 

export async function logout() {
    const data = await http.delete("/sessions"); 
    return data; 
}; 