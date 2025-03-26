# CinemaApp

CinemaApp is a web-based ticketing platform designed for a movie company with multiple subsidiaries nationwide or globally. It enables users to purchase movie tickets online, reserve seats, and browse projection schedules, offering a seamless and user-friendly experience.

## Features

- View currently showing and upcoming movies
- View venue information

## Tech Stack

### Backend

- Java
- Spring Boot
- PostgreSQL database
- Maven for dependency management

#### Dependencies

- Spring Data JPA
- Spring Security
- Hibernate
- Flyway for database migrations
- Swagger.io

### Frontend

- React
- Typescript
- SCSS

#### Libraries

- Vite build tool
- Axios for fetching

## Prerequisites

- Java JDK 17 or higher
- Node.js 18 or higher (specified in .nvmrc)
- npm
- PostgreSQL
- Maven 3.8.x

## Getting Started

### Backend Setup

1. Clone the repository:

   git clone https://github.com/ihasicic1/CinemaApp.git
   cd cinema-app

2. Configure the database in `server/src/main/resources/application.properties`:

3. Build and run the Spring Boot application:

   cd server
   mvn clean install
   mvn spring-boot:run

   The backend will start on http://localhost:8080
   Swagger will start on http://localhost:8080/swagger-ui/index.html
   Swagger documentation is available at http://localhost:8080/v3/api-docs

### Frontend Setup

1. Navigate to the frontend directory:

   cd client

2. Install dependencies:

   npm install

3. Start the development server:

   npm run dev

   The frontend will start on http://localhost:5173


## Database Migrations

The application uses Flyway for database migrations.
