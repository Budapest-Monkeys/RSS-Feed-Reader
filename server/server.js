const express = require('express');
const bodyParser = require('body-parser')
const testRoutes = require('./routes/rssAPI')
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use('/rssAPI', testRoutes);

// Handle 404s here with an error object 
app.use((req, res, next) => {
    const err = new Error("Not found")
    err.status = 404
    // Use next with an error from any of the calls to send the error to the handler below.
    next(err)
})

// Error handler that uses 
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

// Server listens on port 5000 (or whatever is the env var for port), app runs on 3000.
app.listen(PORT, () => {console.log(`Server started on ${PORT}...`)});
