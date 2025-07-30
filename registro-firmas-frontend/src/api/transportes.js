const API_URL = "https://gestor-habilitaciones.onrender.com/api/transportes";

export async function getTransportes() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Error al cargar transportes");
  return await response.json();
}

export async function addTransporte(data) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Error al agregar transporte");
  return await response.json();
}

export async function updateTransporte(id, data) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Error al editar transporte");
  return await response.json();
}

export async function deleteTransporte(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error al eliminar transporte");
}

// NUEVO: setOmitido
export async function setOmitido(id, omitido) {
  const response = await fetch(`${API_URL}/${id}/omitir`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ omitido }),
  });
  if (!response.ok) throw new Error("Error al cambiar estado omitido");
  // Puedes retornar el transporte actualizado si el backend lo envía
  // return await response.json();
}
