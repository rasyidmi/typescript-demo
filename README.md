**List Endpoint** <br>
**Auth** <br>
- **Login (POST)** <br>
  localhost:3000/api/v1/auth/login <br>
  **payload (JSON):** username, password
- **Refresh (POST)** <br>
  localhost:3000/api/v1/auth/refresh <br>
  **header:** bearer refresh token

**User** <br>
- **Register (POST)** <br>
  localhost:3000/api/v1/user/register <br>
  **payload (JSON):** username, password, role (1: admin, 2: user)
- **Change password (PUT)** <br>
  localhost:3000/api/v1/user/change-password <br>
  **payload (JSON):** username, oldPassword, newPassword <br>
  **header:** bearer access token
- **Admin Only (GET)** <br>
  localhost:3000/api/v1/user/admin-only <br>
  **header:** bearer access token
