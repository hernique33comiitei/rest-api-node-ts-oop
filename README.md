# API Documentation

This document provides information and guidelines for using the API provided by your application. The API is designed to manage user registration, authentication, profile management, and account deletion.

## Base URL

The base URL for accessing the API is: `http://localhost:<PORT>`

## Authentication

Authentication is required for certain API endpoints. To authenticate, you need to include an `x-access-token` header in your request with a valid JWT token obtained through the login process.

### Authentication Header

- **x-access-token**: A valid JWT token obtained after successful login.

## Endpoints

### 1. Create User

- **URL**: `/user/create`
- **Method**: POST
- **Description**: Create a new user account.
- **Request Body**:
  - `email` (string, required): User's email address.
  - `name` (string, required): User's name.
  - `password` (string, required): User's password.

#### Example Request

```http
POST http://localhost:<PORT>/user/create
Content-Type: application/json

{
  "email": "example@email.com",
  "name": "John Doe",
  "password": "securepassword"
}
```

#### Example Response

```json
{
  "success": {
    "default": {
      "message": "User created",
      "userId": "user_id_here"
    }
  }
}
```

### 2. User Login

- **URL**: `/user/login`
- **Method**: POST
- **Description**: Authenticate a user and receive a JWT token.
- **Request Body**:
  - `email` (string, required): User's email address.
  - `name` (string, required): User's name.
  - `password` (string, required): User's password.

#### Example Request

```http
POST http://localhost:<PORT>/user/login
Content-Type: application/json

{
  "email": "example@email.com",
  "name": "John Doe",
  "password": "securepassword"
}
```

#### Example Response

```json
{
  "jwtAuth": "your_jwt_token_here"
}
```

### 3. Get User Profile

- **URL**: `/user/profile`
- **Method**: GET
- **Description**: Retrieve the user's profile information.
- **Authentication**: Required (`x-access-token` header).

#### Example Request

```http
GET http://localhost:<PORT>/user/profile
x-access-token: your_jwt_token_here
```

#### Example Response

```json
{
  "dataUser": {
    "_id": "user_id_here",
    "email": "example@email.com",
    "name": "John Doe"
  }
}
```

### 4. Update User Profile

- **URL**: `/user/update-profile`
- **Method**: PUT
- **Description**: Update the user's password.
- **Request Body**:
  - `password` (string, required): Current password.
  - `newPassword` (string, required): New password.
- **Authentication**: Required (`x-access-token` header).

#### Example Request

```http
PUT http://localhost:<PORT>/user/update-profile
Content-Type: application/json
x-access-token: your_jwt_token_here

{
  "password": "current_password",
  "newPassword": "new_secure_password"
}
```

#### Example Response

```json
{
  "success": "password changed successfully"
}
```

### 5. Delete User Account

- **URL**: `/user/delete-profile`
- **Method**: DELETE
- **Description**: Delete the user's account.
- **Request Body**:
  - `password` (string, required): Current password.
- **Authentication**: Required (`x-access-token` header).

#### Example Request

```http
DELETE http://localhost:<PORT>/user/delete-profile
Content-Type: application/json
x-access-token: your_jwt_token_here

{
  "password": "current_password"
}
```

#### Example Response

```json
{
  "success": "user deleted"
}
```

## Error Handling

In case of errors, the API will respond with appropriate HTTP status codes and error messages. Make sure to handle these errors gracefully in your application.

- **400 Bad Request**: Invalid request or missing parameters.
- **401 Unauthorized**: Authentication failed or insufficient permissions.
- **500 Internal Server Error**: Server encountered an error (check the response for details).
