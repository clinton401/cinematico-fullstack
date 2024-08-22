const express = require("express");
const path = require("path"); // `node:path` is not necessary
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const app = express();
const authRouter = require("./routes/authRouter");
const apiRouter = require("./routes/apiRouter");
const { foundErrorsHandler, notFound } = require("./controllers/routeControllers");

// CORS configuration
app.use(cors({
    origin: "http://localhost:8188",
    credentials: true,
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Serve static files
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// API routes
app.use("/auth", authRouter);
// Uncomment if you have API routes
// app.use("/api", apiRouter);

// Serve React application
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

// Error handling
app.all("*", notFound);
app.use(foundErrorsHandler);

const startServer = async () => {
    try {
        await connectDB();
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to the database:', error.message);
        process.exit(1); // Exit the process with failure
    }
};

startServer();
