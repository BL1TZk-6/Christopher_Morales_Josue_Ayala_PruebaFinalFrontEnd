const API_URL = 'http://localhost:8080/api/premios';
 
export async function getPremios(id){
    const res = await fetch(`${API_URL}/obtenerpremios`);
    return res.json();
}
 
export async function createpremio(data) {
    await fetch(`${API_URL}/agregarPremio`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(data),
    });
}
 
export async function updatePremio(id, data){
    await fetch(`${API_URL}/actualizarpremio/${id}`,{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    });
}
 
export async function deletePremio(id) {
    await fetch(`${API_URL}/eliminarpremio/${id}`, {method: 'DELETE'});
}