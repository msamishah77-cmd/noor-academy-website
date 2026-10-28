# ⚡ Noor Academy Admin Panel - Quick Reference Guide

## 🎯 5-Minute Quick Start

### Step 1: Setup Backend (2 min)
```bash
cd backend
npm install
```
Then create `.env` file with:
```
MONGODB_URI=mongodb://localhost:27017/noor-academy
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development
```

### Step 2: Start Backend (1 min)
```bash
cd backend
npm run dev
# Should show: Server running on port 5000
```

### Step 3: Start Frontend (2 min)
```bash
# In new terminal, in root directory
npm run dev
# Should show: Local: http://localhost:5173/
```

### Step 4: Create Account
- Go to http://localhost:5173/admin/register
- Fill in name, email, password
- Click "Create Account"
- Done! 🎉

---

## 📱 URL Reference

### Admin Panel URLs
| Page | URL | Purpose |
|------|-----|---------|
| Register | http://localhost:5173/admin/register | Create new admin |
| Login | http://localhost:5173/admin/login | Login to panel |
| Dashboard | http://localhost:5173/admin/dashboard | Main stats page |
| Courses | http://localhost:5173/admin/courses | Manage courses |
| Events | http://localhost:5173/admin/events | Manage events |
| Students | http://localhost:5173/admin/students | Manage students |
| Teachers | http://localhost:5173/admin/teachers | Manage teachers |
| Achievements | http://localhost:5173/admin/achievements | Manage scholarships |

### API Endpoints
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | /api/admin/register | Create admin |
| POST | /api/admin/login | Login |
| GET | /api/admin/me | Get current admin |
| GET | /api/courses | List courses |
| POST | /api/courses | Create course |
| PUT | /api/courses/:id | Update course |
| DELETE | /api/courses/:id | Delete course |
| GET | /api/events | List events |
| POST | /api/events | Create event |
| GET | /api/students | List students |
| POST | /api/students | Create student |
| GET | /api/teachers | List teachers |
| POST | /api/teachers | Create teacher |
| GET | /api/achievements | List achievements |
| POST | /api/achievements | Create achievement |
| GET | /api/dashboard/stats | Get statistics |

---

## 🛠️ Common Commands

### Backend Commands
```bash
# Start development server
cd backend && npm run dev

# Start production server
cd backend && npm start

# Install dependencies
cd backend && npm install

# Run specific tests
cd backend && npm test

# Check for updates
cd backend && npm outdated

# Update packages
cd backend && npm update
```

### Frontend Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview build
npm run preview

# Run linting
npm run lint

# Install dependencies
npm install

# Update packages
npm update
```

### Database Commands (MongoDB)
```bash
# Connect to local MongoDB
mongo

# Show databases
show dbs

# Use specific database
use noor-academy

# Show collections
show collections

# Count documents
db.courses.count()

# Find all documents
db.courses.find()

# Find one document
db.courses.findOne({_id: ObjectId("...")})

# Delete document
db.courses.deleteOne({_id: ObjectId("...")})

# Update document
db.courses.updateOne({_id: ObjectId("...")}, {$set: {title: "New Title"}})
```

---

## 🔐 Default Test Credentials

After registration, use these credentials:
```
Email: admin@noor.com
Password: admin123
Name: Admin User
```

**⚠️ Change these in production!**

---

## 📝 File Locations

### Important Backend Files
```
backend/
├── server.js              # Main server file
├── .env                   # Environment variables ⭐
├── package.json           # Dependencies
├── config/db.js           # Database connection
├── models/                # Database schemas
└── controllers/           # Business logic
```

### Important Frontend Files
```
src/
├── App.jsx                # Main app & routing
├── admin/context/         # Auth state management
├── admin/pages/           # Admin pages
├── admin/services/        # API calls
└── admin/components/      # Reusable components
```

---

## 🔍 Keyboard Shortcuts

### Browser Console (F12)
| Shortcut | Action |
|----------|--------|
| F12 | Open Developer Tools |
| Ctrl+Shift+C | Inspect Element |
| Ctrl+Shift+J | Open Console |
| Ctrl+Shift+K | Open Console |
| Ctrl+Shift+I | Developer Tools |

### VS Code
| Shortcut | Action |
|----------|--------|
| Ctrl+Backtick | Toggle Terminal |
| Ctrl+L | Select Line |
| Ctrl+/ | Toggle Comment |
| Ctrl+Shift+L | Select All Occurrences |
| Ctrl+H | Find & Replace |
| F2 | Rename Symbol |

### MongoDB Compass
| Action | Steps |
|--------|-------|
| Connect | Click "Connect" → Enter URI |
| Browse | Collections shown in left panel |
| Add Document | Right-click collection → Insert |
| View Document | Click any document |
| Delete Document | Right-click → Delete |

---

## 📊 Quick Stats Check

### View Dashboard Stats
1. Login to admin panel
2. Go to http://localhost:5173/admin/dashboard
3. See all statistics

### Check via API
```bash
# Get all statistics
curl http://localhost:5000/api/dashboard/stats \
  -H "Authorization: Bearer YOUR_TOKEN"

