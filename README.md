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
- Node.js 18 or higher
- npm
- PostgreSQL
- Maven 3.8.x

## Getting Started

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/ihasicic1/CinemaApp.git
   cd cinema-app
   ```

2. Configure the database in:

   ```
   server/src/main/resources/application.properties
   ```

3. Set the required environment variables:

   You can refer to the `.env.example` file in the backend project root directory for a complete list of required variables. Copy its contents into a new `.env` file and update the values accordingly:

   ```env
   DB_USER=your_database_username
   DB_PASSWORD=your_database_password
   DB_URL=your_database_url_and_name
   OMDB_API_KEY=your_omdb_api_key
   SMTP_HOST=your_email_provider_host (e.g. smtp.gmail.com in case of gmail)
   SMTP_PORT=your_email_provider_port (e.g. 587 in case of gmail)
   EMAIL_USERNAME=your_email_address (e.g. user@example.com)
   EMAIL_PASSWORD=your_email_password 
   FRONTEND_URL=https://localhost:5173 (in case of running locally)
   SSL_KEYSTORE_PASSWORD=your_ssl_keystore_password
   ```

> **In case of opting for gmail as your email provider**:
   >
   > - Go to Google Account Security
   > - Enable 2-Step Verification if you haven’t already.
   > - Under “Signing in to Google”, click App passwords.
   > - Select -> App -> Mail -> Device -> Other (give a name like “Spring Boot App”)
   > - Click Generate → Google gives you a 16-character password. Example: abcd efgh ijkl mnop
   > - Use this app password as EMAIL_PASSWORD in your Spring Boot config.
   > - Your EMAIL_USERNAME is still your Gmail address (example@gmail.com). 
 

   > **To obtain an OMDb API Key**:
   >
   > - Visit [http://www.omdbapi.com/apikey.aspx](http://www.omdbapi.com/apikey.aspx)
   > - Choose the free or paid plan
   > - Enter your email address and generate your API key
   > - Add the key to your `.env` file as shown above

4. Generate RSA keys for JWT:

   ```bash
   openssl genpkey -algorithm RSA -out src/main/resources/jwt/app.key -outform PEM
   openssl rsa -pubout -in src/main/resources/jwt/app.key -out src/main/resources/jwt/app.pub
   ```

   This will generate:

   - A private key file: `src/main/resources/jwt/app.key`
   - A public key file: `src/main/resources/jwt/app.pub`

5. Generate Stripe API key

   - Visit https://docs.stripe.com/keys

7. Build and run the Spring Boot application:

   ```bash
   cd server
   mvn clean install
   mvn spring-boot:run
   ```

   - Backend runs at: `http://localhost:8080`
   - Swagger UI: `http://localhost:8080/swagger-ui/index.html`
   - API docs: `http://localhost:8080/v3/api-docs`

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd client
   ```

2. Set the required environment variables:

   You can refer to the `.env.example` file in the frontend project root directory. Copy its contents into a new `.env` file and update the values accordingly:

   ```env
   VITE_API_BASE_URL=https://localhost:8443/api
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   - Frontend runs at: `http://localhost:5173`

## Database Migrations

The application uses Flyway for database migrations. Migrations are executed automatically on application startup based on the scripts found in the `resources/db/migration` directory.
