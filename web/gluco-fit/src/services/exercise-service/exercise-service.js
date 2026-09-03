import { http } from "../api-service/api-service";

export async function listExercises(categoria) {
    const params = categoria ? { categoria } : {}
    const data = await http.get("/exercises", { params }); 
    return data; 
}; 

export async function getExerciseDetail(id) {
    const data = await http.get(`/exercises/${id}`); 
    return data; 
}; 

export async function createExercise(payload) {
 const data = await http.post("/exercises", payload); 
 return data;
}; 

export async function updateExercise(id, payload) {
    const data = await http.patch(`/exercises/${id}`, payload); 
    return data;
}; 

export async function deleteExercise(id) {
    const data = await http.delete(`/exercises/${id}`); 
    return data; 
};
