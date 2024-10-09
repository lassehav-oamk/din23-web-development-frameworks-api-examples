# Web Frameworks 2024 Backend Demo

This repository contains a demo backend application for the Web Frameworks 2024 course. The main entry point of the application is `index.js`.

## Description

The `index.js` file sets up a basic Express server that listens on a specified port. It includes the following features:
- Basic routing for handling HTTP GET requests.
- Middleware for parsing JSON request bodies.
- Error handling for undefined routes.

## API endpoints available in the application

- **GET /**: Returns a welcome message.
- **GET /api/users**: Retrieves a list of all users.
- **POST /api/users**: Creates a new user. Requires a JSON body with user details.
- **GET /api/users/:id**: Retrieves details of a user by ID.
- **PUT /api/users/:id**: Updates details of a user by ID. Requires a JSON body with updated user details.
- **DELETE /api/users/:id**: Deletes a user by ID.

## Getting Started

To run the application, follow these steps:

1. Install the dependencies:
    ```bash
    npm install
    ```

2. Start the server:
    ```bash
    node index.js
    ```

3. The server will be running on `http://localhost:3000`.

## Dependencies

- Express: A minimal and flexible Node.js web application framework.

## License

This project is licensed under the MIT License.