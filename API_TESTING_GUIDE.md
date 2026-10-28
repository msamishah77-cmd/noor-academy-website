# Noor Academy Admin Panel - API Testing Guide

## 🧪 Testing with Postman or cURL

Base URL: `http://localhost:5000/api`

---

## 1. AUTHENTICATION ENDPOINTS

### Register Admin
```
POST http://localhost:5000/api/admin/register
Content-Type: application/json

{
  "name": "Admin Name",
  "email": "admin@noor.com",
  "password": "password123",
  "passwordConfirm": "password123"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "admin": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Admin Name",
    "email": "admin@noor.com"
  }
}
```

### Login Admin
```
POST http://localhost:5000/api/admin/login
Content-Type: application/json

{
  "email": "admin@noor.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "admin": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Admin Name",
    "email": "admin@noor.com"
  }
}
```

### Get Current Admin (Protected)
```
GET http://localhost:5000/api/admin/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

Response:
{
  "success": true,
  "admin": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Admin Name",
    "email": "admin@noor.com",
    "role": "admin",
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

## 2. COURSES ENDPOINTS

### Get All Courses
```
GET http://localhost:5000/api/courses

Response:
{
  "success": true,
  "count": 3,
  "courses": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Web Development",
      "description": "Learn web development...",
      "instructor": "Mr. Ali",
      "duration": "3 months",
      "fee": 5000,
      "level": "Beginner",
      "maxStudents": 30,
      "isActive": true,
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### Create Course (Protected)
```
POST http://localhost:5000/api/courses
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json

{
  "title": "Web Development",
  "description": "Complete web development course",
  "instructor": "Mr. Ali Khan",
  "duration": "3 months",
  "fee": 5000,
  "level": "Beginner",
  "maxStudents": 30,
  "image": "https://example.com/image.jpg"
}

Response:
{
  "success": true,
  "message": "Course created successfully",
  "course": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Web Development",
    ...
  }
}
```

### Update Course (Protected)
```
PUT http://localhost:5000/api/courses/507f1f77bcf86cd799439012
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json

{
  "fee": 6000,
  "maxStudents": 40
}

Response:
{
  "success": true,
  "message": "Course updated successfully",
  "course": { ... }
}
```

### Delete Course (Protected)
```
DELETE http://localhost:5000/api/courses/507f1f77bcf86cd799439012
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

Response:
{
  "success": true,
  "message": "Course deleted successfully"
}
```

---

## 3. STUDENTS ENDPOINTS

### Get All Students
```
GET http://localhost:5000/api/students

Response:
{
  "success": true,
  "count": 5,
  "students": [
    {
      "_id": "507f1f77bcf86cd799439020",
      "name": "Ahmed Khan",
      "email": "ahmed@example.com",
      "phone": "03001234567",
      "course": {
        "_id": "507f1f77bcf86cd799439012",
        "title": "Web Development"
      },
      "status": "Active",
      "admissionDate": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### Create Student (Protected)
```
POST http://localhost:5000/api/students
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json

{
  "name": "Ahmed Khan",
  "email": "ahmed@example.com",
  "phone": "03001234567",
  "course": "507f1f77bcf86cd799439012",
  "photo": "https://example.com/photo.jpg",
  "address": "Karachi, Pakistan",
  "parentContact": "03009876543",
  "status": "Active"
}

Response:
{
  "success": true,
  "message": "Student created successfully",
  "student": { ... }
}
```

---

## 4. EVENTS ENDPOINTS

### Get All Events
```
GET http://localhost:5000/api/events

Response:
{
  "success": true,
  "count": 2,
  "events": [
    {
      "_id": "507f1f77bcf86cd799439030",
      "title": "Annual Ceremony",
      "description": "Our annual event...",
      "date": "2024-02-15T00:00:00.000Z",
      "time": "10:00",
      "location": "Academy Hall",
      "capacity": 200,
      "registeredCount": 0,
      "isActive": true
    }
  ]
}
```

### Create Event (Protected)
```
POST http://localhost:5000/api/events
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json

{
  "title": "Annual Ceremony",
  "description": "Annual event of the academy",
  "date": "2024-02-15",
  "time": "10:00",
  "location": "Academy Hall",
  "capacity": 200,
  "image": "https://example.com/event.jpg"
}

Response:
{
  "success": true,
  "message": "Event created successfully",
  "event": { ... }
}
```

---

## 5. TEACHERS ENDPOINTS

### Get All Teachers
```
GET http://localhost:5000/api/teachers

Response:
{
  "success": true,
  "count": 3,
  "teachers": [
    {
      "_id": "507f1f77bcf86cd799439040",
      "name": "Dr. Fatima",
      "email": "fatima@noor.com",
      "phone": "03005678901",
      "qualification": "M.Sc",
      "specialization": "Mathematics",
      "experience": 5,
      "joiningDate": "2024-01-15T00:00:00.000Z",
      "isActive": true
    }
  ]
}
```

### Create Teacher (Protected)
```
POST http://localhost:5000/api/teachers
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json

{
  "name": "Dr. Fatima Ahmed",
  "email": "fatima@noor.com",
  "phone": "03005678901",
  "qualification": "M.Sc Mathematics",
  "specialization": "Mathematics",
  "experience": 5,
  "photo": "https://example.com/teacher.jpg",
  "address": "Islamabad, Pakistan"
}

Response:
{
  "success": true,
  "message": "Teacher created successfully",
  "teacher": { ... }
}
```

---

## 6. ACHIEVEMENTS ENDPOINTS

### Get All Achievements
```
GET http://localhost:5000/api/achievements

Response:
{
  "success": true,
  "count": 2,
  "achievements": [
    {
      "_id": "507f1f77bcf86cd799439050",
      "studentName": "Ali Ahmed",
      "email": "ali@example.com",
      "achievementTitle": "Merit Award",
      "description": "Top performer in class...",
      "marks": "A+",
      "category": "Achievement",
      "awardDate": "2024-01-15T00:00:00.000Z",
      "isActive": true
    }
  ]
}
```

### Create Achievement (Protected)
```
POST http://localhost:5000/api/achievements
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json

{
  "studentName": "Ali Ahmed",
  "email": "ali@example.com",
  "achievementTitle": "Merit Award",
  "description": "Top performer in mathematics",
  "marks": "A+",
  "awardDate": "2024-01-15",
  "category": "Achievement",
  "photo": "https://example.com/student.jpg"
}

Response:
{
  "success": true,
  "message": "Achievement created successfully",
  "achievement": { ... }
}
```

---

## 7. DASHBOARD ENDPOINTS

### Get Dashboard Statistics (Protected)
```
GET http://localhost:5000/api/dashboard/stats
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

Response:
{
  "success": true,
  "stats": {
    "totalCourses": 3,
    "totalStudents": 15,
    "totalTeachers": 5,
    "totalEvents": 2,
    "totalAchievements": 8
  }
}
```

### Get Recent Activities (Protected)
```
GET http://localhost:5000/api/dashboard/recent
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

Response:
{
  "success": true,
  "data": {
    "recentCourses": [ ... ],
    "recentStudents": [ ... ],
    "recentEvents": [ ... ],
    "recentAchievements": [ ... ]
  }
}
```

---

## 🔒 Authorization Header Format

All protected endpoints require:
```
Authorization: Bearer <YOUR_JWT_TOKEN>
```

Example using cURL:
```bash
curl -X GET http://localhost:5000/api/admin/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
```

---

## 📤 cURL Examples

### Login
```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@noor.com","password":"password123"}'
```

### Create Course
```bash
curl -X POST http://localhost:5000/api/courses \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title":"Web Development",
    "description":"Learn web dev",
    "instructor":"Mr. Ali",
    "duration":"3 months",
    "fee":5000
  }'
```

### Get All Courses
```bash
curl -X GET http://localhost:5000/api/courses
```

---

## ✅ Response Format

All responses follow this format:

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## 🐛 Common HTTP Status Codes

- `200` - OK, request successful
- `201` - Created, resource created successfully
- `400` - Bad Request, invalid data
- `401` - Unauthorized, missing/invalid token
- `404` - Not Found, resource doesn't exist
- `500` - Server Error, internal error

---

## 🧪 Testing Tips

1. **Use Postman**: Import this guide into Postman for easy testing
2. **Save Token**: Copy token and reuse for protected routes
3. **Test Validation**: Try sending incomplete data to see error messages
4. **Check Database**: Use MongoDB Compass to verify data is saving
5. **Monitor Console**: Check backend terminal for logs

---

**Happy Testing!** 🚀
