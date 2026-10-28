# Noor Academy Admin Panel - Complete Documentation

## 📋 Project Overview

Complete full-stack admin panel system for managing an educational website with React.js frontend, Node.js/Express backend, and MongoDB database.

### Features Implemented:

✅ **Admin Authentication** - Secure login/registration system
✅ **Courses Management** - Full CRUD operations for courses
✅ **Events Management** - Create and manage academy events
✅ **Students Management** - Manage student records and enrollment
✅ **Teachers Management** - Add and manage teacher profiles
✅ **Achievements/Scholarships** - Track student achievements and scholarships
✅ **Dashboard** - Real-time statistics and analytics
✅ **Responsive Design** - Mobile-friendly UI with Tailwind CSS
✅ **MongoDB Database** - Persistent data storage
✅ **REST APIs** - Complete API endpoints for all operations

---

## 🛠️ Technology Stack

### Frontend
- React.js (v19.1.1)
- React Router v7 (for navigation)
- Tailwind CSS (styling)
- Fetch API (HTTP requests)

### Backend
- Node.js with Express.js
- MongoDB & Mongoose
- JWT (JSON Web Tokens) for authentication
- Bcrypt for password hashing
- CORS for cross-origin requests

### Database
- MongoDB (Local or Cloud)

---

## 📁 Project Structure

```
noor-academy-project/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── models/
│   │   ├── Admin.js              # Admin schema
│   │   ├── Course.js             # Course schema
│   │   ├── Event.js              # Event schema
│   │   ├── Student.js            # Student schema
│   │   ├── Teacher.js            # Teacher schema
│   │   └── Achievement.js        # Achievement schema
│   ├── controllers/
│   │   ├── adminController.js    # Admin auth logic
│   │   ├── courseController.js   # Course CRUD
│   │   ├── eventController.js    # Event CRUD
│   │   ├── studentController.js  # Student CRUD
│   │   ├── teacherController.js  # Teacher CRUD
│   │   ├── achievementController.js # Achievement CRUD
│   │   └── dashboardController.js   # Dashboard stats
│   ├── routes/
│   │   ├── admin.js              # Auth routes
│   │   ├── courses.js            # Course routes
│   │   ├── events.js             # Event routes
│   │   ├── students.js           # Student routes
│   │   ├── teachers.js           # Teacher routes
│   │   ├── achievements.js       # Achievement routes
│   │   └── dashboard.js          # Dashboard routes
│   ├── middleware/
│   │   └── auth.js               # JWT authentication
│   ├── server.js                 # Express server setup
│   ├── package.json
│   ├── .env                      # Environment variables
│   └── .gitignore
│
├── src/
│   ├── admin/
│   │   ├── pages/
│   │   │   ├── AdminLogin.jsx          # Login page
│   │   │   ├── AdminRegister.jsx       # Registration page
│   │   │   ├── AdminDashboard.jsx      # Main dashboard
│   │   │   ├── CoursesManager.jsx      # Courses management
│   │   │   ├── EventsManager.jsx       # Events management
│   │   │   ├── StudentsManager.jsx     # Students management
│   │   │   ├── TeachersManager.jsx     # Teachers management
│   │   │   └── AchievementsManager.jsx # Achievements management
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx      # Route protection
│   │   ├── context/
│   │   │   └── AuthContext.jsx         # Auth state management
│   │   └── services/
│   │       └── api.js                  # API service layer
│   ├── App.jsx                   # Main app with routes
│   └── [other pages]
│
├── package.json
└── vite.config.js
```

---

## 🚀 Setup Instructions

### Step 1: Install MongoDB

#### Option A: Local MongoDB
```bash
# Download and install from https://www.mongodb.com/try/download/community
# Start MongoDB service
mongod
```

#### Option B: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get connection string

### Step 2: Setup Backend

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file and add:
MONGODB_URI=mongodb://localhost:27017/noor-academy
JWT_SECRET=your_secret_key_here_change_in_production
PORT=5000
NODE_ENV=development

# Start backend server
npm run dev
# Server will run on http://localhost:5000
```

### Step 3: Setup Frontend

```bash
# In the root directory
# Install dependencies (if not already installed)
npm install

# Update vite.config.js if needed for backend proxy
# Or the API service will call http://localhost:5000/api

