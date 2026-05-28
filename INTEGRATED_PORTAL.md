# 🛰️ ORBITALDATA - Portal Web Integrado

## 📋 Descripción

Portal web completamente integrado que combina:
- ✅ **Frontend**: HTML5, CSS3, JavaScript Vanilla
- ✅ **Backend**: FastAPI con Python  
- ✅ **Base de Datos**: MongoDB
- ✅ **Documentación**: Técnica integrada en el portal

## 📁 Estructura

```
Prueba-web-orbital/
├── index.html                  # Página principal
├── README.md                   # Esta documentación
├── portal/                     # Carpeta del portal
│   ├── README.md              # Documentación del portal
│   ├── index.html             # HTML del portal
│   ├── css/
│   │   └── styles.css         # Estilos
│   └── js/
│       ├── config.js          # Configuración
│       ├── api.js             # Módulo API
│       ├── ui.js              # Módulo UI
│       └── main.js            # Módulo principal
├── frontend/                  # Frontend React existente
│   ├── src/
│   ├── package.json
│   └── ...
└── backend/                   # Backend FastAPI
    ├── server.py             # Servidor principal
    ├── models.py             # Modelos Pydantic
    ├── requirements.txt      # Dependencias
    └── ...
```

## 🚀 Características Principales

### Frontend Integrado
- ✨ Interfaz responsiva y moderna
- 📱 Mobile-first design
- ⚡ Validación en cliente (JavaScript)
- 🎨 Diseño con gradientes
- 📊 Renderización dinámica

### Backend Integration
- 🔌 API RESTful con FastAPI
- ✅ Validación con Pydantic
- 🗄️ Conexión a MongoDB
- 🛡️ CORS habilitado
- 📝 Logging completo

### Base de Datos
- 💾 MongoDB como almacenamiento
- 📋 Colección contact_requests
- 🔍 Índices optimizados
- ⏰ Timestamps automáticos

## 🎯 Secciones del Portal

1. **Inicio** - Presentación integrada
2. **Servicios** - Grid de 4 servicios
3. **Cotización** - Formulario conectado al backend
4. **Socios** - Partners tecnológicos
5. **Solicitudes** - Tabla desde MongoDB
6. **Arquitectura** - Documentación visual
7. **Documentación** - Referencia técnica

## 🔄 Flujo Integrado

```
┌─────────────────────────────────────────────────┐
│ 1. Usuario llena formulario en HTML              │
│    ↓                                             │
│ 2. JavaScript valida datos                       │
│    ↓                                             │
│ 3. Envía POST a FastAPI /api/contact-requests    │
│    ↓                                             │
│ 4. Pydantic valida en backend                    │
│    ↓                                             │
│ 5. Guarda en MongoDB                             │
│    ↓                                             │
│ 6. Retorna respuesta 201                         │
│    ↓                                             │
│ 7. Frontend muestra notificación de éxito        │
└─────────────────────────────────────────────────┘
```

## 📡 API Endpoints

### POST /api/contact-requests
Crear nueva solicitud de cotización

```bash
curl -X POST "https://orbital-portal.preview.emergentagent.com/api/contact-requests" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "message": "Interesado en videovigilancia"
  }'
```

**Response (201)**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "message": "Interesado en videovigilancia",
  "created_at": "2026-05-27T23:30:00Z"
}
```

### GET /api/contact-requests
Obtener todas las solicitudes

```bash
curl -X GET "https://orbital-portal.preview.emergentagent.com/api/contact-requests"
```

**Response (200)**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "message": "Interesado en videovigilancia",
    "created_at": "2026-05-27T23:30:00Z"
  }
]
```

## ✅ Validaciones

### Cliente (JavaScript)
- ✓ Campos no vacíos
- ✓ Email con formato válido
- ✓ Límites de caracteres

### Backend (Pydantic)
- ✓ `name`: min_length=1, max_length=200
- ✓ `email`: EmailStr (RFC 5322)
- ✓ `message`: min_length=1, max_length=2000

