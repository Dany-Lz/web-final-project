# Sistema de Gestión de Competencias Deportivas

Aplicación web full-stack diseñada para la administración de competencias deportivas, atletas, sedes, entrenadores y generación de reportes.

## Tecnologías Utilizadas

*   **Backend:** Java 23, Spring Boot, Spring Data JPA, PostgreSQL.
*   **Frontend:** React 18, Vite, CSS Puro.
*   **Control de versiones:** Git y GitHub.

## Requisitos Previos

Antes de ejecutar el proyecto, asegúrese de tener instalado:
*   Java JDK 23
*   Maven (o usar el integrado en NetBeans)
*   PostgreSQL (con la base de datos `GestionCompetencia` creada y ejecutándose)
*   Node.js y npm

## Guía de Instalación y Ejecución desde Cero

Siga estos pasos en orden para levantar el proyecto completo por primera vez.

### Paso 1: Configurar la Base de Datos

1.  Abra **pgAdmin** (o su cliente de PostgreSQL preferido).
2.  Cree una nueva base de datos llamada `GestionCompetencia`.
3.  Abra la herramienta **Query Tool** sobre esa base de datos.
4.  Vaya a la carpeta `database/` en la raíz de este proyecto. Abra el archivo `scriptBD.sql`, copie todo su contenido y péguelo en la Query Tool.
5.  Ejecute el script. Esto creará todas las tablas, llaves foráneas, restricciones (CHECK), funciones y triggers necesarios para la lógica de negocio.

### Paso 2: Ejecutar el Backend (Spring Boot)

