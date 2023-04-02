const express = require("express");
const multer = require("multer");
const cors = require("cors"); //for cross orgin requests


const app = express();
const port = 5000;


//Enable CORS for all routes.
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // save uploaded files to the "uploads" directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // use the original filename
  },
});

const upload = multer({ storage: storage });

app.get('/', (req, res) => {
  res.send('Hi Abis and Fayyaz');
});

// Route for handling file uploads
app.post("/upload", upload.single("file"), (req, res) => {
  res.send("File uploaded successfully.");
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
