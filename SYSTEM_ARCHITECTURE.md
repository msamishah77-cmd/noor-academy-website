# 🏗️ Noor Academy Admin Panel - System Architecture

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     ADMIN PANEL SYSTEM                          │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────┐           ┌──────────────────────┐
│   FRONTEND (React)   │           │   BACKEND (Node.js)  │
│                      │           │                      │
│  ┌────────────────┐  │  HTTP     │  ┌────────────────┐  │
│  │  Login Page    │  │◄─────────►│  │  Admin Routes  │  │
│  │  Register      │  │           │  │  /api/admin    │  │
│  └────────────────┘  │           │  └────────────────┘  │
│                      │           │                      │
│  ┌────────────────┐  │           │  ┌────────────────┐  │
│  │  Dashboard     │  │           │  │  Course Routes │  │
│  │  Statistics    │  │  JWT Auth │  │  /api/courses  │  │
│  └────────────────┘  │◄─────────►│  └────────────────┘  │
│                      │   Token   │                      │
│  ┌────────────────┐  │  Headers  │  ┌────────────────┐  │
│  │  Courses Mgmt  │  │           │  │  Student Routes│  │
│  │  Add/Edit      │  │           │  │  /api/students │  │
│  └────────────────┘  │           │  └────────────────┘  │
│                      │           │                      │
│  ┌────────────────┐  │           │  ┌────────────────┐  │
│  │  Events Mgmt   │  │           │  │  Teacher Routes│  │
│  │  Add/Edit      │  │           │  │  /api/teachers │  │
│  └────────────────┘  │           │  └────────────────┘  │
│                      │           │                      │
│  ┌────────────────┐  │           │  ┌────────────────┐  │
│  │  Students Mgmt │  │           │  │  Event Routes  │  │
│  │  Add/Edit      │  │           │  │  /api/events   │  │
│  └────────────────┘  │           │  └────────────────┘  │
│                      │           │                      │
│  ┌────────────────┐  │           │  ┌────────────────┐  │
│  │  Teachers Mgmt │  │           │  │Achievement Rts │  │
│  │  Add/Edit      │  │           │  │/api/achievements│ │
│  └────────────────┘  │           │  └────────────────┘  │
│                      │           │                      │
│  ┌────────────────┐  │           │  ┌────────────────┐  │
│  │Achievements    │  │           │  │ Dashboard Rts  │  │
│  │  Add/Edit      │  │           │  │  /api/dashboard│  │
│  └────────────────┘  │           │  └────────────────┘  │
│                      │           │                      │
│ Context: AuthContext │           │ Middleware: Auth   │
│ Service: api.js      │           │ Validation         │
└──────────────────────┘           └──────────────────────┘
         │                                    │
         │                                    │
         │              ┌────────────────────┘
         │              │
         └──────────────┤
                        │
              ┌─────────▼──────────┐
              │   MONGODB DATABASE │
              │                    │
              │  Collections:      │
              │  • admins          │
              │  • courses         │
              │  • events          │
              │  • students        │
              │  • teachers        │
              │  • achievements    │
              └────────────────────┘
```

---

## Data Flow Diagram

```
USER INTERACTION FLOW:

1. USER LOGS IN
   │
   ├─► Frontend: AdminLogin Component
   │   ├─► Enter Email & Password
   │   ├─► Call: adminAPI.login()
   │   └─► Send POST /api/admin/login
   │
   └─► Backend: adminController.loginAdmin()
       ├─► Validate Email exists
       ├─► Compare Password (bcrypt)
       ├─► Generate JWT Token
       └─► Return Token
       │
       └─► Frontend: Store Token in localStorage
           │
           └─► Redirect to Dashboard
               └─► Dashboard loads with statistics


