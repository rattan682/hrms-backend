const express = require("express");
const connectDb = require("./config/db.config");
const userRouter = require("./routes/user.route");
const candidatesRouter = require("./routes/candidate.route");
const employeesRouter = require("./routes/employees.route");
const attendenceRouter = require("./routes/attendence.route");
const leaveRouter = require("./routes/leaves.route");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require('path')
const middleware = require("./middleware/middleware");
const upload = require('./multer/multer')
require("dotenv").config();
const app = express();

connectDb();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use("/user", userRouter);
app.use("/candidates",upload.single('resume'), middleware, candidatesRouter);
app.use("/employees",upload.single('pic'), employeesRouter);
app.use("/attendence", middleware, attendenceRouter);
app.use("/leaves",upload.single('attachment'), middleware, leaveRouter);

app.listen(process.env.PORT, () => {
  console.log("server is up");
});
