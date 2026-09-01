import { http } from "../api-service/api-service";

export async function listRecipes(categoria) {
    const params = categoria ? { categoria } : {}
    const data = await http.get("/recipes", { params }); 
    return data; 
}; 

export async function getRecipe(id) {
    const data = await http.get(`/recipes/${id}`); 
    return data; 
}; 

export async function createRecipe(payload) {
 const data = await http.post("/recipes", payload); 
 return data;
}; 

export async function updateRecipe(id, payload) {
    const data = await http.patch(`/recipes/${id}`, payload); 
    return data;
}; 

export async function deleteRecipe(id) {
    const data = await http.delete(`/recipes/${id}`); 
    return data; 
};
