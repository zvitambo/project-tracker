const express= require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
//const cors = require("cors");
dotenv.config();
require("express-async-errors");
const path = require('path');
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const fileUpload = require("express-fileupload");
//db
const connectDB = require("./db/connect");


//middleware
const notFoundMiddleware  = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authenticateUser = require("./middleware/auth");


//routers 
const authRouter = require('./routes/authRoutes');
const jobRouter = require("./routes/jobRoutes");
const projectRouter = require("./routes/projectRoutes");
const accountsRouter = require("./routes/accountsRoutes");
const imageRouter = require("./routes/imageRoutes");


app.use(express.static(path.join(__dirname, "./client/build")));
if (process.env.NODE_DEV !== 'production') {
    app.use(morgan('dev'))
}

app.use(express.static("./public"));
app.use(express.json());
app.use(fileUpload());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());


app.use('/api/v1/auth', authRouter);
app.use("/api/v1/jobs",authenticateUser,  jobRouter);
app.use("/api/v1/projects", authenticateUser, projectRouter);
app.use("/api/v1/accounts", authenticateUser, accountsRouter);
app.use("/api/v1/images", authenticateUser, imageRouter);

//app.use(cors());
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build"));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware); 

const port = process.env.PORT || 5000;

const start = async () => { 
try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
} catch (error) {
    console.log(error)    
}
}

start();