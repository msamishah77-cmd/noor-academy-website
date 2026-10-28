# Quick Start Guide - Noor Academy Admin Panel

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js installed
- MongoDB installed or MongoDB Atlas account
- VS Code or any code editor

---

## Step 1: Setup Backend (2 mins)

```bash
# Open terminal in project root
cd backend

# Install dependencies
npm install

# Create .env file
# Add these lines:
MONGODB_URI=mongodb://localhost:27017/noor-academy
JWT_SECRET=noor-academy-secret-key-2024
PORT=5000
NODE_ENV=development

# Start backend server
npm run dev

# You should see: "✅ Server running on http://localhost:5000"
```

---

## Step 2: Start Frontend (1 min)

```bash
# In new terminal in root directory
npm run dev

# You should see: "http://localhost:5173/"
```

---

## Step 3: First Admin Account

1. Open browser: `http://localhost:5173/admin/register`
2. Fill in:
   - Name: Admin Name
   - Email: admin@noor.com
   - Password: password123
   - Confirm: password123
3. Click Register
4. You'll be redirected to dashboard!

---

## Step 4: Start Managing

### Add a Course
1. Click "Courses" card on dashboard
2. Click "+ Add New Course"
3. Fill in:
   - Title: "Web Development"
   - Instructor: "Mr. Ali"
   - Duration: "3 months"
   - Fee: 5000
   - Level: "Beginner"
4. Click "Create Course"
5. Done! Course appears below

### Add a Student
1. Click "Students" card on dashboard
2. Click "+ Add New Student"
3. Fill in:
   - Name: "Ahmed Khan"
   - Email: "ahmed@example.com"
   - Phone: "03001234567"
   - Select Course
4. Click "Create Student"
5. Done! Student added to list

### Add an Event
1. Click "Events" card on dashboard
2. Click "+ Add New Event"
3. Fill in:
   - Title: "Annual Ceremony"
   - Date: Select date
   - Time: Set time
   - Location: "Academy Hall"
   - Capacity: 200
4. Click "Create Event"
5. Done! Event created

### Add a Teacher
1. Click "Teachers" card on dashboard
2. Click "+ Add New Teacher"
3. Fill in:
   - Name: "Dr. Fatima"
   - Email: "fatima@noor.com"
   - Phone: "03005678901"
   - Qualification: "M.Sc"
   - Specialization: "Mathematics"
   - Experience: 5
4. Click "Create Teacher"
5. Done! Teacher added

### Add an Achievement
1. Click "Achievements" card on dashboard
2. Click "+ Add New Achievement"
3. Fill in:
   - Student Name: "Ali Ahmed"
   - Email: "ali@example.com"
   - Achievement Title: "Merit Award"
   - Category: "Achievement"
   - Marks: "A+"
   - Award Date: Select date
4. Click "Create Achievement"
5. Done! Achievement added

---

## 📊 Dashboard Statistics

Your dashboard will show:
- **Total Courses**: Number of courses created
- **Total Students**: Number of enrolled students
- **Total Teachers**: Number of teachers
- **Total Events**: Number of events
- **Total Achievements**: Number of achievements

These update automatically as you add data!

---

## 🔑 Admin Credentials (Remember These!)

```
Email: admin@noor.com
Password: password123
```

Keep these safe! You'll use them to login.

---

## ⚡ Keyboard Shortcuts (Optional)

| Action | Shortcut |
|--------|----------|
| Go to Dashboard | `/admin/dashboard` |
| Go to Courses | `/admin/courses` |
| Go to Students | `/admin/students` |
| Go to Teachers | `/admin/teachers` |
| Go to Events | `/admin/events` |
| Go to Achievements | `/admin/achievements` |
| Logout | Click Logout button |

---

## 🐛 Quick Troubleshooting

### Backend not starting?
```bash
# Kill previous process on port 5000
# Windows: netstat -ano | findstr :5000
# Then: taskkill /PID <PID> /F

# Check if MongoDB is running
# Windows: Open Services and look for MongoDB
```

### Frontend not loading?
```bash
# Clear browser cache (Ctrl+Shift+Delete)
# Restart dev server: npm run dev
```

### Can't login?
- Check email/password are correct
- MongoDB should be running
- Backend should be on http://localhost:5000

### Database empty?
- Check MongoDB connection in .env
- Restart backend after changing .env
- Use MongoDB Compass to verify database

---

## 📝 What's Next?

After setup, you can:

1. **Add More Admins** - Go to Register page again
2. **Customize Data** - Add your own courses, teachers, etc.
3. **Enable Authentication** on public pages
4. **Connect to Public Pages** - Fetch data from API to display on website
5. **Deploy** - Upload backend and frontend to servers

---

## 🎓 Learning Resources

- MongoDB Basics: https://docs.mongodb.com
- Express.js Guide: https://expressjs.com
- React Documentation: https://react.dev
- REST APIs: https://restfulapi.net

---

## ✅ Verification Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] MongoDB connected
- [ ] Admin account created
- [ ] Can login to dashboard
- [ ] Statistics showing on dashboard
- [ ] Can add a course
- [ ] Can add a student
- [ ] Can add an event
- [ ] Can add a teacher
- [ ] Can add an achievement

All checked? **You're ready to use your Admin Panel!** 🎉

---

**Questions?** Check `ADMIN_PANEL_SETUP.md` for detailed documentation.
