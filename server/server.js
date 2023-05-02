//Importing node modules
const express = require("express");
const multer = require("multer");
const request = require("request");
const bodyParser = require("body-parser"); //for handling request body
const MongoClient = require("mongodb").MongoClient; //for mongodb
const mongoose = require("mongoose");
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
  res.send("This server is working");
});

//Endpoint to fetch all data from the DB.
app.get("/get-all-jobs", async (req, res) => {
  var databaseName = "Applications";
  var collectionName = "List";

  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db(databaseName);
    const collection = db.collection(collectionName);

    const result = await collection.find({}).toArray();

    console.log("All job documents retrieved from collection");
    client.close();

    // res.status(200).json({
    //   message: "All jobs retrieved successfully.",
    //   result,
    // });
    res.send(result);
    console.log(result)
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving documents from database");
  }
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
app.post("/upload-job-data", async (req, res) => {
  var databaseName = "Applications";
  var collectionName = "List";

  try {
    const formData = req.body;
    console.log(formData);

    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db(databaseName);
    const collection = db.collection(collectionName);

    // Insert the new document into the collection.
    const result = await collection.insertOne(formData);

    console.log("New job document inserted into collection");
    client.close();

    res.status(200).json({
      message: "Job Posted Successfully.",
      result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error inserting document into database");
  }
});

//Inside the function, we use await to wait for the MongoClient.connect method to return a Promise, which gives us a client object we can use to interact with the database. We then use the await keyword again to wait for the insertOne method to complete before we move on to closing the connection and sending the response to the client.
//In the catch block, we handle any errors that occur during the execution of the function.

// Route for test db connection.
app.get("/test", (req, res) => {
  const mongoose = require("mongoose");
  const uri = process.env.MONGODB_URI;

  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to MongoDB Atlas!");
    })
    .catch((error) => {
      console.log("Error connecting to MongoDB Atlas:", error);
    });

  res.send("All good");
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
