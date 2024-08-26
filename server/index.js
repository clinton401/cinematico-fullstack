const express = require("express");
const path = require("path"); // `node:path` is not necessary
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const app = express();
const authRouter = require("./routes/authRouter");
const apiRouter = require("./routes/apiRouter");
const { foundErrorsHandler, notFound } = require("./controllers/routeControllers");


app.use(cors({
    origin: "https://cinematico.up.railway.app",
    credentials: true,
}));



app.use(express.json());
app.use(cookieParser());
app.set('trust proxy', 1)


app.use(express.static(path.join(__dirname, '../frontend/dist')));

// API routes
app.use("/auth", authRouter);
// app.use("/api", apiRouter);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});


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
