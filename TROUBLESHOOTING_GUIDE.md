# 🔧 Noor Academy Admin Panel - Troubleshooting & Maintenance Guide

## Common Issues & Solutions

---

## 🚫 Backend Issues

### Issue 1: "Cannot find module 'express'"
**Problem:** Node modules not installed

**Solution:**
```bash
cd backend
npm install
```

**If still failing:**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

---

### Issue 2: "EADDRINUSE: address already in use :::5000"
**Problem:** Port 5000 already in use

**Solution Option 1:** Kill the process using port 5000
```bash
# On Windows (PowerShell):
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -i :5000
kill -9 <PID>
```

**Solution Option 2:** Change backend port
```bash
# In backend/.env:
PORT=5001

# Then start backend on new port
npm run dev
```

---

### Issue 3: "MongooseError: Cannot connect to MongoDB"
**Problem:** MongoDB is not running or wrong connection string

**Solution Option 1: Local MongoDB**
```bash
# Start MongoDB service (Windows):
net start MongoDB

# Or install if missing:
# https://docs.mongodb.com/manual/installation/

# Check if running:
mongo  # Should connect
```

**Solution Option 2: MongoDB Atlas**
```bash
# Get connection string from MongoDB Atlas dashboard
# Update backend/.env:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/noor-academy
```

**Solution Option 3: Test Connection**
```bash
# In backend directory, create test.js:
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/noor-academy';
mongoose.connect(uri).then(() => console.log('Connected!')).catch(e => console.log(e));

# Run:
node test.js
```

---

### Issue 4: ".env file not found"
**Problem:** Missing environment variables file

**Solution:**
```bash
cd backend
# Copy example to .env
cp .env.example .env

# Edit .env with your values:
MONGODB_URI=mongodb://localhost:27017/noor-academy
JWT_SECRET=your_very_secret_key_change_this
PORT=5000
NODE_ENV=development
```

---

### Issue 5: "Cannot read property '_id' of undefined"
**Problem:** Invalid JWT token or user not authenticated

**Solution:**
```bash
# Clear token and login again
# In browser console:
localStorage.removeItem('adminToken');

# Refresh page and login with correct credentials
```

---

### Issue 6: "ValidationError: validation failed"
**Problem:** Invalid data format being saved

**Solution:** Check:
- Required fields are provided
- Email format is valid (test@example.com)
- All fields match schema definition
- No extra/unknown fields

---

### Issue 7: "CORS error: Access to XMLHttpRequest blocked"
**Problem:** Backend CORS not configured properly

**Solution:**
```javascript
// In backend/server.js, verify:
const cors = require('cors');
app.use(cors());

// Or with specific origin:
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

---

## 🎨 Frontend Issues

### Issue 1: "Cannot find module 'react-router-dom'"
**Problem:** Dependencies not installed

**Solution:**
```bash
# In project root
npm install
```

---

### Issue 2: "localhost:5173 refused to connect"
**Problem:** Frontend dev server not running

**Solution:**
```bash
# In project root
npm run dev

# Should show:
# VITE v4.x.x  ready in xxx ms
# ➜  Local:   http://localhost:5173/
```

---

### Issue 3: "Context undefined" / "useAuth is not a hook"
**Problem:** AuthProvider not wrapping app properly

**Solution:** Check `src/App.jsx`:
```javascript
// Should look like:
import { AuthProvider } from './admin/context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      {/* Routes here */}
    </AuthProvider>
  );
}
```

---

### Issue 4: "Cannot read token from localStorage"
**Problem:** Token not saved or corrupted

**Solution:**
```javascript
// Check token in browser console:
console.log(localStorage.getItem('adminToken'));

// Clear and login again:
localStorage.clear();
location.reload();
```

---

### Issue 5: "Images not loading on pages"
**Problem:** Image URLs are broken or wrong path

**Solution:**
```javascript
// Verify image URLs format:
// From API response:
console.log(course.image);  // Should be full URL

// In template:
<img src={course.image} alt="course" />
```

---

### Issue 6: "Form not submitting"
**Problem:** Validation errors or network issue

**Solution:**
1. Check browser console for errors
2. Verify all required fields filled
3. Check backend is running
4. Verify token is valid (login again if needed)

---

### Issue 7: "Page keeps redirecting to login"
**Problem:** Token invalid or expired

**Solution:**
```javascript
// Token expires after 30 days
// When expired, user must login again