# Response:
{
  "stats": {
    "totalCourses": 5,
    "totalStudents": 25,
    "totalTeachers": 8,
    "totalEvents": 3,
    "totalAchievements": 12
  }
}
```

---

## 📋 Form Fields Reference

### Course Form
- **Title** - Course name (required)
- **Description** - Course details
- **Instructor** - Teacher name
- **Duration** - e.g., "3 months"
- **Fee** - Cost in PKR
- **Level** - Beginner/Intermediate/Advanced
- **Max Students** - Enrollment limit
- **Image** - Course image URL

### Event Form
- **Title** - Event name
- **Description** - Event details
- **Date** - Pick from calendar
- **Time** - Event time
- **Location** - Event venue
- **Capacity** - Maximum attendees
- **Image** - Event image URL

### Student Form
- **Name** - Full name
- **Email** - Student email
- **Phone** - Contact number
- **Course** - Select from dropdown
- **Photo** - Photo URL
- **Address** - Home address
- **Parent Contact** - Parent phone
- **Status** - Active/Inactive/Graduated

### Teacher Form
- **Name** - Full name
- **Email** - Email address
- **Phone** - Contact number
- **Qualification** - Degree/Certification
- **Specialization** - Subject area
- **Experience** - Years teaching
- **Photo** - Photo URL
- **Address** - Home address

### Achievement Form
- **Student Name** - Name of student
- **Email** - Student email
- **Photo** - Student photo
- **Achievement Title** - Award name
- **Description** - Award details
- **Marks** - Grade/Score
- **Award Date** - Date of award
- **Category** - Achievement/Scholarship/Award/Recognition

---

## 🧪 Quick Testing Checklist

### Authentication
- [ ] Can register new account
- [ ] Can login with credentials
- [ ] Can logout successfully
- [ ] Redirects to login when unauthorized
- [ ] Token persists on page refresh

### Courses
- [ ] Can create new course
- [ ] Can view course list
- [ ] Can edit course details
- [ ] Can delete course
- [ ] Dashboard shows total courses

### Events
- [ ] Can create event with date/time
- [ ] Can view event list
- [ ] Can edit event
- [ ] Can delete event
- [ ] Dashboard shows total events

### Students
- [ ] Can add student with course selection
- [ ] Can view student list
- [ ] Can edit student details
- [ ] Can delete student
- [ ] Dashboard shows total students

### Teachers
- [ ] Can add teacher profile
- [ ] Can view teacher list
- [ ] Can edit teacher info
- [ ] Can delete teacher
- [ ] Dashboard shows total teachers

### Achievements
- [ ] Can add achievement/scholarship
- [ ] Can view achievement list
- [ ] Can edit achievement
- [ ] Can delete achievement
- [ ] Dashboard shows total achievements

---

## 🐛 Quick Troubleshooting

### "Cannot connect to backend"
```bash
# Check if backend is running
curl http://localhost:5000/api/courses

# If fails, restart backend:
cd backend && npm run dev
```

### "MongoDB connection failed"
```bash
# Check if MongoDB is running
mongo --version

# Start MongoDB (Windows):
net start MongoDB

# Or test Atlas connection:
# Copy URI from MongoDB Atlas and update .env
```

### "Frontend won't load"
```bash
# Check if frontend is running
npm run dev

# Clear cache:
npm run build --reset-cache

