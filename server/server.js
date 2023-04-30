//Importing node modules
const express = require("express");
const multer = require("multer");
const request = require("request");
const bodyParser = require("body-parser"); //for handling request body
const MongoClient = require("mongodb").MongoClient; //for mongodb
const fs = require("fs");
const path = require("path");

//Env variables such as passwords.
const dotenv = require("dotenv");
dotenv.config();

//For cross orgin requests
const cors = require("cors");

//Backend Config
const app = express();
const port = 4000;

//Enable CORS for all routes.
app.use(cors());

//Parse JSON request bodies.
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

// Create a GitHub API token and set it as an environment variable
const githubToken = process.env.GITHUB_TOKEN;

//The password for mongo db is retrieved from the .env file.
const url = process.env.MONGODB_URI;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // save uploaded files to the "uploads" directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname); // append timestamp to the filename
  },
});

const upload = multer({ storage: storage });

// Route for testing basic server
app.get("/", (req, res) => {
  res.send("Hi Abis and Fayyaz");
});

//Endpoint to fetch all data from the DB.
app.get("/all-data", (req, res) => {
  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error connecting to database");
      return;
    }

    const db = client.db("Applications");
    const collection = db.collection("List");

    //Perform an operation on the collection, such as finding all documents.
    collection.find({}).toArray((err, documents) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error performing operation on collection");
        return;
      }

      //Return the result to the client.
      res.send(documents);
      console.log("Data sent to front-end");
      client.close();
    });
  });
});


// Route for handling file uploads
app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;

  // Read the file contents
  const filePath = path.join(__dirname, file.path);
  const fileData = fs.readFileSync(filePath);

  // Construct a unique filename with a timestamp
  const timestamp = Date.now().toString();
  const uniqueFilename = `${timestamp}-${file.originalname}`;

  // Construct the API endpoint URL with the unique filename
  const apiUrl = `https://api.github.com/repos/SirL0gic/CV-PDF/contents/${uniqueFilename}`;

  // Send the POST request to upload the file to the GitHub repository
  request(
    {
      method: "PUT",
      url: apiUrl,
      headers: {
        Authorization: `token ${githubToken}`,
        "User-Agent": "node.js",
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v3+json",
      },
      body: JSON.stringify({
        message: `Add ${uniqueFilename}`,
        content: fileData.toString("base64"),
      }),
    },
    (error, response, body) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error uploading file to GitHub");
        console.log("Error uploading file to GitHub");
      } else if (response.statusCode !== 201) {
        console.error(`Unexpected status code: ${response.statusCode}`);
        res.status(500).send("Error uploading file to GitHub");
        console.log("Error uploading file to GitHub");
      } else {
        res.send("File uploaded successfully");
        console.log("File uploaded successfully to GitHub");
      }
    }
  );
});


// Route for new applications
app.post("/upload-job-data", (req, res) => {
  const formData = req.body;

  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error connecting to database");
      return;
    }

    const db = client.db("Applications");
    const collection = db.collection("List");

    //Insert the new document into the collection.
    collection.insertOne(formData, function (err, res) {
      console.log("There is an error:", err);
      console.log(res); //Response from mongo db
      client.close();
    });
  });

  res.send({
    message: "Job Posted Successfully.",
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