// Manually extend session (not recommended):
// Backend: Increase JWT_EXPIRE in .env
// Frontend: Refresh page and login again
```

---

## 📊 Database Issues

### Issue 1: "Duplicate key error: E11000"
**Problem:** Trying to insert duplicate unique value (email)

**Solution:**
- Use different email address
- Or delete existing document from MongoDB

```bash
# Using MongoDB Compass or mongo shell:
db.admins.deleteOne({email: "test@test.com"})
```

---

### Issue 2: "Collection doesn't exist"
**Problem:** Database not initialized with data

**Solution:**
```bash
# Collections auto-create on first insert
# So just create first admin account:
# Go to /admin/register and create account
```

---

### Issue 3: "Cannot find database 'noor-academy'"
**Problem:** Database name wrong in connection string

**Solution:** Verify `MONGODB_URI`:
```bash
# Should contain database name:
# mongodb://localhost:27017/noor-academy
#                             ^^^^^^^^^^^
#                          database name

# Or for Atlas:
# mongodb+srv://user:pass@cluster.mongodb.net/noor-academy
```

---

### Issue 4: "Authentication failed"
**Problem:** Wrong MongoDB credentials

**Solution:**
```bash
# If using Atlas, verify:
1. Correct username and password
2. IP address whitelisted
3. No special characters without URL encoding
4. Connection string correct

# Test with mongo shell:
mongo "mongodb+srv://user:pass@cluster.mongodb.net/test"
```

---

## 🔐 Authentication Issues

### Issue 1: "Invalid credentials"
**Problem:** Wrong email or password

**Solution:**
- Verify email spelling
- Verify password (caps lock)
- Create new account if forgotten

---

### Issue 2: "Email already exists"
**Problem:** Email already registered

**Solution:**
- Use different email
- Or login with existing account
- Delete old account if wanted

---

### Issue 3: "Passwords don't match"
**Problem:** Password and confirm password different

**Solution:**
- Retype password carefully
- Both must be identical
- Check caps lock

---

### Issue 4: "Login fails but credentials are correct"
**Problem:** Token generation issue

**Solution:**
```bash
# Verify JWT_SECRET in backend/.env
# Should be a strong string
JWT_SECRET=my_very_long_and_secret_key_12345

# Restart backend:
npm run dev
```

---

## 📡 API Issues

### Issue 1: "404 Not Found on /api/courses"
**Problem:** Backend not running or route not defined

**Solution:**
```bash
# Verify backend running on localhost:5000
# Check http://localhost:5000/api/courses directly
# Should show error or data

# If connection refused:
cd backend && npm run dev
```

---

### Issue 2: "403 Forbidden"
**Problem:** Not authorized (token missing/invalid)

**Solution:**
```javascript
// Check api.js has token in header:
const token = localStorage.getItem('adminToken');
headers: {
  'Authorization': `Bearer ${token}`
}

// Or manually test with cURL:
curl -X GET http://localhost:5000/api/courses \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

### Issue 3: "400 Bad Request"
**Problem:** Invalid data or wrong format

**Solution:**
- Check all required fields present
- Verify data types (strings, numbers)
- Check JSON formatting
- Validate dates format (YYYY-MM-DD)

---

### Issue 4: "500 Internal Server Error"
**Problem:** Server-side error

**Solution:**
1. Check backend terminal for error message
2. Verify database connection
3. Check data validation
4. Restart backend

---

## 🎯 Testing & Validation

### Test Authentication Flow
```bash
1. Open http://localhost:5173/admin/register
2. Create account:
   - Name: Test Admin
   - Email: test@example.com
   - Password: test123
3. Should redirect to dashboard
4. Check stats appear
5. Logout
6. Login with same credentials
7. Should redirect to dashboard
```

### Test Course Creation
```bash
1. Login to admin panel
2. Go to Courses Manager
3. Click "Create Course"
4. Fill form:
   - Title: Web Development
   - Instructor: Mr. Khan
   - Duration: 3 months
   - Fee: 5000
   - Level: Beginner
5. Click "Create"
6. Should appear in list below
7. Edit course and change fee to 6000
8. Should update in list
9. Delete course and confirm
```

### Test API with Postman
```
1. Install Postman
2. Create request:
   - Method: GET
   - URL: http://localhost:5000/api/courses
3. Click "Send"
4. Should see 200 OK with courses list
```

