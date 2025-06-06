# User Registration Endpoint

## Endpoint
`POST /users/register`

## Description
This endpoint is used to register a new user. It validates the input data, hashes the password, creates a new user in the database, and returns a JSON Web Token (JWT) along with the user data.

## Request Body
The request body should be a JSON object with the following fields:

- `fullname`: An object containing:
  - `firstname`: A string with a minimum length of 3 characters (required).
  - `lastname`: A string with a minimum length of 2 characters (optional).
- `email`: A valid email address (required).
- `password`: A string with a minimum length of 8 characters (required).

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Success Response
```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "SocketId": null
  }
}
```

## Error Response
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "first name must be atleast 3 character long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Password must be atleast 8 character long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

---

# User Login Endpoint

## Endpoint
`POST /users/login`

## Description
This endpoint is used to authenticate a user. It validates the input data, checks the user's credentials, and returns a JSON Web Token (JWT) along with the user data if the credentials are valid.

## Request Body
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Success Response
```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "SocketId": null
  }
}
```

## Error Responses
- **400 Bad Request** (validation errors)
- **401 Unauthorized** (invalid credentials)
```json
{
  "message": "Invalid email or password"
}
```

---

# Get User Profile Endpoint

## Endpoint
`GET /users/profile`

## Description
Returns the authenticated user's profile information. Requires a valid JWT token in the `Authorization` header or as a cookie.

## Headers
- `Authorization: Bearer <token>` (or cookie named `token`)

## Success Response
```json
{
  "_id": "user_id_here",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "SocketId": null
}
```

## Error Response
- **401 Unauthorized**
```json
{
  "message": "Unauthorized"
}
```

---

# User Logout Endpoint

## Endpoint
`GET /users/logout`

## Description
Logs out the authenticated user by blacklisting the current JWT token and clearing the authentication cookie.

## Headers
- `Authorization: Bearer <token>` (or cookie named `token`)

## Success Response
```json
{
  "message": "Logged out successfully"
}
```

## Error Response
- **401 Unauthorized**
```json
{
  "message": "Unauthorized"
}
```

