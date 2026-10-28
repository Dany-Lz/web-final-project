# 🏆 Gestión de Competencias Deportivas - Full Stack

Aplicación web para la gestión de competencias deportivas, atletas, sedes y reportes.

## 🛠️ Tecnologías
- **Backend:** Java 23, Spring Boot 4.1.2, Spring Data JPA, PostgreSQL
- **Frontend:** React 18, Vite, Tailwind CSS (o CSS puro)
- **Control de versiones:** Git + GitHub

---

## 🚀 Cómo ejecutar el proyecto

### 1. Backend (Spring Boot)
1. Abre NetBeans y carga el proyecto `web-final-project`.
2. Asegúrate de tener PostgreSQL corriendo con la base de datos `GestionCompetencia`.
3. Configura tus credenciales en `src/main/resources/application.properties`.
4. Ejecuta `spring-boot:run` (o usa el botón de "Run" configurado).
5. El backend estará disponible en `http://localhost:8080`.

### 2. Frontend (React)
1. Abre VS Code en la carpeta `frontend/`.
2. Ejecuta `npm install` (solo la primera vez).
3. Ejecuta `npm run dev`.
4. El frontend estará disponible en `http://localhost:5173`.

---

## 📡 Contratos de la API (Endpoints)

Todos los endpoints devuelven JSON. Las peticiones de React deben hacerse a rutas relativas (ej. `fetch('/api/atletas')`) para que el proxy de Vite las redirija al backend.

### 🔹 Países (`/api/paises`)
| Método | Ruta | Descripción | Body (JSON) |
| :--- | :--- | :--- | :--- |
| GET | `/api/paises` | Lista todos los países | - |
| GET | `/api/paises/{id}` | Obtiene un país por ID | - |
| POST | `/api/paises` | Crea un nuevo país | `{ "id": "CUB", "nombre": "Cuba" }` |
| PUT | `/api/paises/{id}` | Modifica un país | `{ "nombre": "Cuba Actualizada" }` |
| DELETE | `/api/paises/{id}` | Elimina un país | - |

### 🔹 Atletas (`/api/atletas`)
| Método | Ruta | Descripción | Body (JSON) |
| :--- | :--- | :--- | :--- |
| GET | `/api/atletas` | Lista todos los atletas | - |
| GET | `/api/atletas/{id}` | Obtiene un atleta por ID | - |
| POST | `/api/atletas` | Crea un nuevo atleta | `{ "numId": "123", "nombre": "Juan", "apellidos": "Perez", "edad": 25, "sexo": "M", "contacto": "555-1234", "categoria": "Senior", "pais": { "id": "CUB" } }` |
| PUT | `/api/atletas/{id}` | Modifica un atleta | Mismo JSON que POST |
| DELETE | `/api/atletas/{id}` | Elimina un atleta | - |

### 🔹 Competencias (`/api/competencias`)
| Método | Ruta | Descripción | Body (JSON) |
| :--- | :--- | :--- | :--- |
| GET | `/api/competencias` | Lista todas las competencias | - |
| POST | `/api/competencias` | Crea una nueva competencia | `{ "id": "C1", "nombre": "Copa Mundial", "estado": "Programada", "fechaInicioPrevista": "2026-05-01", "fechaFinPrevista": "2026-05-10", "sede": { "id": "S1" } }` |
| PUT | `/api/competencias/{id}` | Modifica una competencia | Mismo JSON que POST |
| DELETE | `/api/competencias/{id}` | Elimina una competencia | - |

### 🔹 Sedes (`/api/sedes`)
| Método | Ruta | Descripción | Body (JSON) |
| :--- | :--- | :--- | :--- |
| GET | `/api/sedes` | Lista todas las sedes | - |
| POST | `/api/sedes` | Crea una nueva sede | `{ "id": "S1", "nombre": "Estadio Central", "ciudad": { "id": "CIU1" } }` |

### 🔹 Entrenadores (`/api/entrenadores`)
| Método | Ruta | Descripción | Body (JSON) |
| :--- | :--- | :--- | :--- |
| GET | `/api/entrenadores` | Lista todos los entrenadores | - |
| POST | `/api/entrenadores` | Crea un nuevo entrenador | `{ "ci": "12345678901", "nombre": "Pedro", "apellidos": "Gomez", "direccion": "Calle 1", "especialidad": "Atletismo" }` |

### 🔹 Reportes (Consultas complejas)
| Método | Ruta | Descripción | Respuesta (JSON) |
| :--- | :--- | :--- | :--- |
| GET | `/api/reportes/atletas-medallas` | Atletas con total de medallas | `[{ "pais": "Cuba", "nombreAtleta": "Juan Perez", "numIdentificacion": "123", "totalMedallas": 5, "cantCompetencias": 3 }]` |
| GET | `/api/reportes/resumen-pais` | Resumen de competencias por país | `[{ "pais": "Cuba", "ciudad": "La Habana", "sede": "Estadio Central", "competencia": "Copa Mundial", "estado": "Finalizada", "ganador": "Juan Perez", "finalista": "Pedro Gomez", "totalParticipantes": 10, "totalMedallas": 5 }]` |
| GET | `/api/reportes/competencias-participantes` | Competencias con cantidad de participantes | `[{ "idComp": "C1", "nombreCompetencia": "Copa Mundial", "ciudad": "La Habana", "sede": "Estadio Central", "estado": "Programada", "cantidadParticipantes": 10 }]` |

---

## 📂 Estructura del Frontend
```text
frontend/src/
├── components/    # Componentes reutilizables (Tabla, Boton, Modal, Input)
├── pages/
│   ├── gestion/   # Formularios de Crear/Editar/Eliminar
│   ├── listados/  # Tablas de lectura
│   └── reportes/  # Vistas de reportes (con botón de PDF)
├── api/           # Funciones fetch para comunicarse con Spring Boot
└── App.jsx        # Enrutador principal