2. ADD NEW COURSE
   │
   ├─► Frontend: CoursesManager Component
   │   ├─► Fill Course Form
   │   ├─► Click "Create Course"
   │   ├─► Call: courseAPI.create(formData)
   │   └─► Send POST /api/courses with Token
   │
   └─► Backend: courseController.createCourse()
       ├─► Validate Authorization (Token Check)
       ├─► Validate Course Data
       ├─► Create Course Document
       ├─► Save to MongoDB
       └─► Return Course Data
       │
       └─► Frontend: Show Success Message
           │
           └─► Refresh Courses List
               └─► Fetch all courses
                   └─► Display in Grid


3. EDIT STUDENT
   │
   ├─► Frontend: StudentsManager Component
   │   ├─► Click Edit Button on Student
   │   ├─► Load Student Data in Form
   │   ├─► Modify Fields
   │   ├─► Click "Update Student"
   │   ├─► Call: studentAPI.update(id, formData)
   │   └─► Send PUT /api/students/:id with Token
   │
   └─► Backend: studentController.updateStudent()
       ├─► Verify Authorization
       ├─► Find Student by ID
       ├─► Update Fields
       ├─► Save Changes
       └─► Return Updated Student
       │
       └─► Frontend: Show Success Message
           │
           └─► Refresh Students List


4. DELETE EVENT
   │
   ├─► Frontend: EventsManager Component
   │   ├─► Click Delete Button
   │   ├─► Confirm Dialog
   │   ├─► Call: eventAPI.delete(id)
   │   └─► Send DELETE /api/events/:id with Token
   │
   └─► Backend: eventController.deleteEvent()
       ├─► Verify Authorization
       ├─► Find Event by ID
       ├─► Set isActive = false (Soft Delete)
       └─► Return Success
       │
       └─► Frontend: Show Success Message
           │
           └─► Refresh Events List


5. VIEW DASHBOARD STATS
   │
   ├─► Frontend: AdminDashboard Component
   │   ├─► Component Mounts
   │   ├─► Call: dashboardAPI.getStats()
   │   └─► Send GET /api/dashboard/stats with Token
   │
   └─► Backend: dashboardController.getDashboardStats()
       ├─► Verify Authorization
       ├─► Count Courses (isActive=true)
       ├─► Count Students (isActive=true)
       ├─► Count Teachers (isActive=true)
       ├─► Count Events (isActive=true)
       ├─► Count Achievements (isActive=true)
       └─► Return Statistics
       │
       └─► Frontend: Display in Stat Cards
           └─► Show Real-time Numbers
```

---

## Component Hierarchy

```
App.jsx (Root)
│
├─ AuthProvider (Context)
│  │
│  ├─ AdminLogin
│  │  ├─ Form
│  │  └─ useAuth Hook
│  │
│  ├─ AdminRegister
│  │  ├─ Form
│  │  └─ useAuth Hook
│  │
│  └─ ProtectedRoute
│     ├─ AdminDashboard
│     │  └─ StatCard Components
│     │
│     ├─ CoursesManager
│     │  ├─ Form Component
│     │  └─ CourseCard Components
│     │
│     ├─ EventsManager
│     │  ├─ Form Component
│     │  └─ EventCard Components
│     │
│     ├─ StudentsManager
│     │  ├─ Form Component
│     │  └─ StudentsTable Component
│     │
│     ├─ TeachersManager
│     │  ├─ Form Component
│     │  └─ TeacherCard Components
│     │
│     └─ AchievementsManager
│        ├─ Form Component
│        └─ AchievementCard Components
```

---

## Authentication Flow

```
┌──────────────────────────────────────────────────────────┐
│         AUTHENTICATION & AUTHORIZATION FLOW               │
└──────────────────────────────────────────────────────────┘

