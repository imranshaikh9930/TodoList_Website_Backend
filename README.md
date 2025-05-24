#  Task Manager API (Express.js)

A simple in-memory Task Manager REST API built with Express.js. Supports creating, retrieving, updating, and deleting tasks.

## Features

- CRUD operations for tasks
- In-memory storage (no database required)
- Basic validation (title and description required)
- Graceful error handling
- Proper HTTP status codes
- Easy to test with Postman or `curl`

---

##  Endpoints

### ✅ `GET /tasks`
**Description:** Retrieve all tasks.

**Sample Response:**
```json
[
  {
    "id": 1,
    "title": "Learn Express",
    "description": "Study the basics of Express.js",
    "completed": false
  }
]

```

![TodoMern](https://github.com/user-attachments/assets/ab7effcf-57d4-47e1-ac1f-7669172047af)
