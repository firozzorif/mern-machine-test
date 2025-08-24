# 🚀 Agent Manager - MERN Stack Application

A modern, full-stack web application for managing agents and distributing leads efficiently. Built with the MERN stack (MongoDB, Express.js, React, Node.js) and featuring a beautiful, responsive UI.

![Agent Manager](https://img.shields.io/badge/MERN-Stack-brightgreen)
![React](https://img.shields.io/badge/React-19.1.1-blue)
![Node.js](https://img.shields.io/badge/Node.js-Latest-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-blue)

## ✨ Features

### 🔐 Authentication & Authorization

- **Admin Login**: Secure JWT-based authentication
- **Role-based Access**: Admin and Agent roles with different permissions
- **Protected Routes**: Middleware-based route protection

### 👥 Agent Management

- **Add New Agents**: Create agent profiles with contact information
- **View All Agents**: Beautiful card-based agent listing
- **Real-time Updates**: Instant UI updates with toast notifications
- **Agent Statistics**: Track active agents and performance metrics

### 📊 Lead Distribution System

- **CSV/Excel Upload**: Support for .csv, .xlsx, and .xls files
- **Automatic Distribution**: Round-robin algorithm for fair lead assignment
- **Drag & Drop Interface**: Modern file upload with progress indicators
- **Bulk Processing**: Handle large datasets efficiently

### 📋 Task Management

- **Task Overview**: View all distributed tasks in a modern grid layout
- **Advanced Filtering**: Search by name, phone, or notes
- **Agent Filtering**: Filter tasks by assigned agent
- **Real-time Statistics**: Track total, completed, and pending tasks

### 🎨 Modern UI/UX

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Framer Motion for delightful interactions
- **Dark/Light Theme**: Professional color scheme
- **Toast Notifications**: Real-time feedback for user actions
- **Loading States**: Elegant loading indicators and error handling

## 🏗️ Project Structure

```
mern-machine-test/
├── backend/                    # Node.js + Express API
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT authentication
│   ├── models/
│   │   ├── User.js            # User/Agent model
│   │   └── Task.js            # Task model
│   ├── routes/
│   │   ├── authRoutes.js      # Authentication routes
│   │   ├── agentRoutes.js     # Agent management
│   │   ├── uploadRoutes.js    # File upload & distribution
│   │   └── taskRoutes.js      # Task management
│   ├── uploads/               # File upload directory
│   ├── .env                   # Environment variables
│   ├── package.json
│   └── server.js              # Express server entry point
│
├── frontend/                   # React application
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js      # Navigation component
│   │   │   ├── ErrorBoundary.js
│   │   │   └── LoadingSpinner.js
│   │   ├── pages/
│   │   │   ├── Login.js       # Authentication page
│   │   │   ├── Dashboard.js   # Main dashboard
│   │   │   ├── Agents.js      # Agent management
│   │   │   ├── Upload.js      # File upload interface
│   │   │   └── Tasks.js       # Task management
│   │   ├── api.js             # Axios configuration
│   │   ├── App.js             # Main app component
│   │   ├── index.js           # React entry point
│   │   └── index.css          # Global styles
│   ├── tailwind.config.js     # Tailwind configuration
│   ├── postcss.config.js      # PostCSS configuration
│   └── package.json
│
└── README.md                   # Project documentation
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (local or MongoDB Atlas)
- **npm** or **yarn**

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd mern-machine-test
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

**Environment Variables (.env):**

```env
MONGO_URI=mongodb://localhost:27017/agent-manager
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

### 4. Start the Application

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm start
```

The application will be available at:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 🔑 Demo Credentials

```
Email: admin@test.com
Password: 123456
```

## 📱 API Endpoints

### Authentication

- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Register new admin

### Agents

- `GET /api/agents` - Get all agents
- `POST /api/agents/add` - Add new agent

### File Upload

- `POST /api/upload` - Upload CSV/Excel and distribute tasks

### Tasks

- `GET /api/tasks` - Get all distributed tasks

## 🛠️ Technologies Used

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **Multer** - File upload handling
- **XLSX** - Excel file processing
- **bcryptjs** - Password hashing

### Frontend

- **React 19** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Heroicons** - Beautiful SVG icons
- **React Hot Toast** - Toast notifications

### Development Tools

- **Nodemon** - Development server
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 📊 Features in Detail

### Dashboard

- **Real-time Statistics**: Total agents, tasks, completion rates
- **Quick Actions**: Direct links to main features
- **System Status**: Live system health indicators
- **Performance Metrics**: Visual progress indicators

### Agent Management

- **Add Agents**: Form with validation for creating new agents
- **Agent Cards**: Beautiful card layout with agent information
- **Status Tracking**: Active/inactive agent status
- **Search & Filter**: Find agents quickly

### File Upload System

- **Drag & Drop**: Modern file upload interface
- **File Validation**: Automatic file type and size validation
- **Progress Indicators**: Visual upload progress
- **Error Handling**: Comprehensive error messages

### Task Distribution

- **Round-Robin Algorithm**: Fair distribution among available agents
- **Bulk Processing**: Handle thousands of records efficiently
- **Data Validation**: Ensure data integrity during import
- **Assignment Tracking**: Track which agent gets which leads

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Role-based Access**: Admin-only routes and features
- **Input Validation**: Server-side validation for all inputs
- **CORS Configuration**: Proper cross-origin resource sharing
- **Error Handling**: Secure error messages without sensitive data

## 📈 Performance Optimizations

- **Code Splitting**: React lazy loading for better performance
- **Image Optimization**: Optimized assets and icons
- **Caching**: Browser caching for static assets
- **Minification**: Production build optimization
- **Database Indexing**: Optimized MongoDB queries

## 🎨 UI/UX Highlights

- **Modern Design**: Clean, professional interface
- **Responsive Layout**: Works perfectly on all devices
- **Smooth Animations**: Delightful micro-interactions
- **Accessibility**: WCAG compliant design
- **Loading States**: Elegant loading indicators
- **Error Boundaries**: Graceful error handling

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/DigitalOcean)

```bash
# Build for production
npm run build

# Set environment variables
# Deploy using your preferred platform
```

### Frontend Deployment (Netlify/Vercel)

```bash
# Build for production
npm run build

# Deploy the build folder
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

## 🙏 Acknowledgments

- **React Team** for the amazing React library
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **Heroicons** for beautiful icons
- **MongoDB** for the flexible database solution

---

<div align="center">
  <p>Made with ❤️ and lots of ☕</p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>
