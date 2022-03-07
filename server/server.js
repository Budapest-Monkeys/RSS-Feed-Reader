const express = require('express');
const bodyParser = require('body-parser')
const testRoutes = require('./routes/testAPI')
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use('/test', testRoutes);

// Server listens on port 5000, app runs on 3000.
app.listen(PORT, () => {console.log(`Server started on ${PORT}...`)});
