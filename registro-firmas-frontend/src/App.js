import React, { useEffect, useState } from "react";
import {
  getTransportes,
  addTransporte,
  updateTransporte,
  deleteTransporte,
  setOmitido, // Agrega esta función en api/transportes.js
} from "./api/transportes";

// Para exportar a Excel desde CDN
function loadXLSX() {
  if (!window.XLSX) {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
    script.async = true;
    document.body.appendChild(script);
  }
}

// Inyectar CSS solo una vez
function injectStyles() {
  if (!document.getElementById("gestor-styles")) {
    const style = document.createElement("style");
    style.id = "gestor-styles";
    style.textContent = `
:root {
    --main-bg: #f4f7fd;
    --card-bg: #fff;
    --card-border: #e6e6f2;
    --header-bg: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    --gradient-main: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --text-main: #23252b;
    --btn-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --btn-danger: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
    --badge-ok: #d4edda;
    --badge-warning: #fff3cd;
    --badge-danger: #f8d7da;
    --badge-ok-txt: #155724;
    --badge-warning-txt: #856404;
    --badge-danger-txt: #721c24;
    --table-head: #f3f3fc;
}
body.dark {
    --main-bg: #191a23;
    --card-bg: #26283a;
    --card-border: #32334a;
    --header-bg: linear-gradient(135deg, #26283a 0%, #191a23 100%);
    --gradient-main: linear-gradient(135deg, #232360 0%, #613265 100%);
    --text-main: #e7e7e7;
    --btn-gradient: linear-gradient(135deg, #333397 0%, #6a1a57 100%);
    --btn-danger: linear-gradient(135deg, #b82b2b 0%, #ee5a24 100%);
    --badge-ok: #184727;
    --badge-warning: #37301b;
    --badge-danger: #532525;
    --badge-ok-txt: #58e497;
    --badge-warning-txt: #ffe65e;
    --badge-danger-txt: #ff8888;
    --table-head: #252545;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: var(--main-bg);
    color: var(--text-main);
    min-height: 100vh;
}
.container {
    max-width: 1200px;
    margin: 24px auto;
    background: var(--card-bg);
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.10);
    overflow: hidden;
    border: 1.5px solid var(--card-border);
}
.header {
    background: var(--header-bg);
    color: white;
    padding: 28px 14px 20px 14px;
    text-align: center;
    position: relative;
}
.header h1 { font-size: 2.2rem; margin-bottom: 8px; font-weight: 700; }
.header p { font-size: 1.07rem; opacity: 0.92;}
.toggle-dark {
    position: absolute; top: 22px; right: 18px;
    background: none; border: none; color: #fff; font-size: 1.65rem; cursor: pointer;
    z-index: 9;
}
.content { padding: 30px 18px;}
.stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 14px;
    margin-bottom: 20px;
}
.stat-card {
    background: var(--card-bg);
    padding: 17px;
    border-radius: 14px;
    text-align: center;
    box-shadow: 0 5px 15px rgba(0,0,0,0.07);
    border: 1.5px solid var(--card-border);
}
.stat-number { font-size: 1.6rem; font-weight: 700; margin-bottom: 4px;}
.stat-label { color: #666; font-weight: 500; font-size: 0.9rem;}
.total { color: #667eea; }
.warning-stat { color: #f39c12; }
.danger-stat { color: #e74c3c; }
.ok-stat { color: #27ae60; }
.form-section {
    background: var(--card-bg);
    padding: 24px 14px;
    border-radius: 15px;
    box-shadow: 0 7px 20px rgba(0,0,0,0.05);
    margin-bottom: 20px;
    border: 1px solid var(--card-border);
}
.form-section h2 {
    color: #2a5298;
    margin-bottom: 18px;
    font-size: 1.32rem;
    display: flex;
    align-items: center;
    gap: 8px;
}
.form-group {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 18px;
    margin-bottom: 22px;
}
.input-group { display: flex; flex-direction: column; }
.input-group label { font-weight: 600; color: #555; margin-bottom: 6px; font-size: 0.94rem;}
.input-group input {
    padding: 10px 14px;
    border: 2px solid #e1e5e9;
    border-radius: 9px;
    font-size: 1rem;
    transition: all 0.3s;
    background: #fafbfc;
}
body.dark .input-group input {background: #191a23; border-color: #32334a; color: #eee;}
.input-group input:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102,126,234,0.1);
}
.btn {
    background: var(--btn-gradient);
    color: white;
    border: none;
    padding: 8px 13px;
    border-radius: 7px;
    font-size: 0.99rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    min-width: 32px;
    min-height: 32px;
    box-shadow: 0 3px 9px rgba(102,126,234,0.04);
}
.btn svg, .btn span, .btn i { font-size: 1.07rem;}
.btn-danger { background: var(--btn-danger);}
.filter-bar {
    display: flex;
    gap: 9px;
    margin-bottom: 15px;
    align-items: center;
    flex-wrap: wrap;
    font-size: 1rem;
}
.filter-bar input[type="text"],
.filter-bar input[type="date"] {
    padding: 5px 8px;
    border-radius: 6px;
    border: 1.5px solid #a1a1a1;
    font-size: 1rem;
}
.import-btn, .export-btn { margin-left: 5px; font-size: 0.97rem;}
.table-list-header, .transport-card {
    display: grid;
    grid-template-columns: 2fr 0.7fr 1.8fr auto;
    align-items: center;
    font-size: 1.08rem;
}
.table-list-header {
    font-weight: 700;
    padding: 6px 10px 3px 10px;
    background: var(--table-head);
    border-bottom: 1.5px solid var(--card-border);
}
.sortable {cursor:pointer; user-select: none; padding-left: 4px;}
.transport-list {display:block;}
.transport-card {
    background: var(--card-bg);
    border-radius: 13px;
    padding: 10px 10px 8px 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
    border-left: 5px solid #667eea;
    transition: all 0.2s;
    margin-bottom: 8px;
    margin-top: 0;
}
.transport-card.warning { border-left-color: #f39c12; background: linear-gradient(135deg, #fff9e6 0%, #fff 100%);}
.transport-card.danger { border-left-color: #e74c3c; background: linear-gradient(135deg, #ffebee 0%, #fff 100%);}
.info-value { font-size: 1.04rem; font-weight: 500; color: var(--text-main);}
.status-badge {
    margin-left: 7px;
    margin-top: 3px;
    padding: 4px 11px;
    border-radius: 15px;
    font-size: 0.96rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}
.status-ok { background: var(--badge-ok); color: var(--badge-ok-txt);}
.status-warning { background: var(--badge-warning); color: var(--badge-warning-txt);}
.status-danger { background: var(--badge-danger); color: var(--badge-danger-txt);}
.card-actions {
    display: flex;
    gap: 5px;
    justify-content: flex-end;
    flex-wrap: wrap;
}
.alert {
    padding: 14px;
    border-radius: 10px;
    margin-bottom: 14px;
    font-weight: 500;
}
.alert-info { background: #d1ecf1; color: #0c5460; border: 1px solid #bee5eb;}
.empty-state {
    text-align: center;
    padding: 32px 14px;
    color: #666;
}
.empty-state h3 {font-size: 1.18rem; margin-bottom: 10px; color: #999;}
@media (max-width: 850px) {
    .container { margin: 9px;}
    .form-section, .content { padding: 7px;}
    .table-list-header, .transport-card { grid-template-columns: 2fr 1fr 1.25fr auto;}
}
@media (max-width: 600px) {
    .form-section { padding: 2px;}
    .content { padding: 2px;}
    .table-list-header, .transport-card { grid-template-columns: 1fr 1fr 1fr auto; font-size:0.95rem;}
}
@media (max-width: 430px) {
    .form-group { grid-template-columns: 1fr;}
    .table-list-header, .transport-card { grid-template-columns: 1.1fr 1fr 1.3fr auto;}
}
body.dark .transport-card .info-value {
    color: #1a1a1a !important;
}
`;
    document.head.appendChild(style);
  }
}