STEP 1: REGISTRATION
┌─────────────────────────────────────────────────────────┐
│ User enters:                                             │
│ • Name: "Admin Name"                                     │
│ • Email: "admin@noor.com"                                │
│ • Password: "password123"                                │
└─────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────┐
│ Backend - adminController.registerAdmin()               │
│ 1. Validate Email doesn't exist                          │
│ 2. Hash Password with Bcrypt (salt: 10)                 │
│ 3. Create Admin Document                                 │
│ 4. Save to MongoDB                                       │
│ 5. Generate JWT Token (exp: 30d)                         │
│ 6. Send Token & Admin Data                               │
└─────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────┐
│ Frontend - AdminRegister Component                       │
│ 1. Receive Token from Backend                            │
│ 2. Store Token in localStorage                           │
│ 3. Update Auth Context                                   │
│ 4. Redirect to Dashboard                                 │
└─────────────────────────────────────────────────────────┘

STEP 2: LOGIN
┌─────────────────────────────────────────────────────────┐
│ User enters:                                             │
│ • Email: "admin@noor.com"                                │
│ • Password: "password123"                                │
└─────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────┐
│ Backend - adminController.loginAdmin()                  │
│ 1. Find Admin by Email                                   │
│ 2. Retrieve Hashed Password                              │
│ 3. Compare Password with Bcrypt                          │
│ 4. If Match: Generate JWT Token                          │
│ 5. Send Token & Admin Data                               │
└─────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────┐
│ Frontend - AdminLogin Component                          │
│ 1. Receive Token from Backend                            │
│ 2. Store Token in localStorage                           │
│ 3. Update Auth Context                                   │
│ 4. Redirect to Dashboard                                 │
└─────────────────────────────────────────────────────────┘

STEP 3: AUTHENTICATED REQUESTS
┌─────────────────────────────────────────────────────────┐
│ Frontend API Call                                        │
│ Headers: {                                               │
│   "Authorization": "Bearer eyJhbGc..."                   │
│   "Content-Type": "application/json"                     │
│ }                                                        │
└─────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────┐
│ Backend - auth.js Middleware                             │
│ 1. Extract Token from Headers                            │
│ 2. Verify Token Signature                                │
│ 3. Check Token Expiration                                │
│ 4. If Valid: Continue to Route Handler                   │
│ 5. If Invalid: Return 401 Unauthorized                   │
└─────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────┐
│ Backend - Route Handler                                  │
│ 1. Process Request (Create/Read/Update/Delete)          │
│ 2. Save/Update Database                                  │
│ 3. Return Response                                       │
└─────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────┐
│ Frontend - Update UI                                     │
│ 1. Show Success Message                                  │
│ 2. Refresh Data                                          │
│ 3. Update Components                                     │
└─────────────────────────────────────────────────────────┘

STEP 4: LOGOUT
┌─────────────────────────────────────────────────────────┐
│ User clicks "Logout"                                     │
│ 1. Clear localStorage (Token)                            │
│ 2. Clear Auth Context                                    │
│ 3. Redirect to Login Page                                │
└─────────────────────────────────────────────────────────┘
```

---

## Database Relationship Diagram

```
┌─────────────┐
│   ADMIN     │
├─────────────┤
│ _id         │
│ name        │
│ email       │
│ password    │
│ role        │
│ isActive    │
│ timestamps  │
└─────────────┘
       │
       │ Creates
       └──────────────────┐
                          │
                    ┌─────▼──────┐
                    │  COURSES   │
                    ├────────────┤
                    │ _id        │
                    │ title      │
                    │ instructor │
                    │ duration   │
                    │ fee        │
                    │ level      │
                    │ isActive   │
                    │ timestamps │
                    └────────┬───┘
                             │
                    ┌────────┴────────┐
                    │                 │
              ┌─────▼────────┐   ┌────▼──────────┐
              │  STUDENTS    │   │   TEACHERS    │
              ├──────────────┤   ├───────────────┤
              │ _id          │   │ _id           │
              │ name         │   │ name          │
              │ email        │   │ email         │
              │ phone        │   │ phone         │
              │ course_id ──┐│   │ qualification │
              │ (Foreign)  │└──► │ specialization│
              │ photo      │     │ experience    │
              │ status     │   ┌─│ courses_ids[]│
              │ isActive   │   │ │ (Foreign)    │
              │ timestamps │   │ │ isActive     │
              └────────────┘   │ │ timestamps   │
                               │ └──────────────┘
                               │
                               └──► Teaches courses
                                    (many-to-many)

              ┌──────────────┐   ┌─────────────┐
              │   EVENTS     │   │ACHIEVEMENTS │
              ├──────────────┤   ├─────────────┤
              │ _id          │   │ _id         │
              │ title        │   │ studentName │
              │ description  │   │ email       │
              │ date         │   │ photo       │
              │ time         │   │ title       │
              │ location     │   │ description │
              │ capacity     │   │ marks       │
              │ isActive     │   │ awardDate   │
              │ timestamps   │   │ category    │
              └──────────────┘   │ isActive    │
                                 │ timestamps  │
                                 └─────────────┘

