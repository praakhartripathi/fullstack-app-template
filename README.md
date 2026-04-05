# Full-Stack App Template

A production-ready, reusable full-stack web application template with **microservices architecture** and **module-based backend design**.

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Tailwind CSS 3, Vite 6, Axios, React Router 7 |
| Backend (User Service) | Java 21, Spring Boot 3.4, Maven, SpringDoc OpenAPI |
| Backend (Booking Service) | Java 21, Spring Boot 3.4, Maven, SpringDoc OpenAPI |
| Database | PostgreSQL 16 with multi-schema isolation |
| DevOps | Docker, Docker Compose, Nginx |

> **Architecture Highlights:**
> - Each backend follows a **module-based** layered architecture (`modules/<name>/controller, service, repository, entity, dto`)
> - Schema-per-service PostgreSQL design for clean data isolation
> - Configuration via `application.properties` (not YAML)
> - Ready to scale into independent microservices

---

## 📁 Project Structure

```
root/
├── frontend/                       # React + Tailwind CSS frontend
│   ├── src/
│   │   ├── components/             # Reusable UI components (Navbar, Layout, LoadingSpinner)
│   │   ├── pages/                  # Route-level pages (Home, Login, Users)
│   │   ├── services/               # Axios API integration layer
│   │   └── hooks/                  # Custom React hooks
│   ├── Dockerfile
│   └── nginx.conf
│
├── backend/                        # User Service (Spring Boot, port 8080)
│   ├── Dockerfile
│   └── src/main/
│       ├── java/com/template/app/
│       │   ├── Application.java
│       │   ├── config/             # CorsConfig, SwaggerConfig
│       │   ├── common/             # ApiResponse wrapper
│       │   ├── exception/          # GlobalExceptionHandler + custom exceptions
│       │   └── modules/
│       │       └── user/           # ← Module-based: each feature is self-contained
│       │           ├── controller/ # REST endpoints
│       │           ├── service/    # Business logic (interface + impl)
│       │           ├── repository/ # JPA repository
│       │           ├── entity/     # JPA entity
│       │           └── dto/        # Request & Response DTOs
│       └── resources/
│           ├── application.properties
│           └── application-docker.properties
│
├── backend-booking/                # Booking Service (Spring Boot, port 8081)
│   ├── Dockerfile
│   └── src/main/
│       ├── java/com/template/booking/
│       │   ├── BookingServiceApplication.java
│       │   ├── config/             # CorsConfig, SwaggerConfig
│       │   ├── common/             # ApiResponse wrapper
│       │   ├── exception/          # GlobalExceptionHandler + custom exceptions
│       │   └── modules/
│       │       └── booking/        # ← Module-based: controller, service, repo, entity, dto
│       │           ├── controller/
│       │           ├── service/
│       │           ├── repository/
│       │           ├── entity/
│       │           └── dto/
│       └── resources/
│           ├── application.properties
│           └── application-docker.properties
│
├── database/                       # SQL initialization scripts
│   ├── 01-init-schemas.sql         # Schema creation
│   ├── 02-user-service.sql         # User tables + seed data
│   └── 03-booking-service.sql      # Booking tables
│
├── docker-compose.yml              # Orchestrates all 4 services
├── .env.example                    # Environment variable template
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

- **Docker** & **Docker Compose** (for containerized setup)
- **Java 21** + **Maven** (for local backend development)
- **Node.js 20+** + **npm** (for local frontend development)
- **PostgreSQL 16** (for local database, or use Docker)

### Option 1: Run with Docker (Recommended)

```bash
# 1. Clone the repository
git clone <repo-url> && cd fullstack-app-template

# 2. Copy environment variables
cp .env.example .env

# 3. Start all services
docker-compose up --build

# 4. Access the application
#    Frontend:         http://localhost:3000
#    User Service API: http://localhost:8080/api/v1/users
#    Booking API:      http://localhost:8081/api/v1/bookings
#    Swagger (Users):  http://localhost:8080/swagger-ui.html
#    Swagger (Booking): http://localhost:8081/swagger-ui.html
```

### Option 2: Run Locally (Development)

#### Database
```bash
# Start PostgreSQL with Docker
docker-compose up postgres

