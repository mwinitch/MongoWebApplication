const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const instituionRouter = require('./routes/institutions');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// Connect to the MongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));

app.use('/institutions', instituionRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}...`)
});