# Authentication System Setup & Testing Guide

## ✅ Implementation Complete

A complete JWT-based authentication system has been implemented for both backend (Spring Boot) and frontend (Angular).

## 🔐 Backend Implementation

### Components Created

1. **Security Dependencies** (`build.gradle`)
   - Spring Security
   - JWT (JJWT 0.12.5)

2. **Database Entities**
   - `User` entity with username, email, password (BCrypt hashed), role, timestamps
   - `UserRepository` with query methods

3. **Security Layer**
   - `JwtUtil` - JWT token generation and validation
   - `JwtAuthenticationFilter` - Request interceptor for JWT validation
   - `CustomUserDetailsService` - User loading service
   - `SecurityConfig` - Spring Security configuration

4. **DTOs**
   - `RegisterRequest` - Registration input with validation
   - `LoginRequest` - Login input with validation
   - `AuthResponse` - Authentication response with token and user info

5. **Business Logic**
   - `AuthService` - Registration and login with password encryption
   - `AuthController` - REST endpoints

6. **Configuration**
   - JWT secret and 24-hour expiration in `application.properties`
   - CORS configured for localhost:4200

### API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/test` - Test endpoint (public)

## 🎨 Frontend Implementation

### Components Created

1. **Auth Models** (`interface/auth.models.ts`)
   - User, LoginRequest, RegisterRequest, AuthResponse interfaces

2. **Auth Service** (`services/auth.service.ts`)
   - Login, register, logout methods
   - Token management with localStorage
   - User state management with BehaviorSubject
   - SSR-safe (checks for browser platform)

3. **Auth Guard** (`guards/auth.guard.ts`)
   - Protects dashboard routes
   - Redirects to login if not authenticated

4. **Auth Interceptor** (`interceptors/auth.interceptor.ts`)
   - Automatically adds JWT token to API requests

5. **Components**
   - Updated `LoginComponent` - Uses AuthService for login
   - New `RegisterComponent` - User registration form
   - Updated `DashboardComponent` - Uses AuthService for logout

6. **Routing**
   - Auth guard applied to dashboard routes
   - Register route added

## 🚀 How to Test

### Step 1: Start the Backend

```powershell
# Navigate to backend directory
cd D:\BMDInfo\BMDInfo-server

# Make sure Java 21 is installed and JAVA_HOME is set correctly
# Build the project
./gradlew build

# Run the backend
./gradlew bootRun
```

Backend will start on: `http://localhost:8080`

### Step 2: Start the Frontend

```powershell
# Open a new terminal
# Navigate to frontend directory
cd D:\BMDInfo\BMDInfo-client

# Install dependencies (if not already done)
npm install

# Start the development server
ng serve

# Or with specific port
ng serve --port 4200
```

Frontend will start on: `http://localhost:4200`

### Step 3: Test the Flow

#### A. Register a New User

1. Open browser: `http://localhost:4200/register`
2. Fill in the registration form:
   - Username: `testuser` (min 3 characters)
   - Email: `test@example.com`
   - Password: `password123` (min 6 characters)
3. Click "Sign Up"
4. You should be automatically logged in and redirected to dashboard

#### B. Login with Existing User

1. Open browser: `http://localhost:4200/login`
2. Fill in login form:
   - Username: `testuser`
   - Password: `password123`
3. Click "Sign In"
4. You should be redirected to dashboard

#### C. Test Protected Routes

1. Try accessing dashboard directly: `http://localhost:4200/dashboard`
2. If not logged in, you'll be redirected to login page
3. After login, you can access dashboard

#### D. Test Logout

1. When in dashboard, click "Logout" button in sidebar
2. You should be redirected to login page
3. Token and user data will be cleared from localStorage

### Step 4: Verify Backend

You can test the backend directly using curl or Postman:

#### Register

```powershell
curl -X POST http://localhost:8080/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{\"username\":\"john\",\"email\":\"john@example.com\",\"password\":\"password123\"}'
```

#### Login

```powershell
curl -X POST http://localhost:8080/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{\"username\":\"john\",\"password\":\"password123\"}'
```

#### Test Protected Endpoint

```powershell
# Get the token from login response
curl -X GET http://localhost:8080/api/bid-tracker-sheets `
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## 🔍 Troubleshooting

### Backend Issues

1. **Port 8080 already in use**
   - Change port in `application.properties`: `server.port=8081`
   - Update frontend baseUrl in `auth.service.ts`

2. **Database connection error**
   - Ensure SQL Server is running
   - Check database credentials in `application.properties`

3. **JWT secret error**
   - The JWT secret in `application.properties` is base64 encoded
   - Don't change it unless you know what you're doing

### Frontend Issues

1. **CORS error**
   - Backend SecurityConfig allows localhost:4200
   - If using different port, update CORS configuration

2. **localStorage errors during build**
   - Fixed with platform check in AuthService
   - Use `ng serve` for development instead of build

3. **401 Unauthorized on API calls**
   - Check if token is being sent in request headers
   - Token might be expired (24 hour expiration)
   - Try logging in again

## 📝 Notes

- **Default Role**: New users get `ROLE_USER` by default
- **Token Expiration**: 24 hours (86400000 ms)
- **Password Encryption**: BCrypt with default strength
- **Session**: Stateless (JWT-based)
- **CORS**: Configured for localhost:4200 and localhost:3000

## 🔒 Security Features

✅ Password encryption with BCrypt
✅ JWT token-based authentication
✅ Token expiration handling
✅ Protected routes with Auth Guard
✅ Automatic token inclusion in API requests
✅ Secure session management
✅ CORS configuration
✅ Input validation on both frontend and backend

## 🎯 Next Steps

1. Add "Forgot Password" functionality
2. Implement email verification
3. Add refresh token mechanism
4. Implement role-based access control in UI
5. Add user profile management
6. Implement password change feature
7. Add social login (Google, Facebook, etc.)
8. Implement rate limiting on auth endpoints

## ✨ Features Working

- ✅ User Registration
- ✅ User Login
- ✅ JWT Token Generation
- ✅ Token Validation
- ✅ Route Protection
- ✅ Automatic Token Refresh in Headers
- ✅ User Logout
- ✅ Persistent Login (localStorage)
- ✅ SSR-Safe Implementation

Enjoy your secure authentication system! 🎉
