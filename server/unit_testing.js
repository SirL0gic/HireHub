const request = require("supertest");
const app = require("./your-app-file"); // Replace with the path to your app file

describe("Test API routes", () => {
  // Test the "/api/test" route
  it("should return 'This server is working'", async () => {
    const response = await request(app).get("/api/test");
    expect(response.status).toBe(200);
    expect(response.text).toBe("This server is working");
  });

  // Test the "/api/test-mongodb-connection" route
  it("should return 'MongoDB connection successful'", async () => {
    const response = await request(app).get("/api/test-mongodb-connection");
    expect(response.status).toBe(200);
    expect(response.text).toBe("MongoDB connection successful");
  });

  // Test the "/api/get-all-jobs" route
  it("should return an array of jobs", async () => {
    const response = await request(app).get("/api/get-all-jobs");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test the "/api/upload" route
  it("should upload a file successfully", async () => {
    const response = await request(app)
      .post("/api/upload")
      .attach("file", "path/to/your/file"); // Replace with the path to a file to upload
    expect(response.status).toBe(200);
    expect(response.text).toBe("File uploaded successfully");
  });

  // Test the "/api/upload-job-data" route
  it("should insert a new job document into the database", async () => {
    const jobData = {
      // Replace with the data for a new job
      title: "Software Engineer",
      company: "ABC Inc.",
      location: "Dubai",
      // ...
    };

    const response = await request(app)
      .post("/api/upload-job-data")
      .send(jobData);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Job Posted Successfully.");
    expect(response.body.result.insertedCount).toBe(1);
  });
});





/*
To run the unit tests using Jest, follow these steps:

1. Make sure you have Jest and supertest installed as development dependencies. If you haven't installed them yet, you can run the following command in your project directory:

   ```bash
   npm install --save-dev jest supertest
   ```

2. Create a new file called `your-app-file.test.js` (replace `your-app-file` with the actual name of your app file) in the same directory as your app file.

3. Copy and paste the unit tests code provided earlier into the `your-app-file.test.js` file.

4. In your terminal or command prompt, navigate to your project directory.

5. Run the following command to execute the tests:

   ```bash
   npx jest your-app-file.test.js
   ```

   Replace `your-app-file.test.js` with the name of the test file you created.

6. Jest will execute the tests and display the results in the terminal. You will see a summary of the test results, including the number of tests passed or failed.

That's it! You have successfully run the unit tests using Jest. You can add more test files or expand the existing tests as needed.
*/