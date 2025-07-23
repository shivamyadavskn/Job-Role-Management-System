<!-- Live Demo:https://splendid-pika-df4a41.netlify.app

For Local:

.env for cd/server: 

MONGODB_URI=mongodb+srv://hellotest:hellotest@cluster0.cy48cs3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT=5000




.env for cd/client:

REACT_APP_API_URL=http://localhost:5000


                 -->

                 # Project Name

A full-stack web application built with React and Node.js, featuring MongoDB integration.

## 🌐 Live Demo

**Live Demo:** [https://splendid-pika-df4a41.netlify.app](https://splendid-pika-df4a41.netlify.app)

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (for cloud database)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd <your-project-name>
   ```

2. **Install dependencies for both client and server**
   ```bash
   # Install server dependencies
   cd server
   npm install
   
   # Install client dependencies
   cd ../client
   npm install
   ```

## ⚙️ Environment Setup

### Server Environment Variables

Create a `.env` file in the `server` directory:

```env
MONGODB_URI=mongodb+srv://hellotest:hellotest@cluster0.cy48cs3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
```

### Client Environment Variables

Create a `.env` file in the `client` directory:

```env
REACT_APP_API_URL=http://localhost:5000
```

## 🛠️ Development

### Running the Application Locally

#### Option 1: Run Client and Server Separately

**Terminal 1 - Start the server:**
```bash
cd server
npm run dev
```

**Terminal 2 - Start the client:**
```bash
cd client
npm run dev
```

#### Option 2: Run Both Concurrently (if configured)

From the root directory:
```bash
npm run dev
```

*Note: This requires concurrently package and proper script configuration in root package.json*

### Available Scripts

#### Server Scripts
```bash
cd server
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm test           # Run tests
```

#### Client Scripts
```bash
cd client
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject from Create React App
npm run dev        # Alternative dev command (if configured)
```

#### Global Scripts (Root Directory)
```bash
npm run dev        # Start both client and server in development mode
npm run build      # Build client for production
npm run start      # Start production server
npm install        # Install dependencies for both client and server
```

## 📦 Production Build

### Building the Client
```bash
cd client
npm run build
```

### Building for Deployment
```bash
# Build client
cd client
npm run build



## 🌍 Deployment

### Client Deployment (Netlify)
1. Build the client application
2. Deploy the `client/build` folder to Netlify
3. Configure environment variables in Netlify dashboard

### Server Deployment (Heroku/Railway/etc.)
1. Deploy the `server` directory
2. Configure environment variables in your hosting service
3. Ensure MongoDB URI is properly configured

## 🔧 Technology Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Hosting:** Netlify (Frontend), MongoDB Atlas (Database)

## 📁 Project Structure

```
project-root/
├── client/                 # React frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env
├── server/                 # Node.js backend
│   ├── routes/
│   ├── models/
│   ├── package.json
│   └── .env
├── package.json           # Root package.json (if using)
└── README.md
```

## 🔐 Security Notes

- The current MongoDB credentials are for development/demo purposes
- In production, use environment-specific credentials
- Never commit `.env` files to version control
- Consider using MongoDB Atlas IP whitelisting for additional security

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure the client's API URL matches the server's running port
2. **Database Connection**: Verify MongoDB URI and network access
3. **Port Conflicts**: Check if ports 3000 (client) and 5000 (server) are available

### Environment Variables Not Loading
- Ensure `.env` files are in the correct directories
- Restart development servers after changing environment variables
- Check that variable names start with `REACT_APP_` for client-side variables
