
# Front-end Setup

Our application's front-end is built using Angular and HTML for the UI.

### Installation

To set up the local environment for Angular, follow these steps:

### Install Angular CLI globally:

npm install -g @angular/cli

### Running the Application

To run the Angular application:

Navigate to the project directory:

cd my-app

Start the server:


ng serve --open


This will open the application in your default web browser, showcasing that the environment is set up correctly.

# Back-end Setup

For the backend, we use Node.js and JavaScript for API development.

### Installation

To install Node.js:

Download and install Node.js from nodejs.org/en.

Install npm globally:

npm install -g npm

### Verifying Installation

To verify that Node.js and npm are installed correctly, run the following commands:

node -v
npm -v

This will display the versions of Node.js and npm installed on your system.

# MySQL Database Setup

Our application uses MySQL for the database. Follow these steps to set it up:

Download and install MySQL from dev.mysql.com/downloads/installer/. The installer provides instructions for setup.

Extract the zip file containing the database tables.

Create a database named localbites using MySQL Workbench.

Import the tables into the localbites database using MySQL command prompt:

mysql -u username -p database_name < filename.sql

Replace username with your MySQL username and filename.sql with the name of the SQL file to import. Repeat this for all 10 files.

### Connecting MySQL with Angular

To connect the MySQL database with Angular, use Angular's HTTP module.

## Additional Setup

Postman needs to be installed for testing the application.

## Build Setup

Once the setup is complete, clone or download the repository.

For the front-end, navigate to the project directory and run:


npm install
npm run start

For the back-end, run:


npm run dev

This will start the development servers for both front-end and back-end.

Unzip the node module folder before running any command.
