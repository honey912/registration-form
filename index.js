const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Assuming HTML files are in a 'public' directory

// MongoDB connection
// MongoDB connection
main()
.then(()=>{
    console.log("connection successful");
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/registrationDB")
}

// Define Mongoose Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Validate form data
  if (!name || !email || !password) {
    return res.status(400).sendFile(__dirname + '/public/error.html');
  }

  // Create a new user document
  const newUser = new User({
    name,
    email,
    password
  });

  try {
    await newUser.save();
    res.status(201).sendFile(__dirname + '/public/success.html');
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).sendFile(__dirname + '/public/error.html');
  }
});

// Start the server
app.listen(8080,()=>{
    console.log("registration here");
})
