const API_URL = "https://aduana-registro-de-firmas.onrender.com/api/transportes";

export async function getTransportes() {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error al cargar transportes:", error);
    throw error;
  }
}

export async function addTransporte(data) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error al agregar transporte:", error);
    throw error;
  }
}

export async function updateTransporte(id, data) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error al editar transporte:", error);
    throw error;
  }
}

export async function deleteTransporte(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return true;
  } catch (error) {
    console.error("Error al eliminar transporte:", error);
    throw error;
  }
}

export async function setOmitido(id, omitido) {
  try {
    const response = await fetch(`${API_URL}/${id}/omitir`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ omitido }),
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    // Return the updated transport if the backend sends it
    return await response.json();
  } catch (error) {
    console.error("Error al cambiar estado omitido:", error);
    throw error;
  }
}