/**
 * ORBITALDATA - Comunicación con API FastAPI
 */
const OrbitalAPI = (function () {
    const baseUrl = ORBITAL_CONFIG.apiUrl;

    async function request(path, options = {}) {
        const url = baseUrl + path;
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers || {})
            },
            ...options
        });

        let data = null;
        const text = await response.text();
        if (text) {
            try {
                data = JSON.parse(text);
            } catch {
                data = { detail: text };
            }
        }

        if (!response.ok) {
            const detail =
                (data && (data.detail || data.message)) ||
                `Error HTTP ${response.status}`;
            const message =
                typeof detail === 'string'
                    ? detail
                    : Array.isArray(detail)
                      ? detail.map((d) => d.msg || JSON.stringify(d)).join(', ')
                      : JSON.stringify(detail);
            throw new Error(message);
        }

        return data;
    }

    function validateContactForm({ name, email, message }) {
        const trimmedName = (name || '').trim();
        const trimmedEmail = (email || '').trim();
        const trimmedMessage = (message || '').trim();

        if (!trimmedName) throw new Error('El nombre es obligatorio');
        if (trimmedName.length > 200) throw new Error('El nombre no puede superar 200 caracteres');
        if (!trimmedEmail) throw new Error('El correo es obligatorio');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
            throw new Error('Ingrese un correo electrónico válido');
        }
        if (!trimmedMessage) throw new Error('El mensaje es obligatorio');
        if (trimmedMessage.length > 2000) {
            throw new Error('El mensaje no puede superar 2000 caracteres');
        }

        return {
            name: trimmedName,
            email: trimmedEmail,
            message: trimmedMessage
        };
    }

    return {
        async healthCheck() {
            return request('/');
        },

        async createContactRequest(formData) {
            const payload = validateContactForm(formData);
            return request('/contact-requests', {
                method: 'POST',
                body: JSON.stringify(payload)
            });
        },

        async getContactRequests() {
            return request('/contact-requests');
        }
    };
})();
