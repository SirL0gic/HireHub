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
const { error } = require("console");

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
app.get("/api/test", (req, res) => {
  res.send("This server is working");
});


// Route for test db connection.
app.get("/api/test-mongodb-connection", (req, res) => {
  const uri = process.env.MONGODB_URI;

  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to MongoDB Atlas!");
      res.send("MongoDB connection successful");
    })
    .catch((error) => {
      console.log("Error connecting to MongoDB Atlas:", error);
      res.status(500).send("Error connecting to MongoDB Atlas");
    });
});

//Endpoint to fetch all data from the DB.
app.get("/api/get-all-jobs", async (req, res) => {
  var databaseName = "Applications";
  var collectionName = "List";

  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db(databaseName);
    const collection = db.collection(collectionName);

    const result = await collection.find({}).toArray();

    console.log("All jobs retrieved from collection");
    client.close();

    res.send(result);
    // console.log(result)
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving documents from database");
  }
});

// Route for handling file uploads
app.post("/api/upload", upload.single("file"), (req, res) => {
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

// Route for job new applications
app.post("/api/upload-job-data", async (req, res) => {
  var databaseName = "Applications";
  var collectionName = "List";

  try {
    const formData = req.body;
    // console.log(formData);

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

// Inside the function, we use await to wait for the MongoClient.connect method to return a Promise,
// which gives us a client object we can use to interact with the database. We then use the await keyword again to wait for the insertOne method to
// complete before we move on to closing the connection and sending the response to the client.
// In the catch block, we handle any errors that occur during the execution of the function.



//ignore
const jobss = [
  {
    ID: 1,
    Title: "Software Engineer",
    Date: "1/1/23",
    Company: "ABC Inc.",
    Location: "Dubai",
    Position: "Full-time",
    Description: "Developed and maintained software applications for clients",
    Contact: "John Doe (john.doe@abcinc.com)",
    Image: "/person.png",
  },

  {
    ID: 2,
    Title: "Marketing Manager",
    Date: "1/1/23",
    Company: "XYZ Corp.",
    Location: "Dubai",
    Position: "Contract",
    Description:
      "Developed and executed marketing campaigns for new product launches",
    Contact: "Jane Smith (jane.smith@xyzcorp.com)",
    Image: "/person.png",
  },

  {
    ID: 3,
    Title: "Sales Associate",
    Date: "1/1/23",
    Company: "123 Enterprises",
    Location: "Dubai",
    Position: "Part-time",
    Description:
      "Assisted customers with purchases and maintained store inventory",
    Contact: "Mark Johnson (mark.johnson@123enterprises.com)",
    Image: "/person.png",
  },

  {
    ID: 4,
    Title: "Human Resources Manager",
    Date: "1/1/23",
    Company: "Acme Corporation",
    Location: "Dubai",
    Position: "Full-time",
    Description:
      "Managed employee relations, benefits, and performance evaluations",
    Contact: "Sara Lee (sara.lee@acmecorp.com)",
    Image: "/person.png",
  },

  {
    ID: 5,
    Title: "Graphic Designer",
    Date: "1/1/23",
    Company: "Design Co.",
    Location: "Dubai",
    Position: "Freelance",
    Description:
      "Created designs for various marketing and advertising materials",
    Contact: "Mike Brown (mike.brown@designco.com)",
    Image: "/person.png",
  },
  {
    ID: 6,
    Title: "Product Manager",
    Date: "1/1/23",
    Company: "Innovate Ltd.",
    Location: "London",
    Position: "Full-time",
    Description:
      "Managed product roadmap and worked with cross-functional teams",
    Contact: "Adam Smith (adam.smith@innovate.com)",
    Image: "/person.png",
  },

  {
    ID: 7,
    Title: "Accountant",
    Date: "1/1/23",
    Company: "Numbers Inc.",
    Location: "New York",
    Position: "Full-time",
    Description: "Managed financial records and prepared tax documents",
    Contact: "Lisa Green (lisa.green@numbersinc.com)",
    Image: "/person.png",
  },

  {
    ID: 8,
    Title: "Project Manager",
    Date: "1/1/23",
    Company: "Globe Co.",
    Location: "Tokyo",
    Position: "Contract",
    Description: "Managed software development projects for clients",
    Contact: "Ken Yamamoto (ken.yamamoto@globeco.com)",
    Image: "/person.png",
  },

  {
    ID: 9,
    Title: "Customer Service Representative",
    Date: "1/1/23",
    Company: "Support Inc.",
    Location: "Sydney",
    Position: "Part-time",
    Description: "Assisted customers with product inquiries and complaints",
    Contact: "Emily Johnson (emily.johnson@supportinc.com)",
    Image: "/person.png",
  },

  {
    ID: 10,
    Title: "Web Developer",
    Date: "1/1/23",
    Company: "Code Co.",
    Location: "San Francisco",
    Position: "Freelance",
    Description: "Developed and maintained websites for clients",
    Contact: "Chris Lee (chris.lee@codeco.com)",
    Image: "/person.png",
  },
];

// Query to insert the above test jobs
async function insertJobs(jobss) {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  var databaseName = "Applications";
  var collectionName = "List";

  try {
    await client.connect();
    console.log("Connected to Atlas cluster");

    const db = client.db(databaseName);
    const collection = db.collection(collectionName);

    await collection.insertMany(jobss);
    console.log("Inserted documents into collection");
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
    console.log("Connection to Atlas cluster closed");
  }
}

// insertJobs(jobss);

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });


// Start the server
app.listen(port, "127.0.0.1", () => {
  console.log(`Server listening on port ${port}`);
});