# Start frontend development server
npm run dev
# Frontend will run on http://localhost:5173
```

---

## 🔐 Authentication Flow

### Admin Registration
1. Click "Register here" on login page
2. Fill in Name, Email, Password
3. Confirm password
4. System creates admin account with hashed password
5. JWT token generated and stored in localStorage
6. Redirected to dashboard

### Admin Login
1. Enter email and password
2. Credentials verified against database
3. Password compared using bcrypt
4. JWT token generated if valid
5. Token stored in localStorage for future requests
6. All admin routes protected by token

### Token Validation
- Every admin request includes `Authorization: Bearer <token>` header
- Backend verifies token validity
- Expired or invalid tokens result in 401 Unauthorized

---

## 📊 Database Schema

### Admin Schema
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (hashed, required),
  role: String (default: 'admin'),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### Course Schema
```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String (required),
  instructor: String (required),
  duration: String (required),
  fee: Number (required),
  image: String,
  level: String (Beginner/Intermediate/Advanced),
  maxStudents: Number (default: 30),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### Student Schema
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required),
  phone: String (required),
  course: ObjectId (ref: Course),
  photo: String,
  admissionDate: Date,
  address: String,
  parentContact: String,
  status: String (Active/Inactive/Graduated),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### Teacher Schema
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required),
  phone: String (required),
  photo: String,
  qualification: String (required),
  specialization: String (required),
  experience: Number (required),
  courses: [ObjectId] (ref: Course),
  address: String,
  joiningDate: Date,
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### Event Schema
```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String (required),
  date: Date (required),
  time: String (required),
  location: String (required),
  image: String,
  capacity: Number (default: 100),
  registeredCount: Number (default: 0),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### Achievement Schema
```javascript
{
  _id: ObjectId,
  studentName: String (required),
  email: String (required),
  photo: String,
  achievementTitle: String (required),
  description: String (required),
  marks: String,
  awardDate: Date (required),
  category: String (Scholarship/Achievement/Award/Recognition),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 📡 API Endpoints

### Admin Authentication
```
POST   /api/admin/register       # Register new admin
POST   /api/admin/login          # Admin login
GET    /api/admin/me             # Get current admin (protected)
```

### Courses Management
```
GET    /api/courses              # Get all courses
GET    /api/courses/:id          # Get single course
POST   /api/courses              # Create course (protected)
PUT    /api/courses/:id          # Update course (protected)
DELETE /api/courses/:id          # Delete course (protected)
```

### Events Management
```
GET    /api/events               # Get all events
GET    /api/events/:id           # Get single event
POST   /api/events               # Create event (protected)
PUT    /api/events/:id           # Update event (protected)
DELETE /api/events/:id           # Delete event (protected)
```

### Students Management
```
GET    /api/students             # Get all students
GET    /api/students/:id         # Get single student
POST   /api/students             # Create student (protected)
PUT    /api/students/:id         # Update student (protected)
DELETE /api/students/:id         # Delete student (protected)
```

### Teachers Management
```
GET    /api/teachers             # Get all teachers
GET    /api/teachers/:id         # Get single teacher
POST   /api/teachers             # Create teacher (protected)
PUT    /api/teachers/:id         # Update teacher (protected)
DELETE /api/teachers/:id         # Delete teacher (protected)
```

### Achievements Management
```
GET    /api/achievements         # Get all achievements
GET    /api/achievements/:id     # Get single achievement
POST   /api/achievements         # Create achievement (protected)
PUT    /api/achievements/:id     # Update achievement (protected)
DELETE /api/achievements/:id     # Delete achievement (protected)
```

### Dashboard
```
GET    /api/dashboard/stats      # Get dashboard statistics (protected)
GET    /api/dashboard/recent     # Get recent activities (protected)
```

---

## 🎯 Using the Admin Panel

### Access Admin Panel
```
Frontend: http://localhost:3000/admin/login
Backend: http://localhost:5000
```

### First Time Setup
1. Go to `/admin/register`
2. Create admin account
3. Login with credentials
4. Access dashboard at `/admin/dashboard`

### Dashboard Features
- **Statistics Cards**: Show total courses, students, teachers, events, achievements
- **Management Panels**: Quick access to all management pages
- **User Info**: Display current admin name and email
- **Logout**: Secure logout button

### Managing Courses
1. Navigate to Courses Management
2. Click "+ Add New Course"
3. Fill in course details (title, instructor, duration, fee, etc.)
4. Click "Create Course"
5. View courses in grid layout
6. Edit or delete courses using buttons

### Managing Events
1. Navigate to Events Management
2. Click "+ Add New Event"
3. Fill in event details (title, date, time, location, capacity)
4. Click "Create Event"
5. View events in card layout
6. Edit or delete events

### Managing Students
1. Navigate to Students Management
2. Click "+ Add New Student"
3. Select course from dropdown
4. Fill in student information
5. Click "Create Student"
6. View all students in table format
7. Edit or delete student records

### Managing Teachers
1. Navigate to Teachers Management
2. Click "+ Add New Teacher"
3. Fill in teacher qualifications and experience
4. Click "Create Teacher"
5. View teachers in grid layout
6. Edit or delete teacher profiles

### Managing Achievements
1. Navigate to Achievements Management
2. Click "+ Add New Achievement"
3. Select category (Scholarship/Achievement/Award/Recognition)
4. Enter student details and achievement info
5. Click "Create Achievement"
6. View achievements in card format

---

## 🔒 Security Features

✅ **Password Hashing**: Bcrypt with salt rounds
✅ **JWT Authentication**: Secure token-based auth
✅ **Protected Routes**: Only logged-in admins can access admin pages
✅ **CORS Protection**: Cross-origin requests validated
✅ **Input Validation**: All inputs validated before processing
✅ **Error Handling**: Comprehensive error messages
✅ **Token Expiration**: Tokens expire after 30 days
✅ **Secure Headers**: CORS, content-type validation

---

## 🛠️ Troubleshooting

### Issue: MongoDB Connection Failed
**Solution**: Ensure MongoDB service is running or check connection string in .env

### Issue: Backend not connecting
**Solution**: Check if backend is running on http://localhost:5000 and CORS is enabled

### Issue: Admin login not working
**Solution**: Verify admin account exists in database and password is correct

### Issue: Forms not submitting
**Solution**: Check browser console for errors, ensure backend is receiving requests

### Issue: Images not displaying
**Solution**: Use valid image URLs, check CORS settings for external images

---

## 📚 Frontend File Descriptions

### AdminLogin.jsx
- Beautiful login page with gradient background
- Email and password validation
- Error message display
- Register link navigation

### AdminRegister.jsx
- Admin registration form
- Password confirmation validation
- Secure password hashing on backend
- Auto-login after registration

### AdminDashboard.jsx
- Main dashboard with statistics
- 5 stat cards showing totals
- Quick access cards for all management panels
- Logout functionality

### CoursesManager.jsx
- Full CRUD interface for courses
- Form with all course fields
- Grid display of courses
- Edit and delete functionality

### EventsManager.jsx
- Event management interface
- Date and time selection
- Event list with all details
- Quick edit/delete buttons

### StudentsManager.jsx
- Student records management
- Course selection dropdown
- Table view of students
- Status tracking (Active/Inactive/Graduated)

### TeachersManager.jsx
- Teacher profile management
- Qualification and experience tracking
- Photo upload support
- Course assignment capability

### AchievementsManager.jsx
- Achievement/Scholarship tracking
- Multiple categories support
- Date and marks recording
- Student recognition display

### AuthContext.jsx
- Global authentication state
- Login/Logout functionality
- Token management
- Auto-login on app load

### ProtectedRoute.jsx
- Route protection middleware
- Redirect unauthenticated users
- Loading state handling

### api.js
- Centralized API service
- All CRUD operations
- Token-based requests
- Error handling

---

## 🎨 UI/UX Features

- **Responsive Design**: Works on mobile, tablet, desktop
- **Color-Coded Sections**: Each module has unique color theme
- **Consistent Layout**: Uniform design across all pages
- **User-Friendly Forms**: Clear labels and placeholder text
- **Toast Notifications**: Alert messages for user actions
- **Loading States**: Visual feedback during operations
- **Card-Based Design**: Modern card layouts for data display
- **Table Views**: Organized tabular data presentation
- **Modal Forms**: Inline forms for quick actions
- **Navigation**: Easy access to all sections

---

## 📱 Features Checklist

- [x] Admin Registration/Login
- [x] JWT Authentication
- [x] Courses CRUD
- [x] Events CRUD
- [x] Students CRUD
- [x] Teachers CRUD
- [x] Achievements CRUD
- [x] Dashboard with Statistics
- [x] Protected Routes
- [x] Responsive Design
- [x] MongoDB Integration
- [x] REST API
- [x] Error Handling
- [x] Form Validation
- [x] Image Support
- [x] Date/Time Selection

---

## 🚀 Production Deployment

### Before Deploying:
1. Update JWT_SECRET in .env
2. Use MongoDB Atlas instead of local MongoDB
3. Update API_URL in frontend for production
4. Set NODE_ENV=production
5. Enable HTTPS
6. Set secure cookies
7. Update CORS allowed origins

### Deploy Backend (e.g., Heroku, Railway, Render)
```bash
# Push to git repository
git add .
git commit -m "Initial commit"
git push heroku main

# Or use hosting platform UI to connect repository
```

### Deploy Frontend (e.g., Vercel, Netlify)
```bash
# Build for production
npm run build

# Deploy build folder to Vercel/Netlify/GitHub Pages
```

---

## 📞 Support & Questions

For issues or questions:
1. Check the troubleshooting section
2. Review API endpoint documentation
3. Verify database connection
4. Check browser console for errors
5. Ensure all dependencies are installed

---

## 📄 License

This project is for educational purposes.

---

**Last Updated**: 2024
**Version**: 1.0.0
