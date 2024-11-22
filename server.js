const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
const path = require('path');

app.use(cors());
app.use(express.json());



app.use('/public', express.static(path.join(__dirname,'public')));

const categoryRoutes = require('./routes/categoryRoute');
const petRoutes = require('./routes/petRoute');
app.use('/category', categoryRoutes);
app.use('/pets/category', petRoutes)

mongoose.connect('mongodb://localhost:27017/pets')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(5000, () => console.log(`Server running on port ${PORT}`))