# LogiTrack – Sistema de Gestión de Inventarios y Bodegas

LogiTrack es una plataforma desarrollada con **Spring Boot** que permite administrar bodegas, productos y movimientos de inventario en múltiples sedes. Incluye autenticación segura mediante **JWT**, control de roles, registro de auditorías y una interfaz básica en **HTML/CSS/JS** para consumir la API. El proyecto está documentado e incluye ejemplos de endpoints y un esquema arquitectónico que facilita su comprensión y despliegue.

---

## 1. Descripción del proyecto

El sistema centraliza la administración del inventario de varias bodegas ubicadas en distintas ciudades. Permite gestionar productos, registrar movimientos (entradas, salidas, transferencias) y mantener un historial auditado de todas las operaciones realizadas.

La aplicación implementa un esquema de seguridad basado en **tokens JWT**, junto con roles de usuario (`ADMIN` y `EMPLEADO`).

Usuarios iniciales incluidos:

| Usuario | Contraseña | Rol |
|--------|------------|-----|
| admi1  | password1  | ADMIN |
| ventas1 | password1 | EMPLEADO |
| ventas2 | password1 | EMPLEADO |
| ventas3 | password1 | EMPLEADO |
| ventas4 | password1 | EMPLEADO |

---

## 2. Tecnologías utilizadas

- Java 17  
- Spring Boot 3.5.x  
- Spring Web  
- Spring Security + JWT  
- Spring Data JPA  
- PostgreSQL 15+  
- Lombok  
- Swagger / OpenAPI  
- Maven 3.8+  

---
## 3. Estructura del proyecto
```bash
logitrack/
│
├── backend/
│   ├── pom.xml
│   └── src/main/java/com/logitrack/
│       ├── config/
│       ├── controller/
│       ├── dto/
│       ├── service/
│       ├── repository/
│       ├── model/
│       └── LogiTrackApplication.java
│
│   └── src/main/resources/
│       ├── application.properties
│       ├── static/       
│       └── templates/    
│
└── README.md
```

## 4. Instalación y ejecución

### Requisitos previos
- PostgreSQL 15+  
- Java JDK 17  
- Maven 3.6+  
- Navegador web  

### Pasos

1. Clonar el repositorio:

```bash
git clone https://github.com/jfleong6/LogiTrack
cd logitrack

