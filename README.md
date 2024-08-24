# Event Management System

An advanced event management system built with Node.js, Express.js, MongoDB, and React.js. The system allows users to create, update, and delete events with complex nested data such as multiple sessions and speakers. It also includes features for user authentication and PDF report generation.

## Features

- **CRUD Operations:** Create, read, update, and delete events with nested data (sessions, speakers).
- **User Authentication:** Secure registration and login with roles (admin, organizer, participant).
- **PDF Generation:** Generate detailed PDF reports for each event, including sessions and registered participants.
- **Responsive UI:** A user-friendly and responsive frontend built with React and Chakra UI.
- **API Integration:** RESTful API integrated with the frontend to perform all operations.

## Tech Stack

- **Frontend:** React.js, Chakra UI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)
- **PDF Generation:** PDFKit
- **Deployment:** Vercel (Frontend), Render (Backend)

## Installation

### Prerequisites

- Node.js (v14 or above)
- MongoDB (local or Atlas)

### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/event-management-system.git
    cd event-management-system/backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root of the `backend` directory and add the following:
    ```env
    MONGO_URI=your-mongo-uri
    JWT_SECRET=your-jwt-secret
    PORT=5000
    ```

4. Start the server:
    ```bash
    npm run dev
    ```

### Frontend Setup

1. Navigate to the `frontend` directory:
    ```bash
    cd ../frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root of the `frontend` directory and add the following:
    ```env
    REACT_APP_API_BASE_URL=http://localhost:5000/api
    ```

4. Start the frontend development server:
    ```bash
    npm start
    ```

### Deployment

#### Backend Deployment (Render)

1. Push your code to GitHub.
2. Create a new service on [Render](https://render.com/).
3. Connect your repository and deploy.

#### Frontend Deployment (Vercel)

1. Push your frontend code to GitHub.
2. Create a new project on [Vercel](https://vercel.com/).
3. Connect your repository and deploy.

### API Endpoints

- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Login a user
- **GET** `/api/events` - Fetch all events
- **GET** `/api/events/:id` - Fetch a specific event by ID
- **POST** `/api/events` - Create a new event
- **PUT** `/api/events/:id` - Update an event by ID
- **DELETE** `/api/events/:id` - Delete an event by ID
- **GET** `/api/events/:id/report` - Generate a PDF report for an event

### Project Structure

```
event-management-system-frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── EventForm.js
│   │   ├── EventList.js
│   │   ├── EventDetails.js
│   ├── pages/
│   │   ├── HomePage.js
│   │   ├── LoginPage.js
│   │   ├── RegisterPage.js
│   ├── services/
│   │   ├── api.js
│   ├── App.js
│   ├── index.js
├── package.json
├── README.md
├── .gitignore
└── ...

```
```
event-management-system-backend/
├── controllers/
│   ├── eventController.js
│   ├── authController.js
├── middlewares/
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
├── models/
│   ├── Event.js
│   ├── Session.js
│   ├── Participant.js
│   ├── User.js
├── routes/
│   ├── eventRoutes.js
│   ├── authRoutes.js
├── utils/
│   ├── generateToken.js
│   ├── pdfGenerator.js
├── config/
│   ├── db.js
│   ├── dotenv.js
├── index.js
└── package.json

```
## Contributing

Contributions are welcome! Please fork this repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## Contact

If you have any questions or suggestions, feel free to contact me at [your-email@example.com](mailto:your-email@example.com).
Instructions:
Replace your-username and your-email@example.com with your actual GitHub username and email.
Customize any other sections as necessary to fit your specific project details.
This README.md file provides a comprehensive guide for users and contributors, covering setup, usage, and deployment instructions.






