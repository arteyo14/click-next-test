Project Setup

This project uses Docker Compose to manage services, including a PostgreSQL database, pgAdmin for database management, and a Nuxt application. Follow the instructions below to start the project.

Prerequisites

    •	Docker and Docker Compose must be installed on your machine.

Setup Instructions

    1.	Clone the Repository:
    git clone <your-repository-url>
    cd <your-repository-folder>

    2.	Create a .env file in the root directory and set the following environment variables:
    POSTGRES_USER=your_postgres_username
    POSTGRES_PASSWORD=your_postgres_password
    POSTGRES_DB=products-db
    PGADMIN_DEFAULT_EMAIL=your_pgadmin_email
    PGADMIN_DEFAULT_PASSWORD=your_pgadmin_password

    3.	Start Docker Compose:
    docker compose up --build

    This command will:
    •	Start the PostgreSQL database (db).
    •	Start pgAdmin (pgadmin) at localhost:5050.
    •	Start the Nuxt application (nuxt-app) at localhost:3000.

    4.	Run Migrations and Seed the Database:

After the containers are up, the Nuxt application container will automatically:
• Run the Prisma migration to set up the database schema.
• Seed the database with initial user data.

Access pgAdmin

To manage the database, open pgAdmin at localhost:5050 and log in with the email and password provided in the .env file. Add a new server connection with the following details:

    •	Hostname: db
    •	Port: 5432
    •	Username: POSTGRES_USER from .env
    •	Password: POSTGRES_PASSWORD from .env

Login Credentials

Use the following credentials to log in to the application:

    1.	Admin Account:
    •	Username: admin
    •	Password: P@ssw0rd
    2.	User Account 1:
    •	Username: user1
    •	Password: P@ssw0rd
    3.	User Account 2:
    •	Username: user2
    •	Password: P@ssw0rd