# Or use your local PostgreSQL and run the SQL scripts manually:
psql -U postgres -d fullstack_db -f database/01-init-schemas.sql
psql -U postgres -d fullstack_db -f database/02-user-service.sql
psql -U postgres -d fullstack_db -f database/03-booking-service.sql
```

#### User Service Backend
```bash
cd backend
mvn spring-boot:run
# Runs on http://localhost:8080
```

#### Booking Service Backend
```bash
cd backend-booking
mvn spring-boot:run
# Runs on http://localhost:8081
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173 (Vite dev server proxies API calls)
```

---

## 📖 API Documentation

Interactive Swagger UI is available when the backends are running:

| Service | Swagger UI | API Docs (JSON) |
|---------|-----------|-----------------|
| User Service | [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html) | [http://localhost:8080/api-docs](http://localhost:8080/api-docs) |
| Booking Service | [http://localhost:8081/swagger-ui.html](http://localhost:8081/swagger-ui.html) | [http://localhost:8081/api-docs](http://localhost:8081/api-docs) |

### User Service API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/users` | List all users |
| `GET` | `/api/v1/users/{id}` | Get user by ID |
| `POST` | `/api/v1/users` | Create a new user |
| `PUT` | `/api/v1/users/{id}` | Update a user |
| `DELETE` | `/api/v1/users/{id}` | Delete a user |

### Booking Service API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/bookings` | List all bookings |
| `GET` | `/api/v1/bookings/{id}` | Get booking by ID |
| `GET` | `/api/v1/bookings/user/{userId}` | Get bookings by user |
| `POST` | `/api/v1/bookings` | Create a new booking |
| `PUT` | `/api/v1/bookings/{id}` | Update a booking |
| `PATCH` | `/api/v1/bookings/{id}/status` | Update booking status |
| `DELETE` | `/api/v1/bookings/{id}` | Delete a booking |

### Response Format

All APIs return a consistent JSON structure:

```json
{
  "success": true,
  "message": "User created successfully",
  "data": { ... },
  "timestamp": "2026-04-05T22:00:00"
}
```

---

## 🧩 Creating New Services / Modules

### Adding a Module to an Existing Service

1. Create a new package under `modules/`:
   ```
   modules/
   └── your_module/
       ├── controller/YourController.java
       ├── service/YourService.java
       ├── service/YourServiceImpl.java
       ├── repository/YourRepository.java
       ├── entity/YourEntity.java
       └── dto/
           ├── YourRequestDTO.java
           └── YourResponseDTO.java
   ```

2. Add your database table to the appropriate schema SQL script in `database/`.

3. Map the entity with `@Table(name = "your_table", schema = "your_schema")`.

### Adding a New Microservice

1. **Copy** `backend-booking/` as your starting point and rename it.

2. **Update** the package name from `com.template.booking` to `com.template.yourservice`.

3. **Create a new schema** — add a SQL script in `database/` (e.g., `04-your-service.sql`).

4. **Update** `application.properties` with the new schema and port number.

5. **Add to `docker-compose.yml`**:
   ```yaml
   your-service:
     build:
       context: ./backend-yourservice
       dockerfile: Dockerfile
     environment:
       SPRING_PROFILES_ACTIVE: docker
       DB_HOST: postgres
       SERVER_PORT: 8082
     ports:
       - "8082:8082"
     depends_on:
       postgres:
         condition: service_healthy
   ```

6. **Add Nginx proxy rule** in `frontend/nginx.conf`:
   ```nginx
   location /api/v1/your-resource {
       proxy_pass http://your-service:8082;
   }
   ```

---

## 🗄️ Database Schema Design

The application uses **schema-per-service** isolation within a single PostgreSQL database:

```
fullstack_db
├── user_service         # Schema for the User Service
│   └── users            # Users table
└── booking_service      # Schema for the Booking Service
    └── bookings         # Bookings table
```

This design allows:
- **Clean data isolation** between services
- **Easy migration** to separate databases when scaling to true microservices
- **Shared connection pool** during development

---

## 🔧 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DB_NAME` | `fullstack_db` | PostgreSQL database name |
| `DB_USERNAME` | `postgres` | Database username |
| `DB_PASSWORD` | `postgres` | Database password |
| `DB_PORT` | `5432` | Database port |
| `SERVER_PORT` | `8080` | User Service port |
| `BOOKING_SERVER_PORT` | `8081` | Booking Service port |
| `SPRING_PROFILES_ACTIVE` | `default` | Spring profile (`docker` for containers) |
| `VITE_API_BASE_URL` | *(empty)* | Frontend API base URL override |

---

## 🐳 Docker Services

| Service | Container Name | Port | Description |
|---------|---------------|------|-------------|
| `postgres` | fullstack-postgres | 5432 | PostgreSQL 16 with auto-init scripts |
| `backend` | fullstack-backend | 8080 | User Service (Spring Boot) |
| `backend-booking` | fullstack-backend-booking | 8081 | Booking Service (Spring Boot) |
| `frontend` | fullstack-frontend | 3000 | React app served via Nginx |

### Useful Commands

```bash
# Start all services
docker-compose up --build

# Start in detached mode
docker-compose up -d --build

# View logs
docker-compose logs -f backend
docker-compose logs -f backend-booking

# Stop all services
docker-compose down

# Stop and remove volumes (resets database)
docker-compose down -v

# Rebuild a specific service
docker-compose up --build backend
```

---

## 📝 License

This template is open-source. Use it as a foundation for your projects.