KEY RELATIONSHIPS:
→ COURSES referenced by STUDENTS (Many Students → 1 Course)
→ COURSES referenced by TEACHERS (Many Teachers → Many Courses)
→ All created/managed by ADMIN
→ All have: _id, isActive, timestamps
```

---

## File Organization

```
PROJECT ROOT
│
├── backend/                    (Express Server & API)
│  ├── config/
│  │  └── db.js                 (MongoDB Connection)
│  ├── models/                  (Database Schemas)
│  │  ├── Admin.js
│  │  ├── Course.js
│  │  ├── Event.js
│  │  ├── Student.js
│  │  ├── Teacher.js
│  │  └── Achievement.js
│  ├── controllers/             (Business Logic)
│  │  ├── adminController.js
│  │  ├── courseController.js
│  │  ├── eventController.js
│  │  ├── studentController.js
│  │  ├── teacherController.js
│  │  ├── achievementController.js
│  │  └── dashboardController.js
│  ├── routes/                  (API Routes)
│  │  ├── admin.js
│  │  ├── courses.js
│  │  ├── events.js
│  │  ├── students.js
│  │  ├── teachers.js
│  │  ├── achievements.js
│  │  └── dashboard.js
│  ├── middleware/              (Custom Middleware)
│  │  └── auth.js               (JWT Verification)
│  ├── server.js                (Express App Setup)
│  ├── package.json
│  ├── .env
│  ├── .env.example
│  └── .gitignore
│
├── src/                        (React Frontend)
│  ├── admin/
│  │  ├── pages/                (Page Components)
│  │  │  ├── AdminLogin.jsx
│  │  │  ├── AdminRegister.jsx
│  │  │  ├── AdminDashboard.jsx
│  │  │  ├── CoursesManager.jsx
│  │  │  ├── EventsManager.jsx
│  │  │  ├── StudentsManager.jsx
│  │  │  ├── TeachersManager.jsx
│  │  │  └── AchievementsManager.jsx
│  │  ├── components/           (Reusable Components)
│  │  │  └── ProtectedRoute.jsx
│  │  ├── context/              (State Management)
│  │  │  └── AuthContext.jsx
│  │  └── services/             (API Calls)
│  │     └── api.js
│  ├── App.jsx                  (Main App)
│  ├── [Other Pages]
│  └── main.jsx
│
├── Documentation/
│  ├── ADMIN_PANEL_SETUP.md
│  ├── QUICK_START.md
│  ├── API_TESTING_GUIDE.md
│  ├── PROJECT_COMPLETION_SUMMARY.md
│  └── SYSTEM_ARCHITECTURE.md (This file)
│
└── package.json                (Frontend Dependencies)
```

---

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│              PRODUCTION DEPLOYMENT                      │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│         FRONTEND DEPLOYMENT (Vercel/Netlify)            │
│  • Automatic builds from GitHub                         │
│  • HTTPS enabled                                        │
│  • CDN distribution                                     │
│  • Environment variables set                            │
│  • Build: npm run build → dist/                         │
│  • Deploy: Upload dist folder                           │
└─────────────────────────────────────────────────────────┘
                         │
                         │ HTTPS
                         │
┌─────────────────────────────────────────────────────────┐
│          BACKEND DEPLOYMENT (Heroku/Railway)            │
│  • Node.js environment                                  │
│  • MongoDB connection (Atlas)                           │
│  • Environment variables:                               │
│    - MONGODB_URI (Production DB)                        │
│    - JWT_SECRET (Strong key)                            │
│    - NODE_ENV=production                                │
│  • Port: Dynamic (process.env.PORT)                    │
│  • Auto-restart on crash                               │
└─────────────────────────────────────────────────────────┘
                         │
                         │ Connection
                         │
┌─────────────────────────────────────────────────────────┐
│       DATABASE DEPLOYMENT (MongoDB Atlas Cloud)         │
│  • Hosted MongoDB                                       │
│  • Auto backups                                         │
│  • SSL encryption                                       │
│  • IP Whitelisting                                      │
│  • Connection string protected                          │
└─────────────────────────────────────────────────────────┘
```

