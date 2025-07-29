import React, { useEffect } from "react";

// Carga XLSX desde CDN solo una vez (necesario para exportar Excel)
function loadXLSX() {
  if (!window.XLSX) {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
    script.async = true;
    document.body.appendChild(script);
  }
}

// Inyecta todos tus estilos (CSS puro)
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
    `;
    document.head.appendChild(style);
  }
}

const App = () => {
  useEffect(() => {
    injectStyles();
    loadXLSX();

    // Todo tu código JavaScript como en el <script> original
    class TransportManager {
      constructor() {
        this.transports = JSON.parse(localStorage.getItem('transports')) || [];
        this.omitAlerts = JSON.parse(localStorage.getItem('omitAlerts')) || [];
        this.editingId = null;
        this.sortField = 'nombre';
        this.sortDir = 'asc';
        this.init();
      }
      init() {
        this.bindEvents();
        this.render();
        this.updateStats();
        this.checkAlerts();
      }
      bindEvents() {
        document.getElementById('transportForm').addEventListener('submit', (e) => {
          e.preventDefault();
          this.editingId ? this.updateTransport() : this.addTransport();
        });
        document.getElementById('cancelEditBtn').addEventListener('click', () => this.cancelEdit());
        document.getElementById('transportList').addEventListener('click', e=>{
          if (e.target.classList.contains('sortable')) {
            let field = e.target.dataset.field;
            this.sortBy(field);
          }
        });
      }
      addTransport() {
        const nombre = document.getElementById('nombre').value.trim();
        const numeroRol = document.getElementById('numeroRol').value.trim();
        const fechaVencimiento = document.getElementById('fechaVencimiento').value;
        if (!nombre || !numeroRol || !fechaVencimiento) {
          this.showNotification('Por favor, completa todos los campos', 'error');
          return;
        }
        const hoy = new Date(); hoy.setHours(0,0,0,0);
        const f = new Date(fechaVencimiento+'T00:00');
        if (f < hoy) {
          if (!window.confirm('Estás cargando un vencimiento ya pasado. ¿Deseas continuar?')) return;
        }
        const transport = {
          id: Date.now() + Math.floor(Math.random()*100000),
          nombre, numeroRol, fechaVencimiento,
          fechaCreacion: new Date().toISOString()
        };
        this.transports.push(transport);
        this.saveData(); this.render(); this.updateStats(); this.checkAlerts();
        document.getElementById('transportForm').reset();
        this.showNotification('✅ Transporte agregado exitosamente', 'success');
      }
      editTransport(id) {
        const t = this.transports.find(t=>t.id===id);
        if (!t) return;
        this.editingId = id;
        document.getElementById('nombre').value = t.nombre;
        document.getElementById('numeroRol').value = t.numeroRol;
        document.getElementById('fechaVencimiento').value = t.fechaVencimiento;
        document.getElementById('formTitle').textContent = 'Editar Transporte';
        document.getElementById('submitBtnText').textContent = 'Guardar Cambios';
        document.getElementById('cancelEditBtn').style.display = 'inline-block';
      }
      updateTransport() {
        const nombre = document.getElementById('nombre').value.trim();
        const numeroRol = document.getElementById('numeroRol').value.trim();
        const fechaVencimiento = document.getElementById('fechaVencimiento').value;
        const idx = this.transports.findIndex(t=>t.id===this.editingId);
        if (idx === -1) return;
        this.transports[idx].nombre = nombre;
        this.transports[idx].numeroRol = numeroRol;
        this.transports[idx].fechaVencimiento = fechaVencimiento;
        this.saveData(); this.render(); this.updateStats(); this.checkAlerts();
        this.cancelEdit();
        this.showNotification('✏️ Transporte editado correctamente', 'success');
      }
      cancelEdit() {
        this.editingId = null;
        document.getElementById('transportForm').reset();
        document.getElementById('formTitle').textContent = 'Agregar Nuevo Transporte';
        document.getElementById('submitBtnText').textContent = 'Agregar Transporte';
        document.getElementById('cancelEditBtn').style.display = 'none';
      }
      deleteTransport(id) {
        if (window.confirm('¿Estás seguro de que deseas eliminar este transporte?')) {
          this.transports = this.transports.filter(t=>t.id!==id);
          this.omitAlerts = this.omitAlerts.filter(oid=>oid!==id);
          this.saveData(); this.render(); this.updateStats();
          this.showNotification('🗑️ Transporte eliminado', 'info');
        }
      }
      omitAlert(id) {
        if (!this.omitAlerts.includes(id)) {
          this.omitAlerts.push(id); this.saveOmitAlerts();
          this.checkAlerts(); this.render();
          this.showNotification('🔕 Alerta omitida para este transporte', 'info');
        }
      }
      unomitAlert(id) {
        this.omitAlerts = this.omitAlerts.filter(oid=>oid!==id);
        this.saveOmitAlerts(); this.render(); this.checkAlerts();
        this.showNotification('✅ Alerta reactivada para este transporte', 'success');
      }
      isOmitted(id) { return this.omitAlerts.includes(id);}
      getStatus(fechaVencimiento) {
        const hoy = new Date();
        const vencimiento = new Date(fechaVencimiento);
        const diffTime = vencimiento - hoy;
        const diffDays = Math.ceil(diffTime/(1000*60*60*24));
        if (diffDays < 0) return {status:'vencido', class:'danger', text:`VENCIDO HACE ${Math.abs(diffDays)} DÍAS`, days: diffDays};
        else if (diffDays <= 30) return {status:'proximo', class:'warning', text:`VENCE EN ${diffDays} DÍAS`, days: diffDays};
        else return {status:'vigente', class:'ok', text:`VIGENTE (${diffDays} DÍAS)`, days: diffDays};
      }
      sortBy(field) {
        if (this.sortField===field) this.sortDir=this.sortDir==='asc'?'desc':'asc';
        else {this.sortField=field; this.sortDir='asc';}
        this.render();
      }
      render() {
        const container = document.getElementById('transportList');
        let arr = [...this.transports];
        // Filtros
        let fNombre = document.getElementById('filterNombre').value.trim().toLowerCase();
        let fRol = document.getElementById('filterRol').value.trim();
        let fFecha = document.getElementById('filterFecha').value;
        if (fNombre) arr = arr.filter(t=>t.nombre.toLowerCase().includes(fNombre));
        if (fRol) arr = arr.filter(t=>t.numeroRol.includes(fRol));
        if (fFecha) arr = arr.filter(t=>t.fechaVencimiento===fFecha);

        // Ordenar
        arr.sort((a,b)=>{
          let valA = a[this.sortField], valB = b[this.sortField];
          if (this.sortField==='fechaVencimiento') {
            valA = new Date(valA); valB = new Date(valB);
          } else {
            valA = (valA||"").toString().toLowerCase();
            valB = (valB||"").toString().toLowerCase();
          }
          if(valA<valB) return this.sortDir==='asc'?-1:1;
          if(valA>valB) return this.sortDir==='asc'?1:-1;
          return 0;
        });

        // Tabla Header
        let thNombre = `Nombre del Transporte <span class="sortable" data-field="nombre" style="cursor:pointer">${this.sortField==='nombre'?(this.sortDir==='asc'?'▼':'▲'):''}</span>`;
        let thRol = `Número de ROL <span class="sortable" data-field="numeroRol" style="cursor:pointer">${this.sortField==='numeroRol'?(this.sortDir==='asc'?'▼':'▲'):''}</span>`;
        let thFecha = `Fecha de Vencimiento <span class="sortable" data-field="fechaVencimiento" style="cursor:pointer">${this.sortField==='fechaVencimiento'?(this.sortDir==='asc'?'▼':'▲'):''}</span>`;
        let tableHeader = `<div style="display:grid;grid-template-columns:2fr 0.7fr 1.8fr auto;align-items:center;font-weight:700;font-size:1.1rem;padding:7px 14px 3px 14px;">
          <div>${thNombre}</div>
          <div>${thRol}</div>
          <div>${thFecha}</div>
          <div></div>
          </div>`;
        if (arr.length===0) {
          container.innerHTML = `<div class="empty-state">
              <h3>No hay transportes registrados</h3>
              <p>Agrega tu primer transporte usando el formulario anterior</p>
          </div>`;
          return;
        }
        container.innerHTML = tableHeader + arr.map(transport=>{
          const statusInfo = this.getStatus(transport.fechaVencimiento);
          const fechaFormateada = transport.fechaVencimiento.split('-').reverse().join('/');
          let omitControl = this.isOmitted(transport.id)
              ? `<button class="btn" style="background:#c3c3c3" title="Volver a recibir alertas" onclick="transportManager.unomitAlert(${transport.id})">🔔</button>`
              : `<button class="btn" style="background:#d46a6a" title="No volver a notificar" onclick="transportManager.omitAlert(${transport.id})">🚫</button>`;
          return `
          <div class="transport-card ${statusInfo.class}">
              <div class="info-value">${transport.nombre}</div>
              <div class="info-value">${transport.numeroRol}</div>
              <div class="info-value">
                  ${fechaFormateada}
                  <span class="status-badge status-${statusInfo.class}">${statusInfo.text}</span>
              </div>
              <div class="card-actions">
                  <button class="btn" title="Editar" onclick="transportManager.editTransport(${transport.id})">✏️</button>
                  <button class="btn btn-danger" title="Eliminar" onclick="transportManager.deleteTransport(${transport.id})">🗑️</button>
                  <button class="btn" title="Verificar en Aduana" onclick="transportManager.checkAduanaStatus('${transport.numeroRol}')">🔍</button>
                  ${omitControl}
              </div>
          </div>`;
        }).join('');
      }
      updateStats() {
        const stats = { total: this.transports.length, ok: 0, warning: 0, danger: 0 };
        this.transports.forEach(t=>{
          const s = this.getStatus(t.fechaVencimiento);
          if (s.status==='vigente') stats.ok++;
          else if (s.status==='proximo') stats.warning++;
          else if (s.status==='vencido') stats.danger++;
        });
        document.getElementById('totalCount').textContent = stats.total;
        document.getElementById('okCount').textContent = stats.ok;
        document.getElementById('warningCount').textContent = stats.warning;
        document.getElementById('dangerCount').textContent = stats.danger;
      }
      checkAlerts() {
        const alertas = [];
        this.transports.forEach(t=>{
          if(this.isOmitted(t.id)) return;
          const s = this.getStatus(t.fechaVencimiento);
          if(s.status==='vencido') alertas.push(`🚨 ${t.nombre} (ROL: ${t.numeroRol}) está VENCIDO hace ${Math.abs(s.days)} días`);
          else if(s.status==='proximo' && s.days<=7) alertas.push(`⚠️ ${t.nombre} (ROL: ${t.numeroRol}) vence en ${s.days} días`);
        });
        if (alertas.length>0) this.showWhatsAppAlert(alertas);
      }
      showWhatsAppAlert(alertas) {
        const mensaje = alertas.join('\n');
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(mensaje)}`;
        if (window.confirm('Se han detectado habilitaciones próximas a vencer o vencidas (no omitidas). ¿Deseas abrir WhatsApp para enviar las alertas?')) {
          window.open(whatsappUrl, '_blank');
        }
      }
      checkAduanaStatus(numeroRol) {
        const aduanaUrl = 'https://secure.aduana.gov.py/sqf/home.seam';
        window.open(aduanaUrl, '_blank');
        this.showNotification(`🔍 Abriendo Aduana Paraguay para consultar ROL: ${numeroRol}`, 'info');
        if (navigator.clipboard) {
          navigator.clipboard.writeText(numeroRol).then(()=>{
            setTimeout(()=>this.showNotification(`📋 ROL ${numeroRol} copiado al portapapeles`,'success'),800);
          }).catch(()=>{});
        }
      }
      showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `alert alert-info`;
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.zIndex = '1000';
        notification.style.maxWidth = '300px';
        document.body.appendChild(notification);
        setTimeout(()=>{document.body.removeChild(notification)}, 3000);
      }
      saveData() { localStorage.setItem('transports', JSON.stringify(this.transports)); this.saveOmitAlerts(); }
      saveOmitAlerts() { localStorage.setItem('omitAlerts', JSON.stringify(this.omitAlerts)); }
      exportData() {
        const dataStr = JSON.stringify(this.transports, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url; link.download = 'transportes_habilitaciones.json'; link.click();
      }
      importData(event) {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = e => {
          try {
            const arr = JSON.parse(e.target.result);
            if (!Array.isArray(arr)) throw 'Formato inválido';
            arr.forEach(t => { t.id = Date.now() + Math.floor(Math.random()*100000); });
            this.transports = this.transports.concat(arr);
            this.saveData(); this.render(); this.updateStats(); this.checkAlerts();
            this.showNotification('✅ Importación completada', 'success');
          } catch (e) { window.alert('Archivo inválido.'); }
        };
        reader.readAsText(file);
        event.target.value = "";
      }
      exportExcel() {
        if (!window.XLSX) return window.alert("Aún no se cargó XLSX, espera unos segundos y vuelve a intentar");
        const data = this.transports.map(t=>({
          'Nombre': t.nombre,
          'ROL': t.numeroRol,
          'Fecha Vencimiento': t.fechaVencimiento,
        }));
        const ws = window.XLSX.utils.json_to_sheet(data);
        const wb = window.XLSX.utils.book_new();
        window.XLSX.utils.book_append_sheet(wb, ws, "Transportes");
        window.XLSX.writeFile(wb, "transportes.xlsx");
      }
    }
    window.transportManager = new TransportManager();
    setInterval(()=>{ window.transportManager.checkAlerts(); }, 3600000);

    // Modo oscuro/claro persistente
    const btn = document.getElementById('toggleDark');
    function setTheme(dark){
      if(dark) {document.body.classList.add('dark'); btn.textContent='☀️';}
      else {document.body.classList.remove('dark'); btn.textContent='🌙';}
      localStorage.setItem('darkMode', dark ? '1' : '0');
    }
    btn.onclick = ()=> setTheme(!document.body.classList.contains('dark'));
    if(localStorage.getItem('darkMode')==='1'){
      setTheme(true);
    }
  }, []);

  // HTML de tu app, tal como el original (pero como JSX)
  return (
    <div className="container">
      <div className="header">
        <h1>🚛 Gestor de Habilitaciones</h1>
        <p>Sistema de control de vencimientos para transportes de aduana</p>
        <button className="toggle-dark" id="toggleDark" aria-label="Cambiar modo claro/oscuro" title="Modo claro/oscuro">🌙</button>
      </div>
      <div className="content">
        <div className="stats">
          <div className="stat-card"><div className="stat-number total" id="totalCount">0</div><div className="stat-label">Total Transportes</div></div>
          <div className="stat-card"><div className="stat-number ok-stat" id="okCount">0</div><div className="stat-label">Al día</div></div>
          <div className="stat-card"><div className="stat-number warning-stat" id="warningCount">0</div><div className="stat-label">Por vencer</div></div>
          <div className="stat-card"><div className="stat-number danger-stat" id="dangerCount">0</div><div className="stat-label">Vencidos</div></div>
        </div>
        <div className="form-section">
          <h2>➕ <span id="formTitle">Agregar Nuevo Transporte</span></h2>
          <form id="transportForm">
            <div className="form-group">
              <div className="input-group">
                <label htmlFor="nombre">Nombre del Transporte</label>
                <input type="text" id="nombre" required placeholder="Ej: Transporte López S.A." />
              </div>
              <div className="input-group">
                <label htmlFor="numeroRol">Número de ROL</label>
                <input type="text" id="numeroRol" required placeholder="Ej: 12345" />
              </div>
              <div className="input-group">
                <label htmlFor="fechaVencimiento">Fecha de Vencimiento</label>
                <input type="date" id="fechaVencimiento" required />
              </div>
            </div>
            <button type="submit" className="btn" id="submitBtn">
              ➕ <span id="submitBtnText">Agregar Transporte</span>
            </button>
            <button type="button" className="btn btn-danger" id="cancelEditBtn" style={{ display: "none", marginLeft: "10px" }}>
              ❌ Cancelar Edición
            </button>
          </form>
        </div>
        <div className="alert alert-info">
          <strong>📱 Integración WhatsApp:</strong> Para recibir alertas automáticas por WhatsApp, necesitarás implementar un servidor backend con la API de WhatsApp Business. Esta versión web te mostrará las alertas en pantalla y podrás exportar los datos.
        </div>
        <div className="filter-bar">
          <b>Filtrar:</b>
          <input type="text" id="filterNombre" placeholder="Nombre..." onInput={() => window.transportManager && window.transportManager.render()} />
          <input type="text" id="filterRol" placeholder="ROL..." onInput={() => window.transportManager && window.transportManager.render()} />
          <input type="date" id="filterFecha" placeholder="Vencimiento..." onInput={() => window.transportManager && window.transportManager.render()} />
          <button className="btn export-btn" onClick={() => window.transportManager && window.transportManager.exportExcel()} title="Exportar Excel">📥 Excel</button>
          <button className="btn export-btn" onClick={() => window.transportManager && window.transportManager.exportData()} title="Exportar Backup JSON">💾 Backup</button>
          <label className="btn import-btn" style={{ cursor: "pointer" }} title="Importar Backup">
            📤 Importar <input type="file" accept=".json" style={{ display: "none" }} onChange={e => window.transportManager && window.transportManager.importData(e)} />
          </label>
        </div>
        <div className="form-section">
          <h2>📋 Lista de Transportes</h2>
          <div className="transport-list" id="transportList">
            <div className="empty-state">
              <h3>No hay transportes registrados</h3>
              <p>Agrega tu primer transporte usando el formulario anterior</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
