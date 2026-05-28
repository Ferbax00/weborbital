/**
 * ORBITALDATA - Configuración central del portal
 */
const ORBITAL_CONFIG = (function () {
    const hostname = window.location.hostname;
    const isLocal =
        hostname === 'localhost' ||
        hostname === '127.0.0.1' ||
        hostname === '';

    const metaApi = document.querySelector('meta[name="orbital-api-url"]');
    const metaUrl = metaApi && metaApi.getAttribute('content');

    let apiBaseUrl = '';
    if (window.ORBITAL_API_URL) {
        apiBaseUrl = String(window.ORBITAL_API_URL).replace(/\/$/, '');
    } else if (metaUrl) {
        apiBaseUrl = metaUrl.replace(/\/$/, '');
    } else if (isLocal) {
        apiBaseUrl = 'http://localhost:8000';
    } else if (hostname.endsWith('.github.io')) {
        apiBaseUrl = '';
    }

    if (!apiBaseUrl && !isLocal) {
        console.warn('ORBITALDATA: configura window.ORBITAL_API_URL en portal/js/env.js o el meta orbital-api-url');
    }

    return {
        apiBaseUrl,
        apiUrl: apiBaseUrl + '/api',

        services: [
            {
                icon: '📡',
                title: 'Telecomunicaciones (VSAT)',
                description:
                    'Conectividad y transmisión de datos por sistemas satelitales o terrestres; venta de capacidad de transmisión; instalación, puesta en marcha, mantenimiento y soporte de equipos VSAT y demás enlaces de comunicación.'
            },
            {
                icon: '🌐',
                title: 'Redes y seguridad',
                description:
                    'Planeación, diseño, suministro, instalación, configuración y soporte de LAN, WAN, VPN, cableado estructurado y fibra óptica; videovigilancia (CCTV) y control de acceso.'
            },
            {
                icon: '🔧',
                title: 'Mantenimiento técnico especializado',
                description:
                    'Mantenimientos preventivo, correctivo y predictivo; soporte técnico general y avanzado a servidores, equipos de cómputo, dispositivos de comunicación, hardware y software.'
            },
            {
                icon: '🛒',
                title: 'Comercialización y suministro',
                description:
                    'Comercio al por mayor y menor; importación, exportación, distribución y venta de equipos de tecnología, informática y comunicaciones, hardware, software, licencias y materiales de instalación.'
            }
        ],

        partners: [
            {
                name: 'Hikvision',
                logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Hikvision_logo.svg/320px-Hikvision_logo.svg.png',
                description: 'Soluciones de Videovigilancia'
            },
            {
                name: 'Syscom Colombia',
                logo: 'https://syscom.mx/images/logo_syscom.png',
                description: 'Distribuidor Tecnológico'
            }
        ],

        stack: [
            { layer: 'Frontend', tech: 'HTML5, CSS3, JavaScript ES6+' },
            { layer: 'Backend', tech: 'FastAPI + Python + Pydantic' },
            { layer: 'Base de Datos', tech: 'MongoDB (colección contact_requests)' }
        ],

        endpoints: [
            {
                method: 'GET',
                path: '/api/',
                description: 'Health check de la API'
            },
            {
                method: 'POST',
                path: '/api/contact-requests',
                description: 'Crear solicitud de cotización'
            },
            {
                method: 'GET',
                path: '/api/contact-requests',
                description: 'Listar solicitudes guardadas'
            }
        ],

        contact: {
            address: 'Av 20 de Julio, Edificio Salgado, Apto 304, San Andrés Isla, Colombia',
            email: 'josfer38@gmail.com'
        }
    };
})();
