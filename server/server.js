const express = require('express');
const app = express();

// Returns this simple json of users.
app.get("/api", (req, res) =>
    res.json({"users" : ["userOne", "userTwo", "userThree"] })
)

// Server listens on port 5000, app runs on 3000.
app.listen(5000, () => {console.log("server started on port 5000")})