### Test API with cURL
```bash
# Get all courses
curl http://localhost:5000/api/courses

# Get with token
curl -X GET http://localhost:5000/api/admin/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📋 Verification Checklist

### Backend Setup ✓
- [ ] Node.js installed
- [ ] MongoDB running locally or MongoDB Atlas connected
- [ ] `backend/.env` created with MONGODB_URI and JWT_SECRET
- [ ] `npm install` completed in backend folder
- [ ] `npm run dev` starts without errors
- [ ] Backend shows "Server running on port 5000"

### Frontend Setup ✓
- [ ] `npm install` completed in root
- [ ] `npm run dev` starts without errors
- [ ] Frontend shows "Local: http://localhost:5173"
- [ ] Page loads without 404s

### API Connection ✓
- [ ] Can create admin account
- [ ] Can login successfully
- [ ] Can see dashboard statistics
- [ ] Can create course and it appears
- [ ] Can edit and update course
- [ ] Can delete course

### Full Flow ✓
- [ ] Register new admin → Redirects to dashboard
- [ ] Login with credentials → Redirects to dashboard
- [ ] Logout → Redirects to login
- [ ] Protected routes → Can't access without token
- [ ] Token persistence → Refresh page → Still logged in

---

## 🛠️ Maintenance Tips

### Regular Maintenance
- **Weekly:** Check server logs for errors
- **Monthly:** Update npm packages
- **Monthly:** Backup MongoDB data
- **Quarterly:** Review security settings

### Updating Dependencies
```bash
# Check for updates
npm outdated

# Update specific package
npm update express

# Update all packages
npm update
```

### Database Backup
```bash
# Using mongodump (local)
mongodump --db noor-academy --out ./backup

# MongoDB Atlas has auto backups
# Access from dashboard
```

### Monitoring
```bash
# Monitor API performance
# Add to backend/server.js:
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    console.log(`${req.method} ${req.path} - ${Date.now() - start}ms`);
  });
  next();
});
```

---

## 📞 Getting Help

### Check Documentation
- [x] QUICK_START.md - 5-minute setup
- [x] ADMIN_PANEL_SETUP.md - Complete guide
- [x] API_TESTING_GUIDE.md - API reference
- [x] SYSTEM_ARCHITECTURE.md - Architecture overview

### Check Logs
1. **Browser Console** - Frontend errors
   - F12 → Console tab
2. **Backend Terminal** - Server errors
   - Shows when running `npm run dev`
3. **MongoDB Logs** - Database errors
   - Usually in service logs

### Debug Tips
```javascript
// Add console logs to trace issues
console.log('Token:', localStorage.getItem('adminToken'));
console.log('Admin data:', admin);
console.log('API response:', data);

// Check network requests
// F12 → Network tab → Look for requests to /api/*
```

---

## 🚨 Emergency Recovery

### System Won't Start
```bash
# 1. Stop all processes (Ctrl+C)
# 2. Kill backend process:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# 3. Clear cache:
cd frontend && npm run build --reset-cache
cd backend && rm -rf node_modules && npm install

# 4. Restart:
npm run dev (in root)
cd backend && npm run dev (in another terminal)
```

### Database Corrupted
```bash
# 1. Backup current database
mongodump --db noor-academy --out ./backup

# 2. Drop and recreate
mongo
use noor-academy
db.dropDatabase()

# 3. Restart backend to recreate collections
# 4. Create new admin account
```

### Lost Admin Password
```bash
# 1. Delete admin account from database
mongo
use noor-academy
db.admins.deleteMany({})

# 2. Restart backend
# 3. Create new admin account at /admin/register
```

---

## 📈 Performance Optimization

### Database Optimization
```javascript
// Add indexes for faster queries
// In models/Student.js:
studentSchema.index({ email: 1 });
studentSchema.index({ course: 1 });
```

### API Response Optimization
```javascript
// Only return needed fields (Lean queries)
// In controllers:
Student.find().lean().select('name email course');
```

### Frontend Optimization
```javascript
// Lazy load components
const CoursesManager = React.lazy(() => import('./pages/CoursesManager'));

// Use React.memo for expensive components
export default React.memo(CourseCard);
```

---

## 📊 Monitoring Dashboard

Suggested monitoring metrics:
- API response times (target: < 200ms)
- Database query times (target: < 100ms)
- Error rate (target: < 1%)
- Uptime (target: > 99%)
- Active sessions (track logins)
- Data growth rate

---

**For more help, review the comprehensive guides or check GitHub issues for similar problems.**

Happy Troubleshooting! 🚀