1.  Abra el proyecto `web-final-project` en NetBeans (o en su IDE de preferencia).
2.  Localice el archivo `src/main/resources/application.properties`.
3.  Configure sus credenciales locales de PostgreSQL (usuario y contraseña):
    ```properties
    spring.datasource.url=jdbc:postgresql://localhost:5432/GestionCompetencia
    spring.datasource.username=postgres
    spring.datasource.password=SU_CONTRASEÑA_AQUI
4. Ejecute la aplicación mediante el comando spring-boot:run o utilizando el botón de ejecución del IDE.
5. La API estará disponible en http://localhost:8080. (Puede verificar que funciona abriendo http://localhost:8080/api/atletas en su navegador).

### Paso 3: Ejecutar el Frontend (React)

1. Abra una terminal y navegue a la carpeta frontend/ del proyecto.
2. Instale las dependencias de Node.js ejecutando:
    npm install
3. Inicie el servidor de desarrollo con:
    npm run dev
4. La interfaz de usuario estará disponible en http://localhost:5173. Abra esa URL en su navegador.

## Documentación de la API

La API REST devuelve respuestas en formato JSON. El frontend consume estas rutas de forma relativa (ej. `fetch('/api/atletas')`) para aprovechar el proxy configurado en Vite.

### Países (`/api/paises`)
| Método | Ruta | Descripción | Cuerpo de la Petición (JSON) |
| :--- | :--- | :--- | :--- |
| GET | `/api/paises` | Lista todos los países | - |
| GET | `/api/paises/{id}` | Obtiene un país por su ID | - |
| POST | `/api/paises` | Crea un nuevo país | `{ "id": "CUB", "nombre": "Cuba" }` |
| PUT | `/api/paises/{id}` | Modifica un país existente | `{ "nombre": "Cuba Actualizada" }` |
| DELETE | `/api/paises/{id}` | Elimina un país | - |

### Atletas (`/api/atletas`)
| Método | Ruta | Descripción | Cuerpo de la Petición (JSON) |
| :--- | :--- | :--- | :--- |
| GET | `/api/atletas` | Lista todos los atletas | - |
| GET | `/api/atletas/{id}` | Obtiene un atleta por su ID | - |
| POST | `/api/atletas` | Crea un nuevo atleta | `{ "numId": "123", "nombre": "Juan", "apellidos": "Perez", "edad": 25, "sexo": "M", "contacto": "555-1234", "categoria": "Senior", "pais": { "id": "CUB" } }` |
| PUT | `/api/atletas/{id}` | Modifica un atleta existente | Mismo JSON que en POST |
| DELETE | `/api/atletas/{id}` | Elimina un atleta | - |

### Competencias (`/api/competencias`)
| Método | Ruta | Descripción | Cuerpo de la Petición (JSON) |
| :--- | :--- | :--- | :--- |
| GET | `/api/competencias` | Lista todas las competencias | - |
| POST | `/api/competencias` | Crea una nueva competencia | `{ "id": "C1", "nombre": "Copa Mundial", "estado": "Programada", "fechaInicioPrevista": "2026-05-01", "fechaFinPrevista": "2026-05-10", "sede": { "id": "S1" } }` |
| PUT | `/api/competencias/{id}` | Modifica una competencia | Mismo JSON que en POST |
| DELETE | `/api/competencias/{id}` | Elimina una competencia | - |

### Sedes (`/api/sedes`)
| Método | Ruta | Descripción | Cuerpo de la Petición (JSON) |
| :--- | :--- | :--- | :--- |
| GET | `/api/sedes` | Lista todas las sedes | - |
| POST | `/api/sedes` | Crea una nueva sede | `{ "id": "S1", "nombre": "Estadio Central", "ciudad": { "id": "CIU1" } }` |

### Entrenadores (`/api/entrenadores`)
| Método | Ruta | Descripción | Cuerpo de la Petición (JSON) |
| :--- | :--- | :--- | :--- |
| GET | `/api/entrenadores` | Lista todos los entrenadores | - |
| POST | `/api/entrenadores` | Crea un nuevo entrenador | `{ "ci": "12345678901", "nombre": "Pedro", "apellidos": "Gomez", "direccion": "Calle 1", "especialidad": "Atletismo" }` |

### Reportes
| Método | Ruta | Descripción | Respuesta (JSON) |
| :--- | :--- | :--- | :--- |
| GET | `/api/reportes/atletas-medallas` | Atletas con total de medallas | `[{ "pais": "Cuba", "nombreAtleta": "Juan Perez", "numIdentificacion": "123", "totalMedallas": 5, "cantCompetencias": 3 }]` |
| GET | `/api/reportes/resumen-pais` | Resumen de competencias por país | `[{ "pais": "Cuba", "ciudad": "La Habana", "sede": "Estadio Central", "competencia": "Copa Mundial", "estado": "Finalizada", "ganador": "Juan Perez", "finalista": "Pedro Gomez", "totalParticipantes": 10, "totalMedallas": 5 }]` |
| GET | `/api/reportes/competencias-participantes` | Competencias con cantidad de participantes | `[{ "idComp": "C1", "nombreCompetencia": "Copa Mundial", "ciudad": "La Habana", "sede": "Estadio Central", "estado": "Programada", "cantidadParticipantes": 10 }]` |

## Estructura del Proyecto

A continuación se detalla la organización de archivos y directorios del proyecto:

web-final-project/
├── database/                            # Scripts SQL de la Base de Datos
│   └── scriptBD.sql                     # Creación de tablas, triggers y datos
│
├── src/main/java/com/danilocs/web_final_project/    # Código fuente del Backend (Java)
│   ├── controller/      # Endpoints REST (Controladores)
│   ├── model/           # Entidades JPA (Mapeo de la BD)
│   ├── repository/      # Interfaces de Spring Data JPA
│   ├── services/        # Lógica de negocio
│   ├── security/        # Configuración de Spring Security y JWT
│   ├── dto/             # Objetos de transferencia de datos (Reportes)
│   ├── exceptions/      # Manejo global de excepciones
│   └── WebFinalProjectApplication.java  # Clase principal
│
├── src/main/resources/                  # Configuración del Backend
│   └── application.properties           # Credenciales de BD y config de Spring
│
├── frontend/                            # Código fuente del Frontend (React)
│   ├── public/                          # Archivos estáticos (favicon, etc.)
│   ├── src/
│   │   ├── api/                         # Módulos fetch para conectar con la API
│   │   ├── components/                  # Componentes reutilizables
│   │   ├── pages/                       # Vistas de la aplicación
│   │   │   ├── gestion/                 # Formularios de administración (CRUD)
│   │   │   ├── listados/                # Tablas de lectura
│   │   │   └── reportes/                # Vistas de reportes
│   │   ├── App.jsx                      # Enrutador principal
│   │   ├── main.jsx                     # Punto de entrada de React
│   │   └── index.css                    # Estilos globales
│   ├── package.json                     # Dependencias de Node.js
│   └── vite.config.js                   # Configuración de Vite y proxy
│
├── pom.xml                              # Dependencias de Maven (Backend)
├── README.md                            # Documentación del proyecto
└── .gitignore                           # Archivos ignorados por Git