# Check port 5173 is free
```

### "Can't login"
```bash
# Clear token and try again:
# F12 → Console → localStorage.removeItem('adminToken')

# Then login again
```

### "Images not showing"
```bash
# Check image URL format
# Should be: https://example.com/image.jpg
# Or: /assets/image.jpg

# Verify URL in database
```

---

## 📊 Database Size Estimates

| Entity | Typical Size |
|--------|--------------|
| 1 Admin | ~500 bytes |
| 1 Course | ~1 KB |
| 1 Student | ~800 bytes |
| 1 Teacher | ~900 bytes |
| 1 Event | ~1 KB |
| 1 Achievement | ~1 KB |

**Example:** 1000 courses + 5000 students ≈ 10 MB storage

---

## 🔑 Environment Variables Reference

```bash
# Backend .env variables:

# Database
MONGODB_URI=mongodb://localhost:27017/noor-academy
# OR
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/noor-academy

# Authentication
JWT_SECRET=your_super_secret_key_minimum_20_chars
JWT_EXPIRE=30d

# Server
PORT=5000
NODE_ENV=development

# Frontend .env variables:
# Usually auto-configured, but if needed:
VITE_API_URL=http://localhost:5000/api
```

---

## 📱 Responsive Breakpoints

Frontend uses Tailwind CSS breakpoints:
```
Mobile: < 640px
Tablet: 640px - 1024px
Desktop: > 1024px
Large Desktop: > 1280px
```

All components fully responsive ✅

---

## 🎨 Color Scheme Reference

### Dashboard
- Header: Cyan (cyan-600) to Teal (teal-600)
- Cards: White with shadow
- Buttons: Cyan-600 to Teal-700

### Stat Cards
- Courses: Blue
- Students: Green
- Teachers: Purple
- Events: Orange
- Achievements: Red

### Forms
- Input: Gray with border
- Focus: Cyan border
- Buttons: Gradient cyan to teal

---

## 💾 Backup & Recovery

### Backup Database
```bash
# MongoDB local backup
mongodump --db noor-academy --out ./backup

# MongoDB Atlas has automatic backups
```

### Restore Database
```bash
# Restore from backup
mongorestore --db noor-academy ./backup/noor-academy
```

### Export Data
```bash
# Export to JSON
mongoexport --db noor-academy --collection courses > courses.json
```

---

## 🚀 Deployment Checklist

Before deploying to production:
- [ ] Update JWT_SECRET to strong random key
- [ ] Change MONGODB_URI to production database
- [ ] Set NODE_ENV=production
- [ ] Build frontend: npm run build
- [ ] Test all APIs with production URLs
- [ ] Setup HTTPS/SSL
- [ ] Setup database backups
- [ ] Setup monitoring/logging
- [ ] Setup error tracking (Sentry, etc)
- [ ] Update CORS allowed origins
- [ ] Setup rate limiting
- [ ] Test all user flows

---

## 📚 Documentation Links

- [QUICK_START.md](QUICK_START.md) - 5-minute setup
- [ADMIN_PANEL_SETUP.md](ADMIN_PANEL_SETUP.md) - Complete setup
- [API_TESTING_GUIDE.md](API_TESTING_GUIDE.md) - API reference
- [SYSTEM_ARCHITECTURE.md](SYSTEM_ARCHITECTURE.md) - Architecture
- [TROUBLESHOOTING_GUIDE.md](TROUBLESHOOTING_GUIDE.md) - Common issues
- [PROJECT_COMPLETION_SUMMARY.md](PROJECT_COMPLETION_SUMMARY.md) - Summary

---

## 🆘 Emergency Contacts/Resources

### Documentation
- React: https://react.dev
- Express: https://expressjs.com
- MongoDB: https://www.mongodb.com/docs
- Tailwind: https://tailwindcss.com
- Vite: https://vitejs.dev

### Tools
- Postman: https://www.postman.com
- MongoDB Compass: https://www.mongodb.com/products/compass
- VS Code: https://code.visualstudio.com

### Learning
- Node.js Tutorial: https://nodejs.org/docs
- MongoDB Tutorial: https://www.mongodb.com/docs
- React Guide: https://react.dev/learn

---

**💡 Pro Tip:** Keep this guide open while working for quick reference!

**Happy Managing! 🎓**
