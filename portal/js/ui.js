/**
 * ORBITALDATA - Renderizado UI y notificaciones
 */
const OrbitalUI = (function () {
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text == null ? '' : String(text);
        return div.innerHTML;
    }

    function showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast ' + type;
        toast.textContent = message;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    function renderServices() {
        const container = document.getElementById('servicesContainer');
        if (!container) return;

        container.innerHTML = ORBITAL_CONFIG.services
            .map(
                (s) => `
            <article class="service-card">
                <div class="icon">${escapeHtml(s.icon)}</div>
                <h3>${escapeHtml(s.title)}</h3>
                <p>${escapeHtml(s.description)}</p>
            </article>
        `
            )
            .join('');
    }

    function renderPartners() {
        const container = document.getElementById('partnersContainer');
        if (!container) return;

        container.innerHTML = ORBITAL_CONFIG.partners
            .map(
                (p) => `
            <div class="partner-card">
                <img src="${escapeHtml(p.logo)}" alt="${escapeHtml(p.name)}" loading="lazy" />
                <p>${escapeHtml(p.description)}</p>
            </div>
        `
            )
            .join('');
    }

    function renderDocumentation() {
        const container = document.getElementById('docsContainer');
        if (!container) return;

        const endpointsHtml = ORBITAL_CONFIG.endpoints
            .map(
                (e) =>
                    `<li><strong>${escapeHtml(e.method)}</strong> <code>${escapeHtml(e.path)}</code> — ${escapeHtml(e.description)}</li>`
            )
            .join('');

        const stackHtml = ORBITAL_CONFIG.stack
            .map((s) => `<li><strong>${escapeHtml(s.layer)}:</strong> ${escapeHtml(s.tech)}</li>`)
            .join('');

        container.innerHTML = `
            <div class="docs-grid">
                <div class="doc-card">
                    <h3>Stack tecnológico</h3>
                    <ul>${stackHtml}</ul>
                </div>
                <div class="doc-card">
                    <h3>Endpoints API</h3>
                    <p>Base URL: <code>${escapeHtml(ORBITAL_CONFIG.apiBaseUrl)}</code></p>
                    <ul>${endpointsHtml}</ul>
                </div>
                <div class="doc-card">
                    <h3>Ejemplo POST /api/contact-requests</h3>
                    <pre>{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "message": "Interesado en videovigilancia"
}</pre>
                </div>
                <div class="doc-card">
                    <h3>Contacto ORBITALDATA</h3>
                    <ul>
                        <li>${escapeHtml(ORBITAL_CONFIG.contact.address)}</li>
                        <li><a href="mailto:${escapeHtml(ORBITAL_CONFIG.contact.email)}">${escapeHtml(ORBITAL_CONFIG.contact.email)}</a></li>
                    </ul>
                </div>
            </div>
        `;
    }

    function renderRequestsLoading() {
        const container = document.getElementById('requestsContainer');
        if (!container) return;
        container.innerHTML = '<p class="loading-state">Cargando solicitudes...</p>';
    }

    function renderRequests(requests) {
        const container = document.getElementById('requestsContainer');
        if (!container) return;

        if (!requests || requests.length === 0) {
            container.innerHTML =
                '<p class="empty-state">No hay solicitudes registradas en MongoDB.</p>';
            return;
        }

        const rows = requests
            .map((r) => {
                const date = r.created_at
                    ? new Date(r.created_at).toLocaleString('es-CO')
                    : '—';
                return `
                <tr>
                    <td>${escapeHtml(r.name)}</td>
                    <td>${escapeHtml(r.email)}</td>
                    <td>${escapeHtml(r.message)}</td>
                    <td>${escapeHtml(date)}</td>
                </tr>
            `;
            })
            .join('');

        container.innerHTML = `
            <div class="requests-table-wrap">
                <table class="requests-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Mensaje</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>
        `;
    }

    function renderRequestsError(message) {
        const container = document.getElementById('requestsContainer');
        if (!container) return;
        container.innerHTML = `<div class="error-state">${escapeHtml(message)}</div>`;
    }

    return {
        escapeHtml,
        showToast,
        renderServices,
        renderPartners,
        renderDocumentation,
        renderRequests,
        renderRequestsLoading,
        renderRequestsError
    };
})();

function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
