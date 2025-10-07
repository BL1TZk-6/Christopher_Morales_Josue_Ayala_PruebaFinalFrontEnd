const API_URL = "http://localhost:8080/api/premios"; 
 
export async function obtenerPremios() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al obtener los premios");
    return await response.json();
  } catch (err) {
    console.error("obtenerPremios:", err);
    throw err;
  }
}
 
/**

 * @param {Object} premio
 */
export async function createPremio(premio) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(premio),
    });
 
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Error al crear el premio: " + errorText);
    }
 
    return await response.json();
  } catch (err) {
    console.error("createPremio:", err);
    throw err;
  }
}
 
/**
 * Actualiza un premio existente
 * @param {number} id - ID del premio a actualizar
 * @param {Object} premio - Datos actualizados del premio
 */
export async function actualizarpremio (id, premio) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(premio),
    });
 
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Error al actualizar el premio: " + errorText);
    }
 
    return await response.json();
  } catch (err) {
    console.error("actualizarpremio:", err);
    throw err;
  }
}
 
/**
 * Elimina un premio por su ID
 * @param {number} id - ID del premio a eliminar
 */
export async function eliminarpremio(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
 
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Error al eliminar el premio: " + errorText);
    }
 
    return true;
  } catch (err) {
    console.error("eliminarpremio:", err);
    throw err;
  }
}
 