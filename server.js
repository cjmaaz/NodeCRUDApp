const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');

const connectDB = require('./server/database/connection');
const userRouter = require('./server/routes/router');

//Configs & Intialisation
dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 3000;
const app = express();
connectDB();
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.resolve(__dirname, 'assets')));

//Logging Requests
app.use(morgan('tiny'));

//*Initial Route
app.use('/', userRouter);

app.listen(PORT, console.log(`Server started at http://localhost:${PORT}`));