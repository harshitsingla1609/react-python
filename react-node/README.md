# React Node Full Stack Application

A full-stack web application built with React frontend and Node.js backend with MongoDB database.

## Features

- **User Authentication**: Register, login, logout with JWT tokens
- **User Management**: Profile updates, password changes
- **Posts System**: Create, read, update, delete posts
- **User Directory**: View all registered users
- **Modern UI**: Material-UI components for beautiful interface
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure

```
react-node/
├── backend/          # Node.js Express server
│   ├── models/       # MongoDB schemas
│   ├── routes/       # API endpoints
│   ├── controllers/  # Business logic controllers
│   ├── middleware/   # Authentication & validation middleware
│   └── server.js     # Main server file
└── frontend/         # React application
    ├── src/
    │   ├── components/   # Reusable UI components
    │   ├── pages/        # Page components
    │   ├── context/      # React context for state management
    │   └── services/     # API service functions
    └── public/           # Static assets
```

## Backend Architecture

The backend follows the **MVC (Model-View-Controller)** pattern with clean separation of concerns:

- **Models**: MongoDB schemas for data structure
- **Controllers**: Business logic and request handling
- **Routes**: API endpoint definitions and middleware
- **Middleware**: Authentication, validation, and custom middleware

### Controllers

- **authController.js**: User authentication (register, login, profile management)
- **userController.js**: User operations (get all users, get user by ID)
- **postController.js**: Post operations (CRUD operations for posts)

### Middleware

- **auth.js**: JWT authentication middleware
- **validations/**: Input validation middleware
  - **authValidations.js**: Authentication validation rules
  - **postValidations.js**: Post validation rules
  - **validationHandler.js**: Validation error handler

## Backend Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)

### Installation

1. Navigate to the backend directory:

   ```bash
   cd react-node/backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:

   ```env
   PORT=8000
   MONGODB_URI=mongodb://localhost:27017/react-node-app
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   FRONTEND_URL=http://localhost:3000
   NODE_ENV=development
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The backend will run on `http://localhost:8000`

## Frontend Setup

### Prerequisites

- Node.js (v14 or higher)

### Installation

1. Navigate to the frontend directory:

   ```bash
   cd react-node/frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/change-password` - Change password

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID

### Posts

- `GET /api/posts` - Get all posts
- `GET /api/posts/my-posts` - Get current user's posts
- `POST /api/posts` - Create a new post
- `PUT /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Delete a post

## Technologies Used

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

### Frontend

- **React** - JavaScript library for building user interfaces
- **React Router** - Client-side routing
- **Material-UI** - React UI framework
- **Context API** - State management

## Development

### Running Both Servers

1. Start the backend server (in one terminal):

   ```bash
   cd react-node/backend
   npm run dev
   ```

2. Start the frontend server (in another terminal):
   ```bash
   cd react-node/frontend
   npm start
   ```

### Database

The application uses MongoDB. Make sure MongoDB is running locally or update the `MONGODB_URI` in the `.env` file to point to your MongoDB instance.

## Code Organization

### Backend Structure

```
backend/
├── controllers/      # Business logic
│   ├── authController.js
│   ├── userController.js
│   └── postController.js
├── models/          # Database schemas
│   ├── User.js
│   └── Post.js
├── routes/          # API endpoints
│   ├── auth.js
│   ├── users.js
│   └── posts.js
├── middleware/      # Custom middleware
│   ├── auth.js
│   └── validations/
│       ├── authValidations.js
│       ├── postValidations.js
│       └── validationHandler.js
└── server.js        # Main server file
```

### Benefits of This Architecture

#### Controller Pattern

- **Separation of Concerns**: Business logic separated from routes
- **Reusability**: Controllers can be reused across different routes
- **Testability**: Easier to unit test business logic
- **Maintainability**: Cleaner code organization
- **Scalability**: Easy to add new features and controllers

#### Validation Middleware

- **Clean Routes**: Routes are now focused only on endpoint definitions
- **Reusable Validation**: Validation rules can be reused across routes
- **Centralized Error Handling**: All validation errors handled consistently
- **Better Organization**: Validation logic separated from business logic
- **Easy Maintenance**: Validation rules can be updated in one place

### Validation Features

- **Input Sanitization**: Automatic trimming and normalization
- **Email Validation**: Proper email format validation
- **Password Strength**: Minimum length requirements
- **Custom Error Messages**: User-friendly error messages
- **Consistent Error Format**: Standardized error response format

## Production Deployment

### Backend

1. Set environment variables for production
2. Use a process manager like PM2
3. Set up a reverse proxy (nginx)
4. Use a cloud MongoDB service

### Frontend

1. Build the application:
   ```bash
   npm run build
   ```
2. Serve the build folder with a static file server
3. Configure the API URL for production

## Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Protected routes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
