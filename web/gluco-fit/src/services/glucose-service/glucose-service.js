import http from "../api-service/api-service";

export async function listGlucose() {
  const data = await http.get("/glucose");
  return data;
}

export async function getGlucose(id) {
  const data = await http.get(`/glucose/${id}`);
  return data;
}

export async function createGlucose(payload) {
    const data = await http.post("/glucose", payload); 
    return data; 
}

export async function updateGlucose(id, payload) {
    const data = await http.patch(`/glucose/${id}`, payload); 
    return data; 
}

export async function deleteGlucose(id) {
    const data = await http.delete(`/glucose/${id}`); 
    return data; 
}

