require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
};

const authRoutes = require('./routes/auth.routes');
const itemRoutes = require('./routes/item.routes');
const userRoutes = require('./routes/user.routes');
const landingRoutes = require('./routes/landing.routes');
const uploadRoutes = require('./routes/upload.routes');

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.use(express.json({ extended: false }));

// Connect Database
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log(`***mongodb connected`))
  .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/item', itemRoutes);
app.use('/api/user', userRoutes);
app.use('/api/landing', landingRoutes);

app.use(cors(corsOptions));
app.use(fileUpload());
app.use('/api/upload', uploadRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(process.env.PORT, () =>
  console.log(`server running on port ${process.env.PORT}`)
);