---

## Technology Stack Summary

```
┌─────────────────────────────────────────────────────────┐
│              TECHNOLOGY STACK                           │
└─────────────────────────────────────────────────────────┘

FRONTEND LAYER
├─ React 19.1.1              (UI Framework)
├─ React Router v7           (Navigation)
├─ Tailwind CSS 4.1.13       (Styling)
├─ Context API               (State Management)
└─ Fetch API                 (HTTP Requests)

BACKEND LAYER
├─ Node.js                   (Runtime)
├─ Express.js 4.18.2         (Web Framework)
├─ JWT 9.1.2                 (Authentication)
├─ Bcrypt 5.1.1              (Password Hashing)
├─ CORS 2.8.5                (Cross-Origin Requests)
├─ Dotenv 16.3.1             (Environment Variables)
└─ Multer 1.4.5              (File Upload)

DATABASE LAYER
├─ MongoDB 8.0+              (NoSQL Database)
├─ Mongoose 8.0.0            (ODM)
└─ MongoDB Atlas             (Cloud Option)

DEVELOPMENT TOOLS
├─ Vite                      (Frontend Build)
├─ ESLint                    (Code Quality)
├─ Postman                   (API Testing)
└─ MongoDB Compass           (Database GUI)
```

---

## Security Architecture

```
┌──────────────────────────────────────────────────────────┐
│               SECURITY LAYERS                            │
└──────────────────────────────────────────────────────────┘

1. TRANSPORT LAYER
   ├─ HTTPS/TLS Encryption
   ├─ Secure Headers
   └─ CORS Validation

2. AUTHENTICATION LAYER
   ├─ JWT Tokens
   ├─ Token Expiration (30 days)
   ├─ Refresh Token Strategy (Optional)
   └─ Secure Token Storage

3. PASSWORD LAYER
   ├─ Bcrypt Hashing (10 salt rounds)
   ├─ Minimum 6 characters
   ├─ Never stored in plain text
   └─ Password comparison on login

4. AUTHORIZATION LAYER
   ├─ Protected Routes
   ├─ Admin-only endpoints
   ├─ Role-based access
   └─ Token verification middleware

5. DATA LAYER
   ├─ Input Validation
   ├─ SQL Injection Prevention
   ├─ XSS Protection
   └─ CSRF Protection (optional)

6. ERROR LAYER
   ├─ Secure Error Messages
   ├─ No sensitive data exposed
   ├─ Logging & Monitoring
   └─ Rate Limiting (optional)
```

---

**This architecture provides a scalable, secure, and professional admin panel system for managing an educational institution.**

For detailed setup: See `QUICK_START.md`
For API details: See `API_TESTING_GUIDE.md`
For full documentation: See `ADMIN_PANEL_SETUP.md`