const getStatus = (fechaVencimiento) => {
  const hoy = new Date();
  const vencimiento = new Date(fechaVencimiento);
  const diffTime = vencimiento - hoy;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays < 0)
    return {
      status: "vencido",
      class: "danger",
      text: `VENCIDO HACE ${Math.abs(diffDays)} DÍAS`,
      days: diffDays
    };
  else if (diffDays <= 30)
    return {
      status: "proximo",
      class: "warning",
      text: `VENCE EN ${diffDays} DÍAS`,
      days: diffDays
    };
  else
    return {
      status: "vigente",
      class: "ok",
      text: `VIGENTE (${diffDays} DÍAS)`,
      days: diffDays
    };
};

const App = () => {
  // Estados principales
  const [transportes, setTransportes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // id del transporte editando
  const [form, setForm] = useState({
    nombre: "",
    numeroRol: "",
    fechaVencimiento: ""
  });
  const [noti, setNoti] = useState(null);

  // Filtros
  const [fNombre, setFNombre] = useState("");
  const [fRol, setFRol] = useState("");
  const [fFecha, setFFecha] = useState("");

  // Dark mode
  const [dark, setDark] = useState(
    localStorage.getItem("darkMode") === "1" ? true : false
  );

  // Carga inicial y CSS
  useEffect(() => {
    injectStyles();
    loadXLSX();
    cargar();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
    localStorage.setItem("darkMode", dark ? "1" : "0");
  }, [dark]);

  // Notificación automática (desaparece)
  useEffect(() => {
    if (noti) setTimeout(() => setNoti(null), 2500);
  }, [noti]);

  // CRUD Backend
  async function cargar() {
    setLoading(true);
    try {
      setTransportes(await getTransportes());
    } catch (e) {
      setNoti("❌ Error cargando datos");
    }
    setLoading(false);
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!form.nombre || !form.numeroRol || !form.fechaVencimiento)
      return setNoti("Completa todos los campos");
    try {
      if (editing) {
        await updateTransporte(editing, {
          ...form,
          fechaCreacion: undefined // El backend lo puede ignorar
        });
        setNoti("✏️ Transporte editado correctamente");
      } else {
        await addTransporte(form);
        setNoti("✅ Transporte agregado");
      }
      setForm({ nombre: "", numeroRol: "", fechaVencimiento: "" });
      setEditing(null);
      cargar();
    } catch (e) {
      setNoti("❌ Error al guardar");
    }
  }

  function onEdit(t) {
    setEditing(t.id);
    setForm({
      nombre: t.nombre,
      numeroRol: t.numeroRol,
      fechaVencimiento: t.fechaVencimiento
    });
  }

  function onCancelEdit() {
    setEditing(null);
    setForm({ nombre: "", numeroRol: "", fechaVencimiento: "" });
  }

  async function onDelete(id) {
    if (!window.confirm("¿Eliminar este transporte?")) return;
    try {
      await deleteTransporte(id);
      setNoti("🗑️ Eliminado");
      cargar();
    } catch {
      setNoti("❌ Error eliminando");
    }
  }

  // Filtros y orden
  let lista = transportes
    .filter((t) =>
      t.nombre.toLowerCase().includes(fNombre.trim().toLowerCase())
    )
    .filter((t) => t.numeroRol.includes(fRol.trim()))
    .filter((t) => (fFecha ? t.fechaVencimiento === fFecha : true))
    .sort((a, b) => a.nombre.localeCompare(b.nombre));

  // Estadísticas
  let stats = { total: 0, ok: 0, warning: 0, danger: 0 };
  lista.forEach((t) => {
    const s = getStatus(t.fechaVencimiento);
    stats.total++;
    if (s.status === "vigente") stats.ok++;
    else if (s.status === "proximo") stats.warning++;
    else if (s.status === "vencido") stats.danger++;
  });

  // Exportar Excel
  function exportarExcel() {
    if (!window.XLSX) return alert("XLSX no cargado");
    const data = lista.map((t) => ({
      Nombre: t.nombre,
      ROL: t.numeroRol,
      "Fecha Vencimiento": t.fechaVencimiento
    }));
    const ws = window.XLSX.utils.json_to_sheet(data);
    const wb = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(wb, ws, "Transportes");
    window.XLSX.writeFile(wb, "transportes.xlsx");
  }

  // Exportar JSON (backup)
  function exportarJSON() {
    const dataStr = JSON.stringify(transportes, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transportes_habilitaciones.json";
    link.click();
  }

  // Importar JSON
  function importarJSON(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const arr = JSON.parse(ev.target.result);
        if (!Array.isArray(arr)) throw new Error("Formato inválido");
        for (let t of arr) {
          await addTransporte({
            nombre: t.nombre,
            numeroRol: t.numeroRol,
            fechaVencimiento: t.fechaVencimiento
          });
        }
        setNoti("✅ Importación completada");
        cargar();
      } catch (e) {
        alert("Archivo inválido.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  // WhatsApp Alert (solo visual)
  function enviarAlertaWhatsapp() {
    const alertas = lista
      .filter(t => !t.omitido) // <--- SOLO transportes NO OMITIDOS
      .filter(t => {
        const s = getStatus(t.fechaVencimiento);
        return (
          (s.status === "vencido" && s.days < 0) ||
          (s.status === "proximo" && s.days <= 7)
        );
      })
      .map(t => {
        const s = getStatus(t.fechaVencimiento);
        return s.status === "vencido"
          ? `🚨 ${t.nombre} (ROL: ${t.numeroRol}) está VENCIDO hace ${Math.abs(
              s.days
            )} días`
          : `⚠️ ${t.nombre} (ROL: ${t.numeroRol}) vence en ${s.days} días`;
      });
    if (alertas.length === 0) {
      setNoti("No hay alertas pendientes");
      return;
    }
    const mensaje = alertas.join("\n");
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      mensaje
    )}`;
    window.open(whatsappUrl, "_blank");
  }

  // Dark mode toggle
  function toggleDark() {
    setDark((v) => !v);
  }

  // Render UI
  return (
    <div className="container">
      <div className="header">
        <h1>🚛 Gestor de Habilitaciones</h1>
        <p>Sistema de control de vencimientos para transportes de aduana</p>
        <button
          className="toggle-dark"
          aria-label="Cambiar modo claro/oscuro"
          title="Modo claro/oscuro"
          onClick={toggleDark}
        >
          {dark ? "☀️" : "🌙"}
        </button>
      </div>
      <div className="content">
        <div className="stats">
          <div className="stat-card">
            <div className="stat-number total">{stats.total}</div>
            <div className="stat-label">Total Transportes</div>
          </div>
          <div className="stat-card">
            <div className="stat-number ok-stat">{stats.ok}</div>
            <div className="stat-label">Al día</div>
          </div>
          <div className="stat-card">
            <div className="stat-number warning-stat">{stats.warning}</div>
            <div className="stat-label">Por vencer</div>
          </div>
          <div className="stat-card">
            <div className="stat-number danger-stat">{stats.danger}</div>
            <div className="stat-label">Vencidos</div>
          </div>
        </div>
        <div className="form-section">
          <h2>
            ➕{" "}
            <span id="formTitle">
              {editing ? "Editar Transporte" : "Agregar Nuevo Transporte"}
            </span>
          </h2>
          <form onSubmit={onSubmit} id="transportForm">
            <div className="form-group">
              <div className="input-group">
                <label htmlFor="nombre">Nombre del Transporte</label>
                <input
                  type="text"
                  id="nombre"
                  required
                  placeholder="Ej: Transporte López S.A."
                  value={form.nombre}
                  onChange={(e) =>
                    setForm({ ...form, nombre: e.target.value })
                  }
                />
              </div>
              <div className="input-group">
                <label htmlFor="numeroRol">Número de ROL</label>
                <input
                  type="text"
                  id="numeroRol"
                  required
                  placeholder="Ej: 12345"
                  value={form.numeroRol}
                  onChange={(e) =>
                    setForm({ ...form, numeroRol: e.target.value })
                  }
                />
              </div>
              <div className="input-group">
                <label htmlFor="fechaVencimiento">Fecha de Vencimiento</label>
                <input
                  type="date"
                  id="fechaVencimiento"
                  required
                  value={form.fechaVencimiento}
                  onChange={(e) =>
                    setForm({ ...form, fechaVencimiento: e.target.value })
                  }
                />
              </div>
            </div>
            <button type="submit" className="btn" id="submitBtn">
              ➕{" "}
              <span id="submitBtnText">
                {editing ? "Guardar Cambios" : "Agregar Transporte"}
              </span>
            </button>
            {editing && (
              <button
                type="button"
                className="btn btn-danger"
                id="cancelEditBtn"
                style={{ marginLeft: "10px" }}
                onClick={onCancelEdit}
              >
                ❌ Cancelar Edición
              </button>
            )}
          </form>
        </div>
        <div className="alert alert-info">
          <strong>📱 Integración WhatsApp:</strong> Para recibir alertas automáticas por WhatsApp, necesitarás implementar un servidor backend con la API de WhatsApp Business. Esta versión web te mostrará las alertas en pantalla y podrás exportar los datos.
          <button
            style={{
              marginLeft: 10,
              background: "var(--btn-gradient)",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "2px 11px",
              cursor: "pointer"
            }}
            onClick={enviarAlertaWhatsapp}
            title="Enviar alertas a WhatsApp"
          >
            🚨 WhatsApp
          </button>
        </div>
        <div className="filter-bar">
          <b>Filtrar:</b>
          <input
            type="text"
            placeholder="Nombre..."
            value={fNombre}
            onChange={(e) => setFNombre(e.target.value)}
          />
          <input
            type="text"
            placeholder="ROL..."
            value={fRol}
            onChange={(e) => setFRol(e.target.value)}
          />
          <input
            type="date"
            placeholder="Vencimiento..."
            value={fFecha}
            onChange={(e) => setFFecha(e.target.value)}
          />
          <button
            className="btn export-btn"
            onClick={exportarExcel}
            title="Exportar Excel"
          >
            📥 Excel
          </button>
          <button
            className="btn export-btn"
            onClick={exportarJSON}
            title="Exportar Backup JSON"
          >
            💾 Backup
          </button>
          <label className="btn import-btn" style={{ cursor: "pointer" }} title="Importar Backup">
            📤 Importar
            <input
              type="file"
              accept=".json"
              style={{ display: "none" }}
              onChange={importarJSON}
            />
          </label>
        </div>
        <div className="form-section">
          <h2>📋 Lista de Transportes</h2>
          <div className="transport-list" id="transportList">
            {loading ? (
              <div className="empty-state">
                <h3>Cargando...</h3>
              </div>
            ) : lista.length === 0 ? (
              <div className="empty-state">
                <h3>No hay transportes registrados</h3>
                <p>Agrega tu primer transporte usando el formulario anterior</p>
              </div>
            ) : (
              <>
                <div className="table-list-header">
                  <div>Nombre del Transporte</div>
                  <div>Número de ROL</div>
                  <div>Fecha de Vencimiento</div>
                  <div></div>
                </div>
                {lista.map((transport) => {
                  const statusInfo = getStatus(transport.fechaVencimiento);
                  const fechaFormateada = transport.fechaVencimiento
                    .split("-")
                    .reverse()
                    .join("/");
                  return (
                    <div
                      key={transport.id}
                      className={`transport-card ${statusInfo.class}`}
                    >
                      <div className="info-value">{transport.nombre}</div>
                      <div className="info-value">{transport.numeroRol}</div>
                      <div className="info-value">
                        {fechaFormateada}
                        <span
                          className={`status-badge status-${statusInfo.class}`}
                        >
                          {statusInfo.text}
                        </span>
                      </div>
                      <div className="card-actions">
                        <button
                          className="btn"
                          title="Editar"
                          onClick={() => onEdit(transport)}
                        >
                          ✏️
                        </button>
                        <button
                          className="btn btn-danger"
                          title="Eliminar"
                          onClick={() => onDelete(transport.id)}
                        >
                          🗑️
                        </button>
                        <button
                          className="btn"
                          title="Verificar en Aduana"
                          onClick={() => {
                            window.open(
                              "https://secure.aduana.gov.py/sqf/home.seam",
                              "_blank"
                            );
                            navigator.clipboard.writeText(
                              transport.numeroRol
                            );
                            setNoti(
                              `🔍 ROL ${transport.numeroRol} copiado al portapapeles`
                            );
                          }}
                        >
                          🔍
                        </button>
                        {/* BOTÓN OMITIR / REACTIVAR ALERTA */}
                        <button
                          className="btn"
                          style={{
                            background: transport.omitido ? "#c3c3c3" : "#d46a6a",
                            color: "#fff"
                          }}
                          title={transport.omitido ? "Volver a recibir alertas" : "No volver a notificar"}
                          onClick={async () => {
                            await setOmitido(transport.id, !transport.omitido);
                            cargar(); // Recarga la lista para actualizar el estado
                            setNoti(
                              !transport.omitido
                                ? "🔕 Alerta omitida para este transporte"
                                : "🔔 Alerta reactivada para este transporte"
                            );
                          }}
                        >
                          {transport.omitido ? "🔔" : "🚫"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
      {noti && (
        <div
          className="alert alert-info"
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            zIndex: 1000,
            maxWidth: 300
          }}
        >
          {noti}
        </div>
      )}
    </div>
  );
};

export default App;