### Base de Datos (MongoDB)
- ✓ UUID único para cada solicitud
- ✓ Timestamp automático (UTC ISO 8601)
- ✓ Índices para búsquedas rápidas

## 🛠️ Stack Tecnológico

| Componente | Tecnología | Versión |
|-----------|-----------|----------|
| Frontend | HTML5, CSS3, JavaScript | ES6+ |
| Backend | FastAPI, Python | 3.8+ |
| Base de Datos | MongoDB | 4.0+ |
| Validación | Pydantic | 1.x |
| CORS | FastAPI Middleware | - |

## 📊 Composición del Código

- **JavaScript**: 80.8%
- **Python**: 11.5%
- **HTML**: 5.5%
- **CSS**: 2.2%

## 🚀 Uso Rápido

### 1. Abrir el Portal
```bash
# Opción 1: Directamente
open index.html

# Opción 2: Con servidor
python -m http.server 8000
# Acceder a: http://localhost:8000
```

### 2. Verificar Backend
```bash
curl https://orbital-portal.preview.emergentagent.com/api/
```

### 3. Probar Formulario
Usa el formulario en el portal o:
```bash
curl -X POST "https://orbital-portal.preview.emergentagent.com/api/contact-requests" \
  -H "Content-Type: application/json" \
  -d '{"name": "Test", "email": "test@example.com", "message": "Test"}'
```

## 📝 Archivos Principales

### `portal/index.html`
Página principal con:
- Navegación sticky
- 7 secciones completas
- Formulario interactivo
- Tabla de solicitudes
- Documentación integrada

### `portal/css/styles.css`
Estilos modernos con:
- Diseño responsive
- Animaciones suaves
- Gradientes profesionales
- Breakpoints mobile/tablet/desktop

### `portal/js/config.js`
Configuración centralizada:
- URLs de API
- Datos de servicios
- Modelos de BD
- Stack tecnológico

### `portal/js/api.js`
Comunicación con backend:
- Métodos GET/POST
- Validación de datos
- Manejo de errores
- Logging en consola

### `portal/js/ui.js`
Manipulación del DOM:
- Renderización de componentes
- Notificaciones toast
- Gestión de eventos
- Tablas dinámicas

### `portal/js/main.js`
Orquestación principal:
- Inicialización
- Manejo de formularios
- Carga de datos
- Health checks

## 🔒 Seguridad

- ✓ Validación en múltiples capas
- ✓ Escaping de HTML
- ✓ CORS configurado
- ✓ EmailStr de Pydantic
- ✓ Type hints en Python

## ♿ Accesibilidad

- ✓ Semántica HTML correcta
- ✓ Labels asociados a inputs
- ✓ Navegación accesible
- ✓ Contraste de colores
- ✓ Responsive design

## 🐛 Testing

### Verificar API Health
```bash
curl -X GET "https://orbital-portal.preview.emergentagent.com/api/"
# Debe retornar: {"message": "ORBITALDATA API - Hello World"}
```

### Crear solicitud de prueba
```bash
curl -X POST "https://orbital-portal.preview.emergentagent.com/api/contact-requests" \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "test@example.com", "message": "Test message"}'
```

### Obtener todas las solicitudes
```bash
curl -X GET "https://orbital-portal.preview.emergentagent.com/api/contact-requests"
```

## 📚 Documentación Adicional

- Ver `portal/README.md` para documentación detallada del portal
- Ver `backend_test.py` para pruebas de la API
- Ver `contracts.md` para especificaciones de contratos

## 🤝 Contribuir

1. Fork el repositorio
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

MIT License - Ver LICENSE para detalles

## 📞 Contacto

**ORBITALDATA Team**
- Email: info@orbitaldata.com
- GitHub: [Ferbax00](https://github.com/Ferbax00)
- Repositorio: [Prueba-web-orbital](https://github.com/Ferbax00/Prueba-web-orbital)

---

**Versión**: 1.0.0
**Estado**: ✅ Producción
**Última actualización**: 2026-05-27