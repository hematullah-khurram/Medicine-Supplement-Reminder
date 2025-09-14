# 💊 Medicine & Supplement Reminder

The **Medicine & Supplement Reminder** is a full-stack web application designed to help users manage their daily medicines and supplements.  
With this app, users can **create, view, update, and delete (CRUD)** reminders for their medication schedule.  
Additionally, it provides quick access to daily essentials such as **Morning Medicine, Vitamins, and Night Supplements** with a simple **"Mark as Taken"** option.

---

## ✨ Features
- User authentication (Register, Login, Logout)  
- CRUD functionality for reminders (Create, Read, Update, Delete)  
- View detailed information for each reminder (dosage, time, frequency, description, category)  
- Option to mark daily medicines or supplements as taken  
- Simple and clean UI for ease of use  

---

## 🗂 Entity Relationship Diagram (ERD)
The ERD shows the relationship between **Users** and **Reminders**.  
Each user can create multiple reminders.  

**User Model Fields**
- `_id: ObjectId` – Primary key  
- `username: String` – Unique username  
- `email: String` – User email  
- `password: String` – Hashed password  
- `reminders: Array<ObjectId>` – List of reminders created by the user  

**Reminder Model Fields**
- `_id: ObjectId` – Primary key  
- `name: String` – Medicine or supplement name  
- `dosage: String` – Dosage instructions  
- `description: String` – Details of the reminder  
- `category: String` – Type: vitamin, supplement, prescription  
- `frequency: String` – Daily / Weekly / Custom  
- `time: Date/Time` – Scheduled reminder time  
- `createdBy: ObjectId` – User who created the reminder  

---

## 📌 User Stories
- As a user, I can sign up and sign in to manage my reminders.  
- As a user, I can create a reminder with name, dosage, frequency, and time.  
- As a user, I can edit or delete my reminders.  
- As a user, I can view all my reminders in one place.  
- As a user, I can log out securely.  

---

## 🌐 RESTful CRUD Routes

### Reminders
| Method | Path              | Description                  |
|--------|-------------------|------------------------------|
| GET    | `/reminders`      | List all reminders           |
| GET    | `/reminders/new`  | Form to create a reminder    |
| POST   | `/reminders`      | Create a new reminder        |
| GET    | `/reminders/:id`  | Show a single reminder       |
| GET    | `/reminders/:id/edit` | Edit form for reminder |
| PUT    | `/reminders/:id`  | Update a reminder            |
| DELETE | `/reminders/:id`  | Delete a reminder            |

### Users
| Method | Path        | Description                         |
|--------|------------|-------------------------------------|
| GET    | `/users`   | List all users                      |
| GET    | `/users/:id` | Show user profile & reminders     |

---

## 🚀 Usage
- **Register/Login**: Create an account to start managing your reminders.  
- **Create Reminder**: Add new medicine/supplement details (name, dosage, frequency, time, description, category).  
- **View Reminders**: See all your reminders listed with details.  
- **Edit Reminder**: Update dosage, frequency, or time whenever needed.  
- **Delete Reminder**: Remove a reminder when no longer needed.  
- **Quick Access Options**: Mark Morning Medicine, Vitamins, or Night Supplements as taken directly from the dashboard.  

---

## 🔮 Future Improvements
- Add email/SMS notifications for reminders  
- Mobile-friendly PWA (Progressive Web App) support  
- Analytics dashboard to track medicine adherence  
- Integration with wearable health devices  

---

## 🛠 Technologies Used
- **Frontend**: EJS, HTML5, CSS3  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB with Mongoose  
- **Authentication**: express-session, bcrypt  
- **Styling**: Custom CSS (responsive design)  

---

## ⚙️ Installation & Setup
1. Clone this repository.  
2. Run `npm install` to install dependencies.  
3. Create a `.env` file with the following variables